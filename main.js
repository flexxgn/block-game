document.addEventListener('DOMContentLoaded', () => {
    const block = document.getElementById('block');
    const gameArea = document.getElementById('gameArea');
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    let isGameRunning = false;
    let moveDirection = 0; // -1 for up, 1 for down, 0 for no movement
    let moveSpeed = 5; // Speed of vertical movement

    function startGame() {
        isGameRunning = true;
        startScreen.style.display = 'none';
        block.style.bottom = '50%';
        block.style.left = '10%';
        createObstacles();
        gameLoop();
    }

    function endGame() {
        isGameRunning = false;
        startScreen.style.display = 'flex';
        clearObstacles();
    }

    function createObstacles() {
        setInterval(() => {
            if (isGameRunning) {
                const obstacle = document.createElement('div');
                obstacle.classList.add('obstacle');
                obstacle.style.top = Math.random() * 80 + 'vh';
                gameArea.appendChild(obstacle);
                obstacle.addEventListener('animationend', () => {
                    obstacle.remove();
                });
            }
        }, 2000); // Create a new obstacle every 2 seconds
    }

    function clearObstacles() {
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => obstacle.remove());
    }

    function gameLoop() {
        if (isGameRunning) {
            moveBlock();
            checkCollision();
            requestAnimationFrame(gameLoop);
        }
    }

    function moveBlock() {
        if (!isGameRunning) return;
        let bottom = parseFloat(getComputedStyle(block).bottom);
        bottom += moveSpeed * moveDirection;
        if (bottom < 0) bottom = 0;
        if (bottom > gameArea.clientHeight - block.clientHeight) bottom = gameArea.clientHeight - block.clientHeight;
        block.style.bottom = bottom + 'px';
    }

    function checkCollision() {
        const blockRect = block.getBoundingClientRect();
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (
                blockRect.right > obstacleRect.left &&
                blockRect.left < obstacleRect.right &&
                blockRect.bottom > obstacleRect.top &&
                blockRect.top < obstacleRect.bottom
            ) {
                endGame();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (isGameRunning) {
            if (event.code === 'KeyW' || event.code === 'ArrowUp') {
                moveDirection = -1;
            } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
                moveDirection = 1;
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'KeyW' || event.code === 'ArrowUp' || event.code === 'KeyS' || event.code === 'ArrowDown') {
            moveDirection = 0;
        }
    });

    startButton.addEventListener('click', startGame);
});
