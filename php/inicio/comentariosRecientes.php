<?php
    include '../conexion.php';

    $query = "SELECT comentario, fecha, perfilId, textoId FROM Comentarios 
        ORDER BY fecha DESC LIMIT 10";

    $sel = $con ->query($query);
    if($sel){
        while($row = mysqli_fetch_array($sel)){
            




            $com = $row['comentario'];
            $fecha = $row['fecha'];
            $user = $row['usuario'];
            $jsonArray[] = array(
                'Comentario' => $com, 
                'Fecha' => date("d/M/Y H:i:s", strtotime($fecha)), 
                'Usuario' => $user
            );
        }
        $result = json_encode($jsonArray);
    }else{
        $result = die("Connection failed: " . mysqli_connect_error());
    }
    echo $result;
    mysqli_close($con);
?>

