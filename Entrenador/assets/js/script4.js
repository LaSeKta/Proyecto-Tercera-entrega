const deportistas = [
    { nombre: 'Juan Pérez', progreso: '75%' },
    { nombre: 'Ana Gómez', progreso: '60%' },
    { nombre: 'Carlos Ruiz', progreso: '90%' }
];

function llenarTablaEvolucion() {
    const tabla = document.querySelector('#tabla-evolucion tbody');
    tabla.innerHTML = ''; 

    deportistas.forEach((deportista, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${deportista.nombre}</td>
            <td>${deportista.progreso}</td>
            <td><button onclick="abrirModal(${index})">Ver Dashboard</button></td>
        `;
        tabla.appendChild(fila);
    });
}


function abrirModal(index) {
    const modal = document.getElementById('modal-dashboard');
    modal.style.display = 'flex'; 


    generarGraficos(deportistas[index]);
}


function cerrarModal() {
    const modal = document.getElementById('modal-dashboard');
    modal.style.display = 'none'; 
}


document.querySelector('.close').onclick = cerrarModal;


window.onload = function() {
    llenarTablaEvolucion(); 
    cerrarModal(); 
};


window.onclick = function(event) {
    const modal = document.getElementById('modal-dashboard');
    if (event.target == modal) {
        cerrarModal();
    }
};


function generarGraficos(deportista) {

    Chart.helpers.each(Chart.instances, function(instance) {
        instance.destroy();
    });

    const progresoGeneralCtx = document.getElementById('progresoGeneralChart').getContext('2d');
    const resistenciaCtx = document.getElementById('resistenciaChart').getContext('2d');
    const fuerzaMuscularCtx = document.getElementById('fuerzaMuscularChart').getContext('2d');
    const cumplimientoEjerciciosCtx = document.getElementById('cumplimientoEjerciciosChart').getContext('2d');

    new Chart(progresoGeneralCtx, {
        type: 'doughnut',
        data: {
            labels: ['Progreso', 'Restante'],
            datasets: [{
                data: [deportista.progreso.replace('%', ''), 100 - deportista.progreso.replace('%', '')],
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
                data: [75], 
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
                data: [70, 72, 75, 80], 
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
                data: [90, 10], 
                backgroundColor: ['#4BC0C0', '#FF6384']
            }]
        }
    });
}