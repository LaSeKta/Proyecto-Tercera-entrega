<?php
include('../../../assets/database.php');

try {
    $query = "SELECT c.id_cliente, CONCAT(p.nombre, ' ', p.apellido) AS nombre_completo, cp.fecha_pago
              FROM clientes AS c
              INNER JOIN personas AS p ON c.id_cliente = p.id_persona
              LEFT JOIN clientes_pagos AS cp ON c.id_cliente = cp.id_cliente
              ORDER BY cp.fecha_pago DESC";
              
    $result = $conn->query($query);

    $clientes = [];
    $hoy = new DateTime();

    while ($row = $result->fetch_assoc()) {
        $fecha_pago = new DateTime($row['fecha_pago']);
        $intervalo = $hoy->diff($fecha_pago)->days;
        $estado = 'pagado';

        if ($hoy > $fecha_pago) {
            $estado = 'vencido';
        } elseif ($intervalo <= 5) {
            $estado = 'cerca_de_vencer';
        }

        $clientes[] = [
            'id_cliente' => $row['id_cliente'],
            'nombre_completo' => $row['nombre_completo'],
            'fecha_pago' => $row['fecha_pago'],
            'estado' => $estado
        ];
    }

    echo json_encode(['clientes' => $clientes]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
}

$conn->close();
?>
