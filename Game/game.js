const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Tamaño real del canvas
canvas.width = 1000;
canvas.height = 600;

//Posicion mario

let marioX = 100;
let marioY = 250;


//Posicion valla
let vallaX=400
let vallaY=400


//variables para los botones

var rightPressed=false
var leftPressed=false

// Cargar imagen fondo
const backgroundFondo = new Image();
backgroundFondo.src="../assets/pista.jpg"


//cargar imagen mario
const mario=new Image()
mario.src="../assets/Mario.png"

//cargar imagen vallas

const valla=new Image()
valla.src="../assets/valla.png"


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

function rotateValla(valla, vallaX,vallaY,width,height,angle){
    ctx.save()
    ctx.translate(vallaX+width/2, vallaY + height/2);
    ctx.rotate(angle * Math.PI/120);
    ctx.drawImage(valla, -width/2, -height/2, width,height);
    ctx.restore();
    

}

rotateValla(valla, 300, 300, 150, 100, 30);



//Mover a mario

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height) //limpiamos la estela de Mario

    drawBackground()
    drawMario()
    rotateValla(valla, 300, 300, 150, 100, 30);

    //FUNCION MOVIMIENTO
    
    if(rightPressed){
        marioX +=5
    }
    

   

requestAnimationFrame(draw)
}

draw ()

document.addEventListener("keydown", keyPressed, false);
document.addEventListener("keyup", keyNotPressed, false);

//cuando presionas
function keyPressed(e) {
    if (e.key === "ArrowRight") {
        rightPressed = true;

    } else if (e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

//cuando sueltas
function keyNotPressed(e) {
    if (e.key === "ArrowRight") {
        rightPressed = false;

    } else if (e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

