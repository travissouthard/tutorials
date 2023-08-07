const width = 10;
const boardSize = width * width;
const bombCount = 20;
const validCount = boardSize - bombCount;
const squareValues = [];

for (let i = 0; i < boardSize; i++) {
    if (i < bombCount) {
        squareValues.push("bomb");
    } else {
        squareValues.push("valid");
    }
}

const board = document.getElementById("board");

const shuffleValues = () => {
    for (let i = 0; i < squareValues.length; i++) {
        const randomIndex = Math.floor(Math.random() * squareValues.length);
        let temp = squareValues[i];
        squareValues[i] = squareValues[randomIndex];
        squareValues[randomIndex] = temp;
    }
};

const handleClick = (squareObj) => {
    const clickedClass = "clicked";
    if (!squareObj.classList.contains(clickedClass)) {
        squareObj.classList.add(clickedClass);
    }
};

const createBoard = () => {
    shuffleValues();
    for (let value of squareValues) {
        const square = document.createElement("p");
        square.innerHTML = value === "bomb" ? "💣" : "😀";
        square.classList.add(value);
        square.addEventListener("click", () => handleClick(square));
        board.appendChild(square);
    }
};

createBoard();
