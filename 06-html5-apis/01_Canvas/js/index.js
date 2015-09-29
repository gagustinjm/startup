window.onload = function() {
	init();
}

var rectangleX = 0;
var smileX = 820;

function init(){
	window.requestAnimationFrame(draw);
}

function draw() {

  	var ctx = document.getElementById('firstCanvas').getContext('2d');

  	ctx.globalCompositeOperation = 'destination-over';
  	ctx.clearRect(0,0,800,300); // clear canvas
  	ctx.save(); 

  	if (rectangleX === 805) {  		
  		console.log("The rectangle is gone!"); 		
		
  		if(smileX !== -20) {
  			smileX = smileX - 5; 		
  		
	  		var path=new Path2D();
		    path.arc(smileX,100,50,0,Math.PI*2,true); // Outer circle
		    path.moveTo(smileX-35,100);
		    path.arc(smileX,100,35,0,Math.PI,false);  // Mouth (clockwise)
		    path.moveTo(smileX-10,90);
		    path.arc(smileX-15,90,5,0,Math.PI*2,true);  // Left eye
		    path.moveTo(smileX+20,90);
		    path.arc(smileX+15,90,5,0,Math.PI*2,true);  // Right eye
		    ctx.stroke(path);

		    window.requestAnimationFrame(draw); 
		}
		else {
			console.log("The End!"); 
		}		
		    

  	} else {
  		rectangleX = rectangleX + 5; 		

  		// Rectangle
		ctx.fillStyle = "rgb(200,0,0)";
    	ctx.fillRect (rectangleX, 50, 100, 100);

    	window.requestAnimationFrame(draw);     	
  	}  	  
}