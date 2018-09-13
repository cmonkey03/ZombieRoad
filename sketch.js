// setup object Oriented Collision
var rects = [];
var numRects = 30;
var cir;

// setup the image scroll
var bgImg;
var x1 = 0;
var x2;

var scrollSpeed = 2;

// setup timer value & get timer element
let timer = 0

// setup current view
let gameScreen = 0;

// setup score
let score = 0;

let BASE_URL='http://localhost:3000/api/v1/'

//SETUP FUNCTION
function setup() {
	createCanvas(windowWidth,windowHeight);

  //this is the image setup (original canvas is 1000x300)
  bgImg = loadImage("./assets/background.jpg");
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
//1. Draw makes our rectangles, circle and timer with incrementor
//2.1 CONSTRUCTOR FUNCTION rectObj sets colors of rectangles
//2.2 HELPER: sets square color & if hit
//2.3 HELPER: scrolls the square right to LEFT!
//3.1 CONSTRUCTOR: makes the circle again?
//3.2 HELPER: Displays the circle?

function draw(){
	if (gameScreen == 0) {
    initScreen();
  } else if (gameScreen == 1) {
    playScreen();
  } else if (gameScreen == 2) {
    gameOverScreen();
  }
}

function playScreen() {

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

	//Update Timer
	fill(255);
	textSize(36);
	textAlign(CENTER);
	text(`${timer}`, (width/2 - 100), 40);
	if (frameCount % 60 === 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
		timer++;
	}

	if (gameScreen == 1 && timer > 5) {
		gameScreen = 2;
	}

	textSize(36);
	// textAlign(CENTER);
	// fill(0);
	text(`Score: ${score}`, (width/2 + 100), 40);

	cir.disp(mouseX,mouseY); //pass the x,y pos in to the circle.

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
			score++;
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

// game screen conditional functions
function initScreen() {
  background(62, 179, 183);
}

function keyPressed() {
  if (gameScreen == 0) {
    startGame();
  }
}

function startGame() {
	document.getElementById("overlay").style.display = "none";
  gameScreen = 1;
}


function gameOverScreen() {
	remove();
	document.getElementById("end-game-overlay").style.display = "block";
	console.log("hello")
	fetch(BASE_URL+'games', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({user_id:1, score: score, type: "games"})
	}).then(res => console.log(res))
}
