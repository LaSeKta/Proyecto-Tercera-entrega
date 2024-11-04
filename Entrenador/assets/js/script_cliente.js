// Elementos del modal y botón
const clientesModal = document.getElementById('clientesModal');
const closeClientesModal = document.getElementById('closeClientesModal');
const btnVerClientes = document.getElementById('btn-ver-clientes');

// Abrir el modal y cargar los datos al hacer clic en el botón
btnVerClientes.addEventListener('click', () => {
    fetch('assets/php/get_clientes.php')
        .then(response => response.json())
        .then(data => {
            const fisioterapiaContainer = document.getElementById('fisioterapia-clientes');
            const deportistaContainer = document.getElementById('deportista-clientes');

            // Limpiar las tablas de clientes anteriores
            fisioterapiaContainer.innerHTML = '';
            deportistaContainer.innerHTML = '';

            console.log("Clientes obtenidos:", data);

            data.forEach(cliente => {
                console.log("Procesando cliente:", cliente);

                // Crear una fila para el cliente
                const clienteRow = document.createElement('tr');
                
                // Aplicar color de fondo según el puntaje
                if (cliente.nota >= 80) {
                    clienteRow.classList.add('green-bg'); // Verde para aprobado
                } else {
                    clienteRow.classList.add('red-bg'); // Rojo para no aprobado
                }

                // Agregar columnas con la información del cliente
                clienteRow.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.nota}</td>
                `;

                // Crear el menú desplegable de estado
                const accionesCell = document.createElement('td');
                const selectEstado = document.createElement('select');
                selectEstado.classList.add('estado-select');

                // Opciones de estado según el rol
                if (cliente.id_rol === '2') {  // Fisioterapia
                    selectEstado.innerHTML = `
                        <option value="1">Inicio</option>
                        <option value="2">Sin evolución</option>
                        <option value="3">En evolución</option>
                        <option value="4">Satisfactorio</option>
                    `;
                } else if (cliente.id_rol === '1') {  // Deportista
                    selectEstado.innerHTML = `
                        <option value="5">Principiante</option>
                        <option value="6">Bajo</option>
                        <option value="7">Medio</option>
                        <option value="8">Alto</option>
                        <option value="9">Experto</option>
                    `;
                }

                // Seleccionar automáticamente el estado actual del cliente
                selectEstado.value = cliente.id_estado;

                // Deshabilitar el selector de estado si el puntaje es menor a 80
                if (cliente.nota < 80) {
                    selectEstado.disabled = true;
                } else {
                    selectEstado.disabled = false; // Habilitar para puntaje >= 80
                    console.log(`Habilitado el cambio de estado para: ${cliente.nombre} con nota ${cliente.nota}`);
                }

                // Agregar el menú desplegable a la celda de acciones
                accionesCell.appendChild(selectEstado);
                clienteRow.appendChild(accionesCell);

                // Evento para guardar el estado cuando cambia el valor (solo para clientes con select habilitado)
                selectEstado.addEventListener('change', () => {
                    console.log(`Cambiando estado de ${cliente.nombre} (ID Cliente: ${cliente.id_cliente}) a estado ${selectEstado.value}`);

                    fetch('assets/php/update_estado_cliente.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            id_cliente: cliente.id_cliente,
                            id_estado: selectEstado.value
                        })
                    })
                    .then(res => res.text())
                    .then(text => {
                        console.log(`Respuesta exacta de la base de datos para ${cliente.nombre}:`, text);
                        alert("Respuesta del servidor: " + text);
                    })
                    .catch(error => console.error('Error en el cambio de estado:', error));
                });

                // Añadir el cliente a la tabla correspondiente (Fisioterapia o Deportista)
                if (cliente.id_rol === '2') {
                    fisioterapiaContainer.appendChild(clienteRow);
                    console.log("Añadido a Fisioterapia:", cliente.nombre);
                } else if (cliente.id_rol === '1') {
                    deportistaContainer.appendChild(clienteRow);
                    console.log("Añadido a Deportista:", cliente.nombre);
                }
            });

            // Mostrar el modal después de cargar los datos
            clientesModal.style.display = 'block';
        })
        .catch(error => console.error('Error al obtener los clientes:', error));
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeClientesModal.addEventListener('click', () => {
    clientesModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target == clientesModal) {
        clientesModal.style.display = 'none';
    }
});
