//-------->funciones
function validarCredenciales(){
    var mail = $("#emailIngreso").val();
    var pass = $("#passwordIngreso").val();
    if(mail.length > 0 && pass.length > 0){
        accesoUsuario(mail, pass);
    }else{
        alert("Todos los campos deben ser llenados.");
    }
}

function accesoUsuario(mail, pass){
    let req = {
        url: sesion.urls.accesar,
        type: 'post',
        async: true,
        data: {
            email: mail,
            password: pass
        }
    };
    request(req);
}

//-------->triggers
$(document).ready(function(){
    //if(checkCookie("perfilId")) window.location.href = "perfil.html";
});

$("#ingresar").click(function(){
    validarCredenciales();
});