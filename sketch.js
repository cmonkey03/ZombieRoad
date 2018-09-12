// setup object Oriented Collision
var rects = [];
var numRects = 50;
var cir;

// setup the image scroll
var bgImg;
var x1 = 0;
var x2;

var scrollSpeed = 2;

// setup timer value & get timer element
let timer = 0

//SETUP FUNCTION
function setup() {
	createCanvas(1000,300);

  //this is the image setup (original canvas is 1000x300)
  bgImg = loadImage("./assets/background.png");
  x2 = width;

  //this builds our squares
	for(i=0;i<numRects;i++){
		r = new rectObj(random(width),random(height), random(10,50), random(10,50) ) // generate a rectObj
		rects.push(r); //add it to the array.
	}

  // create a new circle object
	cir = new circleObj(20);
	// console.log(rects);

}


//THREE FUNCTIONS:
//1. Draw makes our rectangles and objects
//2.1 CONSTRUCTOR FUNCTION rectObj sets colors of rectangles
//2.2 HELPER: sets square color & if hit
//2.3 HELPER: scrolls the square right to LEFT!
//3.1 CONSTRUCTOR: makes the circle again?
//3.2 HELPER: Displays the circle?

function draw(){
    image(bgImg, x1, 0, width, height);
    image(bgImg, x2, 0, width, height);
    x1 -= scrollSpeed;
    x2 -= scrollSpeed;

    if (x1 < -width){
     x1 = width;
    }
    if (x2 < -width){
     x2 = width;
    }

	for(i=0;i<numRects;i++){
		rects[i].disp();
		rects[i].collide( cir ); //collide against the circle object
	}

	cir.disp(mouseX,mouseY); //pass the x,y pos in to the circle.

	//Update Timer
	let timerElement = document.getElementById("timer")
	if (frameCount % 60 === 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
		timer++;
	}
	timerElement.innerText = `Timer: ${timer}`
	//Condition to end game
	// if (timer == 0) {
	//   text("GAME OVER", width/2, height*0.7);
	// }

}

function rectObj(x,y,w,h){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.color = color(random(255),random(255),random(255))
	this.hit = false;

	this.collide = function(obj){

		this.hit = collideRectCircle(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.dia); //collide the cir object into this rectangle object.

		if(this.hit){
			this.color = color(0) //set this rectangle to be black if it gets hit
		}

	}

	this.disp = function(){
		noStroke();
		fill(this.color);
		this.x += 3 //move to the right!
		if(this.x > width){ //loop to the left!
			this.x = -this.w;
		}
		rect(this.x,this.y,this.w,this.h);

	}

}

function circleObj(dia){
	this.dia = dia;
	this.color = color(random(255),random(255),random(255))
	this.x;
	this.y;

	this.disp = function(x,y){
		this.x = x;
		this.y = y;
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.dia,this.dia);
	}

}
