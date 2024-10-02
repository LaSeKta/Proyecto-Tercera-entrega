function abrirModal() {
    const modal = document.getElementById('modal-dashboard');
    modal.style.display = 'flex';
    generarGraficos();  // Generar gráficos al abrir el modal
}

function cerrarModal() {
    const modal = document.getElementById('modal-dashboard');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-dashboard');
    if (event.target == modal) {
        cerrarModal();
    }
};

function generarGraficos() {
    // Destruir instancias anteriores de gráficos si existen
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.destroy();
    });

    // Generar gráficos con Chart.js
    const progresoGeneralCtx = document.getElementById('general-progress-chart').getContext('2d');
    const resistenciaCtx = document.getElementById('resistance-chart').getContext('2d');
    const fuerzaMuscularCtx = document.getElementById('muscle-strength-chart').getContext('2d');
    const cumplimientoEjerciciosCtx = document.getElementById('exercise-compliance-chart').getContext('2d');

    new Chart(progresoGeneralCtx, {
        type: 'doughnut',
        data: {
            labels: ['Progreso', 'Restante'],
            datasets: [{
                data: [75, 25],  // Ajusta los datos según sea necesario
                backgroundColor: ['#FF6384', '#DDDDDD'],
            }]
        }
    });

    new Chart(resistenciaCtx, {
        type: 'bar',
        data: {
            labels: ['Resistencia'],
            datasets: [{
                label: 'Resistencia',
                data: [75],  // Ajusta los datos según sea necesario
                backgroundColor: '#36A2EB'
            }]
        }
    });

    new Chart(fuerzaMuscularCtx, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: 'Fuerza Muscular',
                data: [70, 72, 75, 80],  // Ajusta los datos según sea necesario
                backgroundColor: '#FFCE56',
                fill: false,
                borderColor: '#FFCE56'
            }]
        }
    });

    new Chart(cumplimientoEjerciciosCtx, {
        type: 'pie',
        data: {
            labels: ['Cumplido', 'No Cumplido'],
            datasets: [{
                data: [90, 10],  // Ajusta los datos según sea necesario
                backgroundColor: ['#4BC0C0', '#FF6384']
            }]
        }
    });
}

window.onload = function() {
    cerrarModal();  // Asegura que el modal esté cerrado al cargar la página
};
