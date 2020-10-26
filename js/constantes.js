var sesion = {
    usuario: {
        usuario: "",
        nombre: "", 
        apellido: "",
        acerca: "",
        password: "",
        perfil: 0
    },
    escrito: {
        id:0,
        version: 0,
        cantidadfilas: 0,
        titulo: "",
        texto:[],
        genero: "",
        reacciones:{
            likes: 0,
            dislikes: 0,
            insignias: 0
        },
        estatus:{
            libreta: 0,
            taller: 0
        },
        versiones: []
    },
    pantalla: {
        Wcontenedor: null
    },
    marcadores:[],
    urls:{
        //escritojs - ok
        leertexto: '../php/taller/leerTexto.php',
        comentar: '../php/taller/comentar.php',
        obtenercomentarios: '../php/taller/comentarios.php',
        reactioncount: '../php/taller/totalReacciones.php',
        agergarreaccion: '../php/taller/agregarReaccion.php',
        //escritorjs - ok
        datosescritor: '../php/escritor/datosEscritor.php',
        textosautor: '../php/escritor/textosAutor.php',
        //indexjs - ok
        accesar: '../php/index/accesar.php',
        //inicio .js
        usuariosrecientes: '../php/inicio/usuariosRecientes.php',
        //libretajs - ok
        obtenertexto: '../php/libreta/obtenerTexto.php',
        actualizar: '../php/libreta/actualizar.php',
        borrar: '../php/libreta/borrar.php',
        crear: '../php/libreta/crear.php',
        actualizartitulo: '../php/libreta/actualizarTitulo.php',
        actualizargenero: '../php/libreta/actualizarGenero.php',
        versionseleccionada: '../php/libreta/versionSeleccionada.php',
        getversiones: '../php/libreta/getVersiones.php',
        enviartextotaller: '../php/perfil/EnviarTextoTaller.php',
        nuevaversion: '../php/libreta/nuevaVersion.php',
        //perfils - 
        consultarid: '../php/perfil/consultarId.php',
        creartexto: '../php/perfil/crearTexto.php',
        obtener: '../php/obtener.php',
        datosusuario: '../php/perfil/datosUsuario.php',
        textosusuario: '../php/perfil/textosUsuario.php',
        actualizardatosusuario: '../php/perfil/actualizarDatosUsuario.php',
        eliminartexto: '../php/perfil/eliminarTexto.php',
        retirartextotaller: '../php/perfil/retirarTextoTaller.php',
        //registrojs - 
        consultarmail: '../php/index/consultarMail.php',
        crearusuario: '../php/index/crearUsuario.php',
        //tallerjs - 
        textostaller: '../php/taller/textosTaller.php',
        agregarmarcador: '../php/taller/agregarMarcador.php',
        obtenermarcadores: '../php/taller/obtenerMarcadores.php',

    },
    timer: {
        timerId: -1
    },
    templates:{
        reacciones: {
            insigniafill: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-award-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
          </svg>`,
          insignia: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-award" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z"/>
            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
        </svg>`,
        iconocomentarios:`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-square-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5a2 2 0 0 1 1.6.8L8 14.333 9.9 11.8a2 2 0 0 1 1.6-.8H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
        </svg>`,
        },
        tarjetas:{
            escritos:'<div class="card shadow">'+
                        '<h5 class="card-header titulo text-uppercase">#titulo#</h5>'+
                        '<div class="card-body">'+
                            '<p class="card-text texto">#texto#</p>'+
                            '<a href="#" data-ai="#autorid#" class="blockquote-footer autor text-capitalize text-primary pb-2 prevent-default">#autor#</a>'+
                            '<p class=""><span class="text-muted pb-2 genero">#genero#</span></p>'+
                            '<p class=""><span class="text-primary insignia">#insignia#</span>'+

                            '<span class="m-2">#iconocomentarios#</span>'+
                            '<span class="text-dark pb-3 comentarios">( #comentarios# )</span></p>'+

                            '<p class=""><small class="text-muted pb-2 fecha">#fecha#</small></p>'+
                            '<p><button data-ti="#textoid#" data-ai="#autorid#" type="button" class="btn btn-outline-primary ver-texto-taller">Ver mas</button></p>'+
                        '</div>'+
                    '</div>',
            comentarios:'<div class="card mb-2 shadow bg-transparent lectura">'+
                            '<div class="card-body shadow">'+
                                '<h5 class="card-title border-bottom">#usuario#</h5>'+
                                '<p class="card-text">#comentario#</p>'+
                                '<p class="card-text">'+
                                    '<small class="text-muted">#fecha#</small>'+
                                '</p>'+
                            '</div>'+
                        '</div>'
        },
        loader:'<div class="modal fade" id="modalLoader" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">'+
                    '<div class="modal-dialog modal-dialog-centered" role="document">'+
                        '<div class="modal-content bg-transparent border-0">'+
                            '<div class="text-center">'+
                                '<div class="lds-roller">'+
                                    '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
    }
};

