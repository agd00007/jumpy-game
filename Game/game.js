const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Tamaño real del canvas
canvas.width = 1000;
canvas.height = 600;

//Posicion mario

let marioX = 20;
let marioY = 250;


//Posicion valla
let vallaX=100
let vallaY=280

let valla2X=550
let valla2Y=470

//velocidad valla

let vY=0.5
let vY2=0.5

//altura revote

const reboundMinY = 280;
const reboundMaxY = 600;

//variables para los botones

var rightPressed=false
var leftPressed=false
var upPressed = false
var downPressed = false

//variables salto

let isJumping=false
let jumpyVelocityY= 0 //velocidad mientras esta en el aire
let jumStrench=-15 //fuerza del salto
let gravity=0.8
let ground=250 //posicion en el suelo
let jumpVelocityX=5

//contador

let crashes=0

//variables para evitar contar varias veces por valla
let controlCollision=false
let controlGump=false

// Cargar imagen fondo
const backgroundFondo = new Image();
backgroundFondo.src="../assets/pista.jpg"


//cargar imagen mario
const mario=new Image()
mario.src="../assets/Mario.png"

//cargar imagen vallas

const valla=new Image()
valla.src="../assets/valla.png"

const valla2=new Image()
valla2.src="../assets/valla.png"



//Colocamos en el juego 

function drawBackground (){
    ctx.drawImage(backgroundFondo, 0, 0, canvas.width, canvas.height)

}

function drawMario(){
   ctx.drawImage(mario, marioX, marioY,80, 250)
 
}

function drawValla(){
   ctx.drawImage(valla, vallaX, vallaY, 250,150,)
}

function drawValla2(){
   ctx.drawImage(valla, valla2X, valla2Y, 450,150,)
}

function drawCrashes(){
    ctx.font= '20px Arial'
    ctx.fillStyle='red'
    ctx.fillText('puntos: ' + crashes, 10,30)
}



//Mover a mario

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height) //limpiamos la estela de Mario

    drawBackground()
    drawMario()
    drawValla()
    drawValla2()
    checkCollision()
    drawCrashes()

   
    //FUNCION MOVIMIENTO MARIO
    
    if(rightPressed){
        marioX +=5
    }

    if(leftPressed){
        marioX -=5
    }

    if(isJumping){
        marioY +=jumpyVelocityY
        jumpyVelocityY += gravity
        marioX +=jumpVelocityX
    }

    if(marioY>=ground){
        marioY=ground;
        isJumping=false
        jumpyVelocityY=0
    }
    

    // MOVIMIENTO VALLAS

   vallaY +=vY
   
   valla2Y -=vY

   //REBOTES DE LAS VALLAS

   if(vallaX+250>canvas.width || vallaX  <0) vX=-vX
   if(vallaY <reboundMinY || vallaY +150 >reboundMaxY) {
    vY = -vY;

   }


requestAnimationFrame(draw)
}

draw ()



document.addEventListener("keydown", keyPressed, false);
document.addEventListener("keyup", keyNotPressed, false);


//cuando presionas
function keyPressed(e) {
    if (e.key === "ArrowRight" ) {
        rightPressed = true;

    } else if (e.key === "ArrowLeft" ) {
        leftPressed = true;

    }else if(e.key==="ArrowUp" && !isJumping){
        isJumping=true;
        jumpyVelocityY=jumStrench

    }else if(e.key==="ArrowDown"){
        downPressed=true
    }
}

//cuando sueltas
function keyNotPressed(e) {
    if (e.key === "ArrowRight") {
        rightPressed = false;

    } else if (e.key === "ArrowLeft") {
        leftPressed = false;

    }else if(e.key==="ArrowUp"){
        upPressed=false

    }else if(e.key==="ArrowDown"){
        downPressed=false
    }

}

function checkCollision(){

    let isTouchingValla1=
    marioX - 70 > vallaX &&         
    marioX < vallaX + 100 &&         
    marioY + 150 > vallaY &&         
    marioY < vallaY + 150;  
        
    
    let isTouchingValla2=
    marioX - 120 > valla2X &&
    marioX < valla2X + 200 &&
    marioY + 250 > valla2Y &&
    marioY + 250 < valla2Y + 150;
    


    let isTouching= isTouchingValla1 || isTouchingValla2

    if(isTouching && !controlCollision){
        controlCollision=true
        crashes -=10
        marioY=ground
    }

    if(!isTouching){
        controlCollision=false
    }

    //control de salto

    let jumpedValla1 =
        marioX - 70 > vallaX &&
        marioX < vallaX + 250 &&
        marioY + 250 <= vallaY;


        
    let jumpedValla2 =
       marioX - 120 > valla2X &&
       marioX < valla2X + 450 &&
       marioY + 250 <= valla2Y;
        


    let gumpyValla=jumpedValla1||jumpedValla2


    if(gumpyValla && !controlGump){
        jumpOk=true
        crashes +=5
        marioY=ground
    }

    if(!gumpyValla){
        controlGump=false
    }

    
    
    


}
 



