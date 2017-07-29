var server;
$(document).ready(function () {
    server = Servidor();
    var existe = localStorage.getItem('ticket') !== null ? true : false;
    if (existe) {
        LogoutUsuario();
    }
    else {
        NotificacionAutocerrada('warning', 'top left', 'Atención', 'No se encontro ningún token válido, no hay ninguna sesión.');
        console.log('No se encontro ningún token válido, no hay ninguna sesión.')
        ViewStartPage();
    }
});

function LogoutUsuario() {
    var sesionid = localStorage.getItem('session');
    var usuario = {
        "cliente": {
            "IdSesion": sesionid
        }
    };
    var jqxhr = $.ajax({
        beforeSend: function () {
        },
        type: 'PUT',
        url: 'http://' + server + '/APIAlaro/Cliente/Autenticacion.svc/Logout',
        data: JSON.stringify(usuario),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('ticket')
        }
    });
    jqxhr.done(function (data) {
        if (data.Mensaje === "Cerrado") {
            NotificacionAutocerrada('success', 'top left', 'Sesión terminada', 'Su cuenta de usuario ha sido cerrada correctamente.');
            console.log('El token fue removido del cliente y su sesión fue cerrada.')
            ViewStartPage();
        }
    });
    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
            ViewStartPage();
        }
    });
    jqxhr.always(function (jqXHR, textStatus, errorThrown) {
    });
}