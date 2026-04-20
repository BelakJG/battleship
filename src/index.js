import "./style.css";
import { Player } from "./player.js";
console.log("Loaded!");

const computerPlayer = new Player("computer");
const realPlayer = new Player("real");

computerPlayer.placeRandom();
computerPlayer.displayBoard();

realPlayer.placeRandom();
realPlayer.displayBoard();

const realRandom = document.querySelector("#random-btn");
realRandom.addEventListener("click", () => {
    realPlayer.resetBoard();
    realPlayer.placeRandom();
    realPlayer.displayBoard();
});
