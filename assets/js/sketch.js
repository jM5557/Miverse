//https://alastairc.ac/2010/03/detecting-touch-based-browsing/
function isTouchDevice() {
   var el = document.createElement('div');
   el.setAttribute('ongesturestart', 'return;');
   if(typeof el.ongesturestart == "function"){
      return true;
   }else {
      return false
   }
}


//---------------SETUP AND DRAW ----------------

var board = {
	"w" : 640,
	"h" : 320,
	"cellSize" : 32
}

var pen = {
	"thin" : 2,
	"normal" : 6,
	"thick" : 15
}

var canv, grid, artboard;
var canvCont;

var isEraser = false;
var myPen = pen.normal;

var currPen = document.getElementById("normal-pen");
var takeImg = false;

var w, h;

function setup() {
	w = (isTouchDevice()) ? displayWidth : board.w;
	h = (isTouchDevice()) ? displayHeight : board.h;

	canv = createCanvas(w, h);
	canv.parent("canvas-artboard");

	grid = createGraphics(w, h);
	grid.stroke(238);	

	background(245);

	artboard = createGraphics(w, h);
	canvCont = document.getElementsByTagName("canvas")[2].getContext("2d");

	document.getElementsByTagName("canvas")[0].addEventListener('touchstart', function(e){
		e.preventDefault();
	}, false);
}

function draw() {

  artboard.strokeWeight(myPen);
  artboard.stroke(0);
  artboard.fill(0);

  grid.clear();
	
  if(takeImg === false){
    for(var i = 0; i < w; i+= board.cellSize){
  		for(var j = 0; j < h; j+= board.cellSize)
  			grid.rect(i, j, board.cellSize, board.cellSize);
  	}
  }
  else if(takeImg === true){
  	clear();
  	grid.clear();

  	background(255);

  	image(artboard, 0, 0);
  	save(canv, 'my_miverse.jpg');

  	takeImg = false;
  }
  
  image(grid, 0, 0);
  image(artboard, 0, 0);
}

function touchMoved(){
	if(isEraser === true){
	  	canvCont.clearRect(mouseX, mouseY, myPen * 2.5, myPen * 2.5);
	}
  	else
  		artboard.line(pmouseX, pmouseY, mouseX, mouseY);
}

function mouseClicked(){
	if(isEraser === true){
	  	canvCont.clearRect(mouseX, mouseY, myPen * 2.5, myPen * 2.5);
	}
  	else
  		artboard.line(mouseX, mouseY, mouseX, mouseY);
}

document.addEventListener('DOMContentLoaded', function(){

	//Clear Button
	document.getElementById("clear-btn").addEventListener("click", function(){
		clear();
		background(255);
		artboard.clear();
		isEraser = false;
		document.getElementById("erase-btn").className = "";
		draw();
	}, false);
	document.getElementById("clear-btn").addEventListener("touchstart", function(){
		clear();
		background(255);
		artboard.clear();
		isEraser = false;
		document.getElementById("erase-btn").className = "";
		draw();
	}, false);

	//Eraser Button
	document.getElementById("erase-btn").addEventListener("click", function(){
		
		if(!isEraser){
			this.className = "selected";
			isEraser = true;
		}

		else {
			this.className = "";
			isEraser = false;
		}
	}, false);
	document.getElementById("erase-btn").addEventListener("touchstart", function(){
		
		if(!isEraser){
			this.className = "selected";
			isEraser = true;
		}

		else {
			this.className = "";
			isEraser = false;
		}
	}, false);


	//Save Drawing Button
	document.getElementById("save-drawing").addEventListener("click", function(){
		takeImg = true;
	}, false);
	document.getElementById("save-drawing").addEventListener("touchstart", function(){
		takeImg = true;
	}, false);


	(function(){
		for(penType in pen){
			(function(penType){
				document.getElementById(penType + "-pen").addEventListener("click", 
							function(){
								
								currPen.className = "";
								myPen = pen[penType];

								this.className = "selected";
								currPen = this;
							}, 
				false);
				document.getElementById(penType + "-pen").addEventListener("touchstart", 
							function(){
								
								currPen.className = "";
								myPen = pen[penType];

								this.className = "selected";
								currPen = this;
							}, 
				false);
			})(penType);
		}
	})();
}, false);