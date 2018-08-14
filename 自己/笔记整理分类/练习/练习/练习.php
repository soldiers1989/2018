<?php
	header('content-text:text/html; charset="utf-8"');
	error_reporting(0);
	$username = $_POST['username'];
	$password = $_POST['pasword'];
	
	echo "名字:$username,密码:$password";
	
	
	$arr1 = array('username' =>'lily' ,'age'=>'18' );
	
	echo json_encode($arr1);
	
	
	
	
	?>











