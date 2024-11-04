<?php
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../../../assets/database.php';

try {
    // Verifica si la conexión fue exitosa
    if ($conn->connect_error) {
        throw new Exception("Error en la conexión: " . $conn->connect_error);
    }

    // Consulta para obtener clientes
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

    echo json_encode(['clientes' => $clientes]);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

$conn->close();
