<?php
  include_once('../../config/init.php');
  
  session_destroy();
  
  header('Location: ' . $BASE_URL . "pages/authentication.php");
  header('Location: ../../pages/dashboard.php');
?>