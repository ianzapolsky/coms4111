<?php

session_start();

if (empty($_SESSION['username'])) {
  if (empty($_POST['username'])) {
    die('No POST data!');
  } else {
    $_SESSION['username'] = $_POST['username'];
    header('Location: sb_index.php');
  }
} else {
  header('Location: sb_index.php');
}

?>
  
