<?php
include('../../../assets/database.php');

$id_cliente = $_POST['id_cliente'];
$id_plan = $_POST['id_plan'];

$query = "INSERT INTO cliente_plan (id_cliente, id_plan) VALUES ('$id_cliente', '$id_plan')";
if (mysqli_query($conn, $query)) {
    echo "Plan asignado exitosamente.";
} else {
    echo "Error al asignar el plan: " . mysqli_error($conn);
}
?>
