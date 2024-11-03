const clientes = [
    { nombre: 'Juan Pérez', asistencias: 8, ausencias: 2 },
    { nombre: 'Ana Gómez', asistencias: 5, ausencias: 5 },
    { nombre: 'Carlos Ruiz', asistencias: 9, ausencias: 1 },
];

// Función para verificar la asistencia y generar alertas
function verificarAsistencia() {
    const tbody = document.querySelector('#tabla-asistencia tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de añadir nuevas filas

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        
        // Columna Nombre del Cliente
        const tdNombre = document.createElement('td');
        tdNombre.textContent = cliente.nombre;
        tr.appendChild(tdNombre);

        // Columna Asistencias
        const tdAsistencias = document.createElement('td');
        tdAsistencias.textContent = cliente.asistencias;
        tr.appendChild(tdAsistencias);

        // Columna Ausencias
        const tdAusencias = document.createElement('td');
        tdAusencias.textContent = cliente.ausencias;
        tr.appendChild(tdAusencias);

        // Columna Alertas
        const tdAlerta = document.createElement('td');
        if (cliente.ausencias > 3) {
            tdAlerta.textContent = '¡Alerta: Ausencias Recurrentes!';
            tdAlerta.style.color = 'red';
        } else {
            tdAlerta.textContent = 'Asistencia Regular';
        }
        tr.appendChild(tdAlerta);

        tbody.appendChild(tr);
    });
}

// Llamar a la función para cargar la tabla de asistencia al cargar la página
document.addEventListener('DOMContentLoaded', verificarAsistencia);