let turnsLeft = 0;
let userPoints = 0;
let computerPoints = 0;
let isPlaying = false;

const gameNumberInput = document.querySelector('[data-ns-test="game-number"]');
const playBtn = document.querySelector('[data-ns-test="play-game"]');
const rockBtn = document.querySelector('[data-ns-test="rock"]');
const paperBtn = document.querySelector('[data-ns-test="paper"]');
const scissorsBtn = document.querySelector('[data-ns-test="scissors"]');

const roundsLeftEl = document.querySelector('[data-ns-test="rounds-left"]');
const userPointsEl = document.querySelector('[data-ns-test="user-points"]');
const computerPointsEl = document.querySelector('[data-ns-test="computer-points"]');
const computerChooseEl = document.querySelector('[data-ns-test="computer-choose"]');
const roundResultEl = document.querySelector('[data-ns-test="round-result"]');
const gameResultEl = document.querySelector('[data-ns-test="game-result"]');

const choices = ["ROCK", "PAPER", "SCISSORS"];

playBtn.addEventListener('click', () => {
  const turns = parseInt(gameNumberInput.value, 10);
  if (isNaN(turns) || turns <= 0) return;

  turnsLeft = turns;
  userPoints = 0;
  computerPoints = 0;
  isPlaying = true;

  roundsLeftEl.innerText = turnsLeft;
  userPointsEl.innerText = userPoints;
  computerPointsEl.innerText = computerPoints;
  
  computerChooseEl.innerText = '';
  roundResultEl.innerText = '';
  gameResultEl.innerText = '';
});

function playRound(userChoiceIndex) {
  if (!isPlaying || turnsLeft <= 0) return;

  let compIndex;
  if (typeof window.computerChoose === 'number' && window.computerChoose >= 0 && window.computerChoose <= 2) {
    compIndex = window.computerChoose;
  } else {
    compIndex = Math.floor(Math.random() * 3);
    window.computerChoose = compIndex;
  }

  computerChooseEl.innerText = choices[compIndex];

  let roundRes = "";
  if (userChoiceIndex === compIndex) {
    roundRes = "TIE";
  } else if (
    (userChoiceIndex === 0 && compIndex === 2) ||
    (userChoiceIndex === 1 && compIndex === 0) ||
    (userChoiceIndex === 2 && compIndex === 1)
  ) {
    roundRes = "WON";
    userPoints++;
  } else {
    roundRes = "LOSE";
    computerPoints++;
  }

  roundResultEl.innerText = roundRes;
  turnsLeft--;

  roundsLeftEl.innerText = turnsLeft;
  userPointsEl.innerText = userPoints;
  computerPointsEl.innerText = computerPoints;

  if (turnsLeft === 0) {
    isPlaying = false;
    if (userPoints > computerPoints) {
      gameResultEl.innerText = "WON";
    } else if (userPoints < computerPoints) {
      gameResultEl.innerText = "LOSE";
    } else {
      gameResultEl.innerText = "TIE";
    }
  }

  window.computerChoose = undefined;
}

rockBtn.addEventListener('click', () => playRound(0));
paperBtn.addEventListener('click', () => playRound(1));
scissorsBtn.addEventListener('click', () => playRound(2));