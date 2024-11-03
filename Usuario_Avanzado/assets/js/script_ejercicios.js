$(document).ready(function () {
    cargarEjercicios();

    // Agregar o modificar ejercicio
    $('#agregar-ejercicio-btn').on('click', function () {
        const nombre = $('#ejercicio-nombre').val();
        const descripcion = $('#ejercicio-detalle').val();
        const tipo = $('#tipo-ejercicio').val();
        const id = $('#ejercicio-id').val() || ''; // Para modificación

        $.ajax({
            url: id ? 'assets/php/modificar_ejercicio.php' : 'assets/php/agregar_ejercicio.php',
            type: 'POST',
            data: { 'ejercicio-nombre': nombre, 'ejercicio-detalle': descripcion, 'tipo-ejercicio': tipo, 'ejercicio-id': id },
            success: function (response) {
                alert(response.message);
                $('#ejercicioForm')[0].reset();
                cargarEjercicios();
            },
            error: function () {
                alert('Error en la solicitud.');
            }
        });
    });

    // Cargar datos del ejercicio en el formulario al hacer clic
    $(document).on('click', '.editar-ejercicio', function () {
        const id = $(this).data('id');
        $.ajax({
            url: 'assets/php/obtener_ejercicio.php',
            type: 'POST',
            data: { id: id },
            success: function (response) {
                $('#ejercicio-nombre').val(response.nombre);
                $('#ejercicio-detalle').val(response.descripcion);
                $('#tipo-ejercicio').val(response.tipo);
                $('#ejercicio-id').val(response.id); // ID oculto para modificar
            }
        });
    });

    // Eliminar ejercicio
    $('#eliminar-ejercicio-btn').on('click', function () {
        const id = $('#ejercicio-id').val();
        if (id) {
            $.ajax({
                url: 'assets/php/eliminar_ejercicio.php',
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    alert(response.message);
                    $('#ejercicioForm')[0].reset();
                    cargarEjercicios();
                }
            });
        } else {
            alert('Seleccione un ejercicio para eliminar.');
        }
    });
});

// Función para cargar ejercicios
function cargarEjercicios() {
    $.ajax({
        url: 'assets/php/listar_ejercicios.php',
        type: 'GET',
        success: function (response) {
            console.log(response); // Verifica la respuesta aquí
            if (Array.isArray(response)) {
                let listado = '';
                response.forEach(function (ejercicio) {
                    listado += `<tr>
                        <td><a href="#" class="editar-ejercicio" data-id="${ejercicio.id}">${ejercicio.nombre}</a></td>
                        <td>${ejercicio.descripcion}</td>
                        <td>${ejercicio.tipo}</td>
                    </tr>`;
                });
                $('#planList').html(listado);
            } else {
                console.error('La respuesta no es un array:', response);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}
