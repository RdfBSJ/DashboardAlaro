$(document).ajaxStart(function () { Pace.restart(); });

function Servidor() {
    //var host = "187.191.76.45";
    var host = "localhost";
    return host;
}

$.ajaxSetup({
    error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {
            NotificacionAutocerrada('error', 'bottom right', 'Error!!', 'Not connect: Verify Network.');
        } else if (jqXHR.status == 401) {
            NotificacionAutocerrada('error', 'bottom right', 'Error!!', 'Requested page Unauthorized [401]');
        } else if (jqXHR.status == 404) {
            NotificacionAutocerrada('error', 'bottom right', 'Error!!', 'Requested page not found [404]');
        } else if (jqXHR.status == 500) {
            NotificacionAutocerrada('error', 'bottom right', 'Error!!', 'Internal Server Error [500].');
        } else if (textStatus === 'parsererror') {
            NotificacionAutocerrada('error', 'bottom right', 'Error!!', 'Requested JSON parse failed.');
        } else if (textStatus === 'timeout') {
            NotificacionAutocerrada('error', 'bottom right', 'Error!!', 'Time out error.');
        } else if (textStatus === 'abort') {
            NotificacionAutocerrada('error', 'bottom right', 'Error!!', 'Ajax request aborted.');
        } else {
            NotificacionAutocerrada('error', 'bottom right', 'Error!!', jqXHR.responseText);
        }
    }
});

function GetValues(query) {
    var setValue = function (root, path, value) {
        if (path.length > 1) {
            var dir = path.shift();
            if (typeof root[dir] == 'undefined') {
                root[dir] = path[0] == '' ? [] : {};
            }

            arguments.callee(root[dir], path, value);
        } else {
            if (root instanceof Array) {
                root.push(value);
            } else {
                root[path] = value;
            }
        }
    };
    var nvp = query.split('&');
    var data = {};
    for (var i = 0 ; i < nvp.length ; i++) {
        var pair = nvp[i].split('=');
        var name = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);

        var path = name.match(/(^[^\[]+)(\[.*\]$)?/);
        var first = path[1];
        if (path[2]) {
            //case of 'array[level1]' || 'array[level1][level2]'
            path = path[2].match(/(?=\[(.*)\]$)/)[1].split('][')
        } else {
            //case of 'name'
            path = [];
        }
        path.unshift(first);

        setValue(data, path, value);
    }
    return data;
}

function Notificacion(tipo, posicion, titulo, mensaje) {
    //tipo:info,success,warning,error,black,white
    //posicion: bottom left, bottom right, top left, top right
    $.Notification.notify(
        tipo,
        posicion,
        titulo,
        mensaje
    )
}

function NotificacionAutocerrada(tipo, posicion, titulo, mensaje) {
    //tipo:info,success,warning,error,black,white
    //posicion: bottom left, bottom right, top left, top right
    $.Notification.autoHideNotify(
        tipo,
        posicion,
        titulo,
        mensaje
    )
}

function AnimarElemento(idelemento, animacion_prev, animacion_post) {
    var retardo = window.setTimeout(function () {
        $(idelemento).removeClass(animacion_prev)
    }, 1000);
    $(idelemento).addClass(animacion_post);
}

function WaitingTmpl() {
    $('#app-tmpl').html('<div class="text-center">' +
                        '<img src="../images/uploading.gif" width="40" height="40" />' +
                        '<h3 class="text-purple">Mostranto contenido</h3>' +
                        '</div>');
}