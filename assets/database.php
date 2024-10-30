
<?php

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'sekta';

$mysqli = new mysqli($host, $user, $pass, $db);
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}
?>