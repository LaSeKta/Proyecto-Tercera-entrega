// JavaScript para gestionar el formulario
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const name = document.getElementById('userName').value;
    const surname = document.getElementById('userSurname').value;
    const ci = document.getElementById('userCI').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;
    const plan = document.getElementById('userPlan').value;

    // Añadir el usuario a la tabla de usuarios
    const userList = document.getElementById('users');
    const newUserRow = document.createElement('tr');
    newUserRow.innerHTML = `
        <td>${name}</td>
        <td>${surname}</td>
        <td>${ci}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${plan}</td>
    `;
    userList.appendChild(newUserRow);

    // Limpiar el formulario
    document.getElementById('userForm').reset();
});
