<?php
require_once '../../../assets/database.php'; // Asegúrate de que este archivo defina correctamente la conexión $mysqli

class User {
    private $ci;
    private $password;
    private $id_rol; // Añadir la propiedad id_rol

    public function __construct($ci, $password) {
        $this->ci = $ci;
        $this->password = $password;
    }

    public function getCi() {
        return $this->ci;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getIdRol() {
        return $this->id_rol; // Getter para obtener el rol del usuario
    }

    public function setCi($ci) {
        $this->ci = $ci;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    // Método para autenticar el usuario
    public function authenticate() {
        global $mysqli;

        // Consulta para verificar el usuario por CI y obtener también el id_rol
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
