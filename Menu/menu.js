const startBtn=document.querySelector('.start');
const optionsBtn=document.querySelector('.options')
const closeBtn=document.querySelector('.close')
const firstButtonBtn=document.querySelector('.first-button')
const secondButtonBtn=document.querySelector('.second-button')
const thirdButtonBtn=document.querySelector('.third-button')


let openMenu=false;

let selectedDifficulty="easy"


//cuando hacemos start ocultamos el menu y empieza el juego
startBtn.addEventListener("click", () => {
    document.querySelector(".main-container").classList.add("none");
    window.location.href = "../game/game.html"; 
});

function updateOpenMenu(){

    if(!openMenu){
        openMenu=true,
        document.querySelector('.second-container').classList.remove('none')
        canvas.classList.remove("none")
    }
}

function closeMenu(){

    openMenu=false;
    document.querySelector(".second-container").classList.add("none")

}



optionsBtn.addEventListener('click',updateOpenMenu)
closeBtn.addEventListener('click', closeMenu);


function startGameWithDifficulty(difficulty) {
        // Guardamos la dificultad en localStorage para que game.html la lea
        localStorage.setItem('difficulty', difficulty);
        window.location.href = "../game/game.html"; // Redirige a la página del juego
    }

firstButtonBtn.addEventListener("click", () => {
    localStorage.setItem("difficulty", "easy");
    window.location.href = "../game/game.html";
});

secondButtonBtn.addEventListener("click", () => {
    localStorage.setItem("difficulty", "medium");
    window.location.href = "../game/game.html";
});

thirdButtonBtn.addEventListener("click", () => {
    localStorage.setItem("difficulty", "hard");
    window.location.href = "../game/game.html";
});