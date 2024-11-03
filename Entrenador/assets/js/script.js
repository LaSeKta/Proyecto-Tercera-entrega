

$(document).ready(function () {
    // Activar carrusel
    $("#EfectoCarrusel").carousel();

    // Activar los indicadores del carrusel
    $(".item1").click(function (event) {
        event.preventDefault(); // Evita el desplazamiento predeterminado
        $("#EfectoCarrusel").carousel(0);
    });
    $(".item2").click(function (event) {
        event.preventDefault();
        $("#EfectoCarrusel").carousel(1);
    });
    $(".item3").click(function (event) {
        event.preventDefault();
        $("#EfectoCarrusel").carousel(2);
    });

    // Activar dirección del carrusel
    $(".carousel-control-prev").click(function (event) {
        event.preventDefault();
        $("#EfectoCarrusel").carousel("prev");
    });
    $(".carousel-control-next").click(function (event) {
        event.preventDefault();
        $("#EfectoCarrusel").carousel("next");
    });

    // Redirigir al #Acceder cuando se hace clic en una imagen del carrusel
    $("#carouselImage1, #carouselImage2, #carouselImage3").click(function () {
        window.location.href = '#Acceder';
    });
});

//NAV BOTONES
const enlacesMenu = document.querySelectorAll(".op-menu a");

window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    enlacesMenu.forEach((enlace) => {
        const seccionId = enlace.getAttribute("href").substring(1);
        const seccion = document.getElementById(seccionId);

        if (
            seccion.offsetTop <= scrollPosition + 100 &&
            seccion.offsetTop + seccion.offsetHeight > scrollPosition
        ) {
            enlacesMenu.forEach((enlace) => {
                enlace.classList.remove("activo");
            });
            enlace.classList.add("activo");
        }
    });
});

// Menú
const menuIcon = document.getElementById("menuIcon");
const menuHidden = document.getElementById("menuHidden");

menuIcon.addEventListener("click", () => {
  if (menuHidden.style.display === "none" || menuHidden.style.display === "") {
    menuHidden.style.display = "block";
  } else {
    menuHidden.style.display = "none";
  }
});

function checkScreenSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 801) {
    menuHidden.style.display = "none";
  }
}

// Ejecuta checkScreenSize() cuando la página se carga y cuando la ventana cambia de tamaño
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

// Escucha el evento de desplazamiento
window.addEventListener('scroll', actualizarBotonActivo);

// Función para actualizar el botón activo
function actualizarBotonActivo() {
    const scrollPosition = window.scrollY;

    enlacesMenu.forEach((enlace) => {
        const seccionId = enlace.getAttribute("href").substring(1);
        const seccion = document.getElementById(seccionId);

        if (
            seccion.offsetTop <= scrollPosition + 100 &&
            seccion.offsetTop + seccion.offsetHeight > scrollPosition
        ) {
            enlacesMenu.forEach((enlace) => {
                enlace.classList.remove("activo");
            });
            enlace.classList.add("activo");
        }
    });
}

$(document).ready(function () {
    // Manejo del formulario de evolución
    $('#evolucionForm').on('submit', function (e) {
        e.preventDefault();

        // Obtener los valores de los campos
        const idCliente = $('#selectclientes').val();
        const cumplimientoAgenda = $('#agendaCompliance').val();
        const resistenciaAnaerobica = $('#anaerobicResistance').val();
        const resistenciaMuscular = $('#muscleStrength').val();
        const flexibilidad = $('#flexibility').val();
        const resistenciaMonotonia = $('#monotonyResistance').val();
        const resiliencia = $('#resilience').val();

        // Validar que todos los campos están llenos
        if (!idCliente || !cumplimientoAgenda || !resistenciaAnaerobica || !resistenciaMuscular || !flexibilidad || !resistenciaMonotonia || !resiliencia) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Enviar los datos mediante AJAX al archivo PHP
        $.ajax({
            url: "assets/php/registrar_evaluacion.php", // Cambia la ruta si es necesario
            type: "POST",
            dataType: "json",
            data: {
                id_cliente: idCliente,
                cumplimiento_agenda: cumplimientoAgenda,
                resistencia_anaerobica: resistenciaAnaerobica,
                resistencia_muscular: resistenciaMuscular,
                flexibilidad: flexibilidad,
                resistencia_monotonia: resistenciaMonotonia,
                resiliencia: resiliencia
            },
            success: function (response) {
                if (response.success) {
                    alert(response.message); // Muestra el mensaje de éxito
                    $('#evolucionForm')[0].reset(); // Limpia el formulario
                } else {
                    alert("Error al registrar la evolución: " + (response.error || "Desconocido"));
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al enviar la evaluación:", error);
                alert("Ocurrió un error al registrar la evaluación.");
            }
        });
    });
});





//modal sesiones aaaaaaaaaaaaaaa


$(document).ready(function () {
    // Mostrar el modal y cargar las sesiones al hacer clic en el botón
    $('#verSesionesBtn').on('click', function () {
        $.ajax({
            url: "assets/php/obtener_sesiones.php", // Cambia esta ruta si es necesario
            type: "GET",
            dataType: "json",
            success: function (response) {
                const listaSesiones = $('#listaSesiones');
                listaSesiones.empty(); // Limpiar la lista de sesiones

                if (response.success && response.sesiones.length > 0) {
                    response.sesiones.forEach(function (sesion) {
                        const item = `
                            <li>
                                <h3>Cliente: ${sesion.cliente}</h3>
                                <p><strong>Fecha:</strong> ${sesion.fecha} </p> 
                                <p><strong>Hora de inicio:</strong> ${sesion.hora_inicio} </p>
                                <p><strong>Hora de fin:</strong> ${sesion.hora_fin} </p>
                            </li>
                        `;
                        listaSesiones.append(item);
                    });
                } else {
                    listaSesiones.append('<li>No tienes sesiones asignadas.</li>');
                }

                $('#modal-sesiones').show(); // Mostrar el modal
            },
            error: function () {
                alert("Error al cargar las sesiones.");
            }
        });
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    $('#cerrarModalSesiones').on('click', function () {
        $('#modal-sesiones').hide();
    });

    // Cerrar el modal al hacer clic fuera de él
    $(window).on('click', function (event) {
        if ($(event.target).is('#modal-sesiones')) {
            $('#modal-sesiones').hide();
        }
    });
});

