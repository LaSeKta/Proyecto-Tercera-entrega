<?php
require_once '../../../assets/database.php'; // Asegúrate de que este archivo defina correctamente $mysqli

class Persona {
    private $ci;
    private $nombre;
    private $apellido;
    private $email;
    private $telefono;

    public function __construct($ci, $nombre, $apellido, $email, $telefono) {
        $this->ci = $ci;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->email = $email;
        $this->telefono = $telefono;
    }

    // Método para actualizar o insertar los datos de la persona
    public function save() {
        global $mysqli;

        // Consulta para verificar si la persona ya existe
        $checkQuery = $mysqli->prepare("SELECT id_persona FROM personas WHERE id_persona = ?");
        $checkQuery->bind_param("s", $this->ci);
        $checkQuery->execute();
        $checkQuery->store_result();

        if ($checkQuery->num_rows > 0) {
            // Si la persona ya existe, actualizamos sus datos
            $stmt = $mysqli->prepare("UPDATE personas SET nombre = ?, apellido = ?, email = ?, telefono = ? WHERE id_persona = ?");
            $stmt->bind_param("sssss", $this->nombre, $this->apellido, $this->email, $this->telefono, $this->ci);
        } else {
            // Si no existe, insertamos una nueva persona
            $stmt = $mysqli->prepare("INSERT INTO personas (id_persona, nombre, apellido, email, telefono) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $this->ci, $this->nombre, $this->apellido, $this->email, $this->telefono);
        }

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'Datos guardados correctamente'];
        } else {
            return ['status' => 'error', 'message' => 'Error al guardar los datos'];
        }
    }
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtener los datos del formulario
        $ci = $_SESSION['ci']; // Suponiendo que el CI está guardado en la sesión
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];

        // Crear un objeto de la clase Persona
        $persona = new Persona($ci, $nombre, $apellido, $email, $telefono);

        // Guardar la persona
        $result = $persona->save();

        // Devolver la respuesta en formato JSON
        echo json_encode($result);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error del servidor: ' . $e->getMessage()]);
}
?>
