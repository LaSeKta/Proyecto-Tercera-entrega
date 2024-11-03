<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta la ruta según tu configuración

session_start();

if (isset($_SESSION['ci'])) {
    $ci = $_SESSION['ci']; // Obtener el CI de la sesión

    try {
        $query = "
            SELECT 
                s.fecha,
                s.hora_inicio,
                s.hora_fin,
                p.nombre AS nombre_cliente,
                p.apellido AS apellido_cliente
            FROM 
                sesiones s
            JOIN 
                clientes_sesiones cs ON s.id_sesion = cs.id_sesion
            JOIN 
                clientes c ON cs.id_cliente = c.id_cliente
            JOIN 
                personas p ON c.id_cliente = p.id_persona
            JOIN 
                entrenador_sesiones es ON s.id_sesion = es.id_sesion
            WHERE 
                es.id_entrenador = ?
        ";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $ci);
        $stmt->execute();
        $result = $stmt->get_result();

        $sesiones = [];
        while ($row = $result->fetch_assoc()) {
            $sesiones[] = [
                'fecha' => $row['fecha'],
                'hora_inicio' => $row['hora_inicio'],
                'hora_fin' => $row['hora_fin'],
                'cliente' => $row['nombre_cliente'] . ' ' . $row['apellido_cliente']
            ];
        }

        echo json_encode(["success" => true, "sesiones" => $sesiones]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Sesión no iniciada"]);
}
?>
