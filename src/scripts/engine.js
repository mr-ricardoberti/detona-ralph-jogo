const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
    }
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

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitbox(){
    state.view.squares.forEach((square=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        })
    }))
}

function init(){
    moveEnemy();
    addListenerHitbox();
}

init();