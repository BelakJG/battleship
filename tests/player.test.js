import { Player } from "../src/player.js";
import { Gameboard } from "../src/gameboard.js";

test("Player constructor should take player type as an argument", () => {
    const realPlayer = new Player("real");
    const aiPlayer = new Player("computer");

    expect(realPlayer.type).toBe("real");
    expect(aiPlayer.type).toBe("computer");
});
test("Player constructor creates a new gameboard for each new player", () => {
    const player = new Player("real");
    expect(player.gameboard).toBeInstanceOf(Gameboard);
});
test("Player constructor throw error if wrong type is given", () => {
    expect(() => {
        const wrongPlayer = new Player("dsfasa");
    }).toThrow(new Error("Error: Wrong player type given"));
});