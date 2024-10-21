<?php
// Ensure the correct headers for JSON response
header('Content-Type: application/json');

// Include database connection
include('../../../assets/database.php');

// Query for deactivated users (user_estado = 0)
$sql = "SELECT p.nombre, p.id_persona, u.id_rol 
        FROM personas p
        JOIN usuarios u ON p.id_persona = u.ci
        JOIN clientes c ON c.id_cliente = p.id_persona
        WHERE c.user_estado = 0";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(array("status" => "error", "message" => "Query failed: " . $conn->error));
    exit;
}

$users = array();
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);

$conn->close();
?>
