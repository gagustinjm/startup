define(['jquery'], function ($) {

	// Practice - Point 4.
	function director(directorName)
	{
		this.name = directorName;
		this.quotes = null;	
	}		
		
	// Getters & Setters
	director.prototype = {

		set: function(property, value) {
			this[property] = value;
		},

		get: function(property) {
			return this[property];
		},

		//  Practice Point 6.
		speak: function() {
			var message = this.name + " says: \n";
			var quotes = this.get('quotes');

			// Practice - Point 2.1.
			$.each(quotes, function(index) {
	    		message += quotes[index] + "\n";
			});	

			console.log(message);
		}
	};

	return director;
});