//--------------------------------->Funciones
function loader(mostrar){
    if(mostrar){
        $("div[class^=container]").append(sesion.templates.loader);
        $("#modalLoader").modal("show");
    }
    if(!mostrar){
        setTimeout(() => {
            $("#modalLoader").modal("hide");
            $("#modalLoader, .modal-backdrop").remove();
            $("body").removeClass("modal-open");
        }, 500);
    }
}

function addOptionVersiones(maxVersion){
    var options = "";
    for(var d = maxVersion; d > 0; d--){
        options += "<option value = '" + d + "'>" + d + "</option>";
    }
    return options;
}

function crearCookie(nombre, valor) {
    var d = new Date();
    d.setDate(d.getDate() + 3);
    var caduca = "expires="+ d.toUTCString();
    document.cookie = encodeURI(nombre) + "=" + valor + ";" + caduca + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(nombre) {
    return getCookie(nombre) != "" ? true : false;
}

function removeCookie(nombre){
    crearCookie(nombre, "", -1);
}

function widthContenedor(){
    if($(window).width() < 430){
        let clases = $(".contenedor-flexible").attr("class").split(" ");
        clases.forEach(clase => {
            if(clase.startsWith("w-")){
                sesion.pantalla.Wcontenedor = clase;
                $(this).removeClass(clase);
            }
        });
    }

    if($(window).width() > 430 && sesion.pantalla.Wcontenedor != null){
        $(".contenedor-flexible").addClass(sesion.pantalla.Wcontenedor);
    }


    // if($(window).width() < 430) $(".contenedor-felxible, .contenedor-escrito, .contenedor-reacciones, #alertMarcadores").removeClass("w-75");
}

function request(req){
    return $.ajax({
        data: req.data,
        url:  req.url,
        type: req.type,
        async: req.async,
        beforeSend: function () {
            loader(true);
            req.beforeSend
        },
        success:  function (response) {
            validarSuccess(response, req.url);
        },
        error: function(error){
            validarError(error);
        }
    })
    .always(function(){
        loader(false);
    });
}

function validarSuccess(response, url){
    switch(url){
        //escritojs - ok
        case sesion.urls.leertexto:
            switch(true){
                case response != "null":
                    let data = JSON.parse(response);
                    insertarTexto(data);
                    break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
            }
        break;
        case sesion.urls.comentar:
            if(response == "true"){
                $("#comentario").val("");
                obtenerComentarios();
            }else if(response.startsWith("Connection")){
                alert("Error: " + response);
            }
            loader(false);
            break;
        case sesion.urls.obtenercomentarios:
            switch(true){
                // case response != "null":
                case !response.startsWith("null"):
                    let data = JSON.parse(response);
                    insertarComentarios(data);
                    break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
            }
            break;
        case sesion.urls.reactioncount:
            switch(true){
                case response != "null":
                    sesion.escrito.reacciones.dislikes = 0;
                    sesion.escrito.reacciones.likes = 0;
                    sesion.escrito.reacciones.insignias = 0;
                    let data = JSON.parse(response);
                    for(var r = 0; r < data.length; r++){
                        if(data[r].Reaccion == 0){
                            sesion.escrito.reacciones.dislikes = data[r].Total;
                        }else if(data[r].Reaccion == 1){
                            sesion.escrito.reacciones.likes = data[r].Total;
                        }else if(data[r].Reaccion == 2){
                            sesion.escrito.reacciones.insignias = data[r].Total;
                        }
                    }
                    break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
            }
            $("#cntDislikes").html(sesion.escrito.reacciones.dislikes);
            $("#cntLikes").html(sesion.escrito.reacciones.likes);
            $("#cntReconocimiento").html(sesion.escrito.reacciones.insignias);
            break;
        case sesion.urls.agergarreaccion:
            switch(true){
                case response.startsWith("true"):
                    reactionCount();
                    break;
                case response.startsWith("Mensaje"):
                    alert(response);
                    break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
            }
            break;
        //escritorjs - ok
        case sesion.urls.datosescritor:
            switch(true){
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
                case response != "null":
                    let data = JSON.parse(response);
                    $("#usuario").html(unescape(data[0].Usuario));
                    $("#nombre").html(unescape(data[0].Nombre));
                    $("#apellido").html(unescape(data[0].Apellido));

                    sesion.usuario.nombre = unescape(data[0].Nombre);
                    sesion.usuario.usuario = unescape(data[0].Usuario);
                    sesion.usuario.apellido = unescape(data[0].Apellido);
                    sesion.usuario.acerca = unescape(data[0].Acerca);

                    var acercade = sesion.usuario.acerca.split("\n");
                    var about = "";
                    for(var a = 0; a < acercade.length; a++){
                        (a + 1) == acercade.length ? about += unescape(acercade[a]) : about += unescape(acercade[a]) + "</br>";
                    }

                    $("#acercaDe").html(about);
                    
                    break;
            }
            break;
        case sesion.urls.textosautor:
            switch(true){
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    loader(false);
                    break;
                case response == "null":
                    loader(false);
                    break;
                case response != "null":
                    let data = JSON.parse(response);
                    crearTabla(data);
                    break;   
            }
            break;
        //accesarjs - ok
        case sesion.urls.accesar:
            switch(true){
                case response.startsWith("Formato"):
                    alert(response);
                break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                break;
                case response == "false":
                    alert("No se encontraron registros.");
                break;
                default: 
                    crearCookie("perfilId", response);
                    window.location.href = "inicio.html";
                break;
            }
            break;
        //libretajs - 
        case sesion.urls.obtenertexto:
            switch(true){
                case response.startsWith("Connection"):
                        console.log("Error: " + response);
                    break;
                case response != "null":
                    let data = JSON.parse(response);
                    sesion.escrito.cantidadfilas = data.length;
                    sesion.escrito.version = data[0].Version;
                    sesion.escrito.titulo = unescape(data[0].Titulo);
                    sesion.escrito.genero = unescape(data[0].Genero);
                    insertarTexto(data);
                    break;
            }
            break;
        case sesion.urls.actualizartitulo:
            switch(true){
                case response == "true":
                    // sesion.escrito.titulo = titulo;
                    // $("#titulo").html(titulo);
                    // mostrarEditar(false);
                    break;
                case response == "Duplicado":
                    alert("El titulo que intentas actualizar ya se encuentra asignado a otro texto.");
                    $("#titulo").html(sesion.escrito.titulo);
                    $("#tituloEditar").val(sesion.escrito.titulo);
                    break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
            }
            break;
        case sesion.urls.actualizargenero:
            switch(true){
                case response == "true":
                    // sesion.escrito.genero = genero;
                    mostrarEditar(false);
                    break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
            }
            break;
        case sesion.urls.versionseleccionada:
            if(response.startsWith("Connection:")){
                console.log("Error: " + response)
            }else if(response != "null"){
                let data = JSON.parse(response);
                verVersionSeleccionada(data);
            }
            break;
        case sesion.urls.getversiones:
            if(response.startsWith("Connection")){
                console.log("Error: " + response);
            }else if(response != "null"){
                let data = JSON.parse(response);
                diferenciasVersiones(data);
            }
            break;
        case sesion.urls.enviartextotaller:
            switch(true){
                case response.startsWith("Connection"):
                    loader(false);
                    console.log("Error: " + response);
                    break;
                case response.startsWith("true"):
                    window.location = "perfil.html";
                    break;   
                case response.startsWith("Invalido"):
                    alert(response);
                    break;
            }
            break;
        case sesion.urls.nuevaversion:
            // if(response === "true") {
            //     setTimeout(() => {
            //         window.location.reload();
            //     }, 1000);
            // }else if(response.startsWith("Connection")) console.log("Error: " + response);
            break;
        case sesion.urls.creartexto:
            switch(response){
                case "true":
                    if(!$("#irTexto").prop("checked")){
                        cargarTextos();
                        $("#tituloTexto").val("");
                        $("#generoTexto").val("");
                    }
                    break;
                case "duplicado":
                    loader(false);
                    alert("ya has creado un texto con el mismo nombre.");
                    break;
                default:
                    loader(false);
                    console.log(response);
                    break;
            }
            break;
        case sesion.urls.datosusuario:
            switch(true){
                case response.startsWith("Connection"):
                    break;
                case response != "null":
                    let data = JSON.parse(response);
                    $("#usuario").html(unescape(data[0].Usuario));
                    $("#nombre").html(unescape(data[0].Nombre));
                    $("#apellido").html(unescape(data[0].Apellido));

                    sesion.usuario.nombre = unescape(data[0].Nombre);
                    sesion.usuario.usuario = unescape(data[0].Usuario);
                    sesion.usuario.apellido = unescape(data[0].Apellido);
                    sesion.usuario.password = unescape(data[0].Contrasena);
                    sesion.usuario.acerca = unescape(data[0].Acerca);

                    var acercade = sesion.usuario.acerca.split("\n");
                    var about = "";
                    for(var a = 0; a < acercade.length; a++){
                        (a + 1) == acercade.length ? about += unescape(acercade[a]) : about += unescape(acercade[a]) + "</br>";
                    }

                    $("#acercaDe").html(about);
                    
                    break;
            }
            break;
        case sesion.urls.textosusuario:
            switch(true){
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    loader(false);
                    break;
                case response == "null":
                    loader(false);
                    break;
                case response != "null":
                    let data = JSON.parse(response);
                    crearTabla(data);
                    break;   
            }
            break;
        case sesion.urls.actualizardatosusuario:
            switch(true){
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    loader(false);
                    break;
                case response == "true":
                    window.location.reload();
                    break;   
            }
            break;
        case sesion.urls.eliminartexto:
            switch(true){
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
                case response == "true":
                    alert("Texto eliminado correctamente.");
                    window.location.reload();
                    break;   
            }
            break;
        case sesion.urls.retirartextotaller:
            switch(true){
                case response.startsWith("Connection"):
                    loader(false);
                    console.log("Error: " + response);
                    break;
                case response.startsWith("true"):
                    window.location.reload();
                    break;   
            }
            break;
        //registrojs - 
        case sesion.urls.consultarmail:
            switch(true){
                case response == "true":
                    alert("El correo ya se encuentra registrado, prueba con otro correo");
                    break;
                case response == "false":
                    //crear usuario.
                    generarIdPerfil();
                    break;
                case response.startsWith("Formato"):
                    alert(response);
                    break;
                default:
                    console.log("Error: " + response);
                    break;
            }
            break;
        //tallerjs - 
        case sesion.urls.textostaller:
            switch(true){
                case response != "null":
                    let data = JSON.parse(response);
                    pegartextos(data);
                    break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
                case "null":
                    alert("No se encontraron textos.");
                    loader(false);
                    break;
            }
            break;
        case sesion.urls.obtenermarcadores:
            let data = JSON.parse(response);
            console.log(data);
            break;
        //inicio js
        case sesion.urls.usuariosrecientes:
            switch(true){
                case response != "null":
                    let data = JSON.parse(response);
                    AddCurrentUsers(data);
                    break;
                case response.startsWith("Connection"):
                    console.log("Error: " + response);
                    break;
            }
            break;

        


            default: break;
    }
}

function ValiadateNullResponse(){

}

function validarError(error, url){
    switch(url){
        case sesion.urls.comentar:
            loader(false);
            alert("Error", error);
            break;
        default: 
            loader(false);
            console.log(error);
        break;
    }
}

// function parametrosUrl(){
//     var result = {};
//     window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
//         result[key] = value;
//     });
//     return result;
// }

//------------------------------->triggers
$(document).ready(function(){
    //validar mayusculas y minusculas
    jQuery.expr[':'].Contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
    };
});

$(".prevent-default").click(function(evt){
    evt.preventDefault();
});

$(window).resize(widthContenedor);