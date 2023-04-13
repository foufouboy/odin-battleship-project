
export default class Ship {
    constructor(length) {
        this.length = length;
        this.sunk = false;
        this.hits = 0;
    }

    hit() {
        if (this.sunk) {
            return;
        }

        this.hits++;
        
        if (this.isSunk()) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.hits === this.length ? true : false;
    }
}
