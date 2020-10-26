//------------------->funciones
function obtenerEscrito(){
    let req = {
        url: sesion.urls.leertexto,
        type: 'post',
        async: true,
        data: {
            id: sesion.escrito.id
        }
    };
    request(req);
}

function comentar(){
    var comment = escape($("#comentario").val());
    if(comment.length > 0){
        let req = {
            url: sesion.urls.comentar,
            type: 'post',
            async: true,
            data: {
                id: sesion.escrito.id,
                perfil: sesion.usuario.perfil,
                autor: getCookie("autorid"),
                comentario: comment,
            },
            beforeSend: loader(true)
        };
        request(req);
    }else{
        alert("el campo de comentario se encuentra vacio");
    }
}

function obtenerComentarios(){
    let req = {
        url: sesion.urls.obtenercomentarios,
        type: 'post',
        async: true,
        data: {
            idTexto: sesion.escrito.id,
            order: $("#filtroComentarios").val()
        }
    };
    request(req);
}

function insertarComentarios(data){
    var com = "";
    for(var c = 0; c < data.length; c++){
        com += sesion.templates.tarjetas.comentarios
        .replace("#comentario#", unescape(data[c].Comentario.replace(/%0A/g, "<br />")))
        .replace("#fecha#", data[c].Fecha)
        .replace("#usuario#", unescape(data[c].Usuario))
    }
    $("#userComments").html(com);
}

function modoVision(tipo){
    let bgremove;
    let bgadd;
    let txtremove;
    let txtadd;
    switch(tipo){
        case "diurno":
            bgremove = "bg-dark";
            bgadd = "bg-light";
            txtremove = "text-white";
            txtadd = "text-secondary";
            $("#diurno").parent().hide();
            $("#nocturno").parent().show();
            break;
        case "nocturno":
            bgadd = "bg-dark";
            bgremove = "bg-light";
            txtadd = "text-white";
            txtremove = "text-secondary";
            $("#diurno").parent().show();
            $("#nocturno").parent().hide();
            break;
    }
    $("body").removeClass(bgremove);
    $("body").addClass(bgadd);
    $(".lectura").removeClass(txtremove);
    $(".lectura").addClass(txtadd);
}

function insertarTexto(data){
    var texto = "";
    sesion.escrito.titulo = unescape(data[0].Titulo);
    // var cant_marcadores = "";
    //validar marcadores.
    if(sesion.marcadores != null){
        for(var m = 0; m < sesion.marcadores.length; m++){
            var index = sesion.marcadores[m].Index;
            var replace = data[index].Texto;
            var txt = replace.replace(sesion.marcadores[m].Texto, "<span class='marcador bg-warning'>"+sesion.marcadores[m].Texto+"</span>");
            data[index].Texto = txt;
        }
        // cant_marcadores = "<small> - "+ sesion.marcadores[0].Cantidad+" usuario(s) han marcado tu texto.</small>";
    }

    for(var d = 0; d < data.length; d++){
        texto += `<span data-index="${data[d].Index}" class="sel-text">${data[d].Texto}</span><br/>`;
        // texto += unescape(data[d].Texto) + "<br/>";
    }

    $("#titulo").html(sesion.escrito.titulo);
    $("#texto").html(unescape(texto));
    $("#autor").html("Autor: " + unescape(data[0].Autor));
    $('*[data-ver="0"]').click();
    reactionCount();
    loader(false);
}

function reactionCount(){
    let req = {
        url: sesion.urls.reactioncount,
        type: 'post',
        async: true,
        data: {
            id: sesion.escrito.id
        }
    };
    request(req);
}

function agregarReaccion(tipo){
    let req = {
        url: sesion.urls.agergarreaccion,
        type: 'post',
        async: true,
        data: {
            id: sesion.escrito.id,
            tipo: tipo,
            perfil: sesion.usuario.perfil,
            autor: getCookie("autorid")
        }
    };
    request(req);
}

function obtenerMarcadores(){
    let req = {
        url: sesion.urls.obtenermarcadores,
        type: 'post',
        async: true,
        data: {
            idTexto: sesion.escrito.id
        }
    };
    request(req).then(function(response){
        if(!response.startsWith("null") && !response.startsWith("Connection")){
            sesion.marcadores = JSON.parse(response);
            $("#alertMarcadores").show();
            $("#textoAlertaMarcador").html(`${sesion.marcadores[0].Cantidad} Usuario(s) han marcado tu texto. `);
        }
        obtenerEscrito();
    });
}

