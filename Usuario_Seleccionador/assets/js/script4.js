let progresos = [];

// Función para añadir deportistas a la tabla de Evolución Global
function addDeportistasToEvolucionGlobal(equipo, deportistas) {
    const evolucionTable = document.getElementById('evolucion-list');

    deportistas.forEach(deportista => {
        const row = document.createElement('tr');
        const progresoAleatorio = Math.floor(Math.random() * 101); // Generar un progreso aleatorio entre 0 y 100%

        // Añadir el progreso al arreglo de progresos
        progresos.push(progresoAleatorio);

        row.innerHTML = `
            <td>${deportista}</td>
            <td>${equipo}</td>
            <td class="progreso">${progresoAleatorio}%</td>
            <td>
                <button class="comparar" data-deportista="${deportista}" data-progreso="${progresoAleatorio}">Comparar</button>
                <button class="eliminar" data-progreso="${progresoAleatorio}">Eliminar</button>
            </td>
        `;

        // Añadir evento al botón de comparar
        row.querySelector('.comparar').addEventListener('click', (event) => {
            const deportista = event.target.getAttribute('data-deportista');
            const progreso = parseInt(event.target.getAttribute('data-progreso'), 10);

            // Mostrar el modal y la gráfica
            mostrarModalConGrafico(deportista, progreso);
        });

        // Añadir evento al botón de eliminar
        row.querySelector('.eliminar').addEventListener('click', (event) => {
            const progreso = parseInt(event.target.getAttribute('data-progreso'), 10);

            // Remover el progreso del arreglo de progresos
            progresos = progresos.filter(p => p !== progreso);

            // Eliminar la fila de la tabla
            row.remove();

            // Actualizar el promedio si es necesario
            actualizarPromedio();
        });

        evolucionTable.appendChild(row);
    });
}

function mostrarModalConGrafico(deportista, progreso) {
    const modal = document.getElementById('modal-comparacion');
    const ctx = document.getElementById('grafico-comparacion').getContext('2d');

    // Calcular el promedio del progreso de todos los deportistas
    const promedioProgreso = progresos.length > 0 ? progresos.reduce((acc, curr) => acc + curr, 0) / progresos.length : 0;

    // Mostrar modal
    modal.style.display = 'block';

    // Destruir cualquier gráfica anterior antes de crear una nueva
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }

    // Crear gráfica de comparación usando Chart.js
    window.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [deportista, 'Promedio global'],
            datasets: [{
                label: 'Progreso',
                data: [progreso, promedioProgreso.toFixed(2)], // Mostrar el progreso y el promedio calculado
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Función para actualizar el promedio mostrado
function actualizarPromedio() {
    if (progresos.length === 0) {
        console.log('No hay deportistas en la tabla para calcular el promedio.');
        return;
    }

    const promedioProgreso = progresos.reduce((acc, curr) => acc + curr, 0) / progresos.length;
    console.log(`Promedio actualizado: ${promedioProgreso.toFixed(2)}%`);
}

// Cerrar el modal al hacer clic en el botón de cerrar
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal-comparacion').style.display = 'none';
});

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('modal-comparacion');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
