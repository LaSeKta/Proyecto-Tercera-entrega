// Function to activate a user (re-activate the user)
function activateUser(userId) {
    fetch('assets/php/activate_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            ci: userId  
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message);
            window.location.reload();  
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
        2: 'Usuario cliente fisioterapia',
        3: 'Entrenador',
        4: 'Usuario avanzado',
        5: 'Usuario administrativo',
        6: 'Usuario seleccionador',
    };

    
    const deactivatedUsersModal = document.getElementById('deactivatedUsersModal');
    const closeDeactivatedModal = document.getElementById('closeDeactivatedModal');

   
    document.getElementById('toggleDeactivatedUsers').addEventListener('click', function() {
        fetchDeactivatedUsers();  
                deactivatedUsersModal.style.display = 'block';  
    });

   
    closeDeactivatedModal.addEventListener('click', function() {
        deactivatedUsersModal.style.display = 'none';  
    });

    
    window.addEventListener('click', function(event) {
        if (event.target === deactivatedUsersModal) {
            deactivatedUsersModal.style.display = 'none';  
        }
    });


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

          
            const deactivatedUsersTable = document.getElementById('deactivatedUsers');
            deactivatedUsersTable.innerHTML = '';  

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

    
    function getRoleName(idRol) {
        return roleMap[idRol] || 'Rol Desconocido';
    }

    
    function fetchUsers() {
        fetch('assets/php/list_users.php', {
            method: 'GET',
        })
        .then(response => response.text())  
        .then(response => {
            console.log("Respuesta del servidor:", response); 

            try {
                const data = JSON.parse(response);  

                if (data.status === 'error') {
                    alert(data.message);
                    return;
                }

              
                if (Array.isArray(data)) {
                    usersList = data;
                    renderUsersTable(usersList);
                } else {
                    alert('Error: La respuesta del servidor no es válida.');
                }
            } catch (error) {
                
                console.log('Respuesta HTML del servidor, procesando como HTML...');
                document.getElementById('errorMessage').innerHTML = response; 
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

    
    window.editPermissions = function(userId) {
        currentUserID = userId;  
        const user = usersList.find(user => user.id_persona === userId); 
        if (user) {
            document.getElementById('editRole').value = user.id_rol;
            editModal.style.display = 'block';
        } else {
            alert('Usuario no encontrado para editar.');
            console.error('Usuario no encontrado:', userId);
        }
    };

    
    closeButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });


editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const newRole = document.getElementById('editRole').value;
    
    fetch('assets/php/update_role.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            ci: currentUserID,   
            id_rol: newRole      
        })
    })
    .then(response => response.text())  
    .then(text => {
        console.log("Respuesta completa del servidor:", text); 

        let data;
        try {
            data = JSON.parse(text);  
        } catch (error) {
            console.error('Error al parsear JSON:', error);
            alert('Error en la respuesta del servidor. Revisa la consola para más detalles.');
            return;
        }

        if (data.status === 'success') {
            const user = usersList.find(user => user.id_persona === currentUserID);  
            if (user) {
                user.id_rol = newRole;
                renderUsersTable(usersList);  
            }
            alert(data.message);
        } else {
            alert(data.message);
            console.error('Error al actualizar el rol:', data.message);
            console.error('Detalles del error:', data.error_detail); 
        }
    })
    .catch(error => {
        alert('Error al actualizar el rol: ' + error.message);
        console.error('Error en la solicitud:', error);
    });

    editModal.style.display = 'none';
});


    
    window.deleteUser = function(userId) {
        if (confirm('¿Estás seguro de que quieres desactivar este usuario?')) {
            fetch('assets/php/deactivate_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    ci: userId,  
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    fetchUsers();  
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

    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredList = usersList.filter(user => 
            (user.nombre && user.nombre.toLowerCase().includes(searchTerm)) ||
            (user.ci && user.ci.toLowerCase().includes(searchTerm))
        );
        renderUsersTable(filteredList);
    });

    
    window.addEventListener('click', (event) => {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    });

    
    fetchUsers();
});
