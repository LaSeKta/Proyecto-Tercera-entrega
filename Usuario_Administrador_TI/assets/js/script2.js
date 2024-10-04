document.addEventListener('DOMContentLoaded', () => {
    const usersTable = document.getElementById('users');
    const editModal = document.getElementById('editModal');
    const closeButton = document.querySelector('.close-button');
    const editForm = document.getElementById('editForm');
    const searchInput = document.getElementById('searchInput');
    let usersList = [];
    let currentUserID = null;

    const roleMap = {
        0: 'Usuario',
        1: 'Usuario cliente',
        2: 'Entrenador',
        3: 'Usuario avanzado',
        4: 'Usuario administrativo',
        5: 'Usuario seleccionador',
    };

    function getRoleName(idRol) {
        return roleMap[idRol] || 'Rol Desconocido';
    }

    // Función para obtener usuarios desde el servidor
    function fetchUsers() {
        fetch('assets/php/list_users.php', {
            method: 'GET',
        })
        .then(response => response.text()) // Asumimos que el servidor podría devolver JSON o HTML
        .then(response => {
            console.log("Respuesta del servidor:", response); // Mostrar la respuesta en la consola
    
            try {
                const data = JSON.parse(response); // Intentar parsear como JSON
    
                if (data.status === 'error') {
                    alert(data.message);
                    return;
                }
    
                // Si es un array, renderizar la tabla
                if (Array.isArray(data)) {
                    usersList = data;
                    renderUsersTable(usersList);
                } else {
                    alert('Error: La respuesta del servidor no es válida.');
                }
            } catch (error) {
                // Si el texto no es JSON válido, asumimos que es HTML
                console.log('Respuesta HTML del servidor, procesando como HTML...');
                document.getElementById('errorMessage').innerHTML = response; // Mostrar el HTML en algún contenedor
            }
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            alert('Error al obtener usuarios: ' + error);
        });
    }
    
    
    // Función para renderizar la tabla de usuarios
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
                <td>${user.ci || 'N/A'}</td>
                <td>${getRoleName(user.id_rol)}</td>
                <td>
                    <button class="edit-button" onclick="editPermissions('${user.ci}')">Editar</button>
                    <button class="delete-button" onclick="deleteUser('${user.ci}')">Eliminar</button>
                </td>
            `;
            usersTable.appendChild(row);
        });
    }

    // Función para editar permisos
    window.editPermissions = function(userId) {
        currentUserID = userId;
        const user = usersList.find(user => user.ci === userId);
        if (user) {
            document.getElementById('editRole').value = user.id_rol;
            editModal.style.display = 'block';
        } else {
            alert('Usuario no encontrado para editar.');
            console.error('Usuario no encontrado:', userId);
        }
    };

    // Cerrar el modal de edición al hacer clic en el botón de cierre
    closeButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Guardar los cambios de rol al enviar el formulario
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
                id_rol: newRole,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const user = usersList.find(user => user.ci === currentUserID);
                if (user) {
                    user.id_rol = newRole;
                    renderUsersTable(usersList);
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

    // Función para eliminar usuario
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

    // Función para filtrar usuarios en base a la búsqueda
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredList = usersList.filter(user => 
            (user.nombre && user.nombre.toLowerCase().includes(searchTerm)) ||
            (user.ci && user.ci.toLowerCase().includes(searchTerm))
        );
        renderUsersTable(filteredList);
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    });

    // Cargar los usuarios al iniciar
    fetchUsers();
});
