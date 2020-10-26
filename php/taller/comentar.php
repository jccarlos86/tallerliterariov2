<?php
  include '../conexion.php';
  include '../validador.php';

  $perfilId = $_POST['perfil'];
  $idTexto = $_POST['id'];
  $autor = $_POST['autor'];
  $comment = $_POST['comentario'];

  $isValidUser = ValidarUsuario($perfilId);
  if($isValidUser == "true"){
    $result;
    $setFecha = "NOW() - INTERVAL 5 HOUR + INTERVAL 5 MINUTE";
    $query = "INSERT INTO Comentarios(perfilId, comentario, fecha, textoId, autorId)
    VALUES($perfilId, '$comment', NOW() - INTERVAL 5 HOUR + INTERVAL 5 MINUTE, $idTexto, $autor)";

    if ($con->connect_error) {
      $result = die("Connection failed: Error al conectar en la base de datos " . $con->connect_error);
    }else{
      if(mysqli_query($con, $query)){
        $result = "true";
      }else{
        $result = "Connection failed: Error al intentar guardar los datos "
        . mysqli_error($con);
      }
    }
    echo $result;
    // mysqli_close($con);
    $con->close();

  }else{
    $result = $isValidUser;
    echo $result;
  }
?>