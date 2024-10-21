<?php
// Ensure the correct headers for JSON response
header('Content-Type: application/json');

// Include database connection
include('../../../assets/database.php');

// Check if the POST variable is set
if (isset($_POST['ci'])) {
    $ci = $_POST['ci'];  // This is the id_persona (received as 'ci' from the JavaScript)

    // Prepare the SQL statement to activate the user by updating the id_estado in the clientes table
    $sql = "UPDATE clientes SET user_estado = 1 WHERE id_cliente = ?";  // Assuming id_cliente matches id_persona

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('i', $ci);  // Bind the user's ID (id_persona) as an integer

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Usuario activado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al activar el usuario']);
        }

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta: ' . $conn->error]);
    }

    $conn->close();  // Close the database connection
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos no válidos']);
}
?>
