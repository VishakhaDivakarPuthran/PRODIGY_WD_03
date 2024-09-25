
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let exitBtn = document.querySelector("#exit-btn");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");
let aiModeBtn = document.querySelector("#aiMode");
let twoPlayerModeBtn = document.querySelector("#twopMode");
let selectMode = document.querySelector(".modes");
let gameContainer = document.querySelector(".game-container");
let gameWon = false;

let turnO = true;
let aiMode = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const newGame = () => {
    turnO = true;
    gameWon = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};

aiModeBtn.addEventListener("click", () => {
    aiMode = true;
    startGame();
});

twoPlayerModeBtn.addEventListener("click", () => {
    aiMode = false;
    startGame();
});

const startGame = () => {
    selectMode.classList.add("hide");
    gameContainer.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { 
            playerMove(box);
            if (aiMode && !turnO) {
                setTimeout(aiMove, 1000); 
            }
        }
    });
});

const playerMove = (box) => {
    if (turnO) {
        box.innerText = "O";
    } else {
        box.innerText = "X";
    }
    box.disabled = true;
    checkWinner();
    turnO = !turnO;
};

const aiMove = () => {
    if (!turnO && !gameWon) {
        let availableBoxes = Array.from(boxes).filter(box => !box.disabled);
        
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (boxes[a].innerText === "X" && boxes[b].innerText === "X" && boxes[c].innerText === "") {
                boxes[c].innerText = "X";
                boxes[c].disabled = true;
                checkWinner();
                turnO = true;
                return;
            }
            if (boxes[a].innerText === "X" && boxes[b].innerText === "" && boxes[c].innerText === "X") {
                boxes[b].innerText = "X";
                boxes[b].disabled = true;
                checkWinner();
                turnO = true;
                return;
            }
            if (boxes[a].innerText === "" && boxes[b].innerText === "X" && boxes[c].innerText === "X") {
                boxes[a].innerText = "X";
                boxes[a].disabled = true;
                checkWinner();
                turnO = true;
                return;
            }
        }

        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (boxes[a].innerText === "O" && boxes[b].innerText === "O" && boxes[c].innerText === "") {
                boxes[c].innerText = "X";
                boxes[c].disabled = true;
                checkWinner();
                turnO = true;
                return;
            }
            if (boxes[a].innerText === "O" && boxes[b].innerText === "" && boxes[c].innerText === "O") {
                boxes[b].innerText = "X";
                boxes[b].disabled = true;
                checkWinner();
                turnO = true;
                return;
            }
            if (boxes[a].innerText === "" && boxes[b].innerText === "O" && boxes[c].innerText === "O") {
                boxes[a].innerText = "X";
                boxes[a].disabled = true;
                checkWinner();
                turnO = true;
                return;
            }
        }

        if (availableBoxes.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableBoxes.length);
            let aiBox = availableBoxes[randomIndex];
            aiBox.innerText = "X";
            aiBox.disabled = true;
            checkWinner();
            turnO = true;
        }
    }
};



const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};


const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    let allFilled = true;
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                gameWon = true;
                return;
            }
        }
        if (pos1Val === "" || pos2Val === "" || pos3Val === "") {
            allFilled = false;
        }
    }
    if (allFilled) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        gameWon = true;
    }
};


const exitGame = () => {
    newGame();
    msgContainer.classList.add("hide");
    selectMode.classList.remove("hide");
    gameContainer.classList.add("hide");
};



newGameBtn.addEventListener("click", newGame);
exitBtn.addEventListener("click", exitGame);
