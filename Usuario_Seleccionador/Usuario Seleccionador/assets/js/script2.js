// Lista global para almacenar equipos creados
let equiposCreados = [];

// Manejo del formulario de Clubes
document.getElementById('clubForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario de Club
    const clubName = document.getElementById('clubName').value;
    const clubLocation = document.getElementById('clubLocation').value;

    // Añadir el club a la tabla y al selector
    addClubToTable(clubName, clubLocation);
    addClubToSelect(clubName);

    // Añadir el equipo a la lista de equipos creados
    equiposCreados.push(clubName);
    actualizarSelectEquiposFormacion(); // Actualiza el selector en "Formación de Equipos"

    // Limpiar el formulario
    e.target.reset();
});

// Manejo del formulario de Entrenadores
document.getElementById('entrenadorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario de Entrenador
    const entrenadorName = document.getElementById('entrenadorName').value;
    const clubAsignado = document.getElementById('clubAsignado').value;

    // Buscar la fila del club asignado en la tabla y actualizar el nombre del entrenador
    const tableRows = document.querySelectorAll('#clubTrainerList tr');
    tableRows.forEach(row => {
        if (row.cells[0].innerText === clubAsignado) {
            row.cells[2].innerText = entrenadorName;
        }
    });

    // Limpiar el formulario
    e.target.reset();
});

function addClubToTable(clubName, clubLocation) {
    const tableBody = document.getElementById('clubTrainerList');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${clubName}</td>
        <td>${clubLocation}</td>
        <td></td>
        <td><button class="delete-btn">X</button></td>
    `;

    // Añadir evento al botón de eliminación
    row.querySelector('.delete-btn').addEventListener('click', function() {
        row.remove(); // Eliminar la fila
        // Remover el club de la lista de equipos creados
        equiposCreados = equiposCreados.filter(equipo => equipo !== clubName);
        actualizarSelectEquiposFormacion(); // Actualiza el selector en "Formación de Equipos"
        actualizarSelectClubAsignado(); // Actualiza el selector de "Club Asignado"
    });

    tableBody.appendChild(row);
}

function addClubToSelect(clubName) {
    const clubSelect = document.getElementById('clubAsignado');
    const option = document.createElement('option');

    option.value = clubName;
    option.textContent = clubName;

    clubSelect.appendChild(option);
}

// Función para actualizar el selector de equipos en "Formación de Equipos"
function actualizarSelectEquiposFormacion() {
    const equipoSelect = document.getElementById('equipo-select');
    equipoSelect.innerHTML = '<option value="" disabled selected>Seleccione un equipo</option>'; // Resetear opciones

    equiposCreados.forEach(equipo => {
        const option = document.createElement('option');
        option.value = equipo;
        option.textContent = equipo;
        equipoSelect.appendChild(option);
    });
}

// Función para actualizar el selector de "Club Asignado"
function actualizarSelectClubAsignado() {
    const clubSelect = document.getElementById('clubAsignado');
    clubSelect.innerHTML = '<option value="" disabled selected>Seleccione un club</option>'; // Resetear opciones

    equiposCreados.forEach(club => {
        const option = document.createElement('option');
        option.value = club;
        option.textContent = club;
        clubSelect.appendChild(option);
    });
}
