<?php
// Ensure the correct headers for JSON response
header('Content-Type: application/json');

// Include database connection
include('../../../assets/database.php');

// Check the database connection
if (!isset($conn) || $conn->connect_error) {
    echo json_encode(array("status" => "error", "message" => "Database connection failed: " . $conn->connect_error));
    exit;
}

// SQL query to join personas and clientes tables and exclude users with user_estado = 0
$sql = "SELECT p.nombre, p.id_persona, u.id_rol, c.user_estado
FROM personas p
JOIN usuarios u ON p.id_persona = u.CI  -- Assuming CI is linked to id_persona
LEFT JOIN clientes c ON c.id_cliente = p.id_persona  -- Left join to include records not in clientes
WHERE c.user_estado = 1 OR c.id_cliente IS NULL
;";  // Exclude users with user_estado = 0

// Execute the query and check for errors
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(array("status" => "error", "message" => "Query failed: " . $conn->error));
    exit;
}

// Check if rows were returned
if ($result->num_rows > 0) {
    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;  // Store the data in an array
    }
    echo json_encode($users);  // Output the data as JSON
} else {
    echo json_encode(array("status" => "error", "message" => "No users found"));
}

$conn->close();  // Close the database connection
?>
