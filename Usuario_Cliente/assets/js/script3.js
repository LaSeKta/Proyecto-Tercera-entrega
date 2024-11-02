document.addEventListener("DOMContentLoaded", function () {
    console.log("El documento está listo.");

    const tablaPlanBody = document.getElementById("tabla-plan-body");
    if (!tablaPlanBody) {
        console.error("Error: No se encontró el elemento con id 'tabla-plan-body' en el DOM.");
        return;
    }

    console.log("Elemento 'tabla-plan-body' encontrado en el DOM.");

    function cargarPlan() {
        console.log("Iniciando la carga del plan del usuario.");

        fetch("assets/php/obtener_plan_usuario.php")
            .then(response => {
                console.log("Respuesta de la solicitud recibida. Estado:", response.status);
                if (!response.ok) {
                    console.error("Error en la respuesta del servidor:", response.statusText);
                    throw new Error("Error en la solicitud de obtener_plan_usuario.php");
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos JSON recibidos:", data);

                if (data.error) {
                    console.error("Error al cargar el plan desde el servidor:", data.error);
                    return;
                }

                if (!Array.isArray(data) || data.length === 0) {
                    console.warn("El plan recibido está vacío o no es un array.");
                    tablaPlanBody.innerHTML = "<tr><td colspan='3'>No hay datos de plan disponibles.</td></tr>";
                    return;
                }

                tablaPlanBody.innerHTML = "";
                data.forEach((item, index) => {
                    console.log(`Procesando elemento ${index + 1} del plan:`, item);

                    const row = document.createElement("tr");

                    const planCell = document.createElement("td");
                    planCell.textContent = item.plan_nombre || "N/A";
                    row.appendChild(planCell);

                    const ejercicioCell = document.createElement("td");
                    ejercicioCell.textContent = item.ejercicio_nombre || "N/A";
                    row.appendChild(ejercicioCell);

                    const descripcionCell = document.createElement("td");
                    descripcionCell.textContent = item.descripcion || "N/A";
                    row.appendChild(descripcionCell);

                    tablaPlanBody.appendChild(row);
                });

                console.log("Tabla completada con los datos del plan.");
            })
            .catch(error => {
                console.error("Error al obtener o procesar el plan:", error);
            });
    }

    function cargarProgresoUsuario() {
        console.log("Iniciando carga de progreso del usuario en sesión...");

        fetch("assets/php/obtener_progreso_usuario.php")
            .then(response => {
                if (!response.ok) {
                    console.error("Error en la respuesta del servidor:", response.statusText);
                    throw new Error("Error en la solicitud de obtener_progreso_usuario.php");
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.error("Error al cargar el progreso:", data.error);
                    return;
                }

                const tablaProgresoBody = document.getElementById("tabla-gimnasios").querySelector("tbody");
                tablaProgresoBody.innerHTML = "";
                const row = document.createElement("tr");

                const ciCell = document.createElement("td");
                ciCell.textContent = data.id_cliente;
                row.appendChild(ciCell);

                const progresoCell = document.createElement("td");
                progresoCell.textContent = data.progreso_actual + " %";
                row.appendChild(progresoCell);

                const accionCell = document.createElement("td");
                const btn = document.createElement("button");
                btn.classList.add("acciones-btn");
                btn.innerHTML = "🔍";
                btn.addEventListener("click", () => mostrarGraficosEvolucion(data.id_cliente));
                accionCell.appendChild(btn);
                row.appendChild(accionCell);

                tablaProgresoBody.appendChild(row);
            })
            .catch(error => {
                console.error("Error al obtener el progreso del usuario:", error);
            });
    }

    function mostrarGraficosEvolucion(idCliente) {
        console.log("Iniciando carga de datos para los gráficos. ID del Cliente:", idCliente);

        fetch("assets/php/obtener_detalle_evaluacion.php?id_cliente=" + idCliente)
            .then(response => response.json())
            .then(evaluacion => {
                if (evaluacion.error) {
                    console.error("Error en los datos de evaluación:", evaluacion.error);
                    alert("Ocurrió un error al cargar la evolución.");
                    return;
                }

                actualizarGraficoEvolucion(evaluacion);
                abrirModal();
            })
            .catch(error => console.error("Error al cargar detalle de evaluación:", error));
    }

    function abrirModal() {
        document.getElementById("modal-dashboard").style.display = "flex";
    }

    function cerrarModal() {
        document.getElementById("modal-dashboard").style.display = "none";
    }

    // Detectar clic en el botón de cierre y en el fondo del modal
    document.querySelector(".close").addEventListener("click", cerrarModal);
    document.getElementById("modal-dashboard").addEventListener("click", function (event) {
        // Verifica si el clic fue fuera del contenido del modal
        if (event.target === document.getElementById("modal-dashboard")) {
            cerrarModal();
        }
    });

    // Función para cargar la última evaluación
    function cargarUltimaEvaluacion() {
        fetch("assets/php/obtener_detalle_evaluacion.php")
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error("Error en la evaluación:", data.error);
                    return;
                }
                actualizarGraficoEvolucion(data);
                abrirModal();
            })
            .catch(error => console.error("Error al cargar evaluación:", error));
    }

    // Configuración de gráficos de evaluación
    const charts = {};
    function actualizarGraficoEvolucion(evaluacion) {
        const chartsData = [
            { id: 'progresoGeneralChart', label: 'Progreso General', data: [evaluacion.nota_final] },
            { id: 'resistenciaAnaerobicaChart', label: 'Resistencia Anaeróbica', data: [evaluacion.resistencia_anaerobica] },
            { id: 'resistenciaMuscularChart', label: 'Resistencia Muscular', data: [evaluacion.resistencia_muscular] },
            { id: 'cumplimientoChart', label: 'Cumplimiento de Agenda', data: [evaluacion.cumplimiento_agenda] },
            { id: 'flexibilidadChart', label: 'Flexibilidad', data: [evaluacion.flexibilidad] },
            { id: 'resistenciaMonotoniaChart', label: 'Resistencia a la Monotonía', data: [evaluacion.resistencia_monotonia] },
            { id: 'resilienciaChart', label: 'Resiliencia', data: [evaluacion.resiliencia] },
            { id: 'notaFinalChart', label: 'Nota Final', data: [evaluacion.nota_final] }
        ];

        chartsData.forEach(chart => {
            const canvasElement = document.getElementById(chart.id);
            if (canvasElement) {
                const ctx = canvasElement.getContext('2d');

                if (!charts[chart.id]) {
                    charts[chart.id] = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: [chart.label],
                            datasets: [{ data: chart.data, label: chart.label, backgroundColor: 'rgba(75, 192, 192, 0.6)' }]
                        },
                        options: { responsive: true }
                    });
                } else {
                    charts[chart.id].data.datasets[0].data = chart.data;
                    charts[chart.id].update();
                }
            }
        });
    }



    cargarPlan();
    cargarProgresoUsuario();
});

