<?php
    include '../conexion.php';

    $id = $_POST['idTexto'];

    $query = "SELECT DISTINCT(indexTexto), textoMarcado FROM MarcadoresTextos
        WHERE textoId = $id ORDER BY indexTexto ASC";

    $usuariosMarca = "SELECT COUNT(DISTINCT(usuarioMarcaId)) AS total FROM `MarcadoresTextos`";

    $marcadores = $con -> query($usuariosMarca);
    if($marcadores){
        $rowMarcadores = $marcadores -> fetch_assoc();
        $cant_marcadores = $rowMarcadores['total'];
    }else{
        $result = die("Connection failed: Error al obtener la cantidad de marcadores " . mysqli_connect_error());
    }

    $sel = $con ->query($query);
    if($sel){
        while($row = mysqli_fetch_array($sel)){
            $index = $row['indexTexto'];
            $texto = $row['textoMarcado'];
            $jsonArray[] = array(
                'Index' => $index,
                'Texto' => $texto,
                'Cantidad' => $cant_marcadores
            );
        }
        $result = json_encode($jsonArray);
    }else{
        $result = die("Connection failed: " . mysqli_connect_error());
    }
    echo $result;
    mysqli_close($con);
?>

