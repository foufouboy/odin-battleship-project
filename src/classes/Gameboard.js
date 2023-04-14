
const SIZE = 10;

export default class Gameboard {
    constructor() {
        this.board = [];
        this.coordsShoted = [];
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

        if (isVertical) {
            for (let i = 0; i < ship.length; i++) {
                this.board[row + i][col] = ship;
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                this.board[row][col + i] = ship;
            }
        }

        return true;
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
        if (isVertical) {
            for (let i = -1; i <= ship.length; i++) {
                if (this.board[row + i]) {
                    if (this.board[row + i][col] ||
                        this.board[row + i][col - 1] ||
                        this.board[row + i][col + 1]) {
                        return false; 
                    }
                }
            }
        } else {
            for (let i = -1; i <= ship.length; i++) {
                if (this.board[row][col + i] ||
                   (this.board[row - 1] && this.board[row - 1][col + i]) ||
                   (this.board[row + 1] && this.board[row + 1][col + i])) {
                    return false; 
                }
            }
        }

        return true;
    }

    receiveAttack(row, col) {

        if (row < 0 || SIZE <= row || col < 0 || SIZE <= col) {
            return false;
        }
        
        if (this.coordsShoted
            .some(coords => coords.row === row && coords.col === col)) {
            return false;
        }

        if (this.board[row][col]) {
            this.board[row][col].hit();
        }

        this.coordsShoted.push({row, col});
        
        return true;
    }

    isGameOver() {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (this.board[row][col] &&
                    !this.board[row][col].isSunk()) {
                    return false;
                } 
            }
        }    
        return true;
    }

    isEmpty() {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (this.board[row][col]) return false;
            }
        }

        return true;
    }

    printBoard() {
        // this.board
        //     .map(row => {console.log(row
        //     .map(e => e ? "S" : "~"))});
        console.log(this.board);
    }
}
