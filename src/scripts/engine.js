const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    //tirando a classe enemy de todos os quadrados
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    //sorteando um número aleatório
    let randomNumber = Math.floor(Math.random() * 9)
    //adicionando a classe enemy ao número adicionado
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    //guardando qual é o index clicado
    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy(){
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
// }

function addListenerHitbox(){
    state.view.squares.forEach((square=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    }))
}

function init(){
    //moveEnemy();
    addListenerHitbox();
}

init();