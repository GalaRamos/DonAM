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
				var pagoDinero = 0;
				var pago="";
				var cant=0;
				var foto = "";

				for (var i=0; i< dataReceived.length; i++)
				{
					cant ++;
					var foto = "";
					if(dataReceived[i].paquete == "Taquiza"){
						var foto = '<img src="./assets/taquiza.png" alt="" class="img-thumbnail imagenCarrito">';
					}
					else if(dataReceived[i].paquete == "Cazuela"){
						var foto = '<img src="./assets/cazuela.jpg" alt="" class="img-thumbnail imagenCarrito">';
					}
					else{
						var foto = '<img src="./assets/antojito.jpg" alt="" class="img-thumbnail imagenCarrito">';
					}

					newHtml += '<tr>';
					newHtml += '<td>'+ foto + '</td>';
					newHtml += '<td class="tdTable">' + '<h3><strong>'+ dataReceived[i].paquete + '</strong></h3>'+ '<br>' + '<p><u>Nota en pedido:</u></p>' + dataReceived[i].comentarios+ '</td>';
					newHtml += '<td class="tdTable tdPersonas"><br><br>'+ dataReceived[i].personas + '</td>';
					newHtml += '<td class="tdTable tdPrecio"><br><br>' + ' $ ' + dataReceived[i].precio + '<td>';
					newHtml += '</tr>';

					pagoDinero = (+pagoDinero) + (+dataReceived[i].precio);
				}

				pago +='<h3>Pago</h3>';
				pago += '<p> TOTAL ( '+ cant + ' ordenes ): <strong>$ ' + pagoDinero + '</strong></p>';
				pago += '<button id="pagoOrden" type="submit" class="pago btn">Pagar <i class="fa fa-usd" aria-hidden="true"></i></button>';

				$("#tablaCarrito").append(newHtml);
				$("#pagoCarrito").append(pago);
			},
			error : function(errorMessage){
				//alert(errorMessage.statusText);
			}
 		});
	}

	});