function textoSeleccionado(){
    let valid = window.getSelection();
    var inicio = window.getSelection().baseNode.parentElement.attributes[0].value;
    var fin = window.getSelection().extentNode.parentElement.attributes[0].value;

    if(parseInt(inicio) > -1 && parseInt(fin) > -1)

    // if($(valid.anchorNode.parentElement).data("index") != undefined &&
    //     valid.anchorNode.parentNode.className == "sel-text"
    // )
    {
        if(window.getSelection().type == "Range"){
            var seleccion = window.getSelection().toString();
            var splitSeleccion = seleccion.split("\n");
    
            // var inicio = window.getSelection().baseNode.parentElement.attributes[0].value;
            // // var fin = window.getSelection().extentNode.parentElement.attributes[0].value;
    
            for(var a = 0; a < splitSeleccion.length; a++){
                if(splitSeleccion[a].length > 0){
                    // console.log("index: " + inicio + " - texto: " + splitSeleccion[a]);
                    let req = {
                        url: sesion.urls.agregarmarcador,
                        type: 'post',
                        async: true,
                        data: {
                            perfil: sesion.usuario.perfil,
                            id: sesion.escrito.id,
                            marcador: escape(splitSeleccion[a]),
                            index: inicio
                        }
                    };
                    request(req);
                }
                inicio++;
            }
            var rango = window.getSelection().getRangeAt(0);
            var selectionContents = rango.extractContents();
            var etiqueta = document.createElement("b");
            etiqueta.appendChild(selectionContents);
            rango.insertNode(etiqueta);
            etiqueta.classList.add("bg-warning");
            etiqueta.classList.add("marcador");
        }else{
            alert("Para crear un nuevo marcador, primero debes seleccionar una parte del texto.");
        }
    }else{
        alert("solamente puedes crear marcadores dentro del texto del autor.");
    }
}

function VerMarcadores(mostrar){
    if(mostrar){

    }

    if(!mostrar){

    }
}

function widthEscrito(){
    if($(window).width() < 430) $(".contenedor-escrito, .contenedor-reacciones, #alertMarcadores").removeClass("w-75");
}

function InitMenuContextual(){
    //Ocultamos el menú al cargar la página
    $("#menuContextual").hide(); 
    /* mostramos el menú si hacemos click derecho
    con el ratón */
    $(document).bind("contextmenu", function(e){
        $("#menuContextual").css({'display':'block', 'left':e.pageX, 'top':e.pageY});
        return false;
    });
    //cuando hagamos click, el menú desaparecerá
    $(document).click(function(e){
        if(e.button == 0){
            $("#menuContextual").css("display", "none");
        }
    });
    //si pulsamos escape, el menú desaparecerá
    $(document).keydown(function(e){
        if(e.keyCode == 27){
            $("#menuContextual").css("display", "none");
        }
    });
    //controlamos los botones del menú
    $("#menuContextual").click(function(e){
        switch(e.target.id){
            case "btnNuevoMarcador":
                    textoSeleccionado();
                    break;      
            default:break;
        }
    });
}

//------------------->triggers
$(document).ready(function(){
    loader(true);
    $("#alertMarcadores").hide();
    if(checkCookie("perfilId") && checkCookie("escritoid")){
        sesion.usuario.perfil = getCookie("perfilId");
        sesion.escrito.id = getCookie("escritoid");
        obtenerMarcadores();
        modoVision("diurno");
        // obtenerEscrito();
        obtenerComentarios();
        widthEscrito();
        InitMenuContextual();
    }else{
        window.location.href = "perfil.html";
    }
});

$(".vision").click(function(){
    modoVision($(this).attr("id"));
});

$("#comentar").click(function(){
    comentar();
});

$(".reaccion").click(function(){
    agregarReaccion($(this).data("tipo"));
});

$("#filtroComentarios").change(obtenerComentarios);

$(".mostrar-marcadores").click(function(){
    // VerMarcadores($(this).data("ver") == "0" ? false: true);
    $(this).data("ver") == "0" ? $(".marcador").removeClass("bg-warning"): $(".marcador").addClass("bg-warning");
    $(".mostrar-marcadores").show();
    $(this).hide();
    // if(!mostrar){
    //     $(".marcador").removeClass("bg-warning");
    // }else{
    //     $(".marcador").addClass("bg-warning");
    // }

});