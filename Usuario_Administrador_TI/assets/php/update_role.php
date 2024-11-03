<?php
header('Content-Type: application/json');
include('../../../assets/database.php');

if (isset($_POST['ci']) && isset($_POST['id_rol'])) {
    $ci = $_POST['ci'];
    $id_rol = $_POST['id_rol'];

    $sql = "UPDATE usuarios SET id_rol = ? WHERE CI = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('ii', $id_rol, $ci);
        if ($stmt->execute()) {

            if ($id_rol == 1 || $id_rol == 2) {
                $updateClientesSql = "INSERT INTO clientes (user_estado, id_cliente) VALUES (?, ?)";
                if ($stmt2 = $conn->prepare($updateClientesSql)) {
                    $newUserStatus = 1;
                    $stmt2->bind_param('ii', $newUserStatus, $ci);
                    if ($stmt2->execute()) {
                        echo json_encode(['status' => 'success', 'message' => 'Rol y estado del usuario actualizados correctamente']);
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el estado en la tabla personas']);
                    }
                    $stmt2->close();
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta para actualizar personas: ' . $conn->error]);
                }
            } elseif ($id_rol == 3) {
                $insertEntrenadorSql = "INSERT INTO entrenador (id_entrenador) VALUES (?)";
                if ($stmt3 = $conn->prepare($insertEntrenadorSql)) {
                    $stmt3->bind_param('i', $ci);
                    if ($stmt3->execute()) {
                        echo json_encode(['status' => 'success', 'message' => 'Usuario asignado como entrenador correctamente']);
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Error al insertar en la tabla entrenador']);
                    }
                    $stmt3->close();
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta para insertar en entrenador: ' . $conn->error]);
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

    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos no válidos']);
}
?>
