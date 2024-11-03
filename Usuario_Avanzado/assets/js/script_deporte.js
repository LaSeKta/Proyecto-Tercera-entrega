document.addEventListener("DOMContentLoaded", function() {
    const deportesList = document.getElementById("deportes-list");
    const deporteForm = document.getElementById("deporte-form");
    const nombreDeporteInput = document.getElementById("nombre-deporte");
    const tipoDeporteInput = document.getElementById("tipo-deporte");
    const descripcionDeporteInput = document.getElementById("descripcion-deporte");
    const agregarDeporteBtn = document.getElementById("agregar-deporte-btn");
    let editingDeporteId = null;

    // Cargar deportes al inicio
    cargarDeportes();

    // Función para cargar deportes en la lista
    function cargarDeportes() {
        fetch("assets/php/listar_deportes.php") // Cambia la ruta según tu archivo PHP
            .then(response => response.json())
            .then(data => {
                deportesList.innerHTML = "";
                data.forEach(deporte => {
                    const li = document.createElement("li");
                    li.textContent = `${deporte.nombre} (${deporte.tipo})`;
                    li.dataset.id = deporte.id_deporte; // Guardar el ID en el dataset
                    li.addEventListener("click", () => cargarDeporteEnFormulario(deporte));
                    deportesList.appendChild(li);
                });
            })
            .catch(error => console.error("Error cargando deportes:", error));
    }

    // Función para cargar el deporte en el formulario
    function cargarDeporteEnFormulario(deporte) {
        nombreDeporteInput.value = deporte.nombre;
        tipoDeporteInput.value = deporte.tipo;
        descripcionDeporteInput.value = deporte.descripcion;
        editingDeporteId = deporte.id_deporte; // Guardar el ID para edición
        agregarDeporteBtn.textContent = "Modificar Deporte";
    }

    // Enviar formulario para añadir o modificar deporte
    deporteForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = nombreDeporteInput.value;
        const tipo = tipoDeporteInput.value;
        const descripcion = descripcionDeporteInput.value;

        if (editingDeporteId) {
            // Modificar deporte existente
            fetch("assets/php/modificar_deporte.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingDeporteId, nombre, tipo, descripcion })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Deporte modificado con éxito.");
                    cargarDeportes();
                    deporteForm.reset();
                    agregarDeporteBtn.textContent = "Guardar Deporte";
                    editingDeporteId = null;
                }
            })
            .catch(error => console.error("Error modificando deporte:", error));
        } else {
            // Añadir nuevo deporte
            fetch("assets/php/agregar_deporte.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, tipo, descripcion })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Deporte añadido con éxito.");
                    cargarDeportes();
                    deporteForm.reset();
                }
            })
            .catch(error => console.error("Error añadiendo deporte:", error));
        }
    });

    // Botón de eliminar
    document.getElementById("eliminar-deporte-btn").addEventListener("click", function() {
        if (editingDeporteId && confirm("¿Seguro que deseas eliminar este deporte?")) {
            fetch("assets/php/eliminar_deporte.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingDeporteId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Deporte eliminado con éxito.");
                    cargarDeportes();
                    deporteForm.reset();
                    agregarDeporteBtn.textContent = "Guardar Deporte";
                    editingDeporteId = null;
                }
            })
            .catch(error => console.error("Error eliminando deporte:", error));
        }
    });
});
