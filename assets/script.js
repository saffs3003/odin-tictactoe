function GameBoard() {
    // Check and create the game board dynamically if it doesn't exist
    let board = document.querySelector(".GamePlay");
    if (!board) {
        const container = document.createElement("div");
        container.className = "game-container";

        board = document.createElement("table");
        board.className = "GamePlay";

        const status = document.createElement("div");
        status.className = "status";
        status.textContent = "X's Turn";

        const roundStatus = document.createElement("div");
        roundStatus.className = "round";

        container.appendChild(status);
        container.appendChild(roundStatus);
        container.appendChild(board);
        document.body.appendChild(container);
    }

    // Populate the board
    let counter = 0;
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            const col = document.createElement("td");
            col.setAttribute("index", counter);
            col.innerHTML = `<p>${counter}</p>`;
            row.appendChild(col);
            counter++;
        }
        board.appendChild(row);
    }
}

function Player(name, symbol) {
    return { name, symbol };
}

function Game() {
    // Game state variables
    let Options = ["", "", "", "", "", "", "", "", ""];
    const Player1 = Player("Player 1", "X");
    const Player2 = Player("Player 2", "O");

    let currentPlayer = Player1.symbol;
    let gameRunning = true;

    // Attach click listeners to cells
    const Cells = document.querySelectorAll("td");
    Cells.forEach((cell) =>
        cell.addEventListener("click", function () {
            const currentCellIndex = this.getAttribute("index");

            // Prevent moves on already-filled cells or if game is over
            if (!gameRunning || Options[currentCellIndex] !== "") {
                return;
            }

            updateCell(this, currentCellIndex, Options, currentPlayer);
            checkWinner(Options, currentPlayer);
        })
    );

    function updateCell(cell, index, Options, currentPlayer) {
        Options[index] = currentPlayer;
        cell.textContent = currentPlayer;
    }

    function changePlayer() {
        const playersTurn = document.querySelector(".status");
        currentPlayer = currentPlayer === Player1.symbol ? Player2.symbol : Player1.symbol;
        playersTurn.textContent = `${currentPlayer}'s Turn`;
    }

    function checkWinner(Options, currentPlayer) {
        let roundWon = false;
        const status = document.querySelector(".round");
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Check all winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            const [indexA, indexB, indexC] = winningConditions[i];
            const cellA = Options[indexA];
            const cellB = Options[indexB];
            const cellC = Options[indexC];

            if (cellA === "" || cellB === "" || cellC === "") {
                continue;
            }

            if (cellA === cellB && cellB === cellC) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `${currentPlayer} wins!`;
            gameRunning = false;
        } else if (!Options.includes("")) {
            status.textContent = "It's a Draw!";
            gameRunning = false;
        } else {
            changePlayer();
        }
    }
}

// Initialize the game
GameBoard();
Game();
