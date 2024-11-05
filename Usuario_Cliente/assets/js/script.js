$(document).ready(function () {
    $("#EfectoCarrusel").carousel();

    $(".item1").click(function (event) {
        event.preventDefault(); 
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

    $(".carousel-control-prev").click(function (event) {
        event.preventDefault();
        $("#EfectoCarrusel").carousel("prev");
    });
    $(".carousel-control-next").click(function (event) {
        event.preventDefault();
        $("#EfectoCarrusel").carousel("next");
    });

    $("#carouselImage1, #carouselImage2, #carouselImage3").click(function () {
        window.location.href = '#Acceder';
    });
});

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

window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

window.addEventListener('scroll', actualizarBotonActivo);

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


