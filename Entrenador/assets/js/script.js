

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

