const width = 10;
const boardSize = width * width;
const bombCount = 20;
const validCount = boardSize - bombCount;
const squareValues = [];
let isGameOver = false;

for (let i = 0; i < boardSize; i++) {
    if (i < bombCount) {
        squareValues.push("bomb");
    } else {
        squareValues.push("valid");
    }
}

const board = document.getElementById("board");
const reset = document.getElementById("reset");

const shuffleValues = () => {
    for (let i = 0; i < squareValues.length; i++) {
        const randomIndex = Math.floor(Math.random() * squareValues.length);
        let temp = squareValues[i];
        squareValues[i] = squareValues[randomIndex];
        squareValues[randomIndex] = temp;
    }
};

const resetGame = () => {
    isGameOver = false;
    board.innerHTML = "";
};

const handleClick = (squareObj) => {
    if (isGameOver) return;
    if (squareObj.classList.contains("bomb")) {
        isGameOver = true;
        squareObj.innerHTML = "💥";
    }

    const clickedClass = "clicked";
    if (!squareObj.classList.contains(clickedClass)) {
        squareObj.classList.add(clickedClass);
    }
};

const createBoard = () => {
    resetGame();
    shuffleValues();
    for (let i = 0; i < squareValues.length; i++) {
        let value = squareValues[i];
        const square = document.createElement("p");
        square.innerHTML = value === "bomb" ? "💣" : "😀";
        square.id = `${i}`;
        square.classList.add(value);
        square.addEventListener("click", () => handleClick(square));
        board.appendChild(square);
    }
};

reset.addEventListener("click", createBoard);
createBoard();
