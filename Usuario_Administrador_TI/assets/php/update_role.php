<?php
// Ensure the correct headers for JSON response
header('Content-Type: application/json');

// Include database connection
include('../../../assets/database.php');

// Check if the POST variables are set
if (isset($_POST['ci']) && isset($_POST['id_rol'])) {
    $ci = $_POST['ci'];       // This is the id_persona (received as 'ci' from the JavaScript)
    $id_rol = $_POST['id_rol']; // New role to be assigned

    // Prepare the SQL statement to update the id_rol in the usuarios table
    $sql = "UPDATE usuarios SET id_rol = ? WHERE CI = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('ii', $id_rol, $ci);  // 'ii' means two integer parameters
        if ($stmt->execute()) {
            // If id_rol changes to 2, update the personas table (for example, updating user_estado)
            if ($id_rol == 1 || $id_rol == 2 || $id_rol == 3 || $id_rol == 4 || $id_rol == 5) {
                // Additional SQL to update personas table when id_rol changes to 2
                $updateClientesSql = "INSERT INTO clientes (user_estado, id_cliente) VALUES (?, ?)";
                if ($stmt2 = $conn->prepare($updateClientesSql)) {
                    $newUserStatus = 1;  // Define the new status value you want to set
                    $stmt2->bind_param('ii', $newUserStatus, $ci);  // Assuming id_cliente matches the id_persona
                    if ($stmt2->execute()) {
                        echo json_encode(['status' => 'success', 'message' => 'Rol y estado del usuario actualizados correctamente']);
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el estado en la tabla personas']);
                    }
                    $stmt2->close();
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta para actualizar personas: ' . $conn->error]);
                }
            } else {
                echo json_encode(['status' => 'success', 'message' => 'Rol actualizado correctamente']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el rol']);
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
