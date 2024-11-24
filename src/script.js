let timeLeft = 90;
let score = 0;
let currentColor;
let timerId;

// Colors and their hex codes
const colorNames = ["Red", "Blue", "Green", "Yellow", "Pink", "Orange", "Black", "Gray"];
const colorHex = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FFC0CB", "#FFA500", "#000000", "#808080"];

// Get DOM elements
const titleLabel = document.getElementById('title');
const timeLabel = document.getElementById('time-left');
const scoreLabel = document.getElementById('score');
const colorLabel = document.getElementById('color-label');
const colorInput = document.getElementById('color-input');
const restartButton = document.getElementById('restart-button');

// Function to update the game state
function nextColor() {
    const textIndex = Math.floor(Math.random() * colorNames.length);
    const colorIndex = Math.floor(Math.random() * colorNames.length);

    currentColor = colorNames[colorIndex];
    colorLabel.textContent = colorNames[textIndex];

    colorLabel.style.color = colorHex[colorIndex];
    colorInput.value = '';
}

// Timer function
function updateTimer() {
    timeLeft--;
    timeLabel.textContent = "Time left: " + timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timerId);
        timeLabel.textContent = "Game Over!";
        colorInput.disabled = true;
    }
}

// Check user input on Enter key press
colorInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const input = colorInput.value.trim();
        if (currentColor.toLowerCase() === input.toLowerCase()) {
            score++;
        } else if (score > 0) {
            score--;
        }
        scoreLabel.textContent = "Score: " + score;
        nextColor();

        // Start the timer when the user first types
        if (timeLeft === 90 && !timerId) {
            timerId = setInterval(updateTimer, 1000);
        }

        // Clear the input field
        colorInput.value = '';
        colorInput.focus();
    }
});

// Restart game
restartButton.addEventListener('click', () => {
    clearInterval(timerId);
    timeLeft = 90;
    score = 0;
    scoreLabel.textContent = "Score: 0";
    timeLabel.textContent = "Time left: 90";
    colorInput.disabled = false;
    nextColor();
});

// Initialize game
nextColor();
