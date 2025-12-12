const startBtn = document.querySelector('.start');
const optionsBtn = document.querySelector('.options');
const closeBtn = document.querySelector('.close');
const firstButtonBtn = document.querySelector('.first-button');
const secondButtonBtn = document.querySelector('.second-button');
const thirdButtonBtn = document.querySelector('.third-button');
const retryButtonBtn=document.querySelector("#resart")
const menuButtonBtn=document.querySelector("#menu")


startBtn.addEventListener("click", () => {
    setDifficulty();

    document.querySelector(".main-container").classList.add("none");
    document.querySelector(".second-container").classList.add("none");
    document.getElementById("gameCanvas").classList.remove("none");

    resetGame();

    
    timerRunning = true;
    timer = 20;

    const timerInterval = setInterval(() => {
        if (timerRunning) {
            timer--;

            if (timer <= 0) {
                timerRunning = false;
                clearInterval(timerInterval);
                endGame();
            }
        }
    }, 1000);
});


optionsBtn.addEventListener("click", () => {
    document.querySelector(".second-container").classList.remove("none");
});


closeBtn.addEventListener("click", () => {

    setDifficulty()

    document.querySelector(".second-container").classList.add("none");
});


firstButtonBtn.addEventListener("click", () => {
    localStorage.setItem("difficulty", "easy");
    startBtn.click()
});

secondButtonBtn.addEventListener("click", () => {
    localStorage.setItem("difficulty", "medium");
    startBtn.click()
  
});

thirdButtonBtn.addEventListener("click", () => {
    localStorage.setItem("difficulty", "hard");
    startBtn.click()
});


retryButtonBtn.addEventListener("click", resetGame);

menuButtonBtn.addEventListener("click", ()=>{
    document.getElementById("gameCanvas").classList.add("none");
    document.getElementById("modal")
    modal.classList.add("none");         
    modal.style.display = "none";
    

    document.querySelector(".main-container").classList.remove("none")

})

