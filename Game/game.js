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




let stars = [
    { x: 90,  y: 240, w: 70, h: 70, visible: true },
    { x: 150, y: 390, w: 70, h: 70, visible: true },
    { x: 240, y: 200, w: 70, h: 70, visible: true },
    { x: 720, y: 140, w: 70, h: 70, visible: true },
    { x: 400, y: 400, w: 70, h: 70, visible: true },
    { x: 500, y: 180, w: 70, h: 70, visible: true },
    { x: 600, y: 300, w: 70, h: 70, visible: true },
    { x: 330, y: 260, w: 70, h: 70, visible: true },
    { x: 800, y: 330, w: 70, h: 70, visible: true },
    { x: 700, y: 440, w: 70, h: 70, visible: true }
];




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


function drawStars(){
    stars.forEach (starDraw =>{
        if(starDraw.visible){
            ctx.drawImage(star, starDraw.x, starDraw.y, starDraw.w, starDraw.h)
        }
    })
}


// Main draw loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawMario();
    drawStars();
    starCollision();
    
    
    
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

function starCollision(){

    stars.forEach(star=>{
        if (!star.visible)return;

        let touching =
            marioX < star.x + star.w &&
            marioX + marioWidth > star.x &&
            marioY < star.y + star.h &&
            marioY + marioHeight > star.y;

        if(touching && isJumping){
            star.visible=false;
            crashes ++;
        }

    })
}





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