$(document).ready(function () {
    
    function cargarClientes() {
        $.ajax({
            url: "assets/php/obtener_clientes.php", 
            type: "GET",
            success: function (response) {
                const usersTable = $('#users');
                usersTable.empty();
                
                if (response.error) {
                    console.error("Error al cargar clientes:", response.error);
                    alert("Hubo un error al cargar los clientes.");
                } else {
                    response.forEach(cliente => {
                        const row = `
                            <tr>
                                <td>${cliente.nombre}</td>
                                <td>${cliente.apellido}</td>
                                <td>${cliente.ci}</td>
                            </tr>
                        `;
                        usersTable.append(row);
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud:", error);
            }
        });
    }

    cargarClientes();

    $('#userForm').on('submit', function (e) {
        e.preventDefault();
        
        const clienteData = {
            nombre: $('#userName').val(),
            apellido: $('#userSurname').val(),
            ci: $('#userCI').val(),
            email: $('#userEmail').val(),
            password: $('#userPassword').val()
        };

        $.ajax({
            url: "assets/php/agregar_cliente.php",
            type: "POST",
            data: clienteData,
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $('#userForm')[0].reset();
                    cargarClientes();
                } else {
                    console.error("Error al agregar cliente:", response.error);
                    alert("Hubo un error al agregar el cliente.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud:", error);
            }
        });
    });
});
