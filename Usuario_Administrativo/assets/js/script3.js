document.addEventListener("DOMContentLoaded", function () {
    console.log("Documento listo.");

    const calendarEl = document.getElementById('calendar');

    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGridWeek',
            locale: 'es',
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: 'today'
            },
            titleFormat: {
                month: 'long',
                year: 'numeric',
                day: 'numeric'
            },
            allDaySlot: false,
            businessHours: {
                daysOfWeek: [1, 2, 3, 4, 5], // Días de lunes a viernes
                startTime: '08:00',
                endTime: '18:00'
            },
            selectable: true,
            selectConstraint: 'businessHours',
            events: {
                url: 'assets/php/obtener_sesiones.php',
                method: 'GET',
                failure: function () {
                    alert('Error al cargar las sesiones.');
                }
            },
            dateClick: function (info) {
                if (info.date.getDay() !== 0 && info.date.getDay() !== 6) { 
                    const fechaSeleccionada = info.dateStr.split("T")[0];
                    const horaInicio = info.dateStr.split("T")[1].slice(0, 5) || "08:00"; 

                    const horaFin = incrementarHora(horaInicio);

                    $('#sessionDate').val(fechaSeleccionada);
                    $('#horaInicio').val(horaInicio);
                    $('#horaFin').val(horaFin);

                    $('#horaInicio').prop('disabled', true);
                    $('#horaFin').prop('disabled', true);

                    cargarClientesYEntrenadores();

                    $('#sessionModal').modal('show');
                }
            },
            eventClick: function (info) {
                if (confirm(`¿Deseas eliminar la sesión "${info.event.title}"?`)) {
                    fetch('assets/php/eliminar_sesion.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: info.event.id })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            info.event.remove();
                            alert('Sesión eliminada exitosamente.');
                        } else {
                            alert('Error al eliminar la sesión: ' + data.message);
                        }
                    })
                    .catch(error => {
                        console.error("Error al eliminar la sesión:", error);
                        alert('Error al eliminar la sesión.');
                    });
                }
            }
        });

        calendar.render();
        console.log("Calendario renderizado con eventos.");
    } else {
        console.error("Error: No se encontró el elemento #calendar.");
    }

    function cargarClientesYEntrenadores() {
        fetch('assets/php/obtener_clientes_entrenadores.php')
            .then(response => response.json())
            .then(data => {
                if (data.clientes && data.entrenadores) {
                    const clienteSelect = document.getElementById('clienteSelect');
                    const entrenadorSelect = document.getElementById('trainerSelect');

                    clienteSelect.innerHTML = '';
                    data.clientes.forEach(cliente => {
                        let option = document.createElement('option');
                        option.value = cliente.id_cliente;
                        option.textContent = cliente.nombre_completo;
                        clienteSelect.appendChild(option);
                    });

                    entrenadorSelect.innerHTML = '';
                    data.entrenadores.forEach(entrenador => {
                        let option = document.createElement('option');
                        option.value = entrenador.id_entrenador;
                        option.textContent = entrenador.nombre_completo;
                        entrenadorSelect.appendChild(option);
                    });
                } else {
                    console.error("Error: No se encontraron datos de clientes o entrenadores.");
                }
            })
            .catch(error => console.error("Error al cargar clientes y entrenadores:", error));
    }

    document.getElementById('sessionForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const fecha = document.getElementById('sessionDate').value;
        const hora_inicio = document.getElementById('horaInicio').value;
        const hora_fin = document.getElementById('horaFin').value;
        const id_cliente = document.getElementById('clienteSelect').value;
        const entrenador_id = document.getElementById('trainerSelect').value;

        if (!fecha || !hora_inicio || !hora_fin || !id_cliente || !entrenador_id) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        fetch('assets/php/crear_sesion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fecha, hora_inicio, hora_fin, id_cliente, entrenador_id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Sesión creada correctamente.');
                $('#sessionModal').modal('hide');
                
                location.reload();
            } else {
                alert('Error al crear la sesión: ' + data.message);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
    });

    function incrementarHora(horaInicio) {
        const [horas, minutos] = horaInicio.split(':');
        const nuevaHora = parseInt(horas) + 1;
        return `${nuevaHora.toString().padStart(2, '0')}:${minutos}`;
    }
});




document.addEventListener("DOMContentLoaded", function () {
    console.log("Documento listo para verificar pagos.");

    document.getElementById("verificarPagoBtn").addEventListener("click", function () {
        fetch('assets/php/verificar_pagos.php')
            .then(response => response.json())
            .then(data => {
                const clientesPagoList = document.getElementById('clientesPagoList');
                clientesPagoList.innerHTML = '';

                data.clientes.forEach(cliente => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                    listItem.textContent = `${cliente.nombre_completo} - Último pago: ${cliente.fecha_pago}`;

                    if (cliente.estado === 'vencido') {
                        listItem.style.backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Rojo para vencidos
                    } else if (cliente.estado === 'cerca_de_vencer') {
                        listItem.style.backgroundColor = 'rgba(255, 165, 0, 0.2)'; // Naranja para cerca de vencer
                    } else {
                        listItem.style.backgroundColor = 'rgba(0, 128, 0, 0.2)'; // Verde para pagado
                    }

                    clientesPagoList.appendChild(listItem);
                });

                $('#verificarPagosModal').modal('show');
            })
            .catch(error => console.error("Error al cargar el estado de los pagos:", error));
    });
});
