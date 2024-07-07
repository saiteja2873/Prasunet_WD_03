document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusDisplay = document.querySelector("#status");
    const restartButton = document.querySelector("#restart");
    const playAIButton = document.querySelector("#playAI");
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
    let againstAI = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = `It's ${currentPlayer}'s Turn`;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = `Player ${currentPlayer} has Won!`;
            gameActive = false;
            return;
        }

        let roundDraw = !board.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = "Game ended in a Draw!";
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (board[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
        
        if (againstAI && gameActive) {
            aiMove();
        }
    };

    const handleRestartGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusDisplay.innerHTML = `It's ${currentPlayer}'s Turn`;
        cells.forEach(cell => cell.innerHTML = "");
    };

    const handlePlayAI = () => {
        handleRestartGame();
        againstAI = true;
    };

    const aiMove = () => {
        let emptyCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = currentPlayer;
        document.querySelector(`.cell[data-index='${randomIndex}']`).innerHTML = currentPlayer;
        handleResultValidation();
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", handleRestartGame);
    playAIButton.addEventListener("click", handlePlayAI);

    statusDisplay.innerHTML = `It's ${currentPlayer}'s Turn`;
});
