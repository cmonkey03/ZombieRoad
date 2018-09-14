let timer = 0 // setup timer value & get timer element
let gameScreen = 0; // setup current view
let score = 0; // setup score
let BASE_URL='http://localhost:3000/api/v1/'

var user;

var zombies = []; // create circle & zombie variables
var zombieImgArray = [];
var zombieIndex = 0
var numZombies = 10

var cir;

var bgImg; // setup the image scroll
var x1 = 0;
var x2;

var cirX = 0; // cir starting positions
var cirY = 400;

var scrollSpeed = 2;

function setup() { //SETUP FUNCTION
	createCanvas(windowWidth,windowHeight);

  bgImg = loadImage("./assets/background.jpg"); //game play background
	init_background_image = loadImage("./assets/start_screen_background.jpg");
	end_background_image = loadImage("./assets/end_screen_background.png")
  x2 = width;

	for(let i = 0;i<=7;i++){
		zombieImgArray.push(loadImage(`./assets/${i}.png`))
	}

	if (frameCount % 120 === 0) {
		++numZombies
	}

	for(i=0;i<numZombies;i++) {
		z = new zombieObj(random(width), random(height))
		zombies.push(z)
	}

	cir = new circleObj(20);   // create a mouse object (circle)

	loginForm = document.getElementById('login-form')
	loginForm.addEventListener('submit', (event) => {
		event.preventDefault()
		let name = document.getElementById("user-name").value

		fetch(BASE_URL+'users', {
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    method: "POST",
	    body: JSON.stringify({name})
		})
			.then(response => response.json())
			.then(userObj => {
				user = userObj
			})

		document.getElementById("overlay").style.display = "none";
		gameScreen = 1
	})
}

function draw() {
	if (gameScreen == 0) {
    initScreen();
  } else if (gameScreen == 1) {
    playScreen();
  } else if (gameScreen == 2) {
    gameOverScreen();
  }
}

function initScreen() { //loads startup background
	background(init_background_image);
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

	for(i=0;i<zombies.length;i++) {
		zombies[i].disp();
		zombies[i].collide(cir);
	}

	fill(255); 	//Update Timer
	textSize(36);
	textAlign(CENTER);
	text(`${timer}`, (width/2 - 300), 40);
	if (frameCount % 60 === 0) {
		timer++;
	}
	if (gameScreen == 1 && timer > 5) {
		gameScreen = 2;
	}

	textSize(36); //Update Score
	textFont("VT323")
	text(`Contamination Level: ${score}`, (width/2 + 100), 40);

	cir.disp(cirX,cirY)

	if(keyIsDown(UP_ARROW)) {
		cirY = cirY - 5
	}

	if(keyIsDown(DOWN_ARROW)) {
		cirY = cirY + 5
	}

	if(keyIsDown(LEFT_ARROW)) {
		cirX = cirX - 5
	}

	if(keyIsDown(RIGHT_ARROW)) {
		cirX = cirX + 5
	}

}


function zombieObj(x,y){
	this.w = 125;
	this.h = 200;
	this.x = x;
	this.y = y;

	this.collide = function(obj){
		this.hit = collideRectCircle(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.dia); //collide the cir object into this zombie object.

		if(this.hit){
			score++;
		}
	}

	this.disp = function(){
		noStroke();
		this.x -= 3 //move to the left!
		if((this.x + this.w)< 0){ //loop to the right!
			this.x = width;
		}
		image(zombieImgArray[parseInt(frameCount/10)%8],this.x,this.y,this.w,this.h)
	}
}

function circleObj(dia){
	this.dia = dia;
	this.color = color(random(255),random(255),random(255))
	this.x;
	this.y;

	this.disp = function(x,y,callback){
		this.x = x;
		this.y = y;
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.dia,this.dia);
	}

}

function updateScore() {
	document.getElementById("scoreDisplay").innerHTML = `${user.data.attributes.name}, your contamination level is ${score}.`;
}

function gameOverScreen() {
	remove();
	document.getElementById("end-game-overlay").style.display = "block";

	document.body.style.backgroundImage = "url('./assets/end_screen_background.png')"
	// var img = document.createElement("img");
	// img.src = ".assets/end_screen_background.png";
	// var src = document.getElementById("end-game-overlay");
	// src.appendChild(img);
	updateScore();
	fetch(BASE_URL+'games', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({user_id: user.data.id, score: score, type: "games"})
	})
}
