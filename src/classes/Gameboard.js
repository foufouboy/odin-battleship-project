
const SIZE = 10;

export default class Gameboard {
    constructor() {
        this.board = [];
        this.init();
    } 

    init() {
        for (let i = 0; i < SIZE; i++) {
            this.board[i] = [];
            for (let j = 0; j < SIZE; j++) {
                this.board[i][j] = null;
            }
        }
    }

    place(ship, row, col, isVertical) {
        if (!this.isPlacementPossible(ship, row, col, isVertical)) {
            return false;
        }
    }

    isPlacementPossible(ship, row, col, isVertical) {
        // coords out of board
        if (row < 0 || SIZE <= row || col < 0 || SIZE <= col) {
            return false;
        }

        // ship doesn't fit in board
        if ((row + ship.length > SIZE && isVertical) || 
            (col + ship.length > SIZE && !isVertical)) {
            return false;
        }

        // ships collision

        return true;
    }
}
