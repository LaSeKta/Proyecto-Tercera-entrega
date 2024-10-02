document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var messageDiv = document.getElementById('messageDiv');
    var currentEvent = null; // Variable para almacenar el evento actual

    var trainers = {
        "1": [],
        "2": [],
        "3": []
    }; // Simulación de sesiones ocupadas por cada entrenador, para demo

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es', // Configuración para idioma español
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            list: 'Agenda'
        },
        editable: true,
        selectable: true,
        
        dateClick: function(info) {
            document.getElementById('sessionForm').reset();
            document.getElementById('eventId').value = '';
            $('#sessionDate').val(info.dateStr);
            $('#deleteSession').hide(); // Ocultar el botón de eliminar en modo de creación
            $('#sessionModal').modal('show');
            currentEvent = null;
        },
        eventClick: function(info) {
            currentEvent = info.event;
            document.getElementById('eventId').value = info.event.id;
            document.getElementById('sessionTitle').value = info.event.title;
            document.getElementById('sessionDescription').value = info.event.extendedProps.description;
            $('#sessionDate').val(info.event.startStr);
            $('#trainerSelect').val(info.event.extendedProps.trainerId || ''); // Asignar el entrenador
            $('#deleteSession').show(); // Mostrar el botón de eliminar en modo de edición
            $('#sessionModal').modal('show');
        }
    });

    calendar.render();

    // Manejar el envío del formulario
    document.getElementById('sessionForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var title = document.getElementById('sessionTitle').value;
        var description = document.getElementById('sessionDescription').value;
        var date = document.getElementById('sessionDate').value;
        var trainerId = document.getElementById('trainerSelect').value;

        if (title) {
            // Verificar disponibilidad del entrenador
            if (trainers[trainerId].includes(date)) {
                showMessage('El entrenador no está disponible en esta fecha.');
                return;
            }

            if (currentEvent) {
                // Editar evento existente
                currentEvent.setProp('title', title);
                currentEvent.setStart(date);
                currentEvent.setExtendedProp('description', description);
                currentEvent.setExtendedProp('trainerId', trainerId);
                showMessage('Sesión actualizada correctamente.');
            } else {
                // Crear nuevo evento
                var newEvent = calendar.addEvent({
                    title: title,
                    start: date,
                    description: description,
                    trainerId: trainerId
                });
                trainers[trainerId].push(date); // Registrar la fecha como ocupada para el entrenador
                currentEvent = newEvent; // Establecer el evento creado como actual
                showMessage('Sesión creada correctamente.');
            }

            $('#sessionModal').modal('hide');
            document.getElementById('sessionForm').reset(); // Resetea el formulario después de agregar/editar la sesión
        }
    });

    // Manejar la eliminación de eventos
    document.getElementById('deleteSession').addEventListener('click', function() {
        if (currentEvent) {
            var trainerId = currentEvent.extendedProps.trainerId;
            var date = currentEvent.startStr;

            // Eliminar la fecha de la lista de ocupadas para el entrenador
            var index = trainers[trainerId].indexOf(date);
            if (index > -1) {
                trainers[trainerId].splice(index, 1);
            }

            currentEvent.remove();
            showMessage('Sesión eliminada correctamente.');
            $('#sessionModal').modal('hide');
            document.getElementById('sessionForm').reset();
            currentEvent = null; // Resetear el evento actual
        }
    });

    function showMessage(message) {
        messageDiv.innerHTML = '<div class="alert alert-info" role="alert">' + message + '</div>';
        setTimeout(function() {
            messageDiv.innerHTML = ''; // Limpiar mensaje después de 3 segundos
        }, 3000);
    }
});