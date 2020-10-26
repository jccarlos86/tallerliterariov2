<?php
    include '../conexion.php';
    include '../validador.php';

    $id = $_POST['id'];
    $perfilId = $_POST['perfil'];

    $isValid = ValidarUsuario($perfilId);
    if($isValid == "true"){
        $delete = $con -> query("DELETE FROM TextosUsuarios WHERE idTexto = '$id' AND perfilId = '$perfilId'");
        if($delete){
            echo "true";
        }else{
            echo "false";
        }
        mysqli_close($con);
    }else{
        echo $isValid;
    }




    
?>