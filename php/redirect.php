<?php 
    include 'conexion.php';
    include 'validador.php';

    $email = $_POST['email'];
    if(empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)){
        $result = "Formato: El formato de e-mail no es correcto.";
    }else{
        $isValidMail = validarCorreo();
        if($isValidMail == "true"){
            $result = $isValidMail;
        }
    }

?>