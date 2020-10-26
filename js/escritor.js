// function consultar(tp, ttl, idtx, idus){
//     let req = {
//         url: sesion.urls.obtenerescrito,
//         type: 'post',
//         async: true,
//         data: {
//             tp: tp,
//             ttl: ttl,
//             idtx: idtx,
//             idus: idus
//         }
//     };
//     request(req);

//     // $.ajax({
//     //     data: {
//     //         tp: tp,
//     //         ttl: ttl,
//     //         idtx: idtx,
//     //         idus: idus
//     //     },
//     //     url:   '../php/obtener.php',
//     //     type:  'post',
//     //     beforeSend: function () {
//     //     },
//     //     success:  function (response) {
//     //     }
//     // });
// }

function cargarDatosAutor(){
    let req = {
            url: sesion.urls.datosescritor,
            type: 'post',
            async: true,
            data: {
                idautor: getCookie("autorid")
            }
        };
        request(req);
}

//este si queda
function cargarTextos(){
    let req = {
        url: sesion.urls.textosautor,
        type: 'post',
        async: true,
        data: {
            idautor: getCookie("autorid")
        }
    };

    request(req);
}
//este se queda
function crearTabla(data){
    var rowsPerfil = "";
    sesion.escrito.estatus.taller = data.length;
    for(var d = 0; d < data.length; d++){
        rowsPerfil += `<tr>
            <td>
                <span>${d+1}</span>
            </td>
            <td class = 'titulos'>
                <a class='ver-texto prevent-default' data-ti='${data[d].ID}' data-ttx="${unescape(data[d].Titulo)}" href='#'>
                    <span>
                        ${unescape(data[d].Titulo)}
                    </span>
                </a>
            </td>
            <td class="genero">
                <span>${unescape(data[d].Genero)}</span>
            </td>
        </tr>`;
                 
    }
    $("#tblTextos tbody").html(rowsPerfil);
    $("#textosTaller").html(sesion.escrito.estatus.taller);
    loader(false);
}

function buscarTexto(texto, filtro){
    if(texto.length > 0){
        $("#tblTextos tbody tr").hide();
        switch(filtro){
            case "contenga":
                $("#tblTextos tbody td span:Contains('" + texto + "')").closest('tr').show();
                break;
            // case "no-contenga":
            //     $("#tblTextos tbody td span:not(:Contains('" + texto + "'))").closest('tr').show();
            //     break;
            case "inicie":
                $("#tblTextos tbody td span").each(function(){
                    var palabra = $(this).text();
                    if(palabra.startsWith(texto)){
                        $(this).closest("tr").show();
                    }
                });
                break;
            case "termine":
                $("#tblTextos tbody td span").each(function(){
                    var palabra = $(this).text();
                    if(palabra.endsWith(texto)){
                        $(this).closest("tr").show();
                    }
                });
                break;
            case "exacto":
                $("#tblTextos tbody td span").each(function(){
                    var palabra = $(this).text();
                    if(palabra == texto){
                        $(this).closest("tr").show();
                    }
                });
                break;
            default: break;
        }
    }else{
        $("#tblTextos tbody tr").show();
    }
}

function filtroTextos(filtro){
    $(".texto-libreta").closest("tr").hide();
    switch(filtro){
        case "libreta":
            $(".texto-libreta[data-tipo='0']").closest("tr").show();
            break;
        case "taller":
            $(".texto-libreta[data-tipo='1']").closest("tr").show();
            break;
        case "todos":
            $(".texto-libreta").closest("tr").show();
            break;
        default: break;
    }
}

//----------------------------->triggers
$(document).ready(function(){
    loader(true);
    if(checkCookie("autorid") && checkCookie("perfilId")){
        cargarDatosAutor();
        cargarTextos();
    }else{
        window.location.href = "index.html";
    }
});

$("#buscarTexto").keyup(function(){
    buscarTexto($(this).val(), $("#inputFiltro").val());
});

$(".filtro-texto").click(function(){
    filtroTextos($(this).data("filtro"));
});

$(document).on("click", ".ver-texto", function(){
    crearCookie("escritoid", $(this).data("ti"));
    window.location.href = "escrito.html";
});