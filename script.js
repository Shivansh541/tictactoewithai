boxes=document.querySelectorAll('.box')
reset=document.querySelector('#reset')
info=document.querySelector('.info')
game=document.getElementsByClassName('game')
gif=document.querySelector('.container')

let r=true;
let music=new Audio("music.mp3")
let audioturn=new Audio("ting.mp3")
let gameover=new Audio("gameover.mp3")
let turnO=true;
let win=false
const winPatterns=[
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
music.play()
let i=0;
boxes.forEach(box=>{
    box.addEventListener('click',()=>{
        if(box.innerText=='' && win==false){
            if(turnO==true){
                box.innerText="O";
                turnO=false;
                info.innerText="Turn for X"
            }
            else{
                box.innerText="X";
                turnO=true;
                info.innerText="Turn for O"
            }
            audioturn.play()
            i++;
        }
        checkWinner();
        if(i==9 && win==false){
            info.innerText="Game Tie"
        }
    })
})
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText
        let pos2val=boxes[pattern[1]].innerText
        let pos3val=boxes[pattern[2]].innerText
        if(pos1val!="" && pos2val!=""&&pos3val!=""){
            if(pos1val==pos2val && pos2val==pos3val){
                if(turnO==true){
                    info.innerText="Winner is X";
                }
                else{
                    info.innerText="Winner is O";
                }
                win=true
                music.pause()
                gameover.play()
                gif.classList.toggle('resp2')
                r=false
            }
        }
    }
}

reset.addEventListener('click',()=>{
    boxes.forEach(box=>{
        box.innerText=""
    })
    win=false;
    info.innerText="Turn for O"
    turnO=true
    if(r==false){
        gif.classList.toggle('resp2')
    }
    r=true
    music.play()
})


