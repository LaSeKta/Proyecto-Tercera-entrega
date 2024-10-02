document.addEventListener('DOMContentLoaded', () => {
    const planForm = document.getElementById('planForm');
    const ejercicioForm = document.getElementById('ejercicioForm');
    const planList = document.getElementById('planList');
    const modalAsignarPlan = document.getElementById('modal-asignar-plan');
    const modalCompatibilidad = document.getElementById('modal-tabla-compatibilidad');
    const cerrarModalAsignarBtn = document.getElementById('cerrar-modal-asignar-btn');
    const cerrarModalCompatibilidadBtn = document.getElementById('cerrar-modal-compatibilidad-btn');
    const asignarPlanForm = document.getElementById('asignar-plan-form');

    modalAsignarPlan.style.display = 'none';
    modalCompatibilidad.style.display = 'none';

    let planes = [];

    // Manejo de envío del formulario de planes
    planForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombrePlan = document.getElementById('nombre-plan').value;
        const objetivoPlan = document.getElementById('objetivo-plan').value;

        const planExistente = planes.find(plan => plan.nombre === nombrePlan);
        if (planExistente) {
            planExistente.objetivo = objetivoPlan;
        } else {
            planes.push({ nombre: nombrePlan, objetivo: objetivoPlan, ejercicios: [] });
        }
        renderPlanes();
        updateSelectOptions();
        planForm.reset();
    });

    // Manejo del botón de eliminar plan
    document.getElementById('eliminar-plan-btn').addEventListener('click', () => {
        const nombrePlan = document.getElementById('nombre-plan').value;
        planes = planes.filter(plan => plan.nombre !== nombrePlan);
        renderPlanes();
        updateSelectOptions();
        planForm.reset();
    });

    // Manejo del botón de agregar ejercicio
    document.getElementById('agregar-ejercicio-btn').addEventListener('click', () => {
        const nombreEjercicio = document.getElementById('ejercicio-nombre').value;
        const detalleEjercicio = document.getElementById('ejercicio-detalle').value;
        const planAsignado = document.getElementById('plan-ejercicio-select').value;

        const plan = planes.find(plan => plan.nombre === planAsignado);
        if (plan) {
            const ejercicioExistente = plan.ejercicios.find(ej => ej.nombre === nombreEjercicio);
            if (ejercicioExistente) {
                ejercicioExistente.detalle = detalleEjercicio;
            } else {
                plan.ejercicios.push({ nombre: nombreEjercicio, detalle: detalleEjercicio });
            }
            renderPlanes();
        }
        ejercicioForm.reset();
    });

    // Manejo del botón de eliminar ejercicio
    document.getElementById('eliminar-ejercicio-btn').addEventListener('click', () => {
        const nombreEjercicio = document.getElementById('ejercicio-nombre').value;
        const planAsignado = document.getElementById('plan-ejercicio-select').value;

        const plan = planes.find(plan => plan.nombre === planAsignado);
        if (plan) {
            plan.ejercicios = plan.ejercicios.filter(ej => ej.nombre !== nombreEjercicio);
            renderPlanes();
        }
        ejercicioForm.reset();
    });

    // Renderizar la lista de planes en la tabla
    function renderPlanes() {
        planList.innerHTML = '';
        planes.forEach(plan => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${plan.nombre}</td>
                <td>${plan.objetivo}</td>
                <td>${plan.ejercicios.map(ej => ej.nombre).join(', ')}</td>
            `;

            // Evento para cargar datos en el formulario al hacer clic en un plan
            row.addEventListener('click', () => {
                document.getElementById('nombre-plan').value = plan.nombre;
                document.getElementById('objetivo-plan').value = plan.objetivo;
                updateEjercicioForm(plan);
            });

            planList.appendChild(row);
        });
    }

    // Función para actualizar el formulario de ejercicios con datos del plan seleccionado
    function updateEjercicioForm(plan) {
        const planEjercicioSelect = document.getElementById('plan-ejercicio-select');
        planEjercicioSelect.value = plan.nombre;

        const ejercicios = plan.ejercicios;
        if (ejercicios.length > 0) {
            document.getElementById('ejercicio-nombre').value = ejercicios[0].nombre;
            document.getElementById('ejercicio-detalle').value = ejercicios[0].detalle;
        } else {
            ejercicioForm.reset();
        }
    }

    // Manejo de apertura y cierre de modales
    document.getElementById('abrir-modal-asignar-btn').addEventListener('click', () => {
        modalAsignarPlan.style.display = 'block';
        updateSelectOptions();
    });

    cerrarModalAsignarBtn.addEventListener('click', () => {
        modalAsignarPlan.style.display = 'none';
    });

    document.getElementById('ver-tabla-compatibilidad-btn').addEventListener('click', () => {
        modalCompatibilidad.style.display = 'block';
    });

    cerrarModalCompatibilidadBtn.addEventListener('click', () => {
        modalCompatibilidad.style.display = 'none';
    });

    // Manejo del formulario de asignación de planes a clientes
    asignarPlanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cliente = document.getElementById('cliente-select').value;
        const plan = document.getElementById('plan-select').value;

        const asignacion = document.createElement('tr');
        asignacion.innerHTML = `
            <td>${cliente}</td>
            <td>${plan}</td>
        `;
        document.getElementById('tabla-asignaciones').querySelector('tbody').appendChild(asignacion);

        // Esta línea ha sido comentada para evitar que se cierre el modal
        // modalAsignarPlan.style.display = 'none';
    });

    // Actualiza las opciones de selección de clientes y planes
    function updateSelectOptions() {
        const clienteSelect = document.getElementById('cliente-select');
        const planSelect = document.getElementById('plan-select');
        const planEjercicioSelect = document.getElementById('plan-ejercicio-select');

        clienteSelect.innerHTML = ''; 
        planSelect.innerHTML = ''; 
        planEjercicioSelect.innerHTML = ''; 

        const clientes = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente;
            option.textContent = cliente;
            clienteSelect.appendChild(option);
        });

        planes.forEach(plan => {
            const optionPlan = document.createElement('option');
            optionPlan.value = plan.nombre;
            optionPlan.textContent = plan.nombre;
            planSelect.appendChild(optionPlan);

            const optionEjercicio = document.createElement('option');
            optionEjercicio.value = plan.nombre;
            optionEjercicio.textContent = plan.nombre;
            planEjercicioSelect.appendChild(optionEjercicio);
        });
    }
});
