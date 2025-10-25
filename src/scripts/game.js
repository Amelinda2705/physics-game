async function getData() {
    const response = await fetch("src/data/questions.json");
    const data = await response.json();
    return data;
}

const questionsData = await getData();

const gameState = {
    questions: questionsData,
    currentQuestionIndex: 0,
    teamAScore: 0,
    teamBScore: 0,
    blueX: 100,
    redX: 500,
    brownX: 190,
    gameEnded: false,
};

console.log(gameState.questions[gameState.currentQuestionIndex]);

console.log("Questions data loaded:", questionsData);

const winningScore = 5;
const step = 10;

const elements = {
    canvas: document.getElementById("canvas"),
    teamA: {
        teamA: document.getElementById("team-a"),
        numbers: document.querySelectorAll(".number-a"),
        clear: document.getElementById("clear-a"),
        submit: document.getElementById("submit-a"),
        display: document.getElementById("display-a"),
        question: document.getElementById("question-a"),
    },
    teamB: {
        teamB: document.getElementById("team-b"),
        numbers: document.querySelectorAll(".number-b"),
        clear: document.getElementById("clear-b"),
        submit: document.getElementById("submit-b"),
        display: document.getElementById("display-b"),
        question: document.getElementById("question-b"),
    },
};

const ctx = elements.canvas.getContext("2d");

function drawAvatar() {
    const blueAvatar = new Image();
    const redAvatar = new Image();
    blueAvatar.src = "src/assets/blue.png";
    redAvatar.src = "src/assets/red.png";
    ctx.clearRect(
        0,
        0,
        elements.canvas.clientWidth,
        elements.canvas.clientHeight
    );
    blueAvatar.onload = () => {
        ctx.drawImage(blueAvatar, gameState.blueX, 70);
    };
    redAvatar.onload = () => {
        ctx.drawImage(redAvatar, gameState.redX, 70);
    };
    ctx.fillStyle = "brown";
    ctx.fillRect(gameState.brownX, 140, 320, 10);
}

function initGame() {
    updateQuestion();
    drawAvatar();
}

function updateQuestion() {
    const currentQuestion =
        gameState.questions[gameState.currentQuestionIndex].question;
    console.log("Current Question:", currentQuestion);
    elements.teamA.question.textContent = currentQuestion;
    elements.teamB.question.textContent = currentQuestion;
}

function setupNumberInputs(team) {
    team.numbers.forEach((button) => {
        button.addEventListener("click", function () {
            if (!gameState.gameEnded) {
                let value = this.value;
                team.display.value += value;
            }
        });
    });
}

function setupClearButton(team) {
    team.clear.addEventListener("click", () => {
        team.display.value = "";
    });
}

function showWrong(displayElement) {
    displayElement.classList.add("bg-red-300");
    setTimeout(() => {
        displayElement.classList.remove("bg-red-300");
    }, 300);
}

function checkWin(team, teamName) {
    if (team.score >= winningScore) {
        gameState.gameEnded = true;
        gameState.brownX = 190;
        gameState.blueX = 100;
        gameState.redX = 500;
        alert(`${teamName} wins!`);
        return true;
    }
    return false;
}

function setupSubmitButton(team, isTeamA) {
    team.submit.addEventListener("click", () => {
        if (gameState.gameEnded) return;

        const currentQuestion =
            gameState.questions[gameState.currentQuestionIndex];
        const userAnswer = team.display.value;
        console.log("User Answer:", userAnswer);
        console.log("Correct Answer:", currentQuestion.answer);

        if (userAnswer == currentQuestion.answer) {
            if (isTeamA) {
                gameState.teamAScore++;
                gameState.teamBScore--;
                gameState.blueX -= step;
                gameState.redX -= step;
                gameState.brownX -= step;
                drawAvatar();
            } else {
                gameState.teamBScore++;
                gameState.teamAScore--;
                gameState.blueX += step;
                gameState.redX += step;
                gameState.brownX += step;
                drawAvatar();
            }

            team.display.value = "";

            const teamName = isTeamA ? "Team A" : "Team B";
            console.log(`${teamName} scored!`);
            const currentTeam = isTeamA
                ? { score: gameState.teamAScore }
                : { score: gameState.teamBScore };

            if (!checkWin(currentTeam, teamName)) {
                gameState.currentQuestionIndex++;
                updateQuestion();
            }
        } else {
            team.display.value = "";
            showWrong(team.display);
        }
    });
}

setupNumberInputs(elements.teamA);
setupNumberInputs(elements.teamB);
setupClearButton(elements.teamA);
setupClearButton(elements.teamB);
setupSubmitButton(elements.teamA, true);
setupSubmitButton(elements.teamB, false);
initGame();
