export class Ship {
    length;
    timesHit = 0;
    sunk = false;
    tiles = [];

    constructor(length) {
        if (length < 2 || length > 5) {
            throw new Error("Error: Invalid ship size");
        }

        this.length = length;
    }

    get length() {
        return this.length;
    }

    get timesHit() {
        return this.timesHit;
    }

    isSunk() {
        if (this.timesHit >= this.length) {
            this.sunk = true;
        }
        return this.sunk;
    }

    hit() {
        if (!this.isSunk()) {
            ++this.timesHit;
        }
        if (this.timesHit >= this.length) {
            this.sunk = true;
            for (const tile of this.tiles) {
                tile.classList.add("sunk");
            }
        }
    }

    addTile(tile) {
        this.tiles.push(tile);
    }
}