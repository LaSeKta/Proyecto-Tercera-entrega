<?php
// Ensure the correct headers for JSON response
header('Content-Type: application/json');

// Include database connection
include('../../../assets/database.php');

// Check if the POST variable is set
if (isset($_POST['ci'])) {
    $ci = $_POST['ci'];  // Get the user's ID (or CI)

    // Prepare the SQL statement to deactivate the user (soft delete by setting active = 0)
    $sql = "UPDATE clientes SET user_estado = 0 WHERE id_cliente = ?";  // Assuming 'active' is the column for deactivation

    // Prepare the query and bind parameters
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('i', $ci);  // 'i' for integer type
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Usuario desactivado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al desactivar el usuario']);
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
