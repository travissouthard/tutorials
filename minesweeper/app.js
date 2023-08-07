const width = 10;
const boardSize = width * width;
const bombCount = 20;
const validCount = boardSize - bombCount;

const board = document.getElementById("board");

for (let i = 0; i < 100; i++) {
    const clickedClass = "clicked";
    const square = document.createElement("p");
    square.innerHTML = `${i + 1}`;
    square.addEventListener("click", (e) => {
        if (!square.classList.contains(clickedClass)) {
            square.classList.add(clickedClass);
        }
    });
    board.appendChild(square);
}
