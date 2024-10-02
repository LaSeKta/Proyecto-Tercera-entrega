// Ejemplo de array de ejercicios
let ejercicios = [
    { id: 1, nombre: 'Sentadilla', tipo: 'Fuerza', descripcion: 'Ejercicio para piernas y glúteos.' },
    { id: 2, nombre: 'Flexión', tipo: 'Resistencia', descripcion: 'Ejercicio para pectorales y tríceps.' }
];

// Cargar ejercicios al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarEjercicios();
});

// Función para cargar los ejercicios en la lista
function cargarEjercicios() {
    const listaEjercicios = document.getElementById('ejercicios-list');
    listaEjercicios.innerHTML = ''; // Limpiar la lista antes de agregar los ejercicios

    ejercicios.forEach(ejercicio => {
        const li = document.createElement('li');
        li.textContent = `${ejercicio.nombre} (${ejercicio.tipo}) - ${ejercicio.descripcion}`;
        li.dataset.id = ejercicio.id;
        li.addEventListener('click', () => cargarFormulario(ejercicio));
        listaEjercicios.appendChild(li);
    });
}

// Función para cargar el formulario con la información de un ejercicio existente
function cargarFormulario(ejercicio) {
    document.getElementById('nombre-ejercicio').value = ejercicio.nombre;
    document.getElementById('tipo-ejercicio').value = ejercicio.tipo;
    document.getElementById('descripcion-ejercicio').value = ejercicio.descripcion;
    document.getElementById('agregar-ejercicio-btn').dataset.id = ejercicio.id; // Asignar el ID al botón de agregar
}

// Evento de agregar o modificar un ejercicio
document.getElementById('ejercicio-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('agregar-ejercicio-btn').dataset.id;
    const nombre = document.getElementById('nombre-ejercicio').value;
    const tipo = document.getElementById('tipo-ejercicio').value;
    const descripcion = document.getElementById('descripcion-ejercicio').value;

    if (id) {
        // Modificar ejercicio existente
        const ejercicio = ejercicios.find(e => e.id == id);
        ejercicio.nombre = nombre;
        ejercicio.tipo = tipo;
        ejercicio.descripcion = descripcion;
    } else {
        // Crear nuevo ejercicio
        const nuevoEjercicio = {
            id: Date.now(), // Generar un ID único usando la marca de tiempo
            nombre,
            tipo,
            descripcion
        };
        ejercicios.push(nuevoEjercicio); // Agregar el nuevo ejercicio al array
    }

    cargarEjercicios(); // Recargar la lista de ejercicios
    e.target.reset(); // Resetear el formulario
    delete document.getElementById('agregar-ejercicio-btn').dataset.id; // Limpiar el ID asignado al botón
});

// Evento de eliminar un ejercicio
document.getElementById('eliminar-ejercicio-btn').addEventListener('click', () => {
    const id = document.getElementById('agregar-ejercicio-btn').dataset.id;
    if (id) {
        ejercicios = ejercicios.filter(e => e.id != id); // Filtrar el ejercicio eliminado
        cargarEjercicios(); // Recargar la lista de ejercicios
        document.getElementById('ejercicio-form').reset(); // Resetear el formulario
        delete document.getElementById('agregar-ejercicio-btn').dataset.id; // Limpiar el ID asignado al botón
    }
});