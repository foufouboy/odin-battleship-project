import Ship from "../classes/Ship";

describe("Ship", () => {

    test(
        "Ship has length, hits, and sunked properties",
        () => {
            const ship = new Ship(5);

            expect(ship.hits).toBeDefined(); 
            expect(ship.length).toBeDefined(); 
            expect(ship.sunk).toBeDefined(); 
        });

    test(
        "Ship has hit method increasing number of hits",
        () => {
            const ship = new Ship();

            expect(ship.hit).toBeDefined();
            
            for (let i = 5; i; i--) ship.hit();

            expect(ship.hits).toEqual(5);
        });

    test(
        "Ship has isSunk method that calculates if ship is sunk, based on its length and hits properties",
        () => {
            const ship1 = new Ship(5);
            const ship2 = new Ship(3);
            const ship3 = new Ship(3);

            for (let i = 5; i; i--) ship1.hit();
            for (let i = 2; i; i--) ship2.hit();

            expect(ship1.isSunk()).toBe(true);  
            expect(ship2.isSunk()).toBe(false);  
            expect(ship3.isSunk()).toBe(false);  
        });
});

