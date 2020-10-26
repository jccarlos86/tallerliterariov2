function validarPassword(){
    var pass1 = $("#password").val();
    var pass2 = $("#confirmPass").val();
    var mail = $("#email").val();
    if( mail.length > 0 &&
        pass1.length > 0 &&
        pass2.length > 0 ){
        if(pass1 == pass2){
            existeMail(mail);
        }else{
            alert("las contrasenas no coinciden.");
        }
    }else{
        alert("todos los campos deben ser completados.");
    }
}

function existeMail(email){
    let req = {
        url: sesion.urls.consultarmail,
        type: 'post',
        async: true,
        data: {
            email: email
        }
    };
    request(req);

    // $.ajax({
    //     data: {
    //         email: email
    //     },
    //     url:   '../php/index/consultarMail.php',
    //     type:  'post',
    //     beforeSend: function () {
    //         console.log("Validando correo...");
    //         loader(true);
    //     },
    //     success:  function (response) {
    //         loader(false);
    //         switch(true){
    //             case response == "true":
    //                 alert("El correo ya se encuentra registrado, prueba con otro correo");
    //                 break;
    //             case response == "false":
    //                 //crear usuario.
    //                 generarIdPerfil();
    //                 break;
    //             case response.startsWith("Formato"):
    //                 alert(response);
    //                 break;
    //             default:
    //                 console.log("Error: " + response);
    //                 break;
    //         }
    //     },
    //     error: function(error){
    //         console.log(error);
    //     }

    // });
}

function generarIdPerfil(){
    var id = Math.round(Math.random() * 999999);
    existeId(id);
}

function existeId(id){
    let req = {
        url: sesion.urls.consultarid,
        type: 'post',
        async: true,
        data: {
            pfid: id
        }
    };
    request(req).then(function(response){
        switch(response){
            case "true":
                console.log("el id ya existe, se generara uno nuevo...");
                generarIdPerfil();
            break;
            case "false":
                var pass = $("#password").val();
                var mail = $("#email").val();
                crearUsuario(mail, pass, id);
            break;
            default: 
                console.log("Error: " + response);
            break;
        }
    });

    // $.ajax({
    //     data: {
    //         pfid: id
    //     },
    //     url:   '../php/index/consultarId.php',
    //     type:  'post',
    //     beforeSend: function () {
    //         console.log("enviando datos para guardar en DB");
    //         loader(true);
    //     },
    //     success:  function (response) {
    //         switch(response){
    //             case "true":
    //                 console.log("el id ya existe, se generara uno nuevo...");
    //                 generarIdPerfil();
    //             break;
    //             case "false":
    //                 var pass = $("#password").val();
    //                 var mail = $("#email").val();
    //                 crearUsuario(mail, pass, id);
    //             break;
    //             default: 
    //                 console.log("Error: " + response);
    //             break;
    //         }
    //     },
    //     error: function(error){
    //         consoloe.log(error);
    //     }
    // });
}

function crearUsuario(email, password, perfilId){
    let req = {
        url: sesion.urls.crearusuario,
        type: 'post',
        async: true,
        data: {
            email: email,
            password: password,
            perfilid: perfilId
        }
    };
    request(req).then(function(response){
        switch(true){
            case response == "true":
                $("#modalRegistro").modal("hide");
                alert("Usuario creado exitosamente.");
                setTimeout(() => {
                    crearCookie("perfilId", perfilId);
                    window.location.href="perfil.html";
                }, 1500);
            break;
            case response.startsWith("Formato"):
                alert(response);
            break;
            default:
                console.log("Error: " + response);
            break;
        }
    });

    // $.ajax({
    //     data: {
    //         email: email,
    //         password: password,
    //         perfilid: perfilId
    //     },
    //     url:   '../php/index/crearUsuario.php',
    //     type:  'post',
    //     beforeSend: function () {
    //         console.log("Creando usuario...");
    //         loader(true);
    //     },
    //     success:  function (response) {
    //         switch(true){
    //             case response == "true":
    //                 $("#modalRegistro").modal("hide");
    //                 alert("Usuario creado exitosamente.");
    //                 setTimeout(() => {
    //                     crearCookie("perfilId", perfilId);
    //                     window.location.href="perfil.html";
    //                 }, 1500);
    //             break;
    //             case response.startsWith("Formato"):
    //                 alert(response);
    //             break;
    //             default:
    //                 console.log("Error: " + response);
    //             break;
    //         }
    //     },
    //     error: function (err){
    //         console.log(error);
    //     }
    // });
}

$("#crearUsuario").click(function(){
    validarPassword();
});