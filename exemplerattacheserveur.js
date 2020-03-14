<html>

	<head>
		
	</head>
	<body>
			<nav></nav>
			<p></p>
			<footer></footer>
	</body>

	<script>
			const requete = new XMLHTTPRequest()

			requete.open("get", "http://localhost:2000", function(rep){
				document.querySelector("nav").innerHTML = rep
			})

		
		document.querySelector("p").innerHTML = "le corps de la page"
		document.querySelector("footer").innerHTML = "le pied de page"

	</script>
</html>