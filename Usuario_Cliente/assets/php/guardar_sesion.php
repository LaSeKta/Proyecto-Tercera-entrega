<?php
include('../../../assets/database.php');
session_start();

$ci = $_SESSION['ci']; 

$data = json_decode(file_get_contents("php://input"), true);
$fecha = $data['fecha'];
$hora_inicio = $data['hora_inicio'];
$hora_fin = $data['hora_fin'];
$entrenador_id = $data['entrenador_id'];

if (!$fecha || !$hora_inicio || !$hora_fin || !$entrenador_id || !$ci) {
    echo json_encode(["error" => "Todos los campos son obligatorios."]);
    exit;
}


$sql = "INSERT INTO sesiones (fecha, hora_inicio, hora_fin, asistencia) VALUES (?, ?, ?, 0)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $fecha, $hora_inicio, $hora_fin);

if ($stmt->execute()) {
    $session_id = $stmt->insert_id;

    $sql_cliente = "INSERT INTO clientes_sesiones (id_cliente, id_sesion) VALUES (?, ?)";
    $stmt_cliente = $conn->prepare($sql_cliente);
    $stmt_cliente->bind_param("si", $ci, $session_id);
    $stmt_cliente->execute();

    $sql_entrenador = "INSERT INTO entrenador_sesiones (id_entrenador, id_sesion) VALUES (?, ?)";
    $stmt_entrenador = $conn->prepare($sql_entrenador);
    $stmt_entrenador->bind_param("si", $entrenador_id, $session_id);
    $stmt_entrenador->execute();

    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Error al guardar la sesión."]);
}
?>
