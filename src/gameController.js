import { Player } from "./player.js"

const GameController = (() => {
    let computerPlayer;
    let realPlayer;

    let initialize = () => {
        computerPlayer = new Player("computer");
        realPlayer = new Player("real");

        computerPlayer.placeRandom();
        computerPlayer.displayBoard();
        
        realPlayer.placeRandom();
        realPlayer.displayBoard();
        
        const realRandom = document.querySelector("#random-btn");
        realRandom.addEventListener("click", () => {
            computerPlayer.resetBoard();
            computerPlayer.placeRandom();
            computerPlayer.displayBoard();
            addComputerListeners();
        
            realPlayer.resetBoard();
            realPlayer.placeRandom();
            realPlayer.displayBoard();
        });
        addComputerListeners();
    }

    let addComputerListeners = () => {
        const computerBoard = document.querySelector("#computer-board");
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const tile = computerBoard.querySelector(`#tile-${x}-${y}`);
                tile.addEventListener("click", () => {
                    computerPlayer.gameboard.receiveAttack(x, y);
                    computerPlayer.gameboard.updateTile(tile, x, y);
                    if (computerPlayer.gameboard.allShipsSunk()) {
                        gameOver("real");
                    } else {
                        computerTurn();
                    }
                }, {once: true});
            }
        }
    }

    let computerTurn = () => {
        while (true) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            if (realPlayer.gameboard.checkShots(x, y) === "Coordinate not shot") {
                realPlayer.gameboard.receiveAttack(x, y);
                break;
            }
        }
        if (realPlayer.gameboard.allShipsSunk()) {
            gameOver("computer");
        }
    }

    let gameOver = (player) => {
        const backdrop = document.querySelector("#modal-backdrop");
        const gameoverScreen = document.querySelector("#game-over");
        gameoverScreen.replaceChildren();

        backdrop.classList.add("show");
        gameoverScreen.classList.add("show");

        const screenheader = document.createElement("h1");
        screenheader.textContent = "Game Over!";
        gameoverScreen.appendChild(screenheader);

        const winner = document.createElement("p");
        winner.textContent = `The ${player === "real" ? "Real Player" : "Computer"} Wins!`;
        gameoverScreen.appendChild(winner);

        const againBtn = document.createElement("button");
        againBtn.type = "button";
        againBtn.textContent = "Play Again?"
        gameoverScreen.appendChild(againBtn);

        againBtn.addEventListener("click", () => {
            backdrop.classList.remove("show");
            gameoverScreen.classList.remove("show");
            initialize();
        });
    };

    return { initialize };
})();

export {GameController};