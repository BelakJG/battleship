import { Ship } from "./ship.js";
export class Gameboard {
    rows = 10;
    cols = 10;
    id;
    board = [];
    shots = [];
    ships = [];

    constructor(id) {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = new Array(this.cols).fill(0);
        }
        for (let i = 0; i < this.rows; i++) {
            this.shots[i] = new Array(this.cols).fill(0);
        }
        this.id = id;
    }

    isValidPlacement(length, x, y, direction) {
        if ((x < 0 || x > 9) || (y < 0 || y > 9)) return false;
        if (direction === "right") {
            if (x + length >= 10) return false;
            for (let i = x; i < x + length; i++) {
                if (this.checkPos(i, y) instanceof Ship) return false;
            }
        } else if (direction === "down") {
            if (y + length >= 10) return false;
            for (let i = y; i < y + length; i++) {
                if (this.checkPos(x, i) instanceof Ship) return false;
            }
        }
        return true;
    }

    placeShip(length, x, y, direction) {
        if ((x < 0 || x > 9) || (y < 0 || y > 9)) throw new Error("Error: Postion out of range");
        if (!this.isValidPlacement(length, x, y, direction)) throw new Error("Error: Invalid Placement");
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

    receiveAttackTest(x, y) {
        if ((x < 0 || x > 9) || (y < 0 || y > 9)) throw new Error("Error: Postion out of range");
        if (this.checkShots(x, y) === "Coordinate not shot") {
            const pos = this.checkPos(x, y);
            // const tileContainer = document.querySelector(`#${this.id}-board`);
            // const tile = tileContainer.querySelector(`#tile-${x}-${y}`);
            if (pos instanceof Ship) {
                this.shots[x][y] = 1;
                // pos.addTile(tile);
                pos.hit();
            } else {
                this.shots[x][y] = -1;
            }
            // this.updateTile(tile, x, y, this.id);
        } else throw new Error("Error: coordinate already shot");
    }

    receiveAttack(x, y) {
        if ((x < 0 || x > 9) || (y < 0 || y > 9)) throw new Error("Error: Postion out of range");
        if (this.checkShots(x, y) === "Coordinate not shot") {
            const pos = this.checkPos(x, y);
            const tileContainer = document.querySelector(`#${this.id}-board`);
            const tile = tileContainer.querySelector(`#tile-${x}-${y}`);
            if (pos instanceof Ship) {
                this.shots[x][y] = 1;
                pos.addTile(tile);
                pos.hit();
            } else {
                this.shots[x][y] = -1;
            }
            this.updateTile(tile, x, y, this.id);
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

    updateTile(tile, x, y) {
        if (this.checkShots(x, y) == "Missed shot") {
            tile.classList.add("missed");
            tile.textContent = "X";
        } else {
            if (this.id == "real" && this.checkPos(x, y) instanceof Ship) {
                tile.classList.add("ship");
            }
            if (this.checkShots(x, y) == "Ship Shot") {
                tile.classList.add("shot");
                tile.textContent = "O";
            }
        }
    }

    displayBoard() {
        const board = document.querySelector(`#${this.id}-board`);
        board.replaceChildren();

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.id = `tile-${j}-${i}`;

                this.updateTile(tile, j, i);

                board.appendChild(tile);
            }
        }
    }
}