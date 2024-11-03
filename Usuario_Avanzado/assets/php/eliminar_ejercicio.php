<?php
include('../../../assets/database.php');

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    
    $query = "DELETE FROM ejercicios WHERE id_ejercicio = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Ejercicio eliminado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar ejercicio.']);
    }
}
?>
