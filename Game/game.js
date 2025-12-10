const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// Canvas size
canvas.width = 1000;
canvas.height = 600;

// Mario position
let marioX = 20;
let marioY = 400;
let marioWidth = 120;
let marioHeight = 180;


// Stars
let starVisible = true;
let starVisible2 = true;
let starVisible3 = true;
let starVisible4 = true;
let starVisible5 = true;
let starVisible6 = true;
let starVisible7 = true;
let starVisible8 = true;
let starVisible9 = true;
let starVisible10 = true;

// Star 1 position
let starX = 90;
let starY = 240;
let starWidth = 70;
let starHeight = 70;

// Star 2 position
let star2X = 150;
let star2Y = 390;
let star2Width = 70;
let star2Height = 70;

// Star 3 position
let star3X = 240;
let star3Y = 200;
let star3Width = 70;
let star3Height = 70;

// Star 4 position
let star4X = 550;
let star4Y = 320;
let star4Width = 70;
let star4Height = 70;

// Star 5 position
let star5X = 750;
let star5Y = 340;
let star5Width = 70;
let star5Height = 70;

// Star 6 position
let star6X = 820;
let star6Y = 400;
let star6Width = 70;
let star6Height = 70;

// Star 7 position
let star7X = 650;
let star7Y = 300;
let star7Width = 70;
let star7Height = 70;


// Star 8 position
let star8X = 330;
let star8Y = 240;
let star8Width = 70;
let star8Height = 70;

// Star 9 position
let star9X = 400;
let star9Y = 510;
let star9Width = 70;
let star9Height = 70;

// Star 10 position
let star10X = 700;
let star10Y = 440;
let star10Width = 70;
let star10Height = 70;


// Keyboard flags
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// Jump variables
let isJumping = false;
let jumpVelocityY = -1;
let jumpStrength = -18;
let gravity = 0.8;
let ground = 400;

// Score
let crashes = 0;

// Avoid double counting
let controlCollision = false;
let controlCollision2 = false;
let controlJump = false;
let controlJump2 = false;

// Collision margins
let margin = 10;
let marginHeight = 10;

let fenceSpeedDifficulty = 1;

// Difficulty
let difficulty = localStorage.getItem("difficulty") || "easy";

// Load images
const backgroundImg = new Image();
backgroundImg.src = "./assets/menu.avif";

const mario = new Image();
mario.src = "./assets/Mario.png";



const star = new Image();
star.src = "./assets/star.png";

const star2 = new Image();
star2.src = "./assets/star.png";

const star3 = new Image();
star3.src = "./assets/star.png";

const star4 = new Image();
star4.src = "./assets/star.png";

const star5 = new Image();
star5.src = "./assets/star.png";

const star6 = new Image();
star6.src = "./assets/star.png";

const star7 = new Image();
star7.src = "./assets/star.png";

const star8 = new Image();
star8.src = "./assets/star.png";

const star9 = new Image();
star9.src = "./assets/star.png";

const star10 = new Image();
star10.src = "./assets/star.png";

// Draw functions
function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawMario() {
    ctx.drawImage(mario, marioX, marioY, marioWidth, marioHeight);
}


function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: " + crashes, 10, 30);
}

function drawStar() {
    if (starVisible)
        ctx.drawImage(star, starX, starY, starWidth, starHeight);
}

function drawStar2() {
    if (starVisible2)
        ctx.drawImage(star2, star2X, star2Y, star2Width, star2Height);
}

function drawStar3() {
    if (starVisible3)
        ctx.drawImage(star3, star3X, star3Y, star3Width, star3Height);
}
function drawStar4() {
    if (starVisible4)
        ctx.drawImage(star4, star4X, star4Y, star4Width, star4Height);
}

function drawStar5() {
    if (starVisible5)
        ctx.drawImage(star5, star5X, star5Y, star5Width, star5Height);
}

function drawStar6() {
    if (starVisible6)
        ctx.drawImage(star6, star6X, star6Y, star6Width, star6Height);
}

function drawStar7() {
    if (starVisible7)
        ctx.drawImage(star7, star7X, star7Y, star7Width, star7Height);
}

function drawStar8() {
    if (starVisible8)
        ctx.drawImage(star8, star8X, star8Y, star8Width, star8Height);
}

function drawStar9() {
    if (starVisible9)
        ctx.drawImage(star9, star9X, star9Y, star9Width, star9Height);
}

function drawStar10() {
    if (starVisible10)
        ctx.drawImage(star10, star10X, star10Y, star10Width, star10Height);
}



// Main draw loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawMario();
    drawStar();
    drawStar2();
    drawStar3();
    drawStar4();
    drawStar5();
    drawStar6();
    drawStar7();
    drawStar8();
    drawStar9();
    drawStar10();

    crashStar();
    crashStar2();
    crashStar3();
    crashStar4();
    crashStar5();
    crashStar6();
    crashStar7();
    crashStar8();
    crashStar9();
    crashStar10();
    
    drawScore();
   

    // Mario movement
    if (rightPressed) marioX += 2;
    if (leftPressed) marioX -= 2;

    if (isJumping) {
        marioY += jumpVelocityY;
        jumpVelocityY += gravity;

        if (rightPressed) marioX += 8;
        if (leftPressed) marioY -= 8;
    }

    if (marioY >= ground) {
        marioY = ground;
        isJumping = false;
        jumpVelocityY = 0;
    }

    requestAnimationFrame(draw);
}




