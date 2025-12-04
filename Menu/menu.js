const startBtn = document.querySelector('.start');
const optionsBtn = document.querySelector('.options');
const closeBtn = document.querySelector('.close');
const firstButtonBtn = document.querySelector('.first-button');
const secondButtonBtn = document.querySelector('.second-button');
const thirdButtonBtn = document.querySelector('.third-button');


startBtn.addEventListener("click", () => {
    setDifficulty();

    document.querySelector(".main-container").classList.add("none");
    document.querySelector(".second-container").classList.add("none");
    document.getElementById("gameCanvas").classList.remove("none");
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
