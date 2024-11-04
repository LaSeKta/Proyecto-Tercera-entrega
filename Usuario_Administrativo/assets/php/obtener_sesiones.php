<?php
header('Content-Type: application/json');
include('../../../assets/database.php');

// Consulta para obtener sesiones con fecha, hora de inicio y hora de fin
$query = "SELECT id_sesion AS id, 
                 'Sesion de Entrenamiento' AS title, 
                 CONCAT(fecha, 'T', hora_inicio) AS start, 
                 CONCAT(fecha, 'T', hora_fin) AS end 
          FROM sesiones";
$result = mysqli_query($conn, $query);

$sessions = [];
while ($row = mysqli_fetch_assoc($result)) {
    $sessions[] = $row;
}

echo json_encode($sessions);
?>
