document.addEventListener('DOMContentLoaded', () => {
    const alertasForm = document.getElementById('alertas-form');
    const alertasTableBody = document.querySelector('#alertas-table tbody');
    let alertas = []; 

   
    alertasForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

    
        const tipoAlerta = document.getElementById('tipo-alerta').value;
        const parametrosAlerta = document.getElementById('parametros-alerta').value;
        const nivelAlerta = document.getElementById('nivel-alerta').value;

       
        const nuevaAlerta = {
            tipo: tipoAlerta,
            parametros: parametrosAlerta,
            nivel: nivelAlerta
        };

        
        alertas.push(nuevaAlerta);

        
        actualizarTablaAlertas();

      
        alertasForm.reset();
    });

   
    function actualizarTablaAlertas() {
        
        alertasTableBody.innerHTML = '';

        
        alertas.forEach((alerta, index) => {
            const row = document.createElement('tr');

            
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

       
        const eliminarButtons = document.querySelectorAll('.eliminar-alerta-btn');
        eliminarButtons.forEach(button => {
            button.addEventListener('click', eliminarAlerta);
        });
    }

   
    function eliminarAlerta(event) {
        const index = event.target.getAttribute('data-index');

        
        alertas.splice(index, 1);

      
        actualizarTablaAlertas();
    }
});