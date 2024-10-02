<?php 
include '../../../assets/database.php'; 

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['accion']) && $_POST['accion'] == 'registrar') {
            if (isset($_POST['ci'], $_POST['password'])) {
                $ci = $_POST['ci'];
                $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

                if (isset($conn) && $conn !== null) {
                    $stmt = $conn->prepare("INSERT INTO usuarios (CI, contrasena, id_rol) VALUES (?, ?, ?)");
                    if ($stmt) {
                        $id_rol = 0; 
                        $stmt->bind_param("ssi", $ci, $password, $id_rol);

                        if ($stmt->execute()) {
                            $personasStmt = $conn->prepare("INSERT INTO personas (id_persona) VALUES (?)");
                            $clientesStmt = $conn->prepare("INSERT INTO clientes (id_cliente, alertas, motivo_inscripcion) VALUES (?, 0, '')");

                            if ($personasStmt && $clientesStmt) {
                     
                                $personasStmt->bind_param("s", $ci);
                                $clientesStmt->bind_param("s", $ci);

                          
                                $personasInsert = $personasStmt->execute();
                                $clientesInsert = $clientesStmt->execute();

                               
                                if ($personasInsert && $clientesInsert) {
                                    echo json_encode(['status' => 'success', 'message' => 'Usuario registrado correctamente en todas las tablas']);
                                } else {
                                    $errorMsg = "Error al registrar en tablas adicionales: ";
                                    $errorMsg .= $personasInsert ? "" : "personas ";
                                    $errorMsg .= $clientesInsert ? "" : "clientes ";
                                    echo json_encode(['status' => 'error', 'message' => $errorMsg]);
                                }

                             
                                $personasStmt->close();
                                $clientesStmt->close();
                            } else {
                                echo json_encode(['status' => 'error', 'message' => 'Error al preparar las consultas para las tablas personas o clientes: ' . $conn->error]);
                            }
                        } else {
                            
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
