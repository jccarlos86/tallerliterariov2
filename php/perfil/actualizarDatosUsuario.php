<?php
    include '../conexion.php';
    include '../validador.php';

    $id = $_POST['idperfil'];
    $user = $_POST['usuario'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $acerca = $_POST['acerca'];
    $pass = $_POST['pass'];

    $result;
    $isValid = ValidarUsuario($id);
    if($isValid == "true"){
        $upd = $con -> query("UPDATE Usuarios 
        SET 
        usuario = '$user', 
        nombres = '$nombre', 
        apellidos = '$apellido',
        acercaDe = '$acerca',
        contrasena = '$pass'
        WHERE perfilId = '$id'");

        if($upd){
            $result = "true";
        }else{
            $result = die("Connection failed: " . mysqli_connect_error());
        }
        echo $result;
        mysqli_close($con);
    }else{
        $result = $isValid;
        echo $result;
    }
?>