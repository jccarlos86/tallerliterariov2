<?php
    include 'conexion.php';

    function ValidarUsuario($id){
        $result = "false";

        $query = "SELECT 
        perfilId 
        FROM Usuarios 
        WHERE perfilid = '$id' 
        AND estatus = '1'";

        $sel = $GLOBALS['con'] -> query($query);
        if($sel){
            $row_cnt = $sel->num_rows;
            if($row_cnt > 0){
                $result = "true";
            }
        }else{
            $result = die("Connection failed: validar usuario " . $sel->error);
        }
        return $result;
    }

    function ValidarCorreo($email){
        $result = "false";

        $query = "SELECT 
        correo 
        FROM Usuarios 
        WHERE correo = '$email'";

        $sel = $GLOBALS['con'] ->query($query);
        if($sel){
            $row_cnt = $sel->num_rows;
            if($row_cnt > 0) {
                $result = "true";
            }
        }else{
            $result = die("Connection failed: " . mysqli_connect_error());
        }
        return $result;
    }
    

?>