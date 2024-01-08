const player = (symbol) => {
    this.symbol = symbol

    const getSymbol = () => {
        return symbol;
    }

    return {
        getSymbol
    }
}


const gameBoard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

    const setCell = (index, symbol) => {
        if (index > board.length) return;
        board[index] = symbol
    }

    const getCell = (index) => {
        return board[index];
    }

    const resetBoard = () => {
        for(let i = 0; i < board.length;i++) {
            board[i] = "";
        }
    }

    return {
        getCell,
        setCell,
        resetBoard,
        board
    }
})();

const consoleControler = (() => {
    
    const printBoard = () => {
        console.log(
            `${gameBoard.board[0]} | ${gameBoard.board[1]} | ${gameBoard.board[2]}\n---------\n${gameBoard.board[3]} | ${gameBoard.board[4]} | ${gameBoard.board[5]}\n---------\n${gameBoard.board[6]} | ${gameBoard.board[7]} | ${gameBoard.board[8]}
            `
        )
    }

    const printPlayerTurn = (playerTurn) => {
        if (playerTurn === 1) {
            console.log("Player X turn");
        } else {
            console.log("Player O turn")
        }
    }

    return {
        printBoard,
        printPlayerTurn
    }

})()

const displayControler = (() => {
    cells = document.querySelectorAll('.cell');
    resetBtn = document.querySelector('.reset');
    gameOverText = document.querySelector('.gameover-text');
    playerTurnText = document.querySelector('.player-turn');

    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            if (gameController.getGameOver() || e.target.textContent !== "") return;
            gameController.playRound(parseFloat(e.target.id));
            updateGameBoard();
        })
    })

    const updateGameBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getCell(i);
        }
    }

    const getDisplayMessage = (winner) => {
        if (winner === "draw") {
            setMessage("GAME OVER CAT GAME");
        } else {
            setMessage(`GAME OVER ${winner} WINS`);
        }
    }

    const setMessage = (message) => {
        gameOverText.textContent = message;
        gameOverText.style.display = 'block';
    }

    const changePlayerTurnText = (symbol) => {
        playerTurnText.textContent = `Player ${symbol}'s Turn`;
    }

    resetBtn.addEventListener('click', () => {
        gameController.resetGame();
        gameBoard.resetBoard();
        updateGameBoard();
        gameOverText.textContent = "";
        gameOverText.style.display = 'none';
        playerTurnText.textContent = `Player X's Turn`;
    })

    

    return {
        getDisplayMessage,
        changePlayerTurnText
    }
})();

const gameController = (() => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let playerTurn = 1;
    let count = 0;
    let gameOver = false;

    const playRound = (cellIndex) => {
        gameBoard.setCell(cellIndex, getPlayerTurnSymbol());
        if(checkForWin()) {
            gameOver = true;
            displayControler.getDisplayMessage(getPlayerTurnSymbol());
            return;
        }
        if (count === 8) {
            gameOver = true;
            displayControler.getDisplayMessage("draw");
            return;
        }
        count++;
        switchPlayer();
        displayControler.changePlayerTurnText(getPlayerTurnSymbol());
    }

    const switchPlayer = () => {
        if (playerTurn === 1) {
            playerTurn = 2;
        } else {
            playerTurn = 1;
        }
    }

    const getPlayerTurnSymbol = () => {
        if (playerTurn === 1) {
            return playerOne.getSymbol();
        } else {
            return playerTwo.getSymbol();
        }
    }

    const checkForWin = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        let win = false;
        winConditions.forEach((condition) => {
            if ((gameBoard.board[condition[0]] === gameBoard.board[condition[1]]) && (gameBoard.board[condition[0]] === gameBoard.board[condition[2]]) && (gameBoard.board[condition[0]] !== "")) {
                win = true;
            }
        })
        return win;
    }
    
    const resetGame = () => {
        playerTurn = 1;
        gameOver = false;
        count = 0;
    }

    const getGameOver = () => {
        return gameOver;
    }

    return {
        gameOver,
        playRound,
        getGameOver,
        resetGame
    }
})()
