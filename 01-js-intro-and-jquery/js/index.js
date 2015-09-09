$(document).ready(function(){

		$(window).load(function() {

			// Practice - Point 5.
			$("#mainSection").hide().fadeIn(2000, function(){

				// Practice - Point 6.
				$(".alias").focus();
			});

		});

		// Manejo del evento click del boton
		$("#btnSearchAlbums").click(function(){

			// Practice - Point 7.
			var nombreUsuario = $(".alias").val();
			$.get("http://bootcamp.aws.af.cm/welcome/" + nombreUsuario, manejarRespuesta).error(manejarErrores);  

			
			// Recuperacion del nombre del artista ingresado por el usuario
			if ($("#artist").val() == "")
			{
				alert("Please enter an artist name");
			}

			else
			{
				var nombre = $("#artist").val();

				$.getJSON('https://api.spotify.com/v1/search', 
					{						
						// Practice - Point 11
						// q: 'Rolling Stones' 
						
						// Practice - Point 13
						q: nombre,
						type: 'Album'
					}, 
					function(json, textStatus) {
						
						// Practice - Point 11
						for (var i = 0 ; i < json.albums.items.length; i++) 
						{
							var article = "<article>";
					        var title ="<div class=\"column full\"><header><h3>"+ json.albums.items[i].name +"</h3></header></div>";
					        var type="<div class=\"column full\">"+ json.albums.items[i].type +"</div>";
					        var image="<div class=\"column full\"><img src=\""+ json.albums.items[i].images[0].url +"\" alt= \"Imagen Disco\"></div>";
					        var link="<div class=\"column full\"><a href=\""+ json.albums.items[i].external_urls.spotify +"\" alt= \"Link a spotify\"> Watch it on Spotify </a></div></article>";			        

							$("#albums").append(article+title+type+image+link); 
						} // end for
					}// end function success json				
				);// end getJSON
			}			
		}); // end click function

	}) // end ready.

	
	// Practice - Point 7 and 8.
	function manejarRespuesta(data) {	
		$("#mainSection").append("<p>" + data.response + "</p>");
	} // end manejarRespuesta

	
	// Practice - Point 9
	function manejarErrores() {
		$("#mainSection").css("color","#F00");
	} // end manejarErrores