const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let score = 0;
let dx = 0;
let dy = 0;
let gameSpeed = 120; // milliseconds, slightly slower for better playability
let gameInterval;
let changingDirection = false;

document.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', startGame);

function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }]; // Start in middle
    food = getRandomFoodPosition();
    score = 0;
    dx = 0; // Stop initial movement
    dy = 0;
    scoreDisplay.textContent = score;
    gameInterval = setInterval(main, gameSpeed);
    // Ensure canvas is focused for keyboard input, though direct click might be better UX
    canvas.focus(); 
}

function main() {
    if (didGameEnd()) {
        clearInterval(gameInterval);
        // Consider a more integrated game over message in the future
        alert('Game Over! Your score: ' + score + '. Click Restart or press any key to play again.');
        // Allow restarting by pressing any key after game over
        document.addEventListener('keydown', startGameOnceKeydown, { once: true });
        return;
    }

    changingDirection = false;
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
}

function startGameOnceKeydown() {
    // Small delay to prevent immediate restart if a key is held down
    setTimeout(startGame, 100);
}

function clearCanvas() {
    // Match the canvas background color set in style.css or Tailwind config
    ctx.fillStyle = '#1a202c'; // Tailwind's gray-800 or similar dark shade
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#4ade80'; // Tailwind green-400
    ctx.strokeStyle = '#22c55e'; // Tailwind green-600
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize -1 , gridSize -1 ); // -1 for slight gap
        ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize -1, gridSize -1);
    });
}

function drawFood() {
    ctx.fillStyle = '#facc15'; // Tailwind yellow-400
    ctx.strokeStyle = '#eab308'; // Tailwind yellow-500
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize -1, gridSize -1); // -1 for slight gap
    ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize -1, gridSize -1);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    const didEatFood = snake[0].x === food.x && snake[0].y === food.y;
    if (didEatFood) {
        score += 10;
        scoreDisplay.textContent = score;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while (true) {
        newFoodPosition = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        let collisionWithSnake = false;
        for (let part of snake) {
            if (part.x === newFoodPosition.x && part.y === newFoodPosition.y) {
                collisionWithSnake = true;
                break;
            }
        }
        if (!collisionWithSnake) break;
    }
    return newFoodPosition;
}

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function didGameEnd() {
    // Check for collision with self
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    // Check for collision with wall
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= tileCount;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= tileCount;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Start the game
startGame();