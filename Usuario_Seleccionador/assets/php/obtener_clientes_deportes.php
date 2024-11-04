<?php
include('../../../assets/database.php');

try {
    // Obtener clientes con id_rol=1
    $clientesQuery = "SELECT clientes.id_cliente, CONCAT(personas.nombre, ' ', personas.apellido) AS nombre_completo 
                      FROM clientes
                      INNER JOIN personas ON clientes.id_cliente = personas.id_persona
                      INNER JOIN usuarios ON personas.id_persona = usuarios.CI
                      WHERE usuarios.id_rol = 1";
    $clientesResult = $conn->query($clientesQuery);

    $clientes = [];
    while ($row = $clientesResult->fetch_assoc()) {
        $clientes[] = $row;
    }

    // Obtener deportes
    $deportesQuery = "SELECT nombre FROM deportes";
    $deportesResult = $conn->query($deportesQuery);

    $deportes = [];
    while ($row = $deportesResult->fetch_assoc()) {
        $deportes[] = $row;
    }

    echo json_encode(["clientes" => $clientes, "deportes" => $deportes]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>
