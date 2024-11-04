document.addEventListener("DOMContentLoaded", function () {
    console.log("Documento listo para gestionar entrenadores.");

    // Manejar el envío del formulario de creación de entrenador
    document.getElementById("entrenadorForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const ci = document.getElementById("entrenadorCI").value;
        const nombre = document.getElementById("entrenadorName").value;
        const apellido = document.getElementById("entrenadorApellido").value;
        const email = document.getElementById("entrenadorEmail").value;
        const password = document.getElementById("entrenadorPassword").value;

        fetch('assets/php/registrar_entrenador.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ci: ci, nombre: nombre, apellido: apellido, email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                document.getElementById("entrenadorForm").reset();
                cargarEntrenadores(); // Recargar la lista de entrenadores
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => console.error("Error en la solicitud:", error));
    });

    function cargarEntrenadores() {
        fetch('assets/php/obtener_entrenadores.php')
            .then(response => response.json())
            .then(data => {
                const entrenadoresList = document.getElementById("entrenadoresList");
                entrenadoresList.innerHTML = ''; // Limpiar lista previa

                if (data.success) {
                    data.entrenadores.forEach(entrenador => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${entrenador.nombre}</td>
                            <td>${entrenador.apellido}</td>
                            <td>${entrenador.email}</td>
                        `;
                        entrenadoresList.appendChild(row);
                    });
                } else {
                    console.error("Error: " + data.message);
                }
            })
            .catch(error => console.error("Error al cargar entrenadores:", error));
    }

    cargarEntrenadores(); // Cargar entrenadores al cargar la página
});
