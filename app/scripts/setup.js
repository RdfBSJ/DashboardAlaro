var server;
$(document).ready(function () {
    server = Servidor();
    ControlMenu();
    var flagtoken = localStorage.getItem('ticket') !== null ? true : false;
    var flagsession = localStorage.getItem('session') !== null ? true : false;
    if (flagtoken)
        if (flagsession)
            VerificarToken();
        else {
            ViewStartPage();
        }
    else {
        ViewStartPage();
    }
});

function ViewStartPage() {
    localStorage.removeItem('session');
    localStorage.removeItem('ticket');
    localStorage.removeItem('user');
    ViewLogin();
    ViewMenuLogout();
}

function VerificarToken() {
    var sesionid = localStorage.getItem('session');
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
            ViewHome();
        }
        else {
            ViewStartPage();
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

function ViewHome() {
    var data = {};
    var jqxhr = $.ajax({
        beforeSend: function () {
            WaitingTmpl();
        },
        type: "GET",
        url: "views/logged/home.html",
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

function ViewUnauthorized() {
    var data = {};
    var jqxhr = $.ajax({
        beforeSend: function () {
            WaitingTmpl();
        },
        type: "GET",
        url: "views/cuenta/unauthorized.html",
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

function ViewLogin() {
    var data = {};
    var jqxhr = $.ajax({
        beforeSend: function () {
            WaitingTmpl();
        },
        type: "GET",
        url: "views/cuenta/login.html",
        data: {},
        dataType: "html",
        contentType: "application/html; charset=utf-8"
    });
    jqxhr.done(function (p) {
        $('#app-tmpl').empty();
        $.template('login', p);
        $.tmpl('login', data).appendTo('#app-tmpl');
    });
    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
    });
    jqxhr.always(function (jqXHR, textStatus, errorThrown) {
    });
}

function ViewMenuLogout() {
    var data = {};
    var jqxhr = $.ajax({
        beforeSend: function () {
        },
        type: "GET",
        url: "views/logout/nav-bar.html",
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

function ViewLogout() {
    var data = {};
    var jqxhr = $.ajax({
        beforeSend: function () {
            WaitingTmpl();
        },
        type: "GET",
        url: "views/cuenta/logout.html",
        data: {},
        dataType: "html",
        contentType: "application/html; charset=utf-8"
    });
    jqxhr.done(function (p) {
        $('#app-tmpl').empty();
        $.template('logout', p);
        $.tmpl('logout', data).appendTo('#app-tmpl');
    });
    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
    });
    jqxhr.always(function (jqXHR, textStatus, errorThrown) {
    });
}



function ControlMenu() {
    //$('body').off('click', '.referencias a');
    $('body').on('click', '.referencias a', function (e) {
        e.preventDefault();
        var accion = $(this).attr('data-action');
        switch (accion) {
            case 'index':
                ViewStartPage();
                break;
            case 'dashboard':
                ViewHome();
                break;
            case 'gasto':
                ViewDataHightcharts();
                break;
            case 'gasto-utilidad':
                ViewDataAmCharts();
                break;
            case 'logout':
                ViewLogout();
                break;
            case 'login':
                ViewLogin();
                break;
            default:
                break;
        }
    })
}