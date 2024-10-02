document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const usersTable = document.getElementById('users');
    const editModal = document.getElementById('editModal');
    const closeButton = document.querySelector('.close-button');
    const editForm = document.getElementById('editForm');
    let usersList = [];
    let currentUserID = null;

    // Función para agregar un nuevo usuario
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtener datos del formulario
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;
        const userRole = document.getElementById('userRole').value;

        // Crear un nuevo usuario
        const newUser = {
            id: Date.now(),
            name: userName,
            email: userEmail,
            role: userRole,
            permissions: []
        };

        // Añadir usuario a la lista
        usersList.push(newUser);

        // Renderizar la tabla con los usuarios actualizados
        renderUsersTable();

        // Limpiar el formulario
        userForm.reset();
    });

    // Función para renderizar la tabla de usuarios
    function renderUsersTable() {
        usersTable.innerHTML = '';

        usersList.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.permissions.join(', ') || 'Sin permisos específicos'}</td>
                <td>
                    <button class="edit-button" onclick="editPermissions(${user.id})">Editar Permisos</button>
                    <button class="delete-button" onclick="deleteUser(${user.id})">Eliminar</button>
                </td>
            `;
            usersTable.appendChild(row);
        });
    }

    // Función para eliminar un usuario por ID
    window.deleteUser = function(userId) {
        usersList = usersList.filter(user => user.id !== userId);
        renderUsersTable();
    }

    // Función para abrir el modal y editar permisos y rol
    window.editPermissions = function(userId) {
        currentUserID = userId;
        const user = usersList.find(user => user.id === userId);
        if (user) {
            document.getElementById('editRole').value = user.role;
            document.getElementById('editPermissions').value = user.permissions.join(', ');
            editModal.style.display = 'block';
        }
    }

    // Cerrar el modal
    closeButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Guardar cambios desde el modal
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newRole = document.getElementById('editRole').value;
        const newPermissions = document.getElementById('editPermissions').value.split(',').map(p => p.trim());

        const user = usersList.find(user => user.id === currentUserID);
        if (user) {
            user.role = newRole;
            user.permissions = newPermissions;
            renderUsersTable();
        }

        editModal.style.display = 'none';
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    });
});