
function createPlayer(symbol, playerNum) {
    return {symbol, playerNum};
}

function createBoard() {
    let board = [
        [" ", " ", " "], 
        [" ", " ", " "],
        [" ", " ", " "]
    ];
    return board;
}



function playRound(board, playerTurn) {
    if (playerTurn === 1) {
        board = updateBoard(getInput(), board, "X");
    } else if (playerTurn === 2) {
        board = updateBoard(getInput(), board, "O");
    }
    return board;
}

function checkForWin(board) {
    
}
//For playing in the console
function consoleBoard(board) {
    let string = ""
    for (let i = 0; i < board.length; i++) {
        string += `${board[i][0]} | ${board[i][1]} | ${board[i][2]}\n`;
        if (i < 2) {
            string += "---------\n"
        }
    }
    console.log(string);
}
function getInput() {
    return prompt("Pick a spot on the board, 1-9: ");
    
}

function updateBoard(spot, board, symbol) {
    switch(parseInt(spot)) {
        case 1:
            board[0][0] = symbol;
            break;
        case 2:
            board[0][1] = symbol;
            break;
        case 3:
            board[0][2] = symbol;
            break;
        case 4:
            board[1][0] = symbol;
            break;
        case 5:
            board[1][1] = symbol;
            break;
        case 6:
            board[1][2] = symbol;
            break;            
        case 7:
            board[2][0] = symbol;
            break;
        case 8:
            board[2][1] = symbol;
            break;
        case 9:
            board[2][2] = symbol;
            break;
    }
    return board;
}
function switchPlayer(playerTurn) {
    if (playerTurn === 1) {
        return 2;
    } else {
        return 1;
    }
}


function createGame() {
    const playerOne = createPlayer("X" , 1);
    const playerTwo = createPlayer("O" , 2);
    let board = createBoard();
    let playerTurn = 1;
    let gameOver = false;

    const playGame = () => {
        while (!gameOver) {
            board = playRound(board, playerTurn);
            //checkforwin()
            consoleBoard(board);
            playerTurn = switchPlayer(playerTurn);
        }
    }
    
    return{playGame, board}
}




//Testing
let game = createGame();
game.playGame();
