<?php
session_start();
include('../../../assets/database.php'); // Ajusta la ruta según tu estructura de carpetas

// Verifica si el usuario está autenticado
if (!isset($_SESSION['ci'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$ci = $_SESSION['ci'];

// Consulta para obtener el progreso más reciente del cliente
$query = "
    SELECT ce.id_cliente, e.nota AS progreso_actual
    FROM clientes_evaluaciones ce
    JOIN evaluaciones e ON ce.id_evaluacion = e.id_evaluacion
    WHERE ce.id_cliente = '$ci'
    ORDER BY ce.fecha_evaluacion DESC
    LIMIT 1
";

$result = mysqli_query($conn, $query);
$progreso = mysqli_fetch_assoc($result);

if (!$progreso) {
    echo json_encode(['error' => 'No se encontró progreso para este usuario']);
    exit;
}

echo json_encode($progreso);
?>
