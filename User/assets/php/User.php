<?php
require_once '../../../assets/database.php'; // Asegúrate de que la ruta sea correcta

class User {
    private $id;
    private $ci;
    private $password;
    private $conn; // Conexión a la base de datos

    public function __construct($id = null, $ci = null, $password = null) {
        $this->id = $id;
        $this->ci = $ci;
        $this->password = $password;
        
        // Establece la conexión a la base de datos usando la clase Database
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getId() {
        return $this->id;
    }

    public function getCi() {
        return $this->ci;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setCi($ci) {
        $this->ci = $ci;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

 

