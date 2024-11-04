<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
include('../../../assets/database.php');

if (isset($_POST['ci']) && isset($_POST['id_rol'])) {
    $ci = $_POST['ci'];
    $id_rol = $_POST['id_rol'];

    // Actualizar rol en la tabla usuarios
    $sql = "UPDATE usuarios SET id_rol = ? WHERE CI = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('ii', $id_rol, $ci);
        if ($stmt->execute()) {

            if ($id_rol == 1 || $id_rol == 2) {
                // Verificar si el CI existe en la tabla clientes
                $checkClientSql = "SELECT 1 FROM clientes WHERE id_cliente = ?";
                if ($stmtCheck = $conn->prepare($checkClientSql)) {
                    $stmtCheck->bind_param('i', $ci);
                    $stmtCheck->execute();
                    $stmtCheck->store_result();

                    if ($stmtCheck->num_rows > 0) {
                        // El usuario ya existe en clientes, solo se actualizó su rol en usuarios
                        echo json_encode(['status' => 'success', 'message' => 'Rol actualizado correctamente. Usuario ya registrado como cliente.']);
                    } else {
                        // Insertar en clientes ya que no existe
                        $stmtCheck->close();

                        $insertClientSql = "INSERT INTO clientes (user_estado, id_cliente) VALUES (?, ?)";
                        if ($stmt2 = $conn->prepare($insertClientSql)) {
                            $newUserStatus = 1;
                            $stmt2->bind_param('ii', $newUserStatus, $ci);
                            if ($stmt2->execute()) {
                                echo json_encode(['status' => 'success', 'message' => 'Usuario registrado como cliente con estado actualizado a 1']);
                            } else {
                                echo json_encode([
                                    'status' => 'error',
                                    'message' => 'Error al registrar el usuario como cliente',
                                    'error_detail' => $conn->error
                                ]);
                            }
                            $stmt2->close();
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'message' => 'Error en la preparación de la consulta para registrar cliente',
                                'error_detail' => $conn->error
                            ]);
                        }
                    }
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Error al verificar existencia en clientes',
                        'error_detail' => $conn->error
                    ]);
                }
            } elseif ($id_rol == 3) {
                // Insertar en la tabla entrenador si el rol es de entrenador
                $insertTrainerSql = "INSERT INTO entrenador (id_entrenador) VALUES (?)";
                if ($stmt3 = $conn->prepare($insertTrainerSql)) {
                    $stmt3->bind_param('i', $ci);
                    if ($stmt3->execute()) {
                        echo json_encode(['status' => 'success', 'message' => 'Usuario asignado como entrenador correctamente']);
                    } else {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Error al insertar en la tabla entrenador',
                            'error_detail' => $conn->error
                        ]);
                    }
                    $stmt3->close();
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Error en la preparación de la consulta para insertar en entrenador',
                        'error_detail' => $conn->error
                    ]);
                }
            } else {
                echo json_encode(['status' => 'success', 'message' => 'Rol actualizado correctamente']);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Error al actualizar el rol',
                'error_detail' => $conn->error
            ]);
        }
        $stmt->close();
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error en la preparación de la consulta',
            'error_detail' => $conn->error
        ]);
    }

    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos no válidos']);
}
?>
