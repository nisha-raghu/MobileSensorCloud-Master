<?php
session_start();

if(isset($_SESSION['userid'])){
$src1= $_POST['userid'];
echo "welcome back". $_SESSION['userid']."  u have logged in";
}

?>

