let gameStarter = document.querySelector(".game-starter");
let startBtn = document.querySelector("#start-btn");
let resetBtn = document.querySelector("#reset-btn");
let restartBtn = document.querySelector("#restart-btn");
let boxes = document.querySelectorAll(".box");
let turnArrow = document.querySelector(".turn-arrow");
let winner = document.getElementById("winner");
let player1 = document.querySelector(".player-x h3");
let player2 = document.querySelector(".player-o h3");

let player1wins = 0;
let player2wins = 0;
let turnO = true;

startBtn.addEventListener("click", () => {
  gameStarter.style.display = "none";
  startBtn.style.animation = "none";
  turnArrow.innerHTML = "<span>&#8592;</span>";
});

resetBtn.addEventListener("click", () => {
  resetGame();
  turnArrow.innerHTML = "<span>&#8592;</span>";
  winner.style.fontSize = "0.001vMin";
});

restartBtn.addEventListener("click", () => {
  window.location.reload();
  winner.style.fontSize = "0.001vMin";
  winner.style.transform = "scale(0)";
});

const resetGame = () => {
  turnO = true;
  enableBoxes();
  winner.style.transform = "";
};

const screenWidth = () => {
  return window.innerWidth;
};

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = "";
    box.style.backgroundColor = "";
  });
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "X";
      box.style.color = "darkViolet";
      box.style.textShadow = "0 4px 20px darkViolet";
      turnArrow.innerHTML = "<span>&#8594;</span>";
      turnO = false;
    } else {
      box.innerHTML = "O";
      box.style.color = "darkCyan";
      box.style.textShadow = "0 4px 20px darkCyan";
      turnArrow.innerHTML = "<span>&#8592;</span>";
      turnO = true;
    }
    box.disabled = "true";

    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let box0val = boxes[pattern[0]].innerHTML;
    let box1val = boxes[pattern[1]].innerHTML;
    let box2val = boxes[pattern[2]].innerHTML;

    if (box0val !== "" && box0val !== "" && box0val !== "") {
      if (box0val === box1val && box1val === box2val) {
        for (let i = 0; i < 3; i++) {
          boxes[pattern[i]].style.backgroundColor = "#29343a";
        }

        if (turnO) {
          winner.innerHTML = "Player 2 Win";
          player2wins++;
          player2.innerHTML = `Win ${player2wins}`;
        } else {
          winner.innerHTML = "Player 1 Win";
          player1wins++;
          player1.innerHTML = `Win ${player1wins}`;
        }

        winner.style.fontSize = "11vMin";
        winner.style.transform = "scale(1)";

        disableBoxes();
        return 0;
      }
    }
  }

  // Check for a draw
  let isDraw = true;
  for (let box of boxes) {
    if (box.innerHTML === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    winner.innerHTML = "Match Draw";
    winner.style.fontSize = "11vMin";
    winner.style.transform = "scale(1)";
    disableBoxes();
  }
};
