function UsuariosRecientes(){
    let req = {
        url: sesion.urls.usuariosrecientes,
        type: 'post',
        async: true,
        data: {}
    };
    request(req);
}

function AddCurrentUsers(users){
    //crear tarjetas de presentacion
}