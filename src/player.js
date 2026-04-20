import { Gameboard } from "./gameboard.js";
export class Player {
    type;
    gameboard;

    constructor(type) {
        if (!(type == "real" || type == "computer")) throw new Error("Error: Wrong player type given");

        this.type = type;
        this.gameboard = new Gameboard();
    }

    get type() {
        return this.type;
    }

    get gameboard() {
        return this.gameboard;
    }

    displayBoard() {
        this.gameboard.displayBoard(this.type);
    }
}