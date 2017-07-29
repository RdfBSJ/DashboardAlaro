var server;
$(document).ready(function () {
    server = Servidor();
    LoginUsuario();
})

function LoginUsuario() {
    var submit = false;
    $("#frm-login-usuario").submit(function (e) {
        e.preventDefault();
        var objUsuario = {
            "credenciales": {
                "Usuario": $("#Usuario").val(),
                "Contrasenia": $("#Contrasenia").val()
            }
        }
        var jqxhr = $.ajax({
            beforeSend: function () {
            },
            cache: false,
            type: 'POST',
            url: 'http://' + server + '/APIAlaro/Cliente/Autenticacion.svc/Login',
            data: JSON.stringify(objUsuario),
            crossDomain: true,
            dataType: "json",
            contentType: "application/json"
        });
        jqxhr.done(function (data) {
            if (data.Autenticado == true) {
                localStorage.setItem("ticket", data.Token);
                localStorage.setItem("session", data.IdSesion);
                console.log('El token fue generado correctamente y está cifrado en el cliente.')
                IniciarAplicacion(data.IdSesion);
            }
            else {
                Notificacion('error', 'bottom right', 'Error', data.Mensaje);
                console.log(data.Mensaje);
            }
        });
        jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        });
        jqxhr.always(function (jqXHR, textStatus, errorThrown) {
        });

        return false;
    })
}

function IniciarAplicacion(sesionid) {
    var usuario = {};
    var jqxhr = $.ajax({
        beforeSend: function () {
        },
        type: 'GET',
        url: 'http://' + server + '/APIAlaro/Cliente/Autenticacion.svc/Sesion/' + sesionid,
        data: usuario,
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('ticket')
        }
    });
    jqxhr.done(function (data) {
        if (data.Autenticado) {
            localStorage.setItem('user', window.btoa(JSON.stringify(data)));
            //window.location.href = "index.html";
            ViewHome();
        }
        else {
            Notificacion('error', 'bottom right', 'Error', data.Mensaje);
        }
    });
    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
            ViewUnauthorized();
        }
    });
    jqxhr.always(function (jqXHR, textStatus, errorThrown) {
    });
}