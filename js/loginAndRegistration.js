$(document).ready(function(){

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
