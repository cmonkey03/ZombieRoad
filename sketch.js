let timer = 0 // setup timer value & get timer element
let gameScreen = 0; // setup current view
let score = 0; // setup score
let BASE_URL='http://localhost:3000/api/v1/'

var user;

var zombies = []; // zombie variables
var zombieImgArray = [];
var zombieIndex = 0
var numZombies = 50

var avatar; // setup character avatar including starting coordinates
var healthyAvatarArray = []
var injuredAvatarArray = []
var badlyInjuredAvatarArray = []
var avatarX = 0;
var avatarY = 400;

var bgImg; // setup the image scroll
var x1 = 0;
var x2;

var scrollSpeed = 2;

function setup() { //SETUP FUNCTION
	createCanvas(windowWidth,windowHeight);

  bgImg = loadImage("./assets/backgrounds/game_screen.jpg"); //game play background
	init_background_image = loadImage("./assets/backgrounds/start_screen.jpg");
	end_background_image = loadImage("./assets/backgrounds/end_screen.png")
  x2 = width;

	song = loadSound('./assets/song.mp3');

	for(let i = 0;i<=7;i++){ //load 8 zombie images
		zombieImgArray.push(loadImage(`./assets/zombie/${i}.png`))
	}

	for(let i = 0;i<=7;i++){  //load 8 pup images
		healthyAvatarArray.push(loadImage(`./assets/avatar/${i}.png`))
	}
	for(let i = 0;i<=7;i++){  //load 8 injured pup images
		injuredAvatarArray.push(loadImage(`./assets/avatar_injured_1/${i}.png`))
	}
	for(let i = 0;i<=7;i++){  //load 8 badly injured pup images
		badlyInjuredAvatarArray.push(loadImage(`./assets/avatar_injured_2/${i}.png`))
	}

	if (frameCount % 120 === 0) {
		++numZombies
	}

	for(i=0;i<numZombies;i++) {
		z = new zombieObj(random(width), random(height))
		zombies.push(z)
	}

	avatar = new avatarObj();

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

function keyPressed() {
	song.play();
}

function initScreen() { //loads startup background
	background(init_background_image);
}

function playScreen() {
	image(bgImg, x1, 0, width, height); // scroll background image
	image(bgImg, x2, 0, width, height);
	x1 -= scrollSpeed;
	x2 -= scrollSpeed;
	if (x1 < -width){ x1 = width; }
	if (x2 < -width){ x2 = width; }

	for(i=0;i<(parseInt(timer/3));i++) {
		zombies[i].disp();
		zombies[i].collide(avatar);
	}

	fill(255); 	//Update Timer
	textSize(36);
	textAlign(CENTER);
	text(`${timer}`, (width/2 - 300), 40);
	if (frameCount % 60 === 0) { timer++; }
	if (gameScreen == 1 && timer > 60) { gameScreen = 2; }

	textSize(36); //Update Score
	textFont("VT323")
	text(`Contamination Level: ${score}`, (width/2 + 100), 40);

	avatar.disp(avatarX,avatarY) //display avatar with starting coordinates

	if (avatarX >= width){ avatarX = width; }
	if (avatarX <= 0){ avatarX = 0; }
	if (avatarY <= 0){ avatarY = 0; }
	if (avatarY >= height){ avatarY = height; }

	if(keyIsDown(UP_ARROW)) { avatarY = avatarY - 5 }
	if(keyIsDown(DOWN_ARROW)) { avatarY = avatarY + 5 }
	if(keyIsDown(LEFT_ARROW)) { avatarX = avatarX - 5 }
	if(keyIsDown(RIGHT_ARROW)) { avatarX = avatarX + 5 }

}

function zombieObj(x,y){
	this.w = 125;
	this.h = 200;
	this.x = width;
	this.y = y;

	this.collide = function(obj){
		this.hit = collideRectRect(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.w, obj.h); //collide the avatar object into this zombie object.

		if(this.hit){ score++; }
	}

	this.disp = function(){
		noStroke();
		this.x -= parseInt(2+timer/10) //move to the left!
		if((this.x + this.w)< 0){ //loop to the right!
			this.x = width;
		}
		image(zombieImgArray[parseInt(frameCount/10)%8],this.x,this.y,this.w,this.h)
	}
}

function avatarObj(){
	this.w = 100;
	this.h = 80;
	this.x;
	this.y;

	this.disp = function(x,y){
		this.x = x;
		this.y = y;
		noStroke();
		// add possible avatar color filter dependent on score
		if (score < 50) {
			image(healthyAvatarArray[parseInt(frameCount/3)%8],this.x,this.y,this.w,this.h)
		} else if (score < 100 && score >= 50) {
			image(injuredAvatarArray[parseInt(frameCount/3)%8],this.x,this.y,this.w,this.h)
		} else {
			image(badlyInjuredAvatarArray[parseInt(frameCount/3)%8],this.x,this.y,this.w,this.h)
		}
	}

}

function updateScore() {
	document.getElementById("scoreDisplay").innerHTML = `${user.data.attributes.name}, your contamination level is ${score}.`;
}

function gameOverScreen() {
	remove();
	document.getElementById("end-game-overlay").style.display = "block";

	document.body.style.backgroundImage = "url('./assets/backgrounds/end_screen.png')"
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
