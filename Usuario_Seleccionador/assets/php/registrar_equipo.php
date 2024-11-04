<?php
include('../../../assets/database.php');

$data = json_decode(file_get_contents("php://input"), true);
$nombre_equipo = $data['nombreEquipo'];
$deporte = $data['deporteEquipo'];
$tipo_actividad = $data['tipoActividad'];
$clientes = $data['clientes'];

try {
    // Insertar en la tabla equipos
    $queryEquipo = "INSERT INTO equipos (nombre_equipo, deporte, tipo_actividad) VALUES (?, ?, ?)";
    $stmtEquipo = $conn->prepare($queryEquipo);
    $stmtEquipo->bind_param("sss", $nombre_equipo, $deporte, $tipo_actividad);
    $stmtEquipo->execute();

    $id_equipo = $stmtEquipo->insert_id; // ID del equipo recién creado

    // Insertar en la tabla clientes_equipos
    $queryClienteEquipo = "INSERT INTO clientes_equipos (id_equipo, id_cliente) VALUES (?, ?)";
    $stmtClienteEquipo = $conn->prepare($queryClienteEquipo);

    foreach ($clientes as $id_cliente) {
        $stmtClienteEquipo->bind_param("is", $id_equipo, $id_cliente);
        $stmtClienteEquipo->execute();
    }

    echo json_encode(["success" => true, "message" => "Equipo registrado correctamente."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error al registrar el equipo: " . $e->getMessage()]);
}

$conn->close();
?>
