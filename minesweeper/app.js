const width = 10;
const boardSize = width * width;
const bombCount = { easy: 10, medium: 20, hard: 40 };
let difficulty = "easy";
const validCount = boardSize - bombCount;
const squareValues = [];
let flagsLeft = 0;
let isGameOver = false;

const board = document.getElementById("board");
const reset = document.getElementById("reset");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const flagCounter = document.getElementById("flagCounter");

const shuffleValues = () => {
    for (let i = 0; i < squareValues.length; i++) {
        const randomIndex = Math.floor(Math.random() * squareValues.length);
        let temp = squareValues[i];
        squareValues[i] = squareValues[randomIndex];
        squareValues[randomIndex] = temp;
    }
};

const updateFlagCounter = () => {
    flagCounter.innerHTML = `Flags left: ${flagsLeft}`;
};

const resetGame = () => {
    isGameOver = false;
    board.innerHTML = "";
    squareValues.length = 0;
    flagsLeft = bombCount[difficulty];
    updateFlagCounter();
    for (let i = 0; i < boardSize; i++) {
        if (i < bombCount[difficulty]) {
            squareValues.push("bomb");
        } else {
            squareValues.push("valid");
        }
    }
};

const checkForWin = () => {
    const flaggedBombsCount = document.querySelectorAll(".flag.bomb").length;
    const clickedCount = document.querySelectorAll(".clicked").length;
    if (
        flaggedBombsCount === bombCount[difficulty] ||
        clickedCount === boardSize - bombCount[difficulty]
    ) {
        isGameOver = true;
        document.querySelector("h1").innerHTML = "You win!";
        document.querySelectorAll(".bomb").forEach((b) => (b.innerHTML = "💣"));
        document
            .querySelectorAll("#board p")
            .forEach((p) => p.classList.add("clicked"));
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
    const numberClasses = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
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
        squareObj.classList.add(numberClasses[count - 1]);
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
    checkForWin();
};

const handlePlaceFlag = (e, squareObj) => {
    e.preventDefault();
    if (isGameOver) return;
    if (!squareObj.classList.contains("clicked")) {
        if (squareObj.classList.contains("flag")) {
            squareObj.innerHTML = "";
            squareObj.classList.remove("flag");
            flagsLeft++;
            updateFlagCounter();
        } else if (flagsLeft > 0) {
            squareObj.innerHTML = "🚩";
            squareObj.classList.add("flag");
            flagsLeft--;
            updateFlagCounter();
        }
    }
    checkForWin();
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
