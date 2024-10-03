
<?php

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'sekta';

$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_error) {
    die('Error de conexión (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
