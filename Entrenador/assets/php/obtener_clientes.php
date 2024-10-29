<?php
header('Content-Type: application/json');
include('../../../assets/database.php');

// Habilita el reporte de errores
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); 

try {
    // Consulta para obtener los clientes con sus nombres
    $query = "SELECT clientes.id_cliente, CONCAT(personas.nombre, ' ', personas.apellido) AS nombre
              FROM clientes
              JOIN personas ON clientes.id_cliente = personas.id_persona";
    
    $result = mysqli_query($conn, $query);

    $clientes = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $clientes[] = $row;
    }

    echo json_encode($clientes, JSON_PRETTY_PRINT); // Devuelve el JSON
} catch (Exception $e) {
    // En caso de error, devuelve el mensaje en formato JSON
    echo json_encode(["error" => $e->getMessage()]);
}
?>
