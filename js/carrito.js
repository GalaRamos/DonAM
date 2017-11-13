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
				var foto = "";

				for (var i=0; i< dataReceived.length; i++)
				{
					var foto = "";
					if(dataReceived[i].paquete == "Taquiza"){
						var foto = '<img src="./assets/taquiza.png" alt="" class="imagenCarrito">';
					}
					else if(dataReceived[i].paquete == "Cazuela"){
						var foto = '<img src="./assets/cazuela.jpg" alt="" class="imagenCarrito">';
					}
					else{
						var foto = '<img src="./assets/antojito.jpg" alt="" class="imagenCarrito">';
					}

					newHtml += '<tr>';
					newHtml += '<td>'+ foto + '</td>';
					newHtml += '<td class="tdTable">' + '<h3><strong>'+ dataReceived[i].paquete + '</strong></h3>'+ '<br>' + '<p><u>Nota en pedido:</u></p>' + dataReceived[i].comentarios+ '</td>';
					newHtml += '<td class="tdTable tdPersonas"><br><br>'+ dataReceived[i].personas + '</td>';
					newHtml += '<td class="tdTable tdPrecio"><br><br>' + ' $ ' + dataReceived[i].precio + '<td>';
					newHtml += '</tr>';
				}
				$("#tablaCarrito").append(newHtml);
			},
			error : function(errorMessage){
				//alert(errorMessage.statusText);
			}
 		});
	}

	});
