document.addEventListener('DOMContentLoaded', () => {
    const block = document.getElementById('block');
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;
    let left = 50; // Initial horizontal position (percentage)
    let moveSpeed = 0.5; // Speed of horizontal movement
    let moveDirection = 0; // -1 for left, 1 for right, 0 for no movement
    let velocity = 0; // Vertical velocity for smooth jumping

    function jump() {
        if (isJumping) return;
        isJumping = true;
        velocity = 15; // Initial jump velocity
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
            }
        }, 20);
    }

    function move() {
        if (moveDirection !== 0) {
            left += moveSpeed * moveDirection;
            if (left < 0) {
                left = 0;
                moveDirection = 1; // Bounce off the left wall
            }
            if (left > 100) {
                left = 100;
                moveDirection = -1; // Bounce off the right wall
            }
            block.style.left = left + '%';
        }
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            jump();
        } else if (event.code === 'KeyA') {
            moveDirection = -1;
        } else if (event.code === 'KeyD') {
            moveDirection = 1;
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'KeyA' || event.code === 'KeyD') {
            moveDirection = 0;
        }
    });

    setInterval(move, 20); // Call move function every 20ms for smooth movement
});
