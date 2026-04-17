import { Ship } from "./ship.js";
export class Gameboard {
    rows = 10;
    cols = 10;
    board = [];
    shots = [];
    ships = [];

    constructor() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = new Array(this.cols).fill(0);
        }
        for (let i = 0; i < this.rows; i++) {
            this.shots[i] = new Array(this.cols).fill(0);
        }
    }

    placeShip(length, x, y, direction) {
        if ((x < 0 || x > 9) || (y < 0 || y > 9)) throw new Error("Error: Postion out of range");
        const ship = new Ship(length);
        if (direction === "right") {
            for (let i = x; i < x + length; i++) {
                if (this.checkPos(i, y) instanceof Ship) throw new Error("Error: Ships can not overlap");
                this.board[i][y] = ship;
            }
        } else if (direction === "down") {
            for (let i = y; i < y + length; i++) {
                if (this.checkPos(x, i) instanceof Ship) throw new Error("Error: Ships can not overlap");
                this.board[x][i] = ship;
            }
        } else {
            throw new Error("Error: Invalid direction given");
        }
        this.ships.push(ship);
    }

    checkPos(x, y) {
        if ((x < 0 || x > 9) || (y < 0 || y > 9)) throw new Error("Error: Postion out of range");
        const pos = this.board[x][y];
        if (pos === 0) {
            return "Empty Position";
        } else {
            return pos;
        }
    }

    checkShots(x, y) {
        if ((x < 0 || x > 9) || (y < 0 || y > 9)) throw new Error("Error: Postion out of range");
        const pos = this.shots[x][y];
        if (pos === 0) {
            return "Coordinate not shot";
        } else if (pos === -1) {
            return "Missed shot";
        } else if (pos === 1) {
            return "Ship Shot";
        }
    }

    receiveAttack(x, y) {
        if ((x < 0 || x > 9) || (y < 0 || y > 9)) throw new Error("Error: Postion out of range");
        if (this.checkShots(x, y) == "Coordinate not shot") {
            const pos = this.checkPos(x, y);
            if (pos instanceof Ship) {
                pos.hit();
                this.shots[x][y] = 1;
            } else {
                this.shots[x][y] = -1;
            }
        } else throw new Error("Error: coordinate already shot");
    }

    allShipsSunk() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}