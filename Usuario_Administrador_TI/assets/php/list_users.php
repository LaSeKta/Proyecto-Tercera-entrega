<?php

header('Content-Type: application/json');


include('../../../assets/database.php');


if (!isset($conn) || $conn->connect_error) {
    echo json_encode(array("status" => "error", "message" => "Database connection failed: " . $conn->connect_error));
    exit;
}


$sql = "SELECT p.nombre, p.id_persona, u.id_rol, c.user_estado
FROM personas p
JOIN usuarios u ON p.id_persona = u.CI  
LEFT JOIN clientes c ON c.id_cliente = p.id_persona  
WHERE c.user_estado = 1 OR c.id_cliente IS NULL
;";  


$result = $conn->query($sql);

if (!$result) {
    echo json_encode(array("status" => "error", "message" => "Query failed: " . $conn->error));
    exit;
}


if ($result->num_rows > 0) {
    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;  
    }
    echo json_encode($users);  
} else {
    echo json_encode(array("status" => "error", "message" => "No users found"));
}

$conn->close();  
?>
