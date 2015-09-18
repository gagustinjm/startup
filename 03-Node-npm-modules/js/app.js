requirejs.config({
	baseUrl: 'js',// Base que usa para cargar los archivos (carpeta js)
	paths: {
		jquery: '../node_modules/jquery/dist/jquery' // los .. supone que empezamos desde js (al mismo nivel que node_modules), asociamos jquery al archivo en esa ruta
	}
});

requirejs(['movie'], function (movie) {
	
	// Practice - Point 7. (Alternative)
	var lotrMovie = new movie(
			"Lord of the Rings", 
			"Epic fantasy adventure films based on the novel The Lord of the Rings by J. R. R. Tolkien."
			);

	lotrMovie.setDirector("Peter Jackson");
	lotrMovie.get('director').set('quotes', ['"The best film ever"', '"Great History"']);


	console.log(lotrMovie.showMovie());

	// Practice - Point 2.2	
	lotrMovie.get('director').speak();	
});