const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// Canvas size
canvas.width = 1500;
canvas.height = 600;

// Mario position
let marioX = 20;
let marioY = 250;
let marioWidth = 150;
let marioHeight = 350;

// Fence 1 position
let fenceX = 300;
let fenceY = 380;
let fenceWidth = 200;
let fenceHeight = 100;

// Fence 2 position
let fence2X = 900;
let fence2Y = 300;
let fence2Width = 200;
let fence2Height = 100;

// Fence movement
let fenceSpeedBase = 1;
let fenceSpeed = 1;
let fence2Speed = 1;

// Stars
let starVisible = true;
let starVisible2 = true;

// Star 1 position
let starX = 350;
let starY = 400;
let starWidth = 100;
let starHeight = 100;

// Star 2 position
let star2X = 950;
let star2Y = 400;
let star2Width = 100;
let star2Height = 100;

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
let ground = 250;

// Score
let crashes = 0;

// Avoid double counting
let controlCollision = false;
let controlCollision2 = false;
let controlJump = false;
let controlJump2 = false;

// Collision margins
let margin = 40;
let marginHeight = 20;

let fenceSpeedDifficulty = 1;

// Difficulty
let difficulty = localStorage.getItem("difficulty") || "easy";

// Load images
const backgroundImg = new Image();
backgroundImg.src = "../assets/menu.avif";

const mario = new Image();
mario.src = "../assets/Mario.png";

const fence = new Image();
fence.src = "../assets/valla.png";

const fence2 = new Image();
fence2.src = "../assets/valla.png";

const star = new Image();
star.src = "../assets/star.png";

const star2 = new Image();
star2.src = "../assets/star.png";

// Draw functions
function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawMario() {
    ctx.drawImage(mario, marioX, marioY, marioWidth, marioHeight);
}

function drawFence() {
    ctx.drawImage(fence, fenceX, fenceY, fenceWidth, fenceHeight);
}

function drawFence2() {
    ctx.drawImage(fence2, fence2X, fence2Y, fence2Width, fence2Height);
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

// Main draw loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawMario();
    drawFence();
    drawFence2();
    drawStar();
    drawStar2();
    checkCollision();
    crashStar();
    crashStar2();
    drawScore();
    moveFence();
    moveFence2();

    // Mario movement
    if (rightPressed) marioX += 5;
    if (leftPressed) marioX -= 5;

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

// Collision detection
function checkCollision() {
    let touchingFence1 =
        marioX + marioWidth - margin > fenceX &&
        marioX + margin < fenceX + fenceWidth &&
        marioY + marioHeight - margin > fenceY + marginHeight &&
        marioY + margin < fenceY + fenceHeight;

    if (touchingFence1 && !controlCollision) {
        controlCollision = true;
        crashes -= 5;
    }
    if (!touchingFence1) controlCollision = false;

    // Jumping over fence
    let jumpedFence1 =
        isJumping &&
        marioX + marioWidth > fenceX &&
        marioX < fenceX + fenceWidth &&
        marioY + marioHeight <= fenceY;

    if (jumpedFence1 && !controlJump) {
        controlJump = true;
        crashes += 10;
    }
    if (!jumpedFence1) controlJump = false;

    // Fence 2 collision
    let touchingFence2 =
        marioX + marioWidth - margin > fence2X &&
        marioX + margin < fence2X + fence2Width &&
        marioY + marioHeight - margin > fence2Y + marginHeight &&
        marioY + margin < fence2Y + fence2Height;

    if (touchingFence2 && !controlCollision2) {
        controlCollision2 = true;
        crashes -= 10;
    }
    if (!touchingFence2) controlCollision2 = false;

    // Jumping over fence 2
    let jumpedFence2 =
        isJumping &&
        marioX + marioWidth > fence2X &&
        marioX < fence2X + fence2Width &&
        marioY + marioHeight <= fence2Y;

    if (jumpedFence2 && !controlJump2) {
        controlJump2 = true;
        crashes += 10;
    }
    if (!jumpedFence2) controlJump2 = false;
}

// Move fences
function moveFence() {
    fenceY += fenceSpeed;

    starY = fenceY - starHeight;

    if (fenceY <= 0) fenceSpeed = fenceSpeedDifficulty;
    if (fenceY + fenceHeight >= canvas.height)
        fenceSpeed = -fenceSpeedDifficulty;
}

function moveFence2() {
    fence2Y += fence2Speed;

    star2Y = fence2Y - star2Height;

    if (fence2Y <= 0) fence2Speed = fenceSpeedDifficulty;
    if (fence2Y + fence2Height >= canvas.height)
        fence2Speed = -fenceSpeedDifficulty;
}

// Star collision
function crashStar() {
    if (!starVisible) return;

    let touching =
        marioX < starX + starWidth &&
        marioX + marioWidth > starX &&
        marioY < starY + starHeight &&
        marioY + marioHeight > starY;

    if (touching && isJumping) starVisible = false;
}

function crashStar2() {
    if (!starVisible2) return;

    let touching =
        marioX < star2X + star2Width &&
        marioX + marioWidth > star2X &&
        marioY < star2Y + star2Height &&
        marioY + marioHeight > star2Y;

    if (touching && isJumping) starVisible2 = false;
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

    fenceSpeed = fenceSpeedBase;
    fence2Speed = fenceSpeedDifficulty;
}

backgroundImg.onload = () => {
    
    draw();
};