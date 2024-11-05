<?php
session_start();
include('../../../assets/database.php');

if (!isset($_SESSION['ci'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_sesion'])) {
    echo json_encode(['error' => 'ID de sesión no proporcionado']);
    exit;
}

$id_sesion = $data['id_sesion'];

$query = "UPDATE sesiones SET asistencia = 1 WHERE id_sesion = ? AND asistencia = 0";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id_sesion);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'No se pudo registrar la asistencia o ya está marcada.']);
}

$stmt->close();
$conn->close();
?>
