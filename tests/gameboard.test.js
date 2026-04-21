import { Ship } from "../src/ship.js";
import { Gameboard } from "../src/gameboard.js"

test("placeShip() only takes valid coordinates", () => {
    const board = new Gameboard();
    expect(() => {
        board.placeShip(2, -1, 2, "right");
    }).toThrow(new Error("Error: Postion out of range"));
});
test("placeShip() only takes valid directions", () => {
    const board = new Gameboard();
    expect(() => {
        board.placeShip(2, 1, 0, "up");
    }).toThrow(new Error("Error: Invalid direction given"));
    expect(() => {
        board.placeShip(2, 1, 0, "left");
    }).toThrow(new Error("Error: Invalid direction given"));
});
test("placeShip() places ship only within given length and direction", () => {
    const board = new Gameboard();
    board.placeShip(2, 2, 3, "right");
    const leftSide = board.checkPos(2, 3);
    const rightSide = board.checkPos(3, 3);
    expect(leftSide).toBeInstanceOf(Ship);
    expect(rightSide).toBeInstanceOf(Ship);
    expect(leftSide === rightSide).toBe(true);

    const emptyLeft = board.checkPos(1, 3);
    const emptyRight = board.checkPos(4, 3);
    const emptyBelow = board.checkPos(2, 4);
    expect(emptyLeft).toBe("Empty Position");
    expect(emptyRight).toBe("Empty Position");
    expect(emptyBelow).toBe("Empty Position");
});
test("Ships can not be overlapped", () => {
    const board  = new Gameboard();
    expect(() => {
        board.placeShip(5, 5, 3, "down");
        board.placeShip(5, 3, 3, "right");
    }).toThrow(new Error("Error: Invalid Placement"));
});

test("checkPos() will throw error if given invalid coords", () => {
    const board = new Gameboard();
    expect(() => {
        board.checkPos(-1, -1);
    }).toThrow(new Error("Error: Postion out of range"));
    expect(() => {
        board.checkPos(2, -1);
    }).toThrow(new Error("Error: Postion out of range"));
    expect(() => {
        board.checkPos(-1, 3);
    }).toThrow(new Error("Error: Postion out of range"));
});

test("checkShots() will throw error if given invalid coords", () => {
    const board = new Gameboard();
    expect(() => {
        board.checkShots(-1, -1);
    }).toThrow(new Error("Error: Postion out of range"));
    expect(() => {
        board.checkShots(2, -1);
    }).toThrow(new Error("Error: Postion out of range"));
    expect(() => {
        board.checkShots(-1, 3);
    }).toThrow(new Error("Error: Postion out of range"));
});

test("receiveAttack() logs missed shots", () => {
    const board = new Gameboard();
    expect(board.checkShots(1, 1)).toBe("Coordinate not shot");

    board.receiveAttackTest(1, 1);
    expect(board.checkShots(1, 1)).toBe("Missed shot");
});
test("receiveAttack() logs hits and trigger Ship.hit()", () => {
    const board = new Gameboard();
    board.placeShip(2, 1, 1, "down");
    const ship = board.checkPos(1, 1);

    board.receiveAttackTest(1, 1);
    expect(board.checkShots(1, 1)).toBe("Ship Shot");
    expect(ship.timesHit).toBe(1);
});
test("Ships will save if they're sunk", () => {
    const board = new Gameboard();
    board.placeShip(2, 1, 1, "down");
    const ship = board.checkPos(1, 1);

    board.receiveAttackTest(1, 1);
    board.receiveAttackTest(1, 2);

    expect(ship.timesHit).toBe(2);
    expect(ship.isSunk()).toBe(true);
});
test("Ships can only be shot once per coordinate", () => {
    const board = new Gameboard();
    board.placeShip(2, 1, 1, "down");
    const ship = board.checkPos(1, 1);

    expect(ship.timesHit).toBe(0);
    board.receiveAttackTest(1, 1);
    expect(ship.timesHit).toBe(1);

    expect(() => {
        board.receiveAttackTest(1, 1);
    }).toThrow(new Error("Error: coordinate already shot"));
    expect(ship.timesHit).toBe(1);
});

test("Gameboard able to report if all ships are sunk", () => {
    const board = new Gameboard();
    board.placeShip(2, 1, 1, "right");
    board.placeShip(2, 1, 2, "right");

    board.receiveAttackTest(1, 1);
    board.receiveAttackTest(2, 1);
    expect(board.allShipsSunk()).toBe(false);

    board.receiveAttackTest(1, 2);
    board.receiveAttackTest(2, 2);
    expect(board.allShipsSunk()).toBe(true);
});