// Function to activate a user (re-activate the user)
function activateUser(userId) {
    fetch('assets/php/activate_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            ci: userId  // Send the user's CI (id_persona)
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message);
            window.location.reload();  // Reload the page after successfully activating the user
        } else {
            alert(data.message);
            console.error('Error al activar el usuario:', data.message);
        }
    })
    .catch(error => {
        alert('Error al activar el usuario: ' + error.message);
        console.error('Error en la solicitud:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const usersTable = document.getElementById('users');
    const editModal = document.getElementById('editModal');
    const closeButton = document.querySelector('.close-button');
    const editForm = document.getElementById('editForm');
    const searchInput = document.getElementById('searchInput');
    let usersList = [];
    let currentUserID = null;

    const roleMap = {
        0: 'Usuario ',
        1: 'Usuario cliente',
        2: 'Entrenador',
        3: 'Usuario avanzado',
        4: 'Usuario administrativo',
        5: 'Usuario seleccionador',
    };

    // Get references to the modal and the close button for deactivated users
    const deactivatedUsersModal = document.getElementById('deactivatedUsersModal');
    const closeDeactivatedModal = document.getElementById('closeDeactivatedModal');

    // Open the deactivated users modal when the button is clicked
    document.getElementById('toggleDeactivatedUsers').addEventListener('click', function() {
        fetchDeactivatedUsers();  // Fetch and display deactivated users
        deactivatedUsersModal.style.display = 'block';  // Show the modal
    });

    // Close the modal when the close button is clicked
    closeDeactivatedModal.addEventListener('click', function() {
        deactivatedUsersModal.style.display = 'none';  // Hide the modal
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === deactivatedUsersModal) {
            deactivatedUsersModal.style.display = 'none';  // Hide the modal if clicked outside
        }
    });

    // Function to fetch and render deactivated users
    function fetchDeactivatedUsers() {
        fetch('assets/php/list_deactivated_users.php', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                alert(data.message);
                return;
            }

            // Render deactivated users
            const deactivatedUsersTable = document.getElementById('deactivatedUsers');
            deactivatedUsersTable.innerHTML = '';  // Clear any existing data

            if (Array.isArray(data)) {
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.nombre || 'No definido'}</td>
                        <td>${user.id_persona || 'N/A'}</td>
                        <td>${getRoleName(user.id_rol)}</td>
                        <td><button class="activate-button" onclick="activateUser('${user.id_persona}')">Activar</button></td>
                    `;
                    deactivatedUsersTable.appendChild(row);
                });
            } else {
                deactivatedUsersTable.innerHTML = '<tr><td colspan="4">No hay usuarios desactivados.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error fetching deactivated users:', error);
            alert('Error al obtener usuarios desactivados: ' + error.message);
        });
    }

    // Function to get the role name based on id_rol
    function getRoleName(idRol) {
        return roleMap[idRol] || 'Rol Desconocido';
    }

    // Function to fetch and render users from the server
    function fetchUsers() {
        fetch('assets/php/list_users.php', {
            method: 'GET',
        })
        .then(response => response.text())  // Assuming the server could return JSON or HTML
        .then(response => {
            console.log("Respuesta del servidor:", response); // Show the response in the console

            try {
                const data = JSON.parse(response);  // Try to parse as JSON

                if (data.status === 'error') {
                    alert(data.message);
                    return;
                }

                // If it's an array, render the table
                if (Array.isArray(data)) {
                    usersList = data;
                    renderUsersTable(usersList);
                } else {
                    alert('Error: La respuesta del servidor no es válida.');
                }
            } catch (error) {
                // If the text is not valid JSON, assume it's HTML
                console.log('Respuesta HTML del servidor, procesando como HTML...');
                document.getElementById('errorMessage').innerHTML = response; // Display the HTML in a container
            }
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            alert('Error al obtener usuarios: ' + error);
        });
    }

    function renderUsersTable(list) {
        usersTable.innerHTML = '';

        if (list.length === 0) {
            usersTable.innerHTML = '<tr><td colspan="4">No hay usuarios disponibles.</td></tr>';
            return;
        }

        list.forEach(user => {
            const nombre = user.nombre || 'No definido';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nombre}</td>
                <td>${user.id_persona || 'N/A'}</td>  <!-- Using id_persona as CI -->
                <td>${getRoleName(user.id_rol)}</td>  <!-- Showing the role name using getRoleName -->
                <td>
                    <button class="edit-button" onclick="editPermissions('${user.id_persona}')">Editar</button>
                    <button class="delete-button" onclick="deleteUser('${user.id_persona}')">Eliminar</button>
                </td>
            `;
            usersTable.appendChild(row);
        });
    }

    // Function to edit permissions
    window.editPermissions = function(userId) {
        currentUserID = userId;  // Set currentUserID to the id_persona (or CI) of the user
        const user = usersList.find(user => user.id_persona === userId);  // Use id_persona to find the user
        if (user) {
            document.getElementById('editRole').value = user.id_rol;
            editModal.style.display = 'block';
        } else {
            alert('Usuario no encontrado para editar.');
            console.error('Usuario no encontrado:', userId);
        }
    };

    // Close the edit modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Save role changes when the form is submitted
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const newRole = document.getElementById('editRole').value;
        
        fetch('assets/php/update_role.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                ci: currentUserID,   // Pass the currentUserID (id_persona or CI)
                id_rol: newRole      // Pass the new role value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const user = usersList.find(user => user.id_persona === currentUserID);  // Find user by id_persona
                if (user) {
                    user.id_rol = newRole;
                    renderUsersTable(usersList);  // Re-render the table with updated role
                }
                alert(data.message);
            } else {
                alert(data.message);
                console.error('Error al actualizar el rol:', data.message);
            }
        })
        .catch(error => {
            alert('Error al actualizar el rol: ' + error.message);
            console.error('Error en la solicitud:', error);
        });

        editModal.style.display = 'none';
    });

    // Function to delete (deactivate) a user
    window.deleteUser = function(userId) {
        if (confirm('¿Estás seguro de que quieres desactivar este usuario?')) {
            fetch('assets/php/deactivate_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    ci: userId,  // Send the user's ID or CI to the server
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    fetchUsers();  // Reload the user list after successful deletion
                } else {
                    alert(data.message);
                    console.error('Error al desactivar el usuario:', data.message);
                }
            })
            .catch(error => {
                alert('Error al desactivar el usuario: ' + error.message);
                console.error('Error en la solicitud:', error);
            });
        }
    };

    // Filter users based on search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredList = usersList.filter(user => 
            (user.nombre && user.nombre.toLowerCase().includes(searchTerm)) ||
            (user.ci && user.ci.toLowerCase().includes(searchTerm))
        );
        renderUsersTable(filteredList);
    });

    // Close the edit modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    });

    // Load users on page load
    fetchUsers();
});
