let gameseq = [];   //correct seq
let userseq = [];    //user entered seq

let btns = ["yellow", "green", "red", "purple"];  

let start = false;
let level = 0;

let h3 = document.querySelector("h3"); // we are extracting it to use to change level..

let startAnim = document.querySelector("#startAnimation");
let endAnim = document.querySelector("#endAnimation")

function showStartAnimation() {
    startAnim.classList.add("start-show"); // i m adding class here so that i can control is with js 

    setTimeout(() => {
        startAnim.classList.remove("start-show");
    }, 1500);
}


document.addEventListener("keypress", function(){
    if(start === false){
        start = true;
        showStartAnimation();

        setTimeout(() => {
            levelup();
        }, 2000); // wait for animation to finish
    }
});

function gameflash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash");},400);
}

function userflash(btn){
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash");},400);
}

function levelup(){
    userseq = [];
    level++;
    h3.innerText = "level"+level;

    let randint = Math.floor(Math.random()*4);
    let randcolor = btns[randint];
    let randbtn = document.querySelector(`.${randcolor}`);//gets the element on the page (the color box)

    gameseq.push(randcolor)
    gameflash(randbtn); //a random color box will be flexed
    // console.log("game: "+gameseq);
}
function checkans(idx){

    // console.log("curr level: "+level);

    if(userseq[idx]=== gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup, 1000);
        }
    }
    else{
          showOverAnimation();
    }
}
function btnpress() {
    let btn = this;
    usercolor = btn.getAttribute("id");//getting element by id so that we can flex it
    userflash(btn);
    userseq.push(usercolor);
    // console.log("user: "+userseq);
    checkans(userseq.length-1);
    if (!start) return;

}
let allbtn = document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click", btnpress);
}
//Game Over display

function showOverAnimation() {
    let score = level-1;
    endAnim.innerHTML = `Game Over!<br>Your Score:${score}`;
    
    endAnim.classList.add("end-show");

    setTimeout(() => {
        endAnim.classList.remove("end-show");
        resetGame();
    }, 3000);
}

//reset game 
function resetGame() {
    start = false;
    level = 0;
    gameseq = [];
    userseq = [];
    h3.innerText = "Press any key to restart the game";
}
