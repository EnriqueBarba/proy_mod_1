
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const start = document.querySelector("button")
start.onclick = () => game.start()