const width = 10;
const boardSize = width * width;
const bombCount = { easy: 10, medium: 20, hard: 40 };
let difficulty = "easy";
const validCount = boardSize - bombCount;
const squareValues = [];
let isGameOver = false;

const board = document.getElementById("board");
const reset = document.getElementById("reset");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");

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
    squareValues.length = 0;
    for (let i = 0; i < boardSize; i++) {
        if (i < bombCount[difficulty]) {
            squareValues.push("bomb");
        } else {
            squareValues.push("valid");
        }
    }
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

    if (count > 0) {
        squareObj.innerHTML = `${count}`;
    } else {
        doForEachNeighbor((neighborObj) => handleClick(neighborObj));
    }
};

const handleClick = (squareObj) => {
    if (isGameOver) return;
    if (squareObj.classList.contains("bomb")) {
        isGameOver = true;
        const bombs = document.querySelectorAll(".bomb");
        bombs.forEach((bomb) => {
            bomb.innerHTML = "💣";
            bomb.classList.add("clicked");
        });
        squareObj.innerHTML = "💥";
    }

    if (!squareObj.classList.contains("clicked")) {
        squareObj.classList.add("clicked");
        checkNeighbors(squareObj);
    }
};

const handlePlaceFlag = (e, squareObj) => {
    e.preventDefault();
    if (isGameOver) return;
    if (!squareObj.classList.contains("clicked")) {
        squareObj.innerHTML = squareObj.classList.contains("flag") ? "🚩" : "";
        squareObj.classList.toggle("flag");
    }
};

const createBoard = () => {
    resetGame();
    shuffleValues();
    for (let i = 0; i < squareValues.length; i++) {
        let value = squareValues[i];
        const square = document.createElement("p");
        square.id = `${i}`;
        square.classList.add(value);
        square.addEventListener("click", () => handleClick(square));
        square.addEventListener("contextmenu", (e) =>
            handlePlaceFlag(e, square)
        );
        board.appendChild(square);
    }
};

const setDifficultyAndReset = (difficultyStr) => {
    difficulty = difficultyStr;
    createBoard();
};

reset.addEventListener("click", createBoard);
easy.addEventListener("click", () => setDifficultyAndReset("easy"));
medium.addEventListener("click", () => setDifficultyAndReset("medium"));
hard.addEventListener("click", () => setDifficultyAndReset("hard"));
createBoard();
