document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeGame');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startGame');
    const scoreElement = document.getElementById('score');

    // Prevent arrow key scrolling
    window.addEventListener('keydown', (e) => {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    });

    // Focus canvas on game start
    function focusGame() {
        canvas.focus();
    }

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;
    canvas.tabIndex = 1; // Make canvas focusable
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [
        { x: 10, y: 10 }
    ];
    let food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameLoop = null;
    let gameSpeed = 100;
    
    // Game controls
    canvas.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowUp':
                if (dy !== 1) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
                if (dy !== -1) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
                if (dx !== 1) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx !== -1) { dx = 1; dy = 0; }
                break;
        }
    });

    function drawGame() {
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = '#9146ff';
        snake.forEach((segment, index) => {
            if (index === 0) {
                // Draw head with gradient
                const gradient = ctx.createRadialGradient(
                    segment.x * gridSize + gridSize/2,
                    segment.y * gridSize + gridSize/2,
                    0,
                    segment.x * gridSize + gridSize/2,
                    segment.y * gridSize + gridSize/2,
                    gridSize
                );
                gradient.addColorStop(0, '#b366ff');
                gradient.addColorStop(1, '#9146ff');
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = '#9146ff';
            }
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        // Draw food with glow effect
        ctx.fillStyle = '#ff4d4d';
        ctx.shadowColor = '#ff4d4d';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Only move and check collisions if the snake is moving
        if (dx !== 0 || dy !== 0) {
            // Move snake
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };

            // Check collision with walls
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                gameOver();
                return;
            }

            // Check collision with self (only if snake length > 1)
            if (snake.length > 1 && snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
                gameOver();
                return;
            }

            snake.unshift(head);

            // Check if food is eaten
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                scoreElement.textContent = score;
                food = {
                    x: Math.floor(Math.random() * tileCount),
                    y: Math.floor(Math.random() * tileCount)
                };
                // Increase speed slightly
                if (gameSpeed > 50) {
                    gameSpeed -= 2;
                    clearInterval(gameLoop);
                    gameLoop = setInterval(drawGame, gameSpeed);
                }
            } else {
                snake.pop();
            }
        }
    }

    function gameOver() {
        clearInterval(gameLoop);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width/2, canvas.height/2);
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width/2, canvas.height/2 + 40);
        startButton.textContent = 'Play Again';
        startButton.disabled = false;
    }

    function startGame() {
        // Reset game state
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
        score = 0;
        gameSpeed = 100;
        scoreElement.textContent = score;
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };

        // Clear any existing game loop
        if (gameLoop) clearInterval(gameLoop);

        // Start new game loop and focus canvas
        gameLoop = setInterval(drawGame, gameSpeed);
        startButton.disabled = true;
        startButton.textContent = 'Playing...';
        focusGame();
    }

    startButton.addEventListener('click', startGame);
    canvas.addEventListener('click', focusGame);
});
