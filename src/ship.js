export class Ship {
    length;
    timesHit = 0;
    sunk = false;

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
        if (this.timesHit == this.length) {
            this.sunk = true;
        }
        return this.sunk;
    }

    hit() {
        ++this.timesHit;
    }
}