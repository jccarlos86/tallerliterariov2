<?php
    include '../conexion.php';

    $query = "SELECT 
        nombres, 
        apellidos, 
        usuario,
        acercaDe
        FROM Usuarios 
        WHERE estatus = '1' ORDER BY id DESC LIMIT 5";

    $sel = $con ->query($query);
    if($sel){
        while($row = mysqli_fetch_array($sel)){
            $nombre = $row['nombres'];
            $apellido = $row['apellidos'];
            $usuario = $row['usuario'];
            $acerca = $row['acercaDe'];
            $jsonArray[] = array(
                'Nombre' => $nombre, 
                'Apellido' => $apellido, 
                'Usuario' => $usuario,
                'Acerca' => $acerca
            );
        }
        $result = json_encode($jsonArray);
    }else{
        $result = die("Connection failed: " . mysqli_connect_error());
    }
    echo $result;
    mysqli_close($con);
?>