<?php
include('../../../assets/database.php');

$data = json_decode(file_get_contents("php://input"), true);
$ci = $data['ci'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // Encriptar la contraseña

try {
    // Insertar en usuarios
    $queryUsuarios = "INSERT INTO usuarios (CI, contrasena, id_rol) VALUES (?, ?, 2)";
    $stmtUsuarios = $conn->prepare($queryUsuarios);
    $stmtUsuarios->bind_param("ss", $ci, $password);
    $stmtUsuarios->execute();

    // Insertar en personas
    $queryPersonas = "INSERT INTO personas (id_persona, nombre, apellido, email) VALUES (?, ?, ?, ?)";
    $stmtPersonas = $conn->prepare($queryPersonas);
    $stmtPersonas->bind_param("ssss", $ci, $nombre, $apellido, $email);
    $stmtPersonas->execute();

    // Insertar en entrenador
    $queryEntrenador = "INSERT INTO entrenador (id_entrenador) VALUES (?)";
    $stmtEntrenador = $conn->prepare($queryEntrenador);
    $stmtEntrenador->bind_param("s", $ci);
    $stmtEntrenador->execute();

    echo json_encode(["success" => true, "message" => "Entrenador registrado correctamente."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error al registrar el entrenador: " . $e->getMessage()]);
}

$conn->close();
?>
