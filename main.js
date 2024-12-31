document.addEventListener('DOMContentLoaded', () => {
    const block = document.getElementById('block');
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;
    let left = 50; // Initial horizontal position (percentage)

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

    function moveLeft() {
        left -= 5;
        if (left < 0) left = 0;
        block.style.left = left + '%';
    }

    function moveRight() {
        left += 5;
        if (left > 100) left = 100;
        block.style.left = left + '%';
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            jump();
        } else if (event.code === 'KeyA') {
            moveLeft();
        } else if (event.code === 'KeyD') {
            moveRight();
        }
    });
});
