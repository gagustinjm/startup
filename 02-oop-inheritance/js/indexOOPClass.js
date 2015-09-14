
// Practice - Point 7.
var MoviesModule = (function() {

	var module = {};

	module.Movie = Movie;
	module.DownloadableMovie = DownloadableMovie;

	function Movie(mTitle, mDescription, mDirector) {
		this.title = mTitle;
		this.description = mDescription;
		this.director = mDirector;
	}		
	
	// Getters & Setters
	Movie.prototype = {

	    setTitle: function(mTitle) {
			this.title = mTitle;
		},

		getTitle: function() {
			return this.title;
		},

		setDescription: function(mDescription) {
			this.description = mDescription;
		},
		getDescription: function() {
			return this.description;
		},

		setDirector: function(mDirector) {
			this.director = mDirector;
		},
		getDirector: function() {
			return this.director;
		},	
		// End getters & Setters

		// Play & Stop Methods
		play : function() {
			MovieObserver.listenPlay(this);
		},
		stop : function() {
			MovieObserver.listenStop(this);
		},
		// Ennd Play & Stop Methods

		toString : function() {
			return this.title + "\n" + this.description + "\nDirector: " + this.director;
		}
	};

	var Share = {
		share: function(pelicula, friendName) {
		console.log("Sharing " + pelicula.getTitle() + " with " + friendName);
		},

		like: function() {
		}	
	};

	// Practice - Point 10.
	extend(Movie.prototype, Share);

	// Practice - Point 8.
	function DownloadableMovie(title, description, director) {
		Movie.call(this, title, description, director);	
	}

	DownloadableMovie.prototype = Object.create(Movie.prototype);

	DownloadableMovie.prototype.constructor = DownloadableMovie;

	DownloadableMovie.prototype.download = function() {
		console.log("You are downloading " + this.title);
	};

	return module;
})();

// Practice - Point 2. - Singleton Pattern (Optimized)
MovieObserver = (function () {
	var instance,

	init = function () {
	    return {
	    	listenPlay: function (pelicula) {
	      		console.log("Playing " + pelicula.toString());
	     	},
	     	listenStop: function (pelicula) {
	      		console.log("Stopped " + pelicula.getTitle());
	     	}
    	};
	};

	return instance || init();

 })(); // End MovieObserver Class


// Practice - Point 9
function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination; 
}

// Practice - Point 11
var Actor = function(name, birthday) {
	this.name = name;
	this.birthday = birthday;
};

Actor.prototype.getName = function() {
	return this.name;
};
Actor.prototype.setName = function(name) {
	this.name = name;
};

Actor.prototype.getBirthday = function() {
	return this.birthday;
};
Actor.prototype.setBirthday = function(birthday) {
	this.birthday = birthday;
};


// Polifill to get Compability for create() method
if (typeof Object.create != 'function') {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    // To save on memory, use a shared constructor
    function Temp() {}

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function (O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (typeof O != 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Let obj be the result of creating a new object as if by the
      //    expression new Object() where Object is the standard built-in
      //    constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //    own properties to obj as if by calling the standard built-in
      //    function Object.defineProperties with arguments obj and
      //    Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();
}


// Function load ------------------------------------------------------------------------------------------------------------------------ /
$(window).load(function() {	

	var m1 = new MoviesModule.Movie(
		"Lord of the Rings", 
		"Film series consisting of three epic fantasy adventure films based on the novel The Lord of the Rings by J. R. R. Tolkien.",
		"Peter Jackson"
		);	
		
	var m2= new MoviesModule.Movie(
		"Gladiator",
		"Epic historical drama  general Maximus Decimus Meridius, who is betrayed when Commodus, the ambitious son of Emperor Marcus Aurelius, and search revenge",
		 "Ridley Scott"
		);

	var m3 = new MoviesModule.Movie(
		"A Beautiful Mind",
		"A 2001 American biographical drama film based on the life of John Nash, a Nobel Laureate in Economics.",
		"Ron Howard"
		);

	var m4 = new MoviesModule.DownloadableMovie(
		"Batman Begun",
			"The start of the new saga of Batman",
			"Christopher Nolan"
			);		

	var peliculaElegida = prompt("Please select a movie\n1- Lord of the Rings (Play)\n2- Gladiator (Play)\n3- A Beautiful Mind (Play)\n4- Batman Begun (Download)");
	var compartirCon = prompt("Share this film with ...");

	switch(peliculaElegida){
		case "1":
			m1.play();
			setTimeout(m1.stop(), 5000);
			m1.share(m1, compartirCon);	
			break;
		case "2":
			m2.play();
			setTimeout(m2.stop(), 5000);
			m2.share(m2, compartirCon);	
			break;
		case "3":
			m3.play();
			setTimeout(m3.stop(), 5000);
			m3.share(m3, compartirCon);	
			break;
			case "4":
			m4.download();
			m4.play(); // Test to validate that Inheritance is working
			m4.share(m4, compartirCon);
			break;
		default:
			console.log("Wrong option");
			break;
	} // end switch	

	// Practice - Point 12 - Adding actors to movie objects		
	var actors = [];
	var actor1 = new Actor("Vigo Mortensen", new Date("1958-10-20"));		
	var actor2 = new Actor("Liv Tyler", new Date("1977-07-01"));
	var actor3 = new Actor("Sean Bean", new Date("1959/04/17"));
	actors.push(actor1, actor2, actor3);

	m1.actors = actors;

	var actorsMessage = "Actors of " + m1.getTitle() + ": \n";

	for (var i = 0 ; i < m1.actors.length ; i++) {
		actorsMessage += m1.actors[i].getName() + "\n";
	}

	console.log(actorsMessage);		
	// End Practice - Point 12
	
}); // end load
