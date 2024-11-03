document.addEventListener("DOMContentLoaded", function () {
    const selectEntrenador = document.getElementById("select-entrenador");

    // Llamada AJAX para obtener la lista de entrenadores
    fetch('assets/php/obtener_entrenadores.php')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud de entrenadores");
            }
            return response.json();
        })
        .then(data => {
            data.forEach(entrenador => {
                const option = document.createElement("option");
                option.value = entrenador.id_entrenador;
                option.textContent = `${entrenador.nombre} ${entrenador.apellido}`;
                selectEntrenador.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar los entrenadores:", error);
        });
});

document.addEventListener("DOMContentLoaded", function() {
    console.log("Documento listo.");

    // Obtener fecha seleccionada de la URL y cargar en el formulario
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDate = urlParams.get('date');
    const sessionDateInput = document.getElementById('sessionDate');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const trainerSelect = document.getElementById('select-entrenador');

    // Mostrar la fecha seleccionada
    if (selectedDate) {
        const date = new Date(selectedDate);
        sessionDateInput.value = date.toISOString().split('T')[0]; // Formato de fecha "YYYY-MM-DD"
        startTimeInput.value = date.toTimeString().substring(0, 5); // Formato de hora "HH:MM"
        endTimeInput.value = calculateEndTime(startTimeInput.value); // Calcular hora de fin
    }

    // Calcular una hora adicional a la hora de inicio
    function calculateEndTime(startTime) {
        const [hours, minutes] = startTime.split(':');
        const endDate = new Date();
        endDate.setHours(parseInt(hours) + 1, parseInt(minutes));
        return endDate.toTimeString().substring(0, 5);
    }

    // Cambiar automáticamente la hora de fin al cambiar la de inicio
    startTimeInput.addEventListener('input', function() {
        endTimeInput.value = calculateEndTime(startTimeInput.value);
    });

    document.getElementById('sessionForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const sessionData = {
            fecha: sessionDateInput.value,
            hora_inicio: startTimeInput.value,
            hora_fin: endTimeInput.value,
            entrenador_id: trainerSelect.value
        };

        console.log("Datos del formulario enviados:", sessionData);

        fetch("assets/php/guardar_sesion.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sessionData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Sesión guardada correctamente.");
                window.location.href = "index.html"; // Redirigir a index.html después de guardar
            } else {
                alert("Error al guardar la sesión: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error al guardar la sesión:", error);
        });
    });
});
