<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
include('../../../assets/database.php'); 

session_start();


if (!isset($_SESSION['ci'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$ci = $_SESSION['ci'];
$id_evaluacion = $_GET['id_evaluacion'] ?? null;


if ($id_evaluacion === null) {
    $query = "SELECT e.id_evaluacion 
              FROM evaluaciones e 
              JOIN clientes_evaluaciones ce ON e.id_evaluacion = ce.id_evaluacion 
              WHERE ce.id_cliente = ? 
              ORDER BY e.id_evaluacion DESC 
              LIMIT 1";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $ci);
    $stmt->execute();
    $result = $stmt->get_result();
    $latest_eval = $result->fetch_assoc();

    if (!$latest_eval) {
        echo json_encode(['error' => 'No se encontraron evaluaciones']);
        exit;
    }
    
    $id_evaluacion = $latest_eval['id_evaluacion'];
}

$query = "SELECT cumplimiento_agenda, resistencia_anaerobica, resistencia_muscular, flexibilidad, resistencia_monotonia, resiliencia, nota AS nota_final 
          FROM evaluaciones 
          WHERE id_evaluacion = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param('i', $id_evaluacion);
$stmt->execute();
$result = $stmt->get_result();
$evaluacion = $result->fetch_assoc();

if (!$evaluacion) {
    echo json_encode(['error' => 'Evaluación no encontrada']);
    exit;
}

echo json_encode($evaluacion);
?>
