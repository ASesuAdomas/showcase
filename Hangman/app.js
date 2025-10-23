
const words = ["javascript", "hangman", "challenge", "mentorius", "friday", "kartuvės", "birželis", "liepa", "rugpjūtis", "vasara"];
const maxWrong = 9;
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongGuesses = 0;

const wordContainer = document.getElementById("word-container");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const messageDiv = document.getElementById("message");

function drawHangman(stage) {
    const canvas = document.getElementById("hangman-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    
    if (stage > 0) {
       
    ctx.beginPath();
    ctx.moveTo(20, 180);
    ctx.lineTo(180, 180);
    ctx.stroke();
    }
    if (stage > 1) {
       
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(50, 20);
    ctx.stroke();
    }
    if (stage > 2) {
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(50, 20);
    ctx.lineTo(120, 20);
    ctx.lineTo(120, 40);
    ctx.stroke();
    }
    if (stage > 3) {
        ctx.beginPath();
        ctx.arc(120, 55, 15, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (stage > 4) {
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(120, 120);
        ctx.stroke();
    }
    if (stage > 5) {
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(95, 100);
        ctx.stroke();
    }
    if (stage > 6) {
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(145, 100);
        ctx.stroke();
    }
    if (stage > 7) {
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(100, 155);
        ctx.stroke();
    }
    if (stage > 8) {
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(140, 155);
        ctx.stroke();
    }

    const stages = [
        "", // 0: nothing
        "Base", // 1
        "Base", "Body", // 2
        "Base", "Body", "Pole", // 3
        "Base", "Body", "Pole", "Head", // 4
        "Base", "Body", "Pole", "Head, Body", // 5
        "Base", "Body", "Pole", "Head, Body, Left Arm", // 6
        "Base", "Body", "Pole", "Head, Body, Left Arm, Right Arm", // 7
        "Base", "Body", "Pole", "Head, Body, Left Arm, Right Arm, Left Leg", // 8
        "Base", "Body", "Pole", "Head, Body, Left Arm, Right Arm, Left Leg, Right Leg" // 9
    ];
    messageDiv.innerHTML = `<p>Hangman: ${stages[stage]}</p>`;
}

function displayWord() {
    wordContainer.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function checkWin() {
    if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        messageDiv.innerHTML = "<strong>You win!</strong>";
        guessButton.disabled = true;
        letterInput.disabled = true;
    }
}

function checkLose() {
    if (wrongGuesses >= maxWrong) {
        messageDiv.innerHTML = `<strong>You lose! The word was "${selectedWord}".</strong>`;
        guessButton.disabled = true;
        letterInput.disabled = true;
    }
}

guessButton.addEventListener("click", () => {
    const guess = letterInput.value.toLowerCase();
    letterInput.value = "";
    if (!guess.match(/^[a-z]$/)) {
        messageDiv.innerHTML = "<span>Please enter a single letter.</span>";
        return;
    }
    if (guessedLetters.includes(guess)) {
        messageDiv.innerHTML = "<span>You already guessed that letter.</span>";
        return;
    }
    if (selectedWord.includes(guess)) {
        guessedLetters.push(guess);
        displayWord();
        checkWin();
    } else {
        wrongGuesses++;
        drawHangman(wrongGuesses);
        checkLose();
    }
});

displayWord();
drawHangman(wrongGuesses);