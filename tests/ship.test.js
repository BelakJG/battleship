import { Ship } from "../src/ship.js";

test("Ship constructor takes length as argument", () => {
    const testShip = new Ship(2);
    expect(testShip.length).toBe(2);
});

test("constructor throws error when given size is too small", () => {
    expect(() => {
        const smallShip = new Ship(1);
    }).toThrow(new Error("Error: Invalid ship size"));
});
test("constructor throws error when given size is too large", () => {
    expect(() => {
        const largeShip = new Ship(10);
    }).toThrow(new Error("Error: Invalid ship size"));
});

test("hit() increments the ship's hit counter", () => {
    const hitShip = new Ship(2);
    hitShip.hit();
    expect(hitShip.timesHit).toBe(1);
});

test("isSunk() checks if ship has taken too many hits", () => {
    const sunkShip = new Ship(2);
    sunkShip.hit();
    sunkShip.hit();
    expect(sunkShip.isSunk()).toBe(true);
});