<?php

header('Content-Type: application/json');

include('../../../assets/database.php');


if (isset($_POST['ci'])) {
    $ci = $_POST['ci']; 

    
    $sql = "UPDATE clientes SET user_estado = 0 WHERE id_cliente = ?";  


    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('i', $ci); 
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Usuario desactivado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al desactivar el usuario']);
        }
        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta: ' . $conn->error]);
    }

    $conn->close();  
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos no válidos']);
}
?>
