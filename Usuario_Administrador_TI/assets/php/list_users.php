<?php
// Asegúrate de que no haya salida anterior al inicio del script PHP
header('Content-Type: application/json');

// Incluir archivo de conexión a la base de datos
include('../../../assets/database.php');

// Verificar si la conexión se ha establecido correctamente
if (!isset($conn) || $conn->connect_error) {
    echo json_encode(array("status" => "error", "message" => "Error del servidor: No se pudo establecer la conexión a la base de datos."));
    exit;
}

// Ejecutar la consulta SQL
$sql = "SELECT * FROM personas";
$result = $conn->query($sql);

// Verificar si la consulta fue exitosa
if (!$result) {
    echo json_encode(array("status" => "error", "message" => "Error en la consulta SQL: " . $conn->error));
    exit;
}

// Verificar si hay resultados
if ($result->num_rows > 0) {
    $users = array();
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    // Devolver los datos en formato JSON
    echo json_encode($users);
} else {
    echo json_encode(array("status" => "error", "message" => "No se encontraron registros en la tabla personas."));
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
