<?php
  include '../conexion.php';
  include '../validador.php';

  $perfilId = $_POST['perfil']; // quien marca
  $idTexto = $_POST['id']; // texto al que marca
  $marcador = $_POST['marcador']; // texto marcado
  $index = $_POST['index']; // index del texto marcado

  $isValidUser = ValidarUsuario($perfilId);
  if($isValidUser == "true"){
    $result;
    $setFecha = "NOW() - INTERVAL 5 HOUR + INTERVAL 5 MINUTE";
    $query = "INSERT INTO MarcadoresTextos(textoId, textoMarcado, indexTexto, fecha, usuarioMarcaId)
    VALUES('$idTexto', '$marcador', '$index', $setFecha, '$perfilId')";

    if ($con->connect_error) {
      $result = die("Connection failed: Error al conectar en la base de datos " . $con->connect_error);
    }else{
      if(mysqli_query($con, $query)){
        $result = "true";
      }else{
        $result = "Connection failed: Error al intentar guardar el marcador "
        . mysqli_error($con);
      }
    }
    echo $result;
    $con->close();

  }else{
    $result = $isValidUser;
    echo $result;
  }
?>