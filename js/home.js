$(document).ready(function(){

	$("#addReview").on("click", addReview);
	loadReviews();
	//mostrarCarrito();

/*Show Pop Ups*/
	//Show Login
	$("#showLogin").on("click", function(){
		document.getElementById('LoginPop').style.display = "block";
	});
	//Show Registration
	$("#showRegist").on("click", function(){
		document.getElementById('RegistrationPop').style.display = "block";
	});
	//Hide Login
	$("#closelogin").on("click", function(){
		document.getElementById('LoginPop').style.display = "none";
	});
	//Hide Registration
	$("#closeregis").on("click", function(){
		document.getElementById('RegistrationPop').style.display = "none";
	});

//Cookie
	var jsonToSend = {
		"action" : "COOKIESERVICE"
	};

	$.ajax({
		url: "./data/applicationLayer.php",
		type: "POST",
		data : jsonToSend,
		dataType: "json",
		success : function(dataReceived){
			$("#username").val(dataReceived.cookieUsername);
		},
		error : function(errorMessage){
			//alert(errorMessage.statusText);
		}

	});


//Session
	$("#addReview").on("click", function(){
		var jsonToSend = {
			"action" : "SESSIONSERVICE"
		};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			dataType : "json",
			success : function(dataReceived){
			//$("h2").text(dataReceived.fName + " " + dataReceived.lName + " " + dataReceived.username);
			},
			error : function(errorMessage){
			alert(errorMessage.statusText);
			//window.location.replace("./TheJammer_A01280664.html");
			}
		});
	});


	$("#agregarCarrito").on("click", function(){
		var jsonToSend = {
			"action" : "SESSIONSERVICE"
		};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			dataType : "json",
			success : function(dataReceived){
			//$("h2").text(dataReceived.fName + " " + dataReceived.lName + " " + dataReceived.username);
			},
			error : function(errorMessage){
			alert(errorMessage.statusText);
			//window.location.replace("./TheJammer_A01280664.html");
			}
		});
	});

//Logout
	$("#logout").on("click", function(){
		var jsonToSend = {
			"action" : "DELETESESSIONSERVICE"
		};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			dataType : "json",
			success : function(dataReceived){
				alert(dataReceived.success);
				document.getElementById('showLogin').style.display = "block";
				document.getElementById('showRegist').style.display = "block";
			},
			error : function(errorMessage){
				alert(errorMessage.statusText);
			}
		});

	});

//Add reviews
	function addReview() {
				var review= $("#review").val();
				var valid = true;

				if(review == "" || review == " ") {
					$("#errorComment").text("* No se puede mandar un mensaje vacio *");
					valid = false;
				}
				else{
						if (review != "") {
						var jsonToSend = {
							"review" : review,
							"action" : "ADDREVIEW"
						};

						$.ajax({
							url: "./data/applicationLayer.php",
							type: "POST",
							data: jsonToSend,
							ContentType: "application/json",
							dataType: "json",
							success: function(data){
								var addReview = "";
								var addAlert = "";

								//Show a nice alert to say the comment was save
								addAlert += '<div class="alert alert-success alert-dismissible fade show showAlert" role="alert">';
						        addAlert += '<strong>Bien hecho!</strong> Tu comentario se guardo<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
						        addAlert += '<span aria-hidden="true">&times;</span></button>';
						        addAlert += '</div>';

								//Add the reviews to the review section
								addReview += '<div class="reseñasCarga">';
								addReview += '<h5 align = left class="reseñasText"><b>@' + data.username + '</b></h5>';
								addReview += '<p align = left class="reseñasText">' + $("#review").val() + '</p>';
								addReview += '</div>';

								$("#errorComment").text("");
								$("#addAlert").append(addAlert);
								//$("#review").textarea("");
								$("#loadReviews").append(addReview);
							},
							error: function(error){
								//alert(error.statusText);
								console.log(error.statusText);
							}
						});
					}
				}

			}

