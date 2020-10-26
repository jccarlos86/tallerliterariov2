<?php
    include '../conexion.php';
    $id = $_POST['idTexto'];
    $order = $_POST['order'];
    //$autor = $_POST['autor'];

    $orderby;
    
    switch($order){
        case "reciente": 
            $order = "DESC";
        break;
        case "primeros":
            $order = "ASC";
        break;
    }

    $query = "SELECT c.comentario, c.fecha, u.usuario FROM Comentarios c 
        INNER JOIN Usuarios u 
        ON c.perfilId = u.perfilId
        WHERE c.textoId = $id
        ORDER BY c.fecha " . $order;

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

