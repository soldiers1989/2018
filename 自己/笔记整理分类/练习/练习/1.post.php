<?php	
	header('content-text:text/html; charset="utf-8"');
	error_reporting(0);
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	//echo "hello";
	echo "名字：$username,密码：$password";
