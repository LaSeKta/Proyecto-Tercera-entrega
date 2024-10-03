<?php
require_once '../../../assets/database.php'; // Asegúrate de que este archivo defina correctamente la conexión $mysqli

class User {
    private $ci;
    private $password;
    private $id_rol;

    public function __construct($ci, $password) {
        $this->ci = $ci;
        $this->password = $password; // Almacenar la contraseña sin hashear para la autenticación
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

    public function setCi($ci) {
        $this->ci = $ci;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    // Método para registrar un usuario
    public function register() {
        global $mysqli;

        // Verificar si el usuario ya está registrado
        $query = $mysqli->prepare("SELECT CI FROM usuarios WHERE CI = ?");
        $query->bind_param("s", $this->ci);
        $query->execute();
        $query->store_result();

        if ($query->num_rows > 0) {
            return ['status' => 'error', 'message' => 'El usuario ya está registrado'];
        }

        // Hashear la contraseña antes de almacenarla
        $hashedPassword = password_hash($this->password, PASSWORD_BCRYPT);

        // Registrar el usuario en la tabla de usuarios
        $stmt = $mysqli->prepare("INSERT INTO usuarios (CI, contrasena, id_rol) VALUES (?, ?, ?)");
        $id_rol = 0;
        $stmt->bind_param("ssi", $this->ci, $hashedPassword, $id_rol);

        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'Usuario registrado correctamente'];
        } else {
            return ['status' => 'error', 'message' => 'Error al registrar el usuario'];
        }
    }

    // Método para autenticar un usuario
    public function authenticate() {
        global $mysqli;

        // Consulta para verificar el usuario por CI y obtener el rol
        $query = $mysqli->prepare("SELECT contrasena, id_rol FROM usuarios WHERE CI = ?");
        $query->bind_param('s', $this->ci);
        $query->execute();
        $query->store_result();

        if ($query->num_rows > 0) {
            $query->bind_result($hashedPassword, $this->id_rol);
            $query->fetch();

            // Verificar la contraseña usando password_verify
            if (password_verify($this->password, $hashedPassword)) {
                return true; // Autenticación exitosa
            } else {
                return false; // Contraseña incorrecta
            }
        } else {
            return false; // Usuario no encontrado
        }
    }
}
?>