//Carga los reviews en la pagina
	function loadReviews() {
		var jsonToSend = {
			"action" : "LOADREVIEWS"
		};
		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			dataType : "json",
			success : function(data){
				console.log(data);
				var newHtml = "";
				for(var i = 0; i <data.length; i++) {
					newHtml += '<div class="reseñasCarga">';
					newHtml += '<h5 align = left class="reseñasText"><b>@' + data[i].username + '</b></h5>';
					newHtml += '<p align= left class="reseñasText">' + data[i].review + '</p>';
					newHtml += '</div>';
				}
				$("#loadReviews").append(newHtml);
			},
			error: function(errorMessage){
				alert(error.statusText);
			}
		});

	}

//Agrega el pedido al carrito en la base de datos
	$("#agregarCarrito").on("click", function()
	{
		var paquete = $("#paquetes").val();
		var comentarios = $("#comentarios").val();
		var numPersonas = $("#numPersonas").val();

		var jsonToSend = {
			"paquete" : paquete,
			"comentarios" : comentarios,
			"numPersonas" : numPersonas,
			"action" : "AGREGARCARRITO"
		};

		$.ajax({
			url: "./data/applicationLayer.php",
			type: "POST",
			data: jsonToSend,
			ContentType: "application/json",
			dataType: "json",
			success: function(data){
				mostrarCarrito();
				//Show a nice alert to say the comment was save
				var addAlert = "";
				addAlert += '<div class="alert alert-success alert-dismissible fade show showAlert" role="alert">';
				addAlert += '<strong>Guardada!</strong> Orden agregada al carrito<button type="button" class="close closeBut" data-dismiss="alert" aria-label="Close">';
				addAlert += '<span aria-hidden="true">&times;</span></button>';
				addAlert += '</div>';

				$("#addAlert").append(addAlert);

				},
				error: function(error){
					//alert(error.statusText);
					console.log(error.statusText);
				}
			});
	});

//Muestra los pedidos en el carrito
	function mostrarCarrito()
	{
		var jsonToSend = {
 			"action" : "MOSTRARCARRITO"
 		};

 		$.ajax({
 			url : "./data/applicationLayer.php",
 			type : "POST",
			ContentType: "application/json",
			data: jsonToSend,
			dataType : "json",
			success : function(dataReceived){

				var newHtml = "";

				for (var i=0; i< dataReceived.length; i++)
				{
					newHtml += '<div class= "marginFormat">' + '<div class= "cuadrito">'+ '<p align= center> <b> Username: </b>' + dataReceived[i].username + '</div>' + '<br>' + '</p>';
					newHtml += '<div class= "marginFormat">' + '<div class= "cuadrito">'+ '<p align= center> <b> Paquete: </b>' + dataReceived[i].paquete + '</div>' + '<br>' + '</p>';
					newHtml += '<div class= "marginFormat">' + '<div class= "cuadrito">'+ '<p align= center> <b> Comentarios: </b>' + dataReceived[i].comentarios + '</div>' + '<br>' + '</p>';
					newHtml += '<div class= "marginFormat">' + '<div class= "cuadrito">'+ '<p align= center> <b> Precio: </b>' + dataReceived[i].precio + '</div>' + '<br>' + '</p>';
				}
				console.log(dataReceived);
				newHtml += '</div>';
				$("#mostrarCarrito").append(newHtml);
			},
			error : function(errorMessage){
				alert(errorMessage.statusText);
			}
 		});
	}

	var jsonToSend = {
		"action" : "COOKIESERVICE"
	};

	$.ajax({
		url: "./data/applicationLayer.php",
		type: "POST",
		data : jsonToSend,
		dataType: "json",
		success : function(dataReceived){
			$("#username").val(dataReceived.cookieUsername);
		},
		error : function(errorMessage){
			//alert(errorMessage.statusText);
		}

	});


