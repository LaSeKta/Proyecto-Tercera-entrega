<?php
include '../../../assets/database.php'; // Asegúrate de que este archivo define correctamente $conn

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['accion']) && $_POST['accion'] == 'registrar') {
            if (isset($_POST['ci'], $_POST['password'])) {
                $ci = $_POST['ci'];
                $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Asegura el hash de la contraseña

                // Verificar conexión a la base de datos
                if (isset($conn) && $conn !== null) {
                    // Insertar en la tabla usuarios
                    $stmt = $conn->prepare("INSERT INTO usuarios (CI, contrasena, id_rol) VALUES (?, ?, ?)");
                    if ($stmt) {
                        // Supongamos que id_rol se proporciona o se establece por defecto (ej. 0)
                        $id_rol = 0; // Cambia este valor según lo que corresponda a la lógica de tu aplicación
                        $stmt->bind_param("ssi", $ci, $password, $id_rol);

                        if ($stmt->execute()) {
                            // Inserciones adicionales en las otras tablas
                            $personasStmt = $conn->prepare("INSERT INTO personas (id_persona) VALUES (?)");
                            $clientesStmt = $conn->prepare("INSERT INTO clientes (id_cliente, alertas, motivo_inscripcion) VALUES (?, 0, '')");
                            $entrenadoresStmt = $conn->prepare("INSERT INTO entrenador (id_entrenador) VALUES (?)"); // Asegúrate de que esta tabla exista

                            if ($personasStmt && $clientesStmt && $entrenadoresStmt) {
                                // Insertar el CI en las tablas personas, clientes y entrenadores
                                $personasStmt->bind_param("s", $ci);
                                $clientesStmt->bind_param("s", $ci);
                                $entrenadoresStmt->bind_param("s", $ci);

                                // Ejecutar las inserciones
                                $personasInsert = $personasStmt->execute();
                                $clientesInsert = $clientesStmt->execute();
                                $entrenadoresInsert = $entrenadoresStmt->execute();

                                // Verificar que todas las inserciones fueron exitosas
                                if ($personasInsert && $clientesInsert && $entrenadoresInsert) {
                                    echo json_encode(['status' => 'success', 'message' => 'Usuario registrado correctamente en todas las tablas']);
                                } else {
                                    $errorMsg = "Error al registrar en tablas adicionales: ";
                                    $errorMsg .= $personasInsert ? "" : "personas ";
                                    $errorMsg .= $clientesInsert ? "" : "clientes ";
                                    $errorMsg .= $entrenadoresInsert ? "" : "entrenadores ";
                                    echo json_encode(['status' => 'error', 'message' => $errorMsg]);
                                }

                                // Cerrar los statements
                                $personasStmt->close();
                                $clientesStmt->close();
                                $entrenadoresStmt->close();
                            } else {
                                echo json_encode(['status' => 'error', 'message' => 'Error al preparar las consultas para las tablas personas, clientes o entrenadores: ' . $conn->error]);
                            }
                        } else {
                            // Mostrar el error específico de la ejecución del statement
                            echo json_encode(['status' => 'error', 'message' => 'Error al registrar usuario en la tabla usuarios: ' . $stmt->error]);
                        }

                        $stmt->close();
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta para la tabla usuarios: ' . $conn->error]);
                    }
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error en la conexión a la base de datos']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Faltan datos para registrar al usuario']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Acción no válida']);
        }
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error del servidor: ' . $e->getMessage()]);
}
?>
