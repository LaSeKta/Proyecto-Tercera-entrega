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
                daysOfWeek: [1, 2, 3, 4, 5],
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
                    window.location.href = `formulario.html?date=${info.dateStr}`;
                }
            },
            eventClick: function (info) {
                const currentDateTime = new Date();
                const eventStart = new Date(info.event.start);
                const eventEnd = new Date(info.event.end);

                if (currentDateTime >= eventStart && currentDateTime <= eventEnd) {
                    if (confirm(`¿Deseas registrar asistencia para la sesión "${info.event.title}"?`)) {
                        fetch('assets/php/registrar_asistencia.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id_sesion: info.event.id })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert('Asistencia registrada exitosamente.');
                            } else {
                                alert('Error al registrar asistencia: ' + data.message);
                            }
                        })
                        .catch(error => {
                            console.error("Error al registrar asistencia:", error);
                            alert('Error al registrar asistencia.');
                        });
                    }
                } else if (confirm(`¿Deseas eliminar la sesión "${info.event.title}"?`)) {
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
});
