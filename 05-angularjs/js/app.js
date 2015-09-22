var app = angular.module('moviesApp', ['ngRoute']); 

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    	when('/', {
        	templateUrl: 'views/main.html',
        	controller: 'moviesController'
      	}).
      
      	when('/movie-description/:movieId', {
        	templateUrl: 'views/movie-description.html',
        	controller: 'descriptionController'
      	}).
      	
      	otherwise({
        	redirectTo: 'views/main.html'
      	});
}]); 

/* -------------------------------------------- MOVIES CONTROLLER ---------------------------------------------------------- */
app.controller('moviesController', ['$scope', 'movieService',  function ($scope, movieService) { 

	$scope.listMovies = movieService.getMovies();
	$scope.editPanel = false;
	$scope.movieIndex = null;
		
	$scope.showEditPanel = function(index) {
		if (!$scope.editPanel) {

			$scope.editPanel = true;
			$scope.movieIndex = index;
			var currentMovie = $scope.listMovies[index];

			var movieToEdit = {
				name: currentMovie.name,
				director: currentMovie.director,
				image: currentMovie.image,
				description: currentMovie.description
			};

			$scope.movieEdit = movieToEdit;
			scrollToMenu();

		} else {

			$scope.editPanel = false;
			$scope.movieIndex = null;
		}
	};

	$scope.addMovie = function() {

		$scope.movieNew.image = "imgs/new.jpg";
		$scope.listMovies.unshift($scope.movieNew);

		$scope.movieNew = {};
		$scope.editPanel = false;
		$scope.toggle = !$scope.toggle;
	};

	$scope.removeMovie = function(index) {
		
		$scope.listMovies.splice(index, 1);
	};		

	$scope.editMovie = function() {

		$scope.listMovies[$scope.movieIndex] = $scope.movieEdit;
		$scope.movieEdit = {};
		$scope.editPanel = false;
	};

	$scope.showMovie = function() {

		var movies = [];

		for(var i = 0; i <  $scope.listMovies.length; i++) {

			var iMovie = {
				name:  $scope.listMovies[i].name,
				director: $scope.listMovies[i].director,
				image: $scope.listMovies[i].image,
				description: $scope.listMovies[i].description
			};

			movies.push(iMovie);
		}

		movieService.saveMovies(movies);
	};	
}]);

/* ------------------------------------------- DESCRIPTION CONTROLLER -------------------------------------------------------- */
app.controller('descriptionController', ['$scope', 'movieService', '$routeParams', function ($scope, movieService, $routeParams) {

	$scope.movieToShow = movieService.getMovie($routeParams.movieId);	

	scrollToMenu();

}]);

/* ---------------------------------------------- FACTORIES ------------------------------------------------------------------ */
app.factory('movieService', function () {

	var movies = [{
		"name": "Lord of the Rings",
       	"description": "Three epic fantasy adventure films based on the novel The Lord of the Rings by J. R. R. Tolkien.",
       	"director": "Peter Jackson",
       	"image": "imgs/lotr2.jpg"
	},{
		"name": "Gladiator",
       	"description": "Epic historical drama  general Maximus Decimus Meridius, who is betrayed when Commodus and search revenge",
       	"director": "Ridley Scott",
       	"image": "imgs/gladiator.jpg"
	},{
		"name": "A Beautiful Mind",
       	"description": "A 2001 American biographical drama film based on the life of John Nash, a Nobel Laureate in Economics.",
       	"director": "Ron Howard",
       	"image": "imgs/bMind.jpg"
	}
	];	

	return {
		saveMovies: function(pMovies) {
			movies = pMovies;
		},

		getMovie: function(index) {
			return movies[index];
	  	},

	  	getMovies: function() {
	  		return movies;
	  	}
	};
});

/* --------------------------------------------- DIRECTIVES ------------------------------------------------------------------- */
app.directive('navMenu', function() {
	return {
		restrict: 'E', 
		templateUrl: 'directives/nav-menu.html'
	};
});

app.directive('newMoviePanel', function() {
	return {
		restrict: 'E', 
		templateUrl: 'directives/new-movie-panel.html'
	};
});

app.directive('editMoviePanel', function() {
	return {
		restrict: 'E', 
		templateUrl: 'directives/edit-movie-panel.html'
	};
});

var scrollToMenu = function() {
	
	$("html, body").animate({
		scrollTop: $('#editPanel')
	});	
};