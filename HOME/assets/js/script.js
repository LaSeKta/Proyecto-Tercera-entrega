

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