document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyNotPressed);

function keyPressed(e) {
    if (e.key === "ArrowRight")
         rightPressed = true;
    else if (e.key === "ArrowLeft") 
        leftPressed = true;
    else if (e.key === "ArrowUp" && !isJumping) {
        isJumping = true;
        jumpVelocityY = jumpStrength;
    } else if (e.key === "ArrowDown")
         downPressed = true;
}

function keyNotPressed(e) {
    if (e.key === "ArrowRight") 
        rightPressed = false;
    else if (e.key === "ArrowLeft") 
        leftPressed = false;
    else if (e.key === "ArrowUp") 
        upPressed = false;
    else if (e.key === "ArrowDown") 
        downPressed = false;
}



// Star collision
function crashStar() {
    if (!starVisible) return;

    let touching =
        marioX < starX + starWidth &&
        marioX + marioWidth > starX &&
        marioY < starY + starHeight &&
        marioY + marioHeight > starY;

    if (touching && isJumping && starVisible) {

        starVisible = false;
        crashes +=1

    }
        
}

function crashStar2() {
    if (!starVisible2) return;

    let touching =
        marioX < star2X + star2Width &&
        marioX + marioWidth > star2X &&
        marioY < star2Y + star2Height &&
        marioY + marioHeight > star2Y;

    if (touching && isJumping && starVisible2) {

        starVisible2 = false;
        crashes +=1

    }
        
    
}

function crashStar3() {
    if (!starVisible3) return;

    let touching =
        marioX < star3X + star3Width &&
        marioX + marioWidth > star3X &&
        marioY < star3Y + star3Height &&
        marioY + marioHeight > star3Y;

    if (touching && isJumping && starVisible3) {

        starVisible3 = false;
        crashes +=1

    }
        
    
}

function crashStar4() {
    if (!starVisible4) return;

    let touching =
        marioX < star4X + star4Width &&
        marioX + marioWidth > star4X &&
        marioY < star4Y + star4Height &&
        marioY + marioHeight > star4Y;

    if (touching && isJumping && starVisible4) {

         starVisible4 = false;
        crashes +=1
    
    }
       
}

function crashStar5() {
    if (!starVisible5) return;

    let touching =
        marioX < star5X + star5Width &&
        marioX + marioWidth > star5X &&
        marioY < star5Y + star5Height &&
        marioY + marioHeight > star5Y;

    if (touching && isJumping && starVisible5) {

        starVisible5 = false;
        crashes +=1
    }
        
    
}

function crashStar6() {
    if (!starVisible6) return;

    let touching =
        marioX < star6X + star6Width &&
        marioX + marioWidth > star6X &&
        marioY < star6Y + star6Height &&
        marioY + marioHeight > star6Y;

    if (touching && isJumping && starVisible6) {

        starVisible6 = false;
        crashes +=1
    }
        
    
}

function crashStar7() {
    if (!starVisible7) return;

    let touching =
        marioX < star7X + star7Width &&
        marioX + marioWidth > star7X &&
        marioY < star7Y + star7Height &&
        marioY + marioHeight > star7Y;

    if (touching && isJumping && starVisible7) {

         starVisible7 = false;
        crashes +=1
    }
       
    
}

function crashStar8() {
    if (!starVisible8) return;

    let touching =
        marioX < star8X + star8Width &&
        marioX + marioWidth > star8X &&
        marioY < star8Y + star8Height &&
        marioY + marioHeight > star8Y;

    if (touching && isJumping && starVisible8) {

        starVisible8 = false;
        crashes +=1

    }
        
    
}

function crashStar9() {
    if (!starVisible9) return;

    let touching =
        marioX < star9X + star9Width &&
        marioX + marioWidth > star9X &&
        marioY < star9Y + star9Height &&
        marioY + marioHeight > star9Y;

    if (touching && isJumping && starVisible9) {
        starVisible9 = false;
        crashes +=1
    
    }
        
}

function crashStar10() {
    if (!starVisible10) return;

    let touching =
        marioX < star10X + star10Width &&
        marioX + marioWidth > star10X &&
        marioY < star10Y + star10Height &&
        marioY + marioHeight > star10Y;

    if (touching && isJumping && starVisible10) {
        starVisible10 = false;
        crashes +=1

    }
        
}

//contador



// dificultad
function setDifficulty() {

    let difficulty = localStorage.getItem("difficulty") || "easy";

    if (difficulty === "easy") 
        fenceSpeedDifficulty = 1;
    else if (difficulty === "medium") 
        fenceSpeedDifficulty = 2;
    else if (difficulty === "hard")
         fenceSpeedDifficulty = 5;

    
}

backgroundImg.onload = () => {
    
    draw();
};