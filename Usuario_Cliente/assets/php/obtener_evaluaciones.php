<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


include('../../../assets/database.php');
session_start();

error_reporting(E_ERROR | E_PARSE);

if (!isset($_SESSION['ci'])) {
    echo json_encode(["error" => "Usuario no autenticado"]);
    exit;
}

$ci = $_SESSION['ci'];

$query = "SELECT e.id_evaluacion, e.cumplimiento_agenda, e.resistencia_anaerobica, e.resistencia_muscular,
                 e.flexibilidad, e.resistencia_monotonia, e.resiliencia, e.nota as nota_final
          FROM clientes_evaluaciones ce
          JOIN evaluaciones e ON ce.id_evaluacion = e.id_evaluacion
          WHERE ce.id_cliente = '$ci'
          ORDER BY e.id_evaluacion DESC";
          
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode(["error" => "Error en la consulta de evaluaciones: " . mysqli_error($conn)]);
    exit;
}

$evaluaciones = [];
while ($row = mysqli_fetch_assoc($result)) {
    $evaluaciones[] = $row;
}

if (empty($evaluaciones)) {
    echo json_encode(["error" => "Evaluación no encontrada"]);
} else {
    echo json_encode($evaluaciones);
}
?>