//Login
	$("#login").on("click", validateLogin);
		function validateLogin() {
		var valid= true;
		var name1, passw;

		name1 = $("#username").val();
		passw = $("#password").val();

		console.log(name1, passw);

		if (name1 == ""){
				$("#errorUsername").text("Please fill in your username");
				valid = false;
			}

		if(passw == ""){
				$("#errorPassword").text("Please fill in your password");
				valid = false;
			}

	if (valid){

			var username = $("#username").val();
			var password = $("#password").val();

			if (username != "" && password != ""){
				var jsonToSend = {
					"uName": username,
					"uPassword": password,
					"rememberMe" : $("#remember").is(":checked"),
					"action" : "LOGIN"
				};

				console.log(jsonToSend);

				$.ajax({
					url: "./data/applicationLayer.php",
					type: "POST",
					data: jsonToSend,
					ContentType: "application/json",
					dataType: "json",
					success: function(data){
						alert("Welcome back " + data.firstname + " " + data.lastname);
						mostrarCarrito();
						document.getElementById('LoginPop').style.display = "none";
						document.getElementById('showLogin').style.display = "none";
						document.getElementById('showRegist').style.display = "none";
						//document.getElementsByClassName('logoutButton').style.display = "";
					},
					error: function(error){
						alert(error.statusText);
						console.log("error");
					}
				});
			}
		}
	}

	//Registration

		$("#registration").on("click", validateSubmit);
		function validateSubmit() {
		var valid= true;
		var fname, lname, uname, mail, passw, passwconf;

		fname = $("#firstName").val();
		lname = $("#lastName").val();
		uname = $("#userName").val();
		mail = $("#email").val();
		passw = $("#password2").val();
		passwconf = $("#passwordConf").val();

		if (fname == ""){
			$("#errorFirstName").text("Please fill in your first name");
			valid = false;
		}

		if(lname == ""){
			$("#errorLastName").text("Please fill in your last name");
			valid = false;
		}

		if (uname == ""){
			$("#errorUsername2").text("Please fill in your username");
			valid = false;
		}

		if(mail == ""){
			$("#errorEmail").text("Please fill in your email");
			valid = false;
		}

		if (passw == ""){
			$("#errorPassword2").text("Please fill in your password");
			valid = false;
		}

		if(passwconf == ""){
			$("#errorPasswordConfirmation").text("Please fill in your password confirmation");
			valid = false;
		}

		if (passwconf != "" && passwconf!= passw){
			$("#errorPasswordConfirmation").text("Incorrect password confirmation");
			valid = false;
		}

		if (fname != ""){
			$("#errorFirstName").text("");
		}

		if(lname != ""){
			$("#errorLastName").text("");
		}

		if (uname != ""){
			$("#errorUsername2").text("");
		}

		if(mail != ""){
			$("#errorEmail").text("");
		}

		if (passwconf != "" && passwconf == passw){
			$("#errorPasswordConfirmation").text("");
		}

		if(passw != ""){
			$("#errorPassword2").text("");
		}

		if(valid){
			var fname = $("#firstName").val();
			var lname = $("#lastName").val();
			var username = $("#userName").val();
			var email = $("#email").val();
			var password = $("#password2").val();

			var jsonToSend = {
				"fname" : fname,
				"lname" : lname,
				"username" : username,
				"email" : email,
				"passwrd" : password,
				"action" : "REGISTRATION"
			};

			$.ajax({
				url : "./data/applicationLayer.php",
				type : "POST",
				data : jsonToSend,
				ContentType: "application/json",
				dataType: "json",
				success: function(data){
						alert("Bienvenido");
						console.log("hola");

					},
					error: function(error){
						console.log(error.statusText);
					}
				}
			);

		}
	}

});


/*Moverse en la pagina*/

//Ir a la pagina de reseñas
$("#resenas").on("click",function(){
			window.location.replace("./resenas.html");
	});
//Ir a la pagina de carrito
$("#carrito").on("click",function(){
			window.location.replace("./carrito.html");
	});
//Ir a la pagina de contacto
$("#contactanos").on("click",function(){
		window.location.replace("./contacto.html");
});

//Ir al inicio
$("#inicio").on("click",function(){
		window.location.replace("./home.html");
});

//Ir a la pagina de servicios
$("#servicios").on("click", function(){
	window.location.replace("./servicios.html");
});
