<?php
header('Content-Type: application/json');
include '../../../assets/database.php';

try {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $ci = $_POST['ci'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    // Insertar en la tabla usuarios
    $query_usuarios = "INSERT INTO usuarios (CI, contrasena, id_rol) VALUES (?, ?, 1)";
    $stmt = $conn->prepare($query_usuarios);
    $stmt->bind_param("ss", $ci, $password);
    $stmt->execute();
    
    // Insertar en la tabla personas
    $query_personas = "INSERT INTO personas (id_persona, nombre, apellido, email) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query_personas);
    $stmt->bind_param("ssss", $ci, $nombre, $apellido, $email);
    $stmt->execute();

    // Insertar en la tabla clientes
    $query_clientes = "INSERT INTO clientes (id_cliente, user_estado, alertas) VALUES (?, 1, '')";
    $stmt = $conn->prepare($query_clientes);
    $stmt->bind_param("s", $ci);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Cliente añadido exitosamente"]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
