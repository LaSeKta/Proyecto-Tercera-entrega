<?php
header('Content-Type: application/json');

include '../../../assets/database.php';

try {
    if ($conn->connect_error) {
        throw new Exception("Error en la conexión: " . $conn->connect_error);
    }

    $clientesQuery = "SELECT id_cliente, CONCAT(personas.nombre, ' ', personas.apellido) AS nombre_completo 
                      FROM clientes 
                      INNER JOIN personas ON clientes.id_cliente = personas.id_persona";
    $clientesResult = $conn->query($clientesQuery);

    if (!$clientesResult) {
        throw new Exception("Error en la consulta de clientes: " . $conn->error);
    }

    $clientes = [];
    while ($row = $clientesResult->fetch_assoc()) {
        $clientes[] = $row;
    }

    $entrenadoresQuery = "SELECT id_entrenador, CONCAT(personas.nombre, ' ', personas.apellido) AS nombre_completo 
                          FROM entrenador 
                          INNER JOIN personas ON entrenador.id_entrenador = personas.id_persona";
    $entrenadoresResult = $conn->query($entrenadoresQuery);

    if (!$entrenadoresResult) {
        throw new Exception("Error en la consulta de entrenadores: " . $conn->error);
    }

    $entrenadores = [];
    while ($row = $entrenadoresResult->fetch_assoc()) {
        $entrenadores[] = $row;
    }

    echo json_encode(['clientes' => $clientes, 'entrenadores' => $entrenadores]);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

$conn->close();
?>
