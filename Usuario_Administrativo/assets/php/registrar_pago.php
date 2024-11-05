<?php
include('../../../assets/database.php');
$data = json_decode(file_get_contents("php://input"), true);

$id_cliente = $data['id_cliente'];
$mes_pago = $data['mes_pago'];

if (!$id_cliente || !$mes_pago) {
    echo json_encode(["success" => false, "message" => "Faltan datos necesarios para registrar el pago."]);
    exit;
}

try {
    $queryPago = "INSERT INTO pagos () VALUES ()";
    if ($conn->query($queryPago) === TRUE) {
        $id_pago = $conn->insert_id; 

        $fecha_pago = date('Y-m-d'); 
        $queryClientePago = "INSERT INTO clientes_pagos (id_cliente, id_pago, fecha_pago) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($queryClientePago);
        $stmt->bind_param("sis", $id_cliente, $id_pago, $fecha_pago);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Pago registrado correctamente para el mes $mes_pago."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al registrar el pago en clientes_pagos: " . $stmt->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error al insertar el pago: " . $conn->error]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}

$conn->close();
