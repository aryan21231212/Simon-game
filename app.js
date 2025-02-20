let gameSequence = [];
let userSequence = [];
let change = document.querySelector('#change');
let boxes = document.querySelectorAll('.box');
let level = 0;
let body = document.querySelector('body');

let colors = ['yellow', 'red', 'green', 'purple'];

let game_start = false; // Initialize to false

// Start the game on keypress
body.addEventListener('keypress', () => {
    if (!game_start) {
        startGame();
    }
});

// Initialize the game
function startGame() {
    game_start = true;
    level = 0;
    gameSequence = [];
    userSequence = [];
    change.innerHTML = `Press any key to start`;
    nextSequence();
}

// Generate the next sequence
function nextSequence() {
    userSequence = []; // Reset user sequence
    level++;
    change.innerHTML = `Level - ${level}`;

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = colors[randomIndex];
    gameSequence.push(randomColor);

    flashBox(randomColor);
}

// Flash a box
function flashBox(color) {
    let box = document.querySelector(`#${color}`);
    box.classList.add('flash');
    setTimeout(() => {
        box.classList.remove('flash');
    }, 250);
}

// Handle user clicks
boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        if (game_start) {
            let clickedColor = e.target.id;
            userSequence.push(clickedColor);
            flashBox(clickedColor);
            checkSequence();
        }
    });
});

// Check if user sequence matches game sequence
function checkSequence() {
    let currentIndex = userSequence.length - 1;

    if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
        gameEnd();
    } else if (userSequence.length === gameSequence.length) {
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}

// Handle game over
function gameEnd() {
    body.classList.add('red'); // Ensure this class exists in your CSS
    setTimeout(() => {
        body.classList.remove('red');
    }, 300);

    change.innerHTML = `Game Over! Your Score - ${level}. Press any key to restart.`;
    game_start = false; // Allow the game to restart
}