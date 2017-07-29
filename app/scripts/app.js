var server;
$(document).ready(function () {
    server = Servidor();
    ViewMenuLogged();
    NotificacionAutocerrada('success', 'top right', 'Sesión activa', 'Bienvenido a Indicadores Alaro.');
});



function ViewMenuLogged() {
    var data = JSON.parse(window.atob(localStorage.getItem('user')));
    var jqxhr = $.ajax({
        beforeSend: function () {
        },
        type: "GET",
        url: "views/logged/nav-bar.html",
        data: {},
        dataType: "html",
        contentType: "application/html; charset=utf-8"
    });
    jqxhr.done(function (p) {
        $('#nav-user').empty();
        $.template('menu', p);
        $.tmpl('menu', data).appendTo('#nav-user');
    });
    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
    });
    jqxhr.always(function (jqXHR, textStatus, errorThrown) {
    });
}

function ViewDataHightcharts() {
    var data = {};
    var jqxhr = $.ajax({
        beforeSend: function () {
            WaitingTmpl();
        },
        type: "GET",
        url: "views/charts/datosdrill.html",
        data: {},
        dataType: "html",
        contentType: "application/html; charset=utf-8"
    });
    jqxhr.done(function (p) {
        $('#app-tmpl').empty();
        $.template('data', p);
        $.tmpl('data', data).appendTo('#app-tmpl');
    });
    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
    });
    jqxhr.always(function (jqXHR, textStatus, errorThrown) {
    });
}

function ViewDataAmCharts() {
    var data = {};
    var jqxhr = $.ajax({
        beforeSend: function () {
            WaitingTmpl();
        },
        type: "GET",
        url: "views/charts/datos.html",
        data: {},
        dataType: "html",
        contentType: "application/html; charset=utf-8"
    });
    jqxhr.done(function (p) {
        $('#app-tmpl').empty();
        $.template('data', p);
        $.tmpl('data', data).appendTo('#app-tmpl');
    });
    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
    });
    jqxhr.always(function (jqXHR, textStatus, errorThrown) {
    });
}