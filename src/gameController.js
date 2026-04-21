import { Player } from "./player.js"

const GameController = (() => {
    const computerPlayer = new Player("computer");
    const realPlayer = new Player("real");

    let initialize = () => {
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
                    computerTurn();
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
    }

    return { initialize };
})();

export {GameController};