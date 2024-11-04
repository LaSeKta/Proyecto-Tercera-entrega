<?php
include('../../../assets/database.php');

try {
    $query = "SELECT personas.nombre, personas.apellido, personas.email 
              FROM entrenador 
              INNER JOIN personas ON entrenador.id_entrenador = personas.id_persona";
    $result = $conn->query($query);

    $entrenadores = [];
    while ($row = $result->fetch_assoc()) {
        $entrenadores[] = $row;
    }

    echo json_encode(["success" => true, "entrenadores" => $entrenadores]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error al obtener entrenadores: " . $e->getMessage()]);
}

$conn->close();
?>
