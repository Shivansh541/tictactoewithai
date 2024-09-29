boxes=document.querySelectorAll('.box')
reset=document.querySelector('#reset')
info=document.querySelector('.info')

board = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
gameover=false
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const checkWinner=(player)=>{
    return winPatterns.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    })
}
const isBoardFull = ()=>{
    return board.every(cell => cell!==' ')
}
const minimax = (is_ai_turn)=>{
    if(checkWinner('X')){
        return 1
    }
    else if(checkWinner('O')){
        return -1
    }
    else if(isBoardFull()){
        return 0
    }
    let bestScore = is_ai_turn? -Infinity : Infinity
    for(let i=0;i<9;i++){
        if(board[i]==' '){
            board[i] = is_ai_turn? 'X' : 'O'
            let score = minimax(!is_ai_turn)
            board[i] =' '
            bestScore=is_ai_turn?Math.max(score,bestScore):Math.min(score,bestScore)
        }
    }
    return bestScore
}
const AIturn = ()=>{
    let bestScore = -Infinity
    let bestMove
    for(let i=0;i<9;i++){
        if(board[i]==' '){
            board[i] = 'X'
            let score = minimax(false)
            board[i] =' '
            if(score>bestScore){
                bestScore = score
                bestMove = i
            }
        }
    }
    board[bestMove] = 'X'
    boxes[bestMove].innerText = 'X'
    if(checkWinner('X')){
        info.innerText = "AI Wins"
        gameover = true
    }
    else if(isBoardFull()){
        info.innerText = "It's a Tie"
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        if(board[index]==' ' && gameover==false){
            box.innerText = 'O'
            board[index] = 'O'
            if(checkWinner('O')){
                info.innerText = "Human Wins"
                gameover = true
            }
            else if(isBoardFull()){
                info.innerText = "It's a Tie"
            }
            else if(gameover==false){
                console.log("AI is thinking")
                AIturn()
                console.log("Your turn")
            }
        }
    })
})
reset.addEventListener('click',()=>{
    board = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
    boxes.forEach(box=>{
        box.innerText=""
    })
})