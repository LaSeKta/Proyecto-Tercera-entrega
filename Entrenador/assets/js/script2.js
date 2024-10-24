document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos del DOM
    const evolucionForm = document.getElementById('evolucionForm');
    const clientEvolutionsTable = document.getElementById('clientEvolutions');

    // Verificar si los elementos fueron encontrados
    if (!evolucionForm || !clientEvolutionsTable) {
        console.error('Formulario o tabla no encontrado.');
        return;
    }

    // Escuchar el evento de envío del formulario
    evolucionForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores de los campos del formulario
        const clientName = document.getElementById('clientName').value;
        const clientProgress = parseInt(document.getElementById('clientProgress').value);
        const ratings = [
            document.getElementById('agendaCompliance').value,
            document.getElementById('anaerobicResistance').value,
            document.getElementById('muscleStrength').value,
            document.getElementById('muscleResistance').value,
            document.getElementById('flexibility').value,
            document.getElementById('monotonyResistance').value,
            document.getElementById('resilience').value
        ];

        // Validar los campos requeridos
        if (!clientName || isNaN(clientProgress)) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Convertir calificaciones a valores numéricos para calcular el promedio
        const ratingValues = ratings.map(rating => {
            switch (rating) {
                case 'Excelente': return 4;
                case 'Bueno': return 3;
                case 'Regular': return 2;
                case 'Deficiente': return 1;
                default: return 0;
            }
        });

        // Calcular el promedio de las calificaciones
        const averageRating = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;

        // Determinar la calificación general basada en el promedio
        let generalRating;
        if (averageRating >= 3.5) {
            generalRating = 'Excelente';
        } else if (averageRating >= 2.5) {
            generalRating = 'Bueno';
        } else if (averageRating >= 1.5) {
            generalRating = 'Regular';
        } else {
            generalRating = 'Deficiente';
        }

        // Crear una nueva fila para la tabla de evolución
        const newRow = document.createElement('tr');

        // Crear celdas para los datos del cliente
        const nameCell = document.createElement('td');
        nameCell.textContent = clientName;
        newRow.appendChild(nameCell);

        const progressCell = document.createElement('td');
        progressCell.textContent = `${clientProgress}%`;
        newRow.appendChild(progressCell);

        const ratingsCell = document.createElement('td');
        ratingsCell.textContent = generalRating;
        newRow.appendChild(ratingsCell);

        // Crear celda de alerta si el progreso es menor que el 50%
        const alertCell = document.createElement('td');
        if (clientProgress < 50) {
            alertCell.textContent = '¡Alerta: Bajo progreso!';
            alertCell.style.color = 'red';
            alertCell.style.fontWeight = 'bold';
        } else {
            alertCell.textContent = 'Buen Progreso';
        }
        newRow.appendChild(alertCell);

        // Agregar la nueva fila a la tabla
        clientEvolutionsTable.appendChild(newRow);

        // Limpiar los campos del formulario después de agregar la fila
        evolucionForm.reset();
    });
});
