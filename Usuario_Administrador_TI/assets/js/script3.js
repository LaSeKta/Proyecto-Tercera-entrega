// Ejemplo de array de ejercicios
let ejercicios = [
    { id: 1, nombre: 'Sentadilla', tipo: 'Fuerza', descripcion: 'Ejercicio para piernas y glúteos.' },
    { id: 2, nombre: 'Flexión', tipo: 'Resistencia', descripcion: 'Ejercicio para pectorales y tríceps.' }
];


document.addEventListener('DOMContentLoaded', () => {
    cargarEjercicios();
});


const listaEjercicios = document.getElementById('ejercicios-list');
if (listaEjercicios) {
    listaEjercicios.innerHTML = ''; 

    ejercicios.forEach(ejercicio => {
        const li = document.createElement('li');
        li.textContent = `${ejercicio.nombre} (${ejercicio.tipo}) - ${ejercicio.descripcion}`;
        li.dataset.id = ejercicio.id;
        li.addEventListener('click', () => cargarFormulario(ejercicio));
        listaEjercicios.appendChild(li);
    });
} else {
    console.error('Elemento con ID "ejercicios-list" no encontrado.');
}



function cargarFormulario(ejercicio) {
    document.getElementById('nombre-ejercicio').value = ejercicio.nombre;
    document.getElementById('tipo-ejercicio').value = ejercicio.tipo;
    document.getElementById('descripcion-ejercicio').value = ejercicio.descripcion;
    document.getElementById('agregar-ejercicio-btn').dataset.id = ejercicio.id; 
}

document.getElementById('ejercicio-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('agregar-ejercicio-btn').dataset.id;
    const nombre = document.getElementById('nombre-ejercicio').value;
    const tipo = document.getElementById('tipo-ejercicio').value;
    const descripcion = document.getElementById('descripcion-ejercicio').value;

    if (id) {
       
        const ejercicio = ejercicios.find(e => e.id == id);
        ejercicio.nombre = nombre;
        ejercicio.tipo = tipo;
        ejercicio.descripcion = descripcion;
    } else {
        
        const nuevoEjercicio = {
            id: Date.now(), 
            nombre,
            tipo,
            descripcion
        };
        ejercicios.push(nuevoEjercicio); 
    }

    cargarEjercicios();
    e.target.reset(); 
    delete document.getElementById('agregar-ejercicio-btn').dataset.id; 
});


document.getElementById('eliminar-ejercicio-btn').addEventListener('click', () => {
    const id = document.getElementById('agregar-ejercicio-btn').dataset.id;
    if (id) {
        ejercicios = ejercicios.filter(e => e.id != id); 
        cargarEjercicios(); 
        document.getElementById('ejercicio-form').reset();
        delete document.getElementById('agregar-ejercicio-btn').dataset.id; 
    }
});