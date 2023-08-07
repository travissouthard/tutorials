const width = 10;
const boardSize = width * width;
const bombCount = 20;
const validCount = boardSize - bombCount;

const board = document.getElementById("board");

for (let i = 0; i < 100; i++) {
    const square = document.createElement("p");
    square.innerHTML = `${i + 1}`;
    board.appendChild(square);
}
