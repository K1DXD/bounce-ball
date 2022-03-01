   function Ball() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let ballRadius = 10;
        let x = canvas.width - ballRadius;
        let y = canvas.height - ballRadius;
        let baseSpeedX = Math.random();
        let baseSpeedY = Math.sqrt(1 - Math.pow(baseSpeedX, 2));
        let speedX = baseSpeedX;
        let speedY = baseSpeedY;
        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }

        this.draw = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (x + speedX > canvas.width - ballRadius || x + speedX < ballRadius) {
                speedX = -speedX;
            }
            if (y + speedY > canvas.height - ballRadius || y + speedY < ballRadius) {
                speedY = -speedY;
            }
            drawBall();
            x += speedX;
            y += speedY;
        }

        this.speedButton = function (speed) {
            if (speed == 1) {
                if (speedX > 0) speedX += baseSpeedX;
                else speedX -= baseSpeedX;
                if (speedY > 0) speedY += baseSpeedY;
                else speedY -= baseSpeedY;
            } else {
                if (speedX > 0) speedX -= baseSpeedX;
                else speedX += baseSpeedX;
                if (speedY > 0) speedY -= baseSpeedY;
                else speedY += baseSpeedY;
            }
        }

        this.speedKeyBroad = function (key) {
            console.log(key);
            if (key.key == 'ArrowUp') {
                if (speedX > 0) speedX += baseSpeedX;
                else speedX -= baseSpeedX;
                if (speedY > 0) speedY += baseSpeedY;
                else speedY -= baseSpeedY;
            } else if (key.key == 'ArrowDown') {
                if (speedX > 0) speedX -= baseSpeedX;
                else speedX += baseSpeedX;
                if (speedY > 0) speedY -= baseSpeedY;
                else speedY += baseSpeedY;
            }
        }
    }
    let ball = new Ball();
    setInterval(ball.draw, 10);
    document.addEventListener('keydown', ball.speedKeyBroad);
