// Ejemplo de array de deportes
let deportes = [
    { id: 1, nombre: 'Fútbol', descripcion: 'Deporte en equipo que se juega con un balón.' },
    { id: 2, nombre: 'Baloncesto', descripcion: 'Deporte en equipo que consiste en encestar el balón en el aro.' }
];

// Cargar deportes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDeportes();
});

// Función para cargar los deportes en la lista
function cargarDeportes() {
    const listaDeportes = document.getElementById('deportes-list');
    listaDeportes.innerHTML = ''; // Limpiar la lista antes de agregar los deportes

    deportes.forEach(deporte => {
        const li = document.createElement('li');
        li.textContent = `${deporte.nombre} - ${deporte.descripcion}`;
        li.dataset.id = deporte.id;
        li.addEventListener('click', () => cargarFormulario(deporte));
        listaDeportes.appendChild(li);
    });
}

// Función para cargar el formulario con la información de un deporte existente
function cargarFormulario(deporte) {
    document.getElementById('nombre-deporte').value = deporte.nombre;
    document.getElementById('descripcion-deporte').value = deporte.descripcion;
    document.getElementById('agregar-deporte-btn').dataset.id = deporte.id; // Asignar el ID al botón de agregar
}

// Evento de agregar o modificar un deporte
document.getElementById('deporte-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('agregar-deporte-btn').dataset.id;
    const nombre = document.getElementById('nombre-deporte').value;
    const descripcion = document.getElementById('descripcion-deporte').value;

    if (id) {
        // Modificar deporte existente
        const deporte = deportes.find(d => d.id == id);
        deporte.nombre = nombre;
        deporte.descripcion = descripcion;
    } else {
        // Crear nuevo deporte
        const nuevoDeporte = {
            id: Date.now(), // Generar un ID único usando la marca de tiempo
            nombre,
            descripcion
        };
        deportes.push(nuevoDeporte); // Agregar el nuevo deporte al array
    }

    cargarDeportes(); // Recargar la lista de deportes
    e.target.reset(); // Resetear el formulario
    delete document.getElementById('agregar-deporte-btn').dataset.id; // Limpiar el ID asignado al botón
});

// Evento de eliminar un deporte
document.getElementById('eliminar-deporte-btn').addEventListener('click', () => {
    const id = document.getElementById('agregar-deporte-btn').dataset.id;
    if (id) {
        deportes = deportes.filter(d => d.id != id); // Filtrar el deporte eliminado
        cargarDeportes(); // Recargar la lista de deportes
        document.getElementById('deporte-form').reset(); // Resetear el formulario
        delete document.getElementById('agregar-deporte-btn').dataset.id; // Limpiar el ID asignado al botón
    }
});