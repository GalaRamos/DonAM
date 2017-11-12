$(document).ready(function(){
	mostrarCarrito();
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
          newHtml += '<div class= "">' + '<p align= center> <b> Username: </b>' + dataReceived[i].username + '</p>' + '</div>' + '<br>';
					newHtml += '<div class= "">' + '<p align= center> <b> Paquete: </b>' + dataReceived[i].paquete + '</p>' + '</div>' + '<br>';
					newHtml += '<div class= "">' + '<p align= center> <b> Comentarios: </b>' + dataReceived[i].comentarios + '</p>' + '</div>' + '<br>';
					newHtml += '<div class= "">' + '<p align= center> <b> Precio: </b>' + dataReceived[i].precio + '</p>' + '</div>' + '<br>';
				}
				newHtml += '</div>';
				$("#mostrarCarrito").append(newHtml);
			},
			error : function(errorMessage){
				//alert(errorMessage.statusText);
			}
 		});
	}

	});
