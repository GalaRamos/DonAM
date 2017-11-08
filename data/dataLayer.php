<?php

	function databaseConnection()
	{
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "DonAM";

		$conn = new mysqli($servername, $username, $password, $dbname);

		if ($conn->connect_error)
		{
			return null;
		}
		else
		{
			return $conn;
		}
	}

	function attemptLogin($userName, $rememberMe)
	{
		$connection = databaseConnection();

		if ($connection != null)
		{
			$sql = "SELECT * FROM Users WHERE username = '$userName'";
			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{

				if ($rememberMe == true)
				{
		    		setcookie("cookieUsername", $userName);
		    }
				while ($row = $result->fetch_assoc())
				{
					$response = array("firstname"=>$row["fName"], "lastname"=>$row["lName"], "password"=>$row["passwrd"], "MESSAGE"=>"SUCCESS");

					session_start();
			    if (! isset($_SESSION['firstname']))
			    {
			    	$_SESSION['firstname'] = $row['fName'];
			    }
			    if (! isset($_SESSION['lastname']))
			    {
			    	$_SESSION['lastname'] = $row['lName'];
			    }
			    if(! isset($_SESSION['username']))
			    {
			    	$_SESSION['username'] = $row['username'];
			    }
				}

				$connection->close();
				return $response;
			}
			else
			{
				$connection->close();
				return array("MESSAGE"=>"406");
			}
		}
		else
		{
			return array("MESSAGE"=>"500");
		}

	}

	function attemptRegistration($userFirstName, $userLastName, $userName, $userPassword, $userEmail)
	{
		$connection = databaseConnection();

		if ($connection != null)
		{
			$sql = "SELECT username FROM Users WHERE username = '$userName'";
			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{
					header('HTTP/1.1 409 Conflict, Username already in use please select another one');
					die("Username already in use.");
			}
			else
			{
					$sql = "INSERT INTO Users (fName, lName, username, passwrd, email) VALUES ('$userFirstName', '$userLastName', '$userName', '$userPassword', '$userEmail')";

					if (mysqli_query($connection, $sql))
					{
							$response = array("MESSAGE"=>"SUCCESS");
						session_start();
					    if (! isset($_SESSION['firstname']))
					    {
					    	$_SESSION['firstname'] = $userFirstName;
					    }
					    if (! isset($_SESSION['lastname']))
					    {
					    	$_SESSION['lastname'] = $userLastName;
					    }
					    if (! isset($_SESSION['username']))
					    {
					    	$_SESSION['username'] = $userName;
					    }
							$connection->close();
							return $response;
					}
					else
					{
						$connection->close();
						return array("MESSAGE"=>"500");
					}
			}
		}

		else {
			return array("MESSAGE"=>"500");
		}

	}

		function attemptReview($username, $review)
	{
		 $connection = databaseConnection();

		 if($connection != null)
		 {
		 	$sql = "SELECT username FROM Users WHERE username = '$userName'";
			$result = $connection->query($sql);

			if ($result->num_rows > 0){
		 		$sql = "INSERT INTO Reviews(username, review)
				VALUES ('$username', '$review');";
				if (mysqli_query($connection, $sql))
					{
							$response = array("username" => $username, "MESSAGE"=>"SUCCESS");
							$connection->close();
							return $response;
					}
					else
					{
						$connection->close();
						return array("MESSAGE"=>"500");
					}
				}
		}
		else {
			return array("MESSAGE"=>"500");
		}
	}

	function attemptLoadReviews()
	{
		 $connection = databaseConnection();

	if ($connection != null)
		{
			$sql = "SELECT username, review FROM Reviews";
			$result = $connection->query($sql);

		$response = array();

		if($result->num_rows > 0){
			$response = array();//"MESSAGE"=>"SUCCESS");
			while($row = mysqli_fetch_assoc($result)){
				$response[] = $row;
			}
			$connection->close();
			return $response;
		}
		else{
			$connection->close();
			return array("MESSAGE"=>"500");
		}
	}
	else {
			return array("MESSAGE"=>"500");
		}
	}

	function attemptAgregarCarrito($username, $paquete, $comentarios, $numPersonas)
	{
		 $connection = databaseConnection();

		 if($connection != null)
		 {
		 	$sql = "INSERT INTO Ordenes(username, paquete, comentarios, precio)
				VALUES ('$username', '$paquete', '$comentarios', $numPersonas * 70);";
				if (mysqli_query($connection, $sql))
					{
							$response = array("MESSAGE"=>"SUCCESS");
							$connection->close();
							return $response;
					}
					else
					{
						$connection->close();
						return array("MESSAGE"=>"500");
					}
		}
		else {
			return array("MESSAGE"=>"500");
		}
	}

	function attemptMostrarCarrito($username)
	{
		$connection = databaseConnection();

		if($connection != null)
		{
			$sql = "SELECT * FROM Ordenes WHERE username = '$username'";
			$result = $connection->query($sql);

			$response = array();

			if ($result->num_rows > 0)
			{
				$response = array();
				while ($row = mysqli_fetch_assoc($result))
					{
						$response[] = $row;
					}
				$connection->close();
				return $response;
			}
			else
			{
				$connection->close();
				return array("MESSAGE"=>"406");
			}
		}
		else
		{
			return array("MESSAGE"=>"500");
		}
	}
?>
