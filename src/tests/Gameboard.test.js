import Gameboard from "../classes/Gameboard.js";
import Ship from "../classes/Ship.js"

let gameboard;
let ship,
    ship2,
    ship3;

beforeEach(() => {
    gameboard = new Gameboard();  
    ship = new Ship(5);
    ship2 = new Ship(3);
    ship3 = new Ship(2);
});

describe("Gameboard inits correctly", () => {


    test("Gameboard instance is defined", () => {
        expect(gameboard).toBeDefined();
    });

    test("Gameboard board is defined, and is an array", () => {
        expect(gameboard.board).toBeDefined();
        expect(gameboard.board instanceof Array).toBeTruthy();
    }); 


});

describe("Gameboard places ship correctly", () => {

    test("Gameboard.place exists", () => {
        expect(gameboard.place).toBeDefined();
    });

    test("Ship can be placed on board", () => {
        gameboard.place(ship, 0, 0, false);

        for (let i = 0; i < ship.length; i++) {
            expect(gameboard.board[0][i] instanceof Ship)
                .toBe(true);
        }
    });

    test("Ship can't be placed off board", () => {
        expect(gameboard.place(ship, -1, 0, true)).toBe(false)
        expect(gameboard.place(ship, 0, 10, true)).toBe(false)

        expect(gameboard.place(ship2, 5, 9, false)).toBe(false)
        expect(gameboard.place(ship, 8, 8, true)).toBe(false)
    });

    test(
    "Ship can't collide with other ships, neither be too close", 
    () => {
        gameboard.place(ship, 0, 0, true);

        expect(gameboard.place(ship2, 0, 0, false)).toBe(false);
        expect(gameboard.place(ship2, 0, 1, true)).toBe(false);
        expect(gameboard.place(ship2, 5, 0, true)).toBe(false);
        expect(gameboard.place(ship2, 6, 0, true)).toBe(true);
    });
});

describe("Gameboard receives attacks properly", () => {
      
    test("Gameboard.receiveAttack exists", () => {
        expect(gameboard.receiveAttack).toBeDefined();
    });

    test("Cannot shot off board", () => {
        expect(gameboard.receiveAttack(-1, -1)).toBe(false);
        expect(gameboard.receiveAttack(2, 2)).toBe(true);
    })

    test("Shots coords are saved when a shot is made", () => {
        gameboard.receiveAttack(0, 0);  

        expect(gameboard.coordsShoted).not.toEqual(new Gameboard().coordsShoted);
    });

    test("Cannot shot on place already shoted", () => {
        gameboard.receiveAttack(5, 5); 
        gameboard.receiveAttack(3, 4); 
        gameboard.receiveAttack(2, 1); 

        expect(gameboard.receiveAttack(1, 1)).toBe(true);
        expect(gameboard.receiveAttack(2, 1)).toBe(false);
    });

    test("A shot on a ship increases its hits count", () => {
        gameboard.place(ship, 2, 2, true);  
        gameboard.place(ship2, 0, 2, false);  

        gameboard.receiveAttack(5, 2);
        gameboard.receiveAttack(3, 2);
        gameboard.receiveAttack(5, 2);

        expect(ship.hits).toEqual(2);
        expect(ship2.hits).toEqual(0);
    });
});

describe("Game over", () => {
    
    test("Gameboard.isGameOver exists", () => {
        expect(gameboard.isGameOver).toBeDefined();  
    });

    test("Game should be over when all ships are sunk", () => {
        gameboard.place(ship, 0, 0, false);
        gameboard.place(ship2, 5, 5, true);

        expect(gameboard.isGameOver()).toBe(false);

        for (let i = 0; i < ship.length; i++) {
            gameboard.receiveAttack(0, i);
        }

        for (let i = 0; i < ship2.length; i++) {
            gameboard.receiveAttack(5 + i, 5);
        }
        
        expect(ship.isSunk()).toBe(true);
        expect(ship2.isSunk()).toBe(true);
        expect(gameboard.isGameOver()).toBe(true);

    });
});





