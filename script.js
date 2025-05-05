const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGame = document.querySelector('.btn');

let currentPlayer;
let gameGrid;
let winnerFound;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

refresh();


function refresh(){
    currentPlayer = 'X';
    gameGrid =["","","","","","","","",""];
    gameInfo.innerText = `Current Player   ${currentPlayer}`;
    newGame.classList.remove('active');
    gameInfo.classList.remove('winInfo');
    gameInfo.classList.remove('drawInfo');
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove('win');
    });
    winnerFound = false;
}

newGame.addEventListener('click',()=>{
    refresh();
});


boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // swapping current player
        currentPlayer = currentPlayer === 'X'?'O':'X';
        gameInfo.innerText = `Current Player - ${currentPlayer}`;

        checkWin();
        checkDraw();
    }
}

function checkWin(){
    winningPosition.forEach((position)=>{
        let answer = "";
        for(let i=0;i<3;i++){
            answer+=gameGrid[position[i]];
        }

        if(answer==="XXX" || answer==="OOO"){

            winnerFound = true;

            for(let j=0;j<3;j++){
                boxes[position[j]].classList.add('win');
            }

            gameInfo.innerText = `WINNER   ${answer[0]}`;
            gameInfo.classList.add('winInfo');
            boxes.forEach(box=>{
                box.style.pointerEvents = "none";
            });
            newGame.classList.add('active');
        }
    });
    
}

function checkDraw(){
    let nonEmptyGrid = true;
    gameGrid.forEach((element)=>{
        if(element===""){
            nonEmptyGrid = false;
        }
    })
    if(!winnerFound && nonEmptyGrid){
        gameInfo.innerText = `GAME TIED`;
        gameInfo.classList.add('drawInfo');
        boxes.forEach(box=>{
            box.style.pointerEvents = "none";
        });
        newGame.classList.add('active');
    }
}

