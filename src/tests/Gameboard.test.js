import Gameboard from "../classes/Gameboard.js";
import Ship from "../classes/Ship.js"

describe("Gameboard", () => {

    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();  
    })

    test("Gameboard inits correctly", () => {

        expect(gameboard).toBeDefined();
        expect(gameboard.board).toBeDefined();
        expect(gameboard.board instanceof Array).toBeTruthy();

    });


    test("Gameboard places ship correctly", () => {
        const ship = new Ship(5);
        const ship2 = new Ship(3);

        gameboard.place(ship, 0, 0, true);
        gameboard.place(ship2, 5, 5, false);

        expect(gameboard.place(ship, -1, 0, true)).toBe(false)
        expect(gameboard.place(ship, 0, 10, true)).toBe(false)

        expect(gameboard.place(ship2, 5, 9, false)).toBe(false)
        expect(gameboard.place(ship, 8, 8, true)).toBe(false)
    });
});
