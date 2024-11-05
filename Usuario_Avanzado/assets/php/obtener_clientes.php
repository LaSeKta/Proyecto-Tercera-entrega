<?php
header('Content-Type: application/json');
include '../../../assets/database.php';

try {
    $query = "SELECT p.nombre, p.apellido, p.id_persona AS ci 
              FROM personas p
              JOIN clientes c ON p.id_persona = c.id_cliente";
    $result = $conn->query($query);

    $clientes = [];
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
    echo json_encode($clientes);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
