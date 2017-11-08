<?php
	header('Content-type: application/json');
	header('Accept: application/json');
	require_once __DIR__ . '/dataLayer.php';

	$action = $_POST["action"];

	switch($action)
	{
		case "LOGIN" : loginFunction();
						break;
		case "REGISTRATION" : registrationFunction();
						break;
		case "SESSIONSERVICE" : sessionService();
						break;
		case "DELETESESSIONSERVICE" : deleteSessionService();
						break;
		case "COOKIESERVICE" : cookieService();
						break;
		case "ADDREVIEW" : addReviewFunction();
						break;
		case "LOADREVIEWS" : loadReviewsFunction();
						break;
		case "AGREGARCARRITO" : agregarCarritoFunction();
						break;
		case "MOSTRARCARRITO" : mostrarCarritoFunction();
						break;
	}

	function loginFunction()
	{
		$uName = $_POST["uName"];
		$rememberMe = $_POST["rememberMe"];

		$loginResponse = attemptLogin($uName, $rememberMe);

		if ($loginResponse["MESSAGE"] == "SUCCESS")
		{
			$decryptedPassword = decryptPassword($loginResponse['password']);

			$uPassword = $_POST["uPassword"];

			if($decryptedPassword == $uPassword)
			{
				$response = array("firstname"=>$loginResponse["firstname"], "lastname"=>$loginResponse["lastname"]);
				echo json_encode($response);
			}
		}
		else
		{
			genericErrorFunction($loginResponse["MESSAGE"]);
		}
	}

	function decryptPassword($password)
	{
		$key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
		$iv_size = @mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
		$ciphertext_dec = base64_decode($password);
		$iv_dec = substr($ciphertext_dec, 0, $iv_size);
    	$ciphertext_dec = substr($ciphertext_dec, $iv_size);
    	$password = @mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);

    	$count = 0;
    	$length = strlen($password);

    	for($i = $length - 1; $i >= 0; $i --)
    	{
    		if(ord($password{$i}) == 0)
    		{
    			$count ++;
    		}
    	}

    	$password = substr($password, 0, $length - $count);

    	return $password;
	}

	function genericErrorFunction($errorCode)
	{
		switch($errorCode)
		{
			case "500" : header("HTTP/1.1 500 Bad connection, portal down");
						 die("The server is down, we couldn't stablish the data base connection.");
						 break;
			case "406" : header("HTTP/1.1 406 User not found.");
						 die("Wrong credentials provided.");

		}
	}

	function registrationFunction()
	{
		$userFirstName = $_POST['fname'];
		$userLastName = $_POST['lname'];
		$userName = $_POST['username'];
		$userEmail = $_POST['email'];

		$userPassword = encryptPassword();

		$registrationResponse = attemptRegistration($userFirstName, $userLastName, $userName, $userPassword, $userEmail);

		if ($registrationResponse["MESSAGE"] == "SUCCESS")
		{
			echo json_encode("New record created successfully");
		}

		else
		{
				genericErrorFunction($registrationResponse["MESSAGE"]);
		}

	}

	function encryptPassword()
	{
		$userPassword = $_POST['passwrd'];
		$key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");

	    $key_size =  strlen($key);

	    $plaintext = $userPassword;

	    $iv_size = @mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = @mcrypt_create_iv($iv_size, MCRYPT_RAND);

	    $ciphertext = @mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);
	    $ciphertext = $iv . $ciphertext;
	    $userPassword = base64_encode($ciphertext);

	    return $userPassword;
	}

	function sessionService()
	{
		session_start();
	if (isset($_SESSION['firstname']) && isset($_SESSION['lastname']))
	{
		echo json_encode(array('fName' => $_SESSION['firstname'], 'lName' => $_SESSION['lastname'], 'username' => $_SESSION['username']));
	}
	else
	{
		header('HTTP/1.1 406 Favor de iniciar sesion.');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
	}

	function deleteSessionService()
	{
		session_start();
	if (isset($_SESSION['firstname']) && isset($_SESSION['lastname']))
	{
		unset($_SESSION['firstname']);
		unset($_SESSION['lastname']);
		unset($_SESSION['username']);
		session_destroy();
		echo json_encode(array('success' => 'Session deleted'));
	}
	else
	{
		header('HTTP/1.1 406 Session not found yet.');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
	}

	function cookieService()
	{
			if (isset($_COOKIE['cookieUsername'])){
			echo json_encode(array('cookieUsername' => $_COOKIE['cookieUsername']));
		}
		else
		{
			header('HTTP/1.1 406 Cookie not set yet.');
			die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
		}
	}

	function addReviewFunction()
	{
		session_start();
		$username = $_SESSION["username"];
		$review = $_POST["review"];

		$reviewResponse = attemptReview($username, $review);


		if ($reviewResponse["MESSAGE"] == "SUCCESS")
		{
			echo json_encode(array("username"=>$reviewResponse["username"]));

		}
		else
		{
			genericErrorFunction($reviewResponse["MESSAGE"]);
		}
	}

	function loadReviewsFunction()
	{
		$loadReviewResponse = attemptLoadReviews();

		echo json_encode($loadReviewResponse);
	}

	function agregarCarritoFunction()
	{
		session_start();
		$username = $_SESSION["username"];
		$paquete = $_POST["paquete"];
		$comentarios = $_POST["comentarios"];
		$numPersonas = $_POST["numPersonas"];

		$agregarCarritoResponse = attemptAgregarCarrito($username, $paquete, $comentarios, $numPersonas);


		if ($agregarCarritoResponse["MESSAGE"] == "SUCCESS")
		{
			echo json_encode(array('success' => 'Saved'));

		}
		else
		{
			genericErrorFunction($agregarCarritoResponse["MESSAGE"]);
		}
	}

	function mostrarCarritoFunction()
	{
		session_start();
		$username = $_SESSION["username"];

		$mostrarCarritoResponse = attemptMostrarCarrito($username);

		echo json_encode($mostrarCarritoResponse);
	}


?>
