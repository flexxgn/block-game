document.addEventListener('DOMContentLoaded', () => {
    const block = document.getElementById('block');
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;
    let left = 50; // Initial horizontal position (percentage)
    let moveSpeed = 0.5; // Speed of horizontal movement
    let moveDirection = 0; // -1 for left, 1 for right, 0 for no movement

    function jump() {
        if (isJumping) return;
        isJumping = true;
        let count = 0;
        let upInterval = setInterval(() => {
            if (count === 15) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (count === 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position = position * gravity;
                    block.style.bottom = position + 'px';
                }, 20);
            }
            position += 30;
            count++;
            position = position * gravity;
            block.style.bottom = position + 'px';
        }, 20);
    }

    function move() {
        if (moveDirection !== 0) {
            left += moveSpeed * moveDirection;
            if (left < 0) left = 0;
            if (left > 100) left = 100;
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
