<?php
    include '../conexion.php';
    $idperfil = $_POST['idperfil'];

    $query = "SELECT 
        nombres, 
        apellidos, 
        usuario,
        contrasena,
        acercaDe
        FROM Usuarios WHERE perfilId = '$idperfil' 
        AND estatus = '1'";

    $sel = $con ->query($query);
    if($sel){
        while($row = mysqli_fetch_array($sel)){
            $nombre = $row['nombres'];
            $apellido = $row['apellidos'];
            $usuario = $row['usuario'];
            $pass = $row['contrasena'];
            $acerca = $row['acercaDe'];
            $jsonArray[] = array(
                'Nombre' => $nombre, 
                'Apellido' => $apellido, 
                'Usuario' => $usuario,
                'Contrasena' => $pass,
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