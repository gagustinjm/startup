define(['director'], function(director) {
	
		// Practice - Point 3.
		function movie(mTitle, mDescription)
		{
			this.title = mTitle;
			this.description = mDescription;
			this.director = null;
		}		
			
		movie.prototype = {

			// Getters & Setters
			set: function(property, value) {
				this[property] = value;
			},

			get: function(property) {
				return this[property];
			},

			setDirector: function(directorName) {
				this.director = new director(directorName);
			},
			// End getters & Setters

			showMovie: function() {
				return this.title + "\n" + this.description + "\nDirector: " + this.director.get("name");
			}
		};

	return movie;
});