document.addEventListener("DOMContentLoaded", function () {
    console.log("Documento listo para gestionar equipos.");

    // Cargar clientes (id_rol=1) y deportes al cargar el formulario
    function cargarClientesYDeportes() {
        fetch('assets/php/obtener_clientes_deportes.php')
            .then(response => response.json())
            .then(data => {
                const clientesSelect = document.getElementById("clientesSelect");
                const deporteSelect = document.getElementById("deporteEquipo");

                // Limpiar opciones previas
                clientesSelect.innerHTML = '';
                deporteSelect.innerHTML = '';

                // Cargar clientes
                data.clientes.forEach(cliente => {
                    let option = document.createElement('option');
                    option.value = cliente.id_cliente;
                    option.textContent = cliente.nombre_completo;
                    clientesSelect.appendChild(option);
                });

                // Cargar deportes
                data.deportes.forEach(deporte => {
                    let option = document.createElement('option');
                    option.value = deporte.nombre;
                    option.textContent = deporte.nombre;
                    deporteSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error al cargar clientes y deportes:", error));
    }

    cargarClientesYDeportes();

    // Manejar el envío del formulario de equipo
    document.getElementById("equipoForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreEquipo = document.getElementById("nombreEquipo").value;
        const deporteEquipo = document.getElementById("deporteEquipo").value;
        const tipoActividad = document.getElementById("tipoActividad").value;
        const clientes = Array.from(document.getElementById("clientesSelect").selectedOptions).map(option => option.value);

        fetch('assets/php/registrar_equipo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreEquipo: nombreEquipo,
                deporteEquipo: deporteEquipo,
                tipoActividad: tipoActividad,
                clientes: clientes
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                document.getElementById("equipoForm").reset();
                // Opcional: recargar o actualizar la lista de equipos
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => console.error("Error en la solicitud:", error));
    });
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Documento listo para cargar evaluaciones de clientes.");

    function cargarEvaluaciones() {
        fetch('assets/php/obtener_evaluaciones.php')
            .then(response => response.json())
            .then(data => {
                const evolucionList = document.getElementById("evolucion-list");
                evolucionList.innerHTML = ''; // Limpiar contenido previo

                data.forEach(cliente => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${cliente.nombre_completo}</td>
                        <td>${cliente.ci}</td>
                        <td>${cliente.puntuacion_global}</td>
                        <td>${cliente.progreso_individual}</td>
                    `;
                    
                    evolucionList.appendChild(row);
                });
            })
            .catch(error => console.error("Error al cargar evaluaciones:", error));
    }

    cargarEvaluaciones();
});



document.addEventListener("DOMContentLoaded", function () {
    console.log("Documento listo para cargar equipos.");

    // Cargar equipos
    function cargarEquipos() {
        fetch('assets/php/obtener_equipos.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error("Error en la respuesta del servidor:", data.error);
                    return;
                }

                const equiposList = document.getElementById("equipos-list");
                equiposList.innerHTML = ""; // Limpia la lista antes de cargar los equipos

                data.forEach(equipo => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${equipo.nombre_equipo}</td>
                        <td>${equipo.deporte}</td>
                        <td>${equipo.tipo_actividad}</td>
                        <td>${equipo.deportistas || "N/A"}</td>
                        <td><button onclick="eliminarEquipo(${equipo.id_equipo})" title="Eliminar"><span>🗑️</span></button></td>
                    `;

                    equiposList.appendChild(row);
                });
            })
            .catch(error => console.error("Error al cargar equipos:", error));
    }

    cargarEquipos();

    // Función para eliminar un equipo
    window.eliminarEquipo = function (idEquipo) {
        if (confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
            fetch('assets/php/eliminar_equipo.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_equipo: idEquipo })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Equipo eliminado exitosamente.");
                    cargarEquipos(); // Recargar la lista de equipos
                } else {
                    alert("Error al eliminar el equipo: " + data.message);
                }
            })
            .catch(error => console.error("Error en la solicitud:", error));
        }
    };
});
