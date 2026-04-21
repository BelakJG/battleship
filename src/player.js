import { Gameboard } from "./gameboard.js";
export class Player {
    type;
    gameboard;

    constructor(type) {
        if (!(type == "real" || type == "computer")) throw new Error("Error: Wrong player type given");

        this.type = type;
        this.gameboard = new Gameboard(type);
    }

    get type() {
        return this.type;
    }

    get gameboard() {
        return this.gameboard;
    }

    displayBoard() {
        this.gameboard.displayBoard();
    }

    resetBoard() {
        this.gameboard = new Gameboard(this.type);
    }

    placeRandom() {
        const shipLengths = [5, 4, 3, 3, 2];
        const shipDirections = ["right", "down"];

        for (const length of shipLengths) {
            while (true) {
                let x = Math.floor(Math.random() * 10);
                let y = Math.floor(Math.random() * 10);
                let direction = shipDirections[Math.floor(Math.random() * shipDirections.length)];
                if (this.gameboard.isValidPlacement(length, x, y, direction)) {
                    this.gameboard.placeShip(length, x, y, direction);
                    break;
                }
            }
        }
    }
}