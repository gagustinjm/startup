window.onload = function() {

	/* --------------------------------- Attached Events to DOM elements ------------------------------------------------ */
	document.getElementById("saveLocalStorage").addEventListener("click", saveDataLocalStorage);
	document.getElementById("saveIndexedDB").addEventListener("click", saveDataIndexDB);
	document.getElementById("clearSave").addEventListener("click", clearSaveContent);
	document.getElementById("sendMessage").addEventListener("click", init);

	DataBase.initializeDB();

	/* ------------------------------------------ Drag & Drop ----------------------------------------------------------- */
	function handleFileSelect(evt) {
	    evt.stopPropagation();
	    evt.preventDefault();  

   		if (evt.dataTransfer.files.length) {

   			var lastAddedIndex = evt.dataTransfer.files.length-1;

   			var file = evt.dataTransfer.files[lastAddedIndex];

   			this.innerHTML += '<p> <strong>File name: </strong>' + file.name + " - <strong>Size:</strong> " + 
   							file.size + ' bytes</p>';

	    	var r = new FileReader();

	    	r.onload = function(e) { 
		    	var contents = e.target.result;
		    	document.getElementById("playerName").value = file.name.substr(0, file.name.indexOf('.'));
	        	document.getElementById("playerDescription").value = contents; 
	      	};

	      	r.readAsText(evt.dataTransfer.files[lastAddedIndex]);

	    } else { 
	    	alert("Failed to load file");
	    }
	}

 	function handleDragOver(evt) {
    	evt.stopPropagation();
    	evt.preventDefault();
    	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    	console.log(evt.dataTransfer.getData('Text'));
  	}  	

  	document.getElementById("drop_zone").addEventListener('dragover', handleDragOver, false);
  	document.getElementById("drop_zone").addEventListener('drop', handleFileSelect, false);	
  	// End Drag & Drop	
};

/* ----------------------------------------- Button Functions to Save Data ------------------------------------------------- */

function saveDataLocalStorage() {
	var playerName = document.getElementById("playerName").value;
	var playerDescription = document.getElementById("playerDescription").value;

	if (!JSON.parse(localStorage.getItem('players'))) {
		players = {};

		players[playerName] = {
			name: playerName,
			description: playerDescription
		};

	} else {
		players = JSON.parse(localStorage.getItem('players'));	

		players[playerName]	= {
			name: playerName,
			description: playerDescription
		};
	}

	localStorage.setItem('players', JSON.stringify(players));	

	if (!localStorage.getItem("players").value)	{
		alert(playerName + " saved correctly into players | LocalStorage");
	} else {
		alert("An error has occurred, please try again later.");
	}	
}

function saveDataIndexDB() {		
	DataBase.saveData();
}

function clearSaveContent() {
	DataBase.deleteDB();
	localStorage.clear();
	alert("All saved contend has been deleted");
}

/* --------------------------------------------------- DBIndex Logic ------------------------------------------------------- */
DataBase = (function () {
	var instance, db, dbName = "descriptionDataBase",

	init = function () {		

	    return {	    	

	    	deleteDB: function() {
	    		var deleteDbRequest = indexedDB.deleteDatabase(dbName);

   				deleteDbRequest.onsuccess = function (event) {
      				console.log("DataBase deleted");
   				};

   				deleteDbRequest.onerror = function (e) {
      				console.log("Database error: " + e.target.errorCode);
   				};
	    	},

	    	initializeDB: function() {	

	    		/*
				var player =  {
			       	name: 'Juan Roman Riquelme',
			        description: 'Ex Boca Junior Player'
			    };
			    */

	    		var openRequest = indexedDB.open(dbName, 1);
				
				openRequest.onerror = function(e) {
				    console.log("Database error: " + e.target.errorCode);
				};

				openRequest.onsuccess = function(event) {
				    db = openRequest.result;
				};				

				openRequest.onupgradeneeded = function(event) { 
					var db = event.target.result;

					var objectStore = db.createObjectStore("players", { keyPath: "name"});

					console.log("Database has been correctly initialized");
				};
			},

			saveData: function() {

				var playerName = document.getElementById("playerName").value;
				var playerDescription = document.getElementById("playerDescription").value;

				var transaction = db.transaction(["players"], "readwrite");

				// Do something when all the data is added to the database.
				transaction.oncomplete = function(event) {
					alert(player1.name + " has been added successfully into players | IndexedDB");
				};

				transaction.onerror = function(event) {
					alert(playerName + " already exist in the data base.");
				};

				var descObjectStore = transaction.objectStore("players");				

				var player1 = { 
					name: playerName,
					description: playerDescription 
				};

				var request = descObjectStore.add(player1);
			}
    	};
	};

	return instance || init();

 })();

 /* -------------------------------------------- Web Sockets --------------------------------------------------------------- */
var url = "ws://echo.websocket.org";
var output;
var message;

function init() { 
	message = document.getElementById("txtMessage").value;
	if (!message) {
		alert("Please insert a message");
	} else {
		output = document.getElementById("output"); 
		testWebSocket(); 
	}	
}

function testWebSocket() {
	var websocket = new WebSocket(url);	

	websocket.onopen = function(evt) { 
		output.innerHTML += ("\nConnected to " + url + '<br>');
		output.innerHTML += ("SENT: " + message + '<br>');  
		websocket.send(message); 
	};

	websocket.onmessage = function(evt) { 
		output.innerHTML += ('\nRESPONSE: ' + evt.data + '<br>'); 
		websocket.close();  
	}; 

	websocket.onclose = function(evt) { 
		output.innerHTML += ("\nDisconnected of " + url + '<br>'); 
	}; 

	websocket.onerror = function(evt) { 
		output.innerHTML += ('\nERROR: ' + evt.data + '<br>'); 
	};
}