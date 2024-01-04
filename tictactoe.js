
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
    //Check for x
    for (let i = 0; i < board.length; i++) {
        if ((board[i][0] === "X") && (board[i][1] === "X") && (board[i][2] === "X")) return "X wins";
        if ((board[0][i] === "X") && (board[1][i] === "X") && (board[2][i] === "X")) return "X wins";
    }
    if ((board[0][0] === "X") && (board[1][1] === "X") && (board[2][2] === "X")) return "X wins";
    if ((board[0][2] === "X") && (board[1][1] === "X") && (board[2][0] === "X")) return "X wins";

    //Check for O
    for (let i = 0; i < board.length; i++) {
        if ((board[i][0] === "O") && (board[i][1] === "O") && (board[i][2] === "O")) return "O wins";
        if ((board[0][i] === "O") && (board[1][i] === "O") && (board[2][i] === "O")) return "O wins";
    }
    if ((board[0][0] === "O") && (board[1][1] === "O") && (board[2][2] === "O")) return "O wins";
    if ((board[0][2] === "O") && (board[1][1] === "O") && (board[2][0] === "O")) return "O wins";
    return null;

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
    spot = prompt("Pick a spot on the board, 1-9: ");
    if (spot === "stop") throw console.error("STOP");
    return spot;
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
    let gameOver = null;

    const playGame = () => {
        while (gameOver === null) {
            if (playerTurn === 1) {
                console.log("Player X turn");
            } else {
                console.log("Player O turn");
            }
            board = playRound(board, playerTurn);
            gameOver = checkForWin(board);
            console.log(gameOver);
            consoleBoard(board);
            playerTurn = switchPlayer(playerTurn);
        }
        console.log(gameOver);
    }
    
    return{playGame, board}
}




//Testing
let game = createGame();
game.playGame();
