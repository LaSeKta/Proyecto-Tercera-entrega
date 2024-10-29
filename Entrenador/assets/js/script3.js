


$(document).ready(function () {
    console.log("El documento está listo y el script está cargado."); // Verifica que el script se ejecuta correctamente

    // Manejar el formulario de agregar plan
    $("#planForm").on("submit", function (e) {
        e.preventDefault(); // Evitar el envío por defecto del formulario

        // Obtener los valores del formulario
        const nombrePlan = $("#nombre-plan").val();
        const objetivoPlan = $("#objetivo-plan").val();

        // Mostrar los valores en la consola para verificar
        console.log("Nombre del Plan:", nombrePlan); // Debe mostrar el nombre en la consola
        console.log("Objetivo del Plan:", objetivoPlan); // Debe mostrar el objetivo en la consola

        // Validar que los campos no estén vacíos
        if (nombrePlan !== "" && objetivoPlan !== "") {
            // Enviar los datos mediante AJAX
            $.ajax({
                url: "assets/php/agregar_plan.php", // Archivo PHP que maneja la inserción en la base de datos
                type: "POST",
                data: {
                    nombre: nombrePlan,
                    descripcion: objetivoPlan
                },
                success: function (response) {
                    alert(response); // Mostrar la respuesta del servidor
                    // Limpiar el formulario si se agrega el plan con éxito
                    $("#planForm")[0].reset();
                },
                error: function (xhr, status, error) {
                    alert("Ocurrió un error: " + error);
                }
            });
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
});

$(document).ready(function () {
    // Función para cargar los planes y sus ejercicios desde la base de datos
    function cargarPlanesYAsignaciones() {
        $.ajax({
            url: "assets/php/obtener_planes_con_ejercicios.php", // Archivo PHP que manejará la consulta
            type: "GET",
            success: function (response) {
                const planes = JSON.parse(response); // Convertimos la respuesta JSON a un objeto
                const planList = $('#planList');
                planList.empty(); // Limpiamos la tabla antes de llenarla

                // Recorrer los planes y sus ejercicios para renderizarlos en la tabla
                planes.forEach(function (plan) {
                    const row = $('<tr></tr>');
                    row.append(`<td>${plan.nombre}</td>`);
                    row.append(`<td>${plan.objetivo}</td>`);

                    const ejerciciosCell = $('<td></td>');

                    // Mostrar los ejercicios como enlaces, permitiendo seleccionar cuál editar
                    plan.ejercicios.forEach(function (ejercicio) {
                        const link = $('<a href="#"></a>').text(ejercicio.nombre);
                        
                        // Cuando se hace clic en un ejercicio, cargarlo en el formulario
                        link.on('click', function (e) {
                            e.preventDefault(); // Evitar el comportamiento predeterminado de los enlaces
                            cargarEjercicioParaEditar(ejercicio.id); // Llamamos a una función para cargar el ejercicio en el formulario
                        });

                        ejerciciosCell.append(link).append('<br>'); // Añadir el enlace de ejercicio
                    });

                    row.append(ejerciciosCell);
                    planList.append(row); // Agregar la fila a la tabla
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar los planes:", error);
            }
        });
    }

    // Llamar a la función para cargar los planes y sus asignaciones cuando la página esté lista
    cargarPlanesYAsignaciones();

    // Función para cargar un ejercicio en el formulario para su edición

    

    // Enviar la edición del ejercicio a la base de datos
    $('#agregar-ejercicio-btn').on('click', function (e) {
        e.preventDefault();

        const idEjercicio = $('#id-ejercicio').val(); // ID del ejercicio a editar
        const nombreEjercicio = $('#ejercicio-nombre').val();
        const detalleEjercicio = $('#ejercicio-detalle').val();
        const tipoEjercicio = $('#tipo-ejercicio').val();

        if (nombreEjercicio !== "" && detalleEjercicio !== "" && tipoEjercicio !== "" && idEjercicio !== "") {
            // Enviar los datos mediante AJAX para actualizar el ejercicio
            $.ajax({
                url: "assets/php/editar_ejercicio.php", // Archivo PHP que manejará la edición en la base de datos
                type: "POST",
                data: {
                    id: idEjercicio,
                    nombre: nombreEjercicio,
                    detalle: detalleEjercicio,
                    tipo: tipoEjercicio
                },
                success: function (response) {
                     // Mostrar la respuesta del servidor
                    $('#ejercicioForm')[0].reset(); // Limpiar el formulario después de editar
                    cargarPlanesYAsignaciones(); // Refrescar la lista de planes y ejercicios
                },
                error: function (xhr, status, error) {
                    console.error("Error al editar el ejercicio:", error);
                }
            });
        } else {

        }
    });
});

function cargarEjercicioParaEditar(idEjercicio) {
    $.ajax({
        url: "assets/php/obtener_ejercicio.php",
        type: "GET",
        data: { id: idEjercicio },
        success: function (response) {
            try {
                const ejercicio = JSON.parse(response);
                if (ejercicio.error) {
                    alert(ejercicio.error); // Mostrar el error al usuario si existe
                } else {
                    $('#ejercicio-nombre').val(ejercicio.nombre);
                    $('#tipo-ejercicio').val(ejercicio.tipo);
                    $('#ejercicio-detalle').val(ejercicio.descripcion);
                    $('#id-ejercicio').val(ejercicio.id_ejercicio);
                    $('#plan-ejercicio-select').val(ejercicio.id_plan);
                }
            } catch (error) {
                console.error("Error al parsear JSON:", error);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar el ejercicio:", error);
        }
    });
}



$(document).ready(function () {
    // Función para cargar los planes y sus ejercicios desde la base de datos
    function cargarPlanesYAsignaciones() {
        $.ajax({
            url: "assets/php/obtener_planes_con_ejercicios.php", // Archivo PHP que manejará la consulta
            type: "GET",
            success: function (response) {
                const planes = JSON.parse(response); // Convertimos la respuesta JSON a un objeto
                const planList = $('#planList');
                planList.empty(); // Limpiamos la tabla antes de llenarla

                // Recorrer los planes y sus ejercicios para renderizarlos en la tabla
                planes.forEach(function (plan) {
                    const row = $('<tr></tr>');
                    row.append(`<td>${plan.nombre}</td>`);
                    row.append(`<td>${plan.objetivo}</td>`);

                    const ejerciciosCell = $('<td></td>');

                    // Mostrar los ejercicios como enlaces, permitiendo seleccionar cuál editar
                    plan.ejercicios.forEach(function (ejercicio) {
                        const link = $('<a href="#"></a>').text(ejercicio.nombre);

                        // Añadir un atributo de datos al enlace con la ID del ejercicio
                        link.attr('data-id-ejercicio', ejercicio.id);  // Guardamos la ID del ejercicio en el enlace

                        // Cuando se hace clic en un ejercicio, cargarlo en el formulario
                        link.on('click', function (e) {
                            e.preventDefault(); // Evitar el comportamiento predeterminado de los enlaces
                            const idEjercicio = $(this).data('id-ejercicio'); // Obtener la ID del ejercicio desde el enlace
                            console.log("ID del ejercicio enviado:", idEjercicio); // Depurar ID del ejercicio
                            cargarEjercicioParaEditar(idEjercicio); // Llamamos a una función para cargar el ejercicio en el formulario
                        });

                        ejerciciosCell.append(link).append('<br>'); // Añadir el enlace de ejercicio
                    });

                    row.append(ejerciciosCell);
                    planList.append(row); // Agregar la fila a la tabla
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar los planes:", error);
            }
        });
    }

    // Llamar a la función para cargar los planes y sus asignaciones cuando la página esté lista
    cargarPlanesYAsignaciones();

    // Función para llenar el formulario con los datos de un ejercicio seleccionado
    function llenarFormularioEjercicio(plan) {
        // Asumimos que solo estamos editando el primer ejercicio del plan (puedes modificarlo si es necesario)
        if (plan.ejercicios.length > 0) {
            const ejercicio = plan.ejercicios[0]; // Esto es para editar el primer ejercicio del plan
            $('#ejercicio-nombre').val(ejercicio); // Llenar el nombre del ejercicio
            $('#tipo-ejercicio').val(plan.tipo);   // Llenar el tipo de ejercicio (si tienes esta información)
            $('#ejercicio-detalle').val(plan.objetivo); // Llenar el detalle del ejercicio (asociado al objetivo)
            $('#plan-ejercicio-select').val(plan.nombre); // Llenar el plan al que está asignado
        }
    }

    // Enviar la edición a la base de datos cuando se haga clic en "Agregar Ejercicio"
    $('#agregar-ejercicio-btn').on('click', function (e) {
        e.preventDefault();

        const nombreEjercicio = $('#ejercicio-nombre').val();
        const detalleEjercicio = $('#ejercicio-detalle').val();
        const tipoEjercicio = $('#tipo-ejercicio').val(); // Capturar el tipo de ejercicio
        const idPlan = $('#plan-ejercicio-select').val(); // Obtener el ID del plan seleccionado

        if (nombreEjercicio !== "" && detalleEjercicio !== "" && tipoEjercicio !== "" && idPlan !== "") {
            // Enviar los datos mediante AJAX para agregar o editar el ejercicio
            $.ajax({
                url: "assets/php/editar_ejercicio.php", // Archivo PHP que manejará la edición en la base de datos
                type: "POST",
                data: {
                    nombre: nombreEjercicio,
                    detalle: detalleEjercicio,
                    tipo: tipoEjercicio, // Enviamos el tipo de ejercicio
                    id_plan: idPlan
                },
                success: function (response) {
                    // Mostrar la respuesta del servidor
                    // Limpiar el formulario si se edita el ejercicio con éxito
                    $('#ejercicioForm')[0].reset();
                    cargarPlanesYAsignaciones(); // Refrescar la lista de planes y ejercicios
                },
                error: function (xhr, status, error) {
                    console.error("Error al editar el ejercicio:", error);
                }
            });
        } else {
           
        }
    });
});




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
        //planForm.reset();
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
       // ejercicioForm.reset();
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


$(document).ready(function () {
    // Cargar los planes en el select para asignar al ejercicio
    function cargarPlanesParaAsignar() {
        $.ajax({
            url: "assets/php/obtener_planes_para_asignar.php",
            type: "GET",
            success: function (response) {
                try {
                    const planes = typeof response === 'string' ? JSON.parse(response) : response;
                    const planSelect = $('#plan-ejercicio-select');
                    planSelect.empty();
    
                    if (planes.length > 0) {
                        planes.forEach(function (plan) {
                            const option = $('<option></option>').val(plan.id_plan).text(plan.nombre);
                            planSelect.append(option);
                        });
                    } else {
                        planSelect.append('<option value="">No hay planes disponibles</option>');
                    }
                } catch (error) {
                    console.error("Error al parsear los datos de planes:", error);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar los planes:", error);
            }
        });
    }
    
    

    cargarPlanesParaAsignar(); // Llamada inicial para llenar el select de planes al cargar la página

    // Manejo del formulario de agregar ejercicio
    $('#agregar-ejercicio-btn').on('click', function (e) {
        e.preventDefault();
    
        const nombreEjercicio = $('#ejercicio-nombre').val();
        const detalleEjercicio = $('#ejercicio-detalle').val();
        const tipoEjercicio = $('#tipo-ejercicio').val();
        const idPlanAsignado = $('#plan-ejercicio-select').val();
    
        // Al crear un nuevo ejercicio, asegúrate de que no se envíe el campo `id_ejercicio`
        const idEjercicio = $('#id-ejercicio').val(); // Puede estar vacío si se está creando
    
        const data = {
            nombre: nombreEjercicio,
            detalle: detalleEjercicio,
            tipo: tipoEjercicio,
            id_plan: idPlanAsignado
        };
    
        if (idEjercicio) {
            data.id_ejercicio = idEjercicio; // Solo agregar el ID si estamos editando
        }
    
        if (nombreEjercicio && detalleEjercicio && tipoEjercicio && idPlanAsignado) {
            $.ajax({
                url: "assets/php/agregar_ejercicio.php",
                type: "POST",
                data: data,
                success: function (response) {
                    alert(response);
                    $('#ejercicioForm')[0].reset();
                    $('#id-ejercicio').val(''); // Limpiar el ID al crear un nuevo ejercicio
                    cargarPlanesParaAsignar();
                },
                error: function (xhr, status, error) {
                    console.error("Error al agregar el ejercicio:", error);
                    alert("Ocurrió un error al intentar agregar el ejercicio.");
                }
            });
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
    
});   



$(document).ready(function () {
    // Cargar clientes en el selector de asignación
    function cargarClientes() {
        $.ajax({
            url: "assets/php/obtener_clientes.php",
            type: "GET",
            success: function (response) {
                console.log("Respuesta de clientes recibida:", response); // Depuración
    
                try {
                    const clientes = typeof response === "string" ? JSON.parse(response) : response;
    
                    // Maneja el caso en el que haya un error en el JSON
                    if (clientes.error) {
                        console.error("Error en la respuesta de clientes:", clientes.error);
                        alert("Error al cargar los clientes: " + clientes.error);
                        return;
                    }
    
                    const clienteSelect = $('#cliente-select');
                    clienteSelect.empty();
                    
                    if (clientes.length > 0) {
                        clientes.forEach(function (cliente) {
                            clienteSelect.append(
                                $('<option></option>').val(cliente.id_cliente).text(cliente.nombre)
                            );
                        });
                    } else {
                        clienteSelect.append('<option value="">No hay clientes disponibles</option>');
                    }
                } catch (error) {
                    console.error("Error al analizar la respuesta JSON:", error);
                    alert("Ocurrió un error al cargar los clientes. Por favor, intenta nuevamente.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar los clientes:", error);
            }
        });
    }
    

    // Cargar planes en el selector de asignación
    function cargarPlanes() {
        $.ajax({
            url: "assets/php/obtener_planes_para_asignar.php",
            type: "GET",
            success: function (response) {
                console.log("Respuesta recibida:", response);
                try {
                    // Verifica si la respuesta es un objeto (ya parseado)
                    const planes = typeof response === "string" ? JSON.parse(response) : response;
    
                    const planSelect = $('#plan-select');
                    planSelect.empty();
                    
                    if (planes.length > 0) {
                        planes.forEach(function (plan) {
                            planSelect.append(
                                $('<option></option>').val(plan.id_plan).text(plan.nombre)
                            );
                        });
                    } else {
                        planSelect.append('<option value="">No hay planes disponibles</option>');
                    }
                } catch (error) {
                    console.error("Error al analizar la respuesta JSON:", error);
                    alert("Ocurrió un error al cargar los planes. Por favor, intenta nuevamente.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar los planes:", error);
            }
        });
    }
    

    // Llamar a las funciones al cargar el modal de asignación
    $('#abrir-modal-asignar-btn').on('click', function () {
        cargarClientes();
        cargarPlanes();
        $('#modal-asignar-plan').show();
    });

    // Manejo de la asignación de un plan a un cliente
    $('#asignar-plan-form').on('submit', function (e) {
        e.preventDefault();
        
        const idCliente = $('#cliente-select').val();
        const idPlan = $('#plan-select').val();

        $.ajax({
            url: "assets/php/asignar_plan_cliente.php",
            type: "POST",
            data: {
                id_cliente: idCliente,
                id_plan: idPlan
            },
            success: function (response) {
                alert(response);
                $('#modal-asignar-plan').hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al asignar el plan:", error);
                alert("Ocurrió un error al asignar el plan.");
            }
        });
    });

    $('#cerrar-modal-asignar-btn').on('click', function () {
        $('#modal-asignar-plan').hide();
    });
});
