<?php
include('../../../assets/database.php');

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    
    $query = "SELECT id_ejercicio as id, nombre, tipo, descripcion FROM ejercicios WHERE id_ejercicio = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $ejercicio = $result->fetch_assoc();

    echo json_encode($ejercicio);
}
?>
