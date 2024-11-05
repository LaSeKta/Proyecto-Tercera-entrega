document.addEventListener("DOMContentLoaded", function() {
    const deportesList = document.getElementById("deportes-list");
    const deporteForm = document.getElementById("deporte-form");
    const nombreDeporteInput = document.getElementById("nombre-deporte");
    const tipoDeporteInput = document.getElementById("tipo-deporte");
    const descripcionDeporteInput = document.getElementById("descripcion-deporte");
    const agregarDeporteBtn = document.getElementById("agregar-deporte-btn");
    let editingDeporteId = null;

    cargarDeportes();

    function cargarDeportes() {
        fetch("assets/php/listar_deportes.php")
            .then(response => response.json())
            .then(data => {
                deportesList.innerHTML = "";
                data.forEach(deporte => {
                    const li = document.createElement("li");
                    li.textContent = `${deporte.nombre} (${deporte.tipo})`;
                    li.dataset.id = deporte.id_deporte; 
                    li.addEventListener("click", () => cargarDeporteEnFormulario(deporte));
                    deportesList.appendChild(li);
                });
            })
            .catch(error => console.error("Error cargando deportes:", error));
    }

    function cargarDeporteEnFormulario(deporte) {
        nombreDeporteInput.value = deporte.nombre;
        tipoDeporteInput.value = deporte.tipo;
        descripcionDeporteInput.value = deporte.descripcion;
        editingDeporteId = deporte.id_deporte; 
        agregarDeporteBtn.textContent = "Modificar Deporte";
    }

    deporteForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = nombreDeporteInput.value.trim();
        const tipo = tipoDeporteInput.value.trim();
        const descripcion = descripcionDeporteInput.value.trim();

        if (!nombre || !tipo || !descripcion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("tipo", tipo);
        formData.append("descripcion", descripcion);

        if (editingDeporteId) {
            formData.append("id", editingDeporteId); 
            fetch("assets/php/modificar_deporte.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Deporte modificado con éxito.");
                    cargarDeportes();
                    deporteForm.reset();
                    agregarDeporteBtn.textContent = "Guardar Deporte";
                    editingDeporteId = null;
                } else {
                    alert(data.message || "Error al modificar el deporte.");
                }
            })
            .catch(error => console.error("Error modificando deporte:", error));
        } else {
            fetch("assets/php/crear_deporte.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Deporte añadido con éxito.");
                    cargarDeportes();
                    deporteForm.reset();
                } else {
                    alert(data.message || "Error al añadir el deporte.");
                }
            })
            .catch(error => console.error("Error añadiendo deporte:", error));
        }
    });

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
                } else {
                    alert(data.message || "Error al eliminar el deporte.");
                }
            })
            .catch(error => console.error("Error eliminando deporte:", error));
        }
    });
});
