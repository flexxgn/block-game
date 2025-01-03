document.addEventListener('DOMContentLoaded', () => {
    const block = document.getElementById('block');
    const gameArea = document.getElementById('gameArea');
    const ledges = document.querySelectorAll('.ledge');
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    let isJumping = false;
    let canDoubleJump = false;
    let gravity = 0.4;
    let position = 0;
    let left = 50; 
    let moveSpeed = 1.2; 
    let moveDirection = 0; 
    let velocity = 0; 
    let isGameRunning = false;

    gameArea.style.width = '100vw';
    gameArea.style.height = '100vh';

    // Create particles for space background
    function createParticles() {
        for (let i = 0; i < 20; i++) { // Reduced the number of particles
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            gameArea.appendChild(particle);
        }
    }

    createParticles();
    setInterval(createParticles, 5000); // Create new particles every 5 seconds

    function jump() {
        if (isJumping) {
            if (canDoubleJump) {
                canDoubleJump = false;
                velocity = 15; 
            }
            return;
        }
        isJumping = true;
        canDoubleJump = true;
        velocity = 15; 
        let jumpInterval = setInterval(() => {
            if (position <= 0 && velocity <= 0) {
                clearInterval(jumpInterval);
                isJumping = false;
                position = 0;
                velocity = 0;
                block.style.bottom = position + 'px';
            } else {
                velocity -= 1; // Gravity effect
                position += velocity;
                if (position < 0) position = 0;
                block.style.bottom = position + 'px';
                checkLedgeCollision();
            }
        }, 20);
    }

    function move() {
        if (moveDirection !== 0) {
            left += moveSpeed * moveDirection;
            if (left < 0) {
                left = 0;
                moveDirection = 0; 
            }
            if (left > 100) {
                left = 100;
                moveDirection = 0; 
            }
            block.style.left = left + '%';
        }
    }

    function checkLedgeCollision() {
        ledges.forEach(ledge => {
            const ledgeRect = ledge.getBoundingClientRect();
            const blockRect = block.getBoundingClientRect();
            if (
                blockRect.bottom >= ledgeRect.top &&
                blockRect.bottom <= ledgeRect.top + 10 && // Adjusted to ensure standing on top
                blockRect.right >= ledgeRect.left &&
                blockRect.left <= ledgeRect.right &&
                velocity <= 0
            ) {
                position = window.innerHeight - ledgeRect.top - blockRect.height;
                velocity = 0;
                block.style.bottom = position + 'px';
                isJumping = false;
                canDoubleJump = true;
            }
        });
    }

    function startGame() {
        isGameRunning = true;
        startScreen.style.display = 'none';
        block.style.bottom = '50%';
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
        if (event.code === 'Space') {
            jump();
        } else if (event.code === 'KeyA') {
            moveDirection = -1;
        } else if (event.code === 'KeyD') {
            moveDirection = 1;
        } else if (event.code === 'ArrowUp') {
            moveDirection = -1;
        } else if (event.code === 'ArrowDown') {
            moveDirection = 1;
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'KeyA' || event.code === 'KeyD' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            moveDirection = 0;
        }
    });

    startButton.addEventListener('click', startGame);

    setInterval(move, 20); 
});
