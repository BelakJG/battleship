import "./style.css";
import { Player } from "./player.js";

const computerPlayer = new Player("computer");
const realPlayer = new Player("real");

computerPlayer.displayBoard();

realPlayer.gameboard.placeShip(5, 1, 3, "right");
realPlayer.displayBoard();

console.log("Loaded!");