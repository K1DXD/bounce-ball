    /** 
     * Field function
     */
    function Field() {
        /**
         * @private 
         */
        let width = window.innerWidth;
        /**
         * @private 
         */
        let height = window.innerHeight;
        this.getWidth = function() {
            return width;
        }
        this.getHeight = function() {
            return height;
        }
        this.setWidth = function() {
            width = window.innerWidth;
            return canvas.width = width;
        }
        this.setHeight = function() {
            height = window.innerHeight;
            return canvas.height = height;
        }
    }

    function Ball() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let ballRadius = 10;
        let tempWidth = field.getWidth();
        let tempHeight = field.getHeight();
        let x = tempWidth / 2;
        let y = tempHeight / 2;
        let baseSpeedX = Math.random() * randomDirection(Math.random());
        let baseSpeedY = Math.sqrt(1 - Math.pow(Math.abs(baseSpeedX), 2)) *
            randomDirection(Math.random());
        let speedX = baseSpeedX;
        let speedY = baseSpeedY;

        function randomDirection(x) {
            if (x > 0.5) return 1
            else return -1;
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }

        function changeNotice() {
            if (tempWidth != field.getWidth()) {
                let tempX = x / tempWidth;
                tempWidth = field.getWidth();
                x = tempX * tempWidth;
            }
            if (tempHeight != field.getHeight()) {
                let tempY = y / tempHeight;
                tempHeight = field.getHeight();
                y = tempY * tempHeight;
            }
        }
        this.draw = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (x + speedX > canvas.width - ballRadius || x + speedX < ballRadius) {
                speedX = -speedX;
                baseSpeedX = -baseSpeedX;
            }
            if (y + speedY > canvas.height - ballRadius || y + speedY < ballRadius) {
                speedY = -speedY;
                baseSpeedY = -baseSpeedY;
            }
            changeNotice();
            drawBall();
            x += speedX;
            y += speedY;
        }

        this.speedKeyPress = function(key) {
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
    let field = new Field();
    let ball = new Ball();
    setInterval(function() {
        field.setWidth();
        field.setHeight();
        ball.draw();
    }, 10);
    document.addEventListener('keydown', ball.speedKeyPress);