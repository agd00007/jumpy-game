const startBtn=document.querySelector('.start');
const optionsBtn=document.querySelector('.options')
const closeBtn=document.querySelector('.close')
const firstButtonBtn=document.querySelector('.first-button')
const secondButtonBtn=document.querySelector('.second-button')
const thirdButtonBtn=document.querySelector('.third-button')


let openMenu=false;

function updateOpenMenu(){

    if(!openMenu){
        openMenu=true,
        document.querySelector('.second-container').classList.remove('none')
    }
}

function closeMenu(){

    openMenu=false;
    document.querySelector(".second-container").classList.add("none")

}



optionsBtn.addEventListener('click',updateOpenMenu)
closeBtn.addEventListener('click', closeMenu);