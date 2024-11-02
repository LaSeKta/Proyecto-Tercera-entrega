<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta esta ruta a tu configuración de proyecto

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $query = "
        SELECT 
            ce.id_evaluacion, 
            c.id_cliente,
            CONCAT(p.nombre, ' ', p.apellido) AS nombre,
            e.cumplimiento_agenda,
            e.resistencia_anaerobica,
            e.resistencia_muscular,
            e.flexibilidad,
            e.resistencia_monotonia,
            e.resiliencia,
            e.nota,
            ce.fecha_evaluacion,
            c.alertas
        FROM clientes_evaluaciones ce
        JOIN clientes c ON ce.id_cliente = c.id_cliente
        JOIN personas p ON c.id_cliente = p.id_persona
        JOIN evaluaciones e ON ce.id_evaluacion = e.id_evaluacion
        INNER JOIN (
            SELECT id_cliente, MAX(fecha_evaluacion) AS max_fecha
            FROM clientes_evaluaciones
            GROUP BY id_cliente
        ) AS subquery ON ce.id_cliente = subquery.id_cliente AND ce.fecha_evaluacion = subquery.max_fecha
    ";

    $result = mysqli_query($conn, $query);

    $clientes_evaluaciones = [];
    while ($row = mysqli_fetch_assoc($result)) {
        // Calcula la nota final como promedio de las calificaciones individuales
        $promedio = (
            $row['cumplimiento_agenda'] +
            $row['resistencia_anaerobica'] +
            $row['resistencia_muscular'] +
            $row['flexibilidad'] +
            $row['resistencia_monotonia'] +
            $row['resiliencia']
        ) / 6;

        // Redondea el promedio y lo guarda en `nota_final`
        $row['nota_final'] = round($promedio);

        $clientes_evaluaciones[] = $row;
    }

    echo json_encode($clientes_evaluaciones, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
