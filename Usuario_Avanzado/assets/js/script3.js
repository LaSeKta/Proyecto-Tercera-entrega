// Array para almacenar los ejercicios
let ejercicios = [];

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
        li.addEventListener('click', () => seleccionarEjercicio(ejercicio, li));
        listaEjercicios.appendChild(li);
    });
}

// Función para agregar o modificar un ejercicio
document.getElementById('ejercicio-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre-ejercicio').value;
    const tipo = document.getElementById('tipo-ejercicio').value;
    const descripcion = document.getElementById('descripcion-ejercicio').value;
    const id = document.getElementById('agregar-ejercicio-btn').dataset.id;

    if (id) {
        // Modificar ejercicio existente
        const ejercicio = ejercicios.find(e => e.id == id);
        if (ejercicio) {
            ejercicio.nombre = nombre;
            ejercicio.tipo = tipo;
            ejercicio.descripcion = descripcion;
        }
    } else {
        // Agregar nuevo ejercicio
        const nuevoEjercicio = {
            id: Date.now().toString(), // Generar un ID único usando la marca de tiempo
            nombre,
            tipo,
            descripcion
        };
        ejercicios.push(nuevoEjercicio); // Agregar el nuevo ejercicio al array
    }

    cargarEjercicios(); // Recargar la lista de ejercicios
    e.target.reset(); // Resetear el formulario
    limpiarSeleccion(); // Limpiar selección de ID en botones
});

// Función para seleccionar un ejercicio y cargarlo en el formulario
function seleccionarEjercicio(ejercicio, elementoLi) {
    // Cargar los datos del ejercicio seleccionado en el formulario
    document.getElementById('nombre-ejercicio').value = ejercicio.nombre;
    document.getElementById('tipo-ejercicio').value = ejercicio.tipo;
    document.getElementById('descripcion-ejercicio').value = ejercicio.descripcion;

    // Asignar el ID del ejercicio seleccionado al botón de guardar
    document.getElementById('agregar-ejercicio-btn').dataset.id = ejercicio.id;

    // Añadir clase para indicar el ejercicio seleccionado (opcional, para estilo visual)
    document.querySelectorAll('#ejercicios-list li').forEach(li => li.classList.remove('selected'));
    elementoLi.classList.add('selected');

    // Asignar el ID al botón de eliminar
    document.getElementById('eliminar-ejercicio-btn').dataset.id = ejercicio.id;
}

// Función para eliminar el ejercicio seleccionado
document.getElementById('eliminar-ejercicio-btn').addEventListener('click', () => {
    const id = document.getElementById('eliminar-ejercicio-btn').dataset.id;
    if (id) {
        // Eliminar el ejercicio del array
        ejercicios = ejercicios.filter(e => e.id != id);
        cargarEjercicios(); // Recargar la lista de ejercicios
        document.getElementById('ejercicio-form').reset(); // Resetear el formulario
        limpiarSeleccion(); // Limpiar selección de ID en botones
    }
});

// Función para limpiar la selección del formulario y de los botones
function limpiarSeleccion() {
    // Limpiar los datos de los botones de modificar y eliminar
    delete document.getElementById('agregar-ejercicio-btn').dataset.id;
    delete document.getElementById('eliminar-ejercicio-btn').dataset.id;

    // Remover la clase 'selected' de cualquier ejercicio en la lista
    document.querySelectorAll('#ejercicios-list li').forEach(li => li.classList.remove('selected'));
}
