
// Manejo del formulario de Formación de Equipos
document.getElementById('equipo-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario de Equipo
    const equipoSeleccionado = document.getElementById('equipo-select').value;
    const deporteEquipo = document.getElementById('deporte-equipo').value;
    const tipoActividad = document.getElementById('tipo-actividad').value;
    const deportistasSeleccionados = Array.from(document.getElementById('deportistas-select').selectedOptions)
                                          .map(option => option.value);

    // Añadir el equipo a la tabla de equipos
    addEquipoToTable(equipoSeleccionado, deporteEquipo, tipoActividad, deportistasSeleccionados);

    // Añadir deportistas a la tabla de Evolución Global llamando a la función del otro script
    if (typeof addDeportistasToEvolucionGlobal === 'function') {
        addDeportistasToEvolucionGlobal(equipoSeleccionado, deportistasSeleccionados);
    }

    // Limpiar el formulario
    e.target.reset();
});

function addEquipoToTable(equipo, deporte, actividad, deportistas) {
    const equiposTable = document.getElementById('equipos-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${equipo}</td>
        <td>${deporte}</td>
        <td>${actividad}</td>
        <td>${deportistas.join(', ')}</td>
        <td><button class="delete-btn">X</button></td> <!-- Botón para eliminar la fila -->
    `;

    // Añadir evento al botón de eliminación
    row.querySelector('.delete-btn').addEventListener('click', function() {
        row.remove(); // Eliminar la fila
    });

    equiposTable.appendChild(row);
}

// Simulación: Añadir opciones de deportistas al selector
function populateDeportistas() {
    const deportistasSelect = document.getElementById('deportistas-select');
    const deportistas = ['Juan Perez', 'María Gomez', 'Carlos Sanchez', 'Ana Rodriguez'];

    deportistas.forEach(deportista => {
        const option = document.createElement('option');
        option.value = deportista;
        option.textContent = deportista;
        deportistasSelect.appendChild(option);
    });
}

// Llenar select de deportistas al cargar la página
populateDeportistas();

