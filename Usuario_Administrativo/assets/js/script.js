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

document.addEventListener("DOMContentLoaded", function () {
    console.log("Documento listo para gestionar pagos.");

    function cargarClientesPago() {
        fetch('assets/php/obtener_clientes.php')
            .then(response => response.json())
            .then(data => {
                const clientePagoSelect = document.getElementById('clientePagoSelect');
                if (clientePagoSelect) { 
                    clientePagoSelect.innerHTML = ''; 

                    data.clientes.forEach(cliente => {
                        let option = document.createElement('option');
                        option.value = cliente.id_cliente;
                        option.textContent = cliente.nombre_completo;
                        clientePagoSelect.appendChild(option);
                    });
                }
            })
            .catch(error => console.error("Error al cargar los clientes:", error));
    }

    $('#paymentModal').on('show.bs.modal', function () {
        cargarClientesPago();
    });

    function registrarPago(id_cliente, mes_pago) {
        fetch('assets/php/registrar_pago.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_cliente: id_cliente, mes_pago: mes_pago })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
            } else {
                alert("Error al registrar el pago: " + data.message);
            }
        })
        .catch(error => console.error("Error en la solicitud:", error));
    }

    const registrarPagoBtn = document.getElementById("registrarPagoBtn");
    if (registrarPagoBtn) { 
        registrarPagoBtn.addEventListener("click", function () {
            const clienteSelect = document.getElementById("clientePagoSelect");
            const mesPago = document.getElementById("mesPago").value; 

            if (clienteSelect.value && mesPago) {
                registrarPago(clienteSelect.value, mesPago);
            } else {
                alert("Selecciona un cliente y un mes de pago.");
            }
        });
    } else {
        console.error("No se encontró el botón de registrar pago con el ID 'registrarPagoBtn'.");
    }
});
