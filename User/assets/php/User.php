<?php
require_once '../../../assets/database.php'; 

class User {
    private $ci;
    private $password;
    private $id_rol;
    private $nombre;
    private $apellido;
    private $email;

    
    public function __construct($ci, $password, $nombre = null, $apellido = null, $email = null) {
        $this->ci = $ci;
        $this->password = $password; 
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->email = $email;
    }

    public function getCi() {
        return $this->ci;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getIdRol() {
        return $this->id_rol;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getApellido() {
        return $this->apellido;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setCi($ci) {
        $this->ci = $ci;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function setApellido($apellido) {
        $this->apellido = $apellido;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

   
    public function register() {
        global $mysqli;

        
        if (!$this->nombre || !$this->apellido || !$this->email) {
            return ['status' => 'error', 'message' => 'Faltan datos para registrar el usuario'];
        }

       
        $query = $mysqli->prepare("SELECT CI FROM usuarios WHERE CI = ?");
        $query->bind_param("s", $this->ci);
        $query->execute();
        $query->store_result();

        if ($query->num_rows > 0) {
            return ['status' => 'error', 'message' => 'El usuario ya está registrado'];
        }

        $hashedPassword = password_hash($this->password, PASSWORD_BCRYPT);

       
        $mysqli->begin_transaction();

        try {
           
            $stmt = $mysqli->prepare("INSERT INTO usuarios (CI, contrasena, id_rol) VALUES (?, ?, ?)");
            $id_rol = 0;
            $stmt->bind_param("ssi", $this->ci, $hashedPassword, $id_rol);

            if (!$stmt->execute()) {
                throw new Exception('Error al registrar el usuario');
            }

      
            $stmt_personas = $mysqli->prepare("INSERT INTO personas (id_persona, nombre, apellido, email) VALUES (?, ?, ?, ?)");
            $stmt_personas->bind_param("ssss", $this->ci, $this->nombre, $this->apellido, $this->email);

            if (!$stmt_personas->execute()) {
                throw new Exception('Error al registrar los datos de la persona');
            }

         
            $mysqli->commit();
            return ['status' => 'success', 'message' => 'Usuario registrado correctamente'];

        } catch (Exception $e) {
     
            $mysqli->rollback();
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

   
    public function authenticate() {
        global $mysqli;

      
        $query = $mysqli->prepare("SELECT contrasena, id_rol FROM usuarios WHERE CI = ?");
        $query->bind_param('s', $this->ci);
        $query->execute();
        $query->store_result();

        if ($query->num_rows > 0) {
            $query->bind_result($hashedPassword, $this->id_rol);
            $query->fetch();

           
            if (password_verify($this->password, $hashedPassword)) {
                return true; 
            } else {
                return false; 
            }
        } else {
            return false; 
        }
    }
}
?>
