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

const checkNeighbors = (squareObj) => {
    const index = parseInt(squareObj.id);
    const leftEdge = index % width === 0;
    const rightEdge = (index + 1) % width === 0;
    const topEdge = index < width;
    const bottomEdge = index >= boardSize - width;
    const neighborEdgesAndIndexes = [
        [!leftEdge && !topEdge, index - width - 1],
        [!topEdge, index - width],
        [!rightEdge && !topEdge, index - width + 1],
        [!leftEdge, index - 1],
        [!rightEdge, index + 1],
        [!leftEdge && !bottomEdge, index + width - 1],
        [!bottomEdge, index + width],
        [!rightEdge && !bottomEdge, index + width + 1],
    ];

    const doForEachNeighbor = (callBack) => {
        for (let [shouldCheck, neighborId] of neighborEdgesAndIndexes) {
            if (!shouldCheck) continue;
            const neighbor = document.getElementById(`${neighborId}`);
            callBack(neighbor);
        }
    };

    let count = 0;
    doForEachNeighbor((neighborObj) => {
        if (neighborObj.classList.contains("bomb")) {
            count++;
        }
    });
    if (count === 0) {
        doForEachNeighbor((neighborObj) => handleClick(neighborObj));
    }
    squareObj.innerHTML = `${count}`;
};

const handleClick = (squareObj) => {
    if (isGameOver) return;
    if (squareObj.classList.contains("bomb")) {
        isGameOver = true;
        squareObj.innerHTML = "💥";
    }

    if (!squareObj.classList.contains("clicked")) {
        squareObj.classList.add("clicked");
        checkNeighbors(squareObj);
    }
};

const createBoard = () => {
    resetGame();
    shuffleValues();
    for (let i = 0; i < squareValues.length; i++) {
        let value = squareValues[i];
        const square = document.createElement("p");
        // square.innerHTML = value === "bomb" ? "💣" : "😀";
        square.innerHTML = `${i}`;
        square.id = `${i}`;
        square.classList.add(value);
        square.classList.add(value === "bomb" ? "💣" : "😀");
        square.addEventListener("click", () => handleClick(square));
        board.appendChild(square);
    }
};

reset.addEventListener("click", createBoard);
createBoard();
