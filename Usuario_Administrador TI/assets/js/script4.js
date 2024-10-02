document.addEventListener('DOMContentLoaded', () => {
    const alertasForm = document.getElementById('alertas-form');
    const alertasTableBody = document.querySelector('#alertas-table tbody');
    let alertas = []; // Arreglo para almacenar las alertas

    // Maneja el evento de submit del formulario para agregar una alerta
    alertasForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        // Obtener valores del formulario
        const tipoAlerta = document.getElementById('tipo-alerta').value;
        const parametrosAlerta = document.getElementById('parametros-alerta').value;
        const nivelAlerta = document.getElementById('nivel-alerta').value;

        // Crear un objeto alerta
        const nuevaAlerta = {
            tipo: tipoAlerta,
            parametros: parametrosAlerta,
            nivel: nivelAlerta
        };

        // Agregar la nueva alerta al arreglo
        alertas.push(nuevaAlerta);

        // Actualizar la tabla de alertas
        actualizarTablaAlertas();

        // Limpiar el formulario
        alertasForm.reset();
    });

    // Función para actualizar la tabla de alertas
    function actualizarTablaAlertas() {
        // Limpiar el contenido de la tabla
        alertasTableBody.innerHTML = '';

        // Recorrer las alertas y agregarlas a la tabla
        alertas.forEach((alerta, index) => {
            const row = document.createElement('tr');

            // Crear las celdas para cada propiedad de la alerta
            row.innerHTML = `
                <td>${alerta.tipo}</td>
                <td>${alerta.parametros}</td>
                <td>${alerta.nivel}</td>
                <td>
                    <button class="eliminar-alerta-btn" data-index="${index}">Eliminar</button>
                </td>
            `;

            alertasTableBody.appendChild(row);
        });

        // Agregar eventos a los botones de eliminar
        const eliminarButtons = document.querySelectorAll('.eliminar-alerta-btn');
        eliminarButtons.forEach(button => {
            button.addEventListener('click', eliminarAlerta);
        });
    }

    // Función para eliminar una alerta
    function eliminarAlerta(event) {
        const index = event.target.getAttribute('data-index');

        // Remover la alerta del arreglo
        alertas.splice(index, 1);

        // Actualizar la tabla de alertas
        actualizarTablaAlertas();
    }
});a