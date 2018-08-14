<?php
	header('content-text:text/html; charset="utf-8"');
	error_reporting(0);
	$username = $_GET['username'];
	$password = $_GET['password'];
	
	echo "名字：$username,密码：$password";
	
	?>
	
	