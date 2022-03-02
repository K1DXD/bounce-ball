    /** 
     * get and set brower width and height
     */
    function Field() {
        /**
         * window width and height
         * @private @type {number} 
         */
        let width = window.innerWidth;
        let height = window.innerHeight;
        /**
         * @returns {obj} width and height
         */
        this.getWidthAndHeight = function() {
            return {
                width:width,
                height:height
            };
        }
        /**
         * update width and height
         * set width and height to canvas 
         */
        this.setWidthAndHeight = function() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
    }
    /**
     * draw the canvas field and the ball
     */
    function Ball() {
        /**
         * canvas and ctx for draw function
         * @private 
         */
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        /**
         * canvas width and height
         * @private @type {number} 
         */
        let width = field.getWidthAndHeight().width;
        let height = field.getWidthAndHeight().height;
        /**
         * coordinates of the ball
         * @private @type {number} 
         */
        let x = width / 2;
        let y = height / 2;
        /**
         * @private @const @type {number} 
         */
        let ballRadius = 10;
        /**
         * base speed of the ball and base direction
         * @private @type {number}
         */
        let baseSpeedX = randomDirection();
        let baseSpeedY = randomDirection();
        /**
         *  speed of the ball
         *  @private @type {number}
         */
        let speedX = baseSpeedX;
        let speedY = baseSpeedY;

        /**
         * @private
         * @returns {number} from -1.5 to 1.5
         */
        function randomDirection() {
            let x = (Math.random() > 0.5) ? 1 : -1;
            return (Math.random() + 0.5) * x;
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }
        /**
         * check browser resize
         * update browser width and height
         * update coordinate of the ball
         * @private
         */
        function changeNotice() {
            /**
             * check if browser resize
             */
            if (width != field.getWidthAndHeight().width||height != field.getWidthAndHeight().height) {
                /**
                 * @type {number} relative coordinate of the ball
                 */
                let tempY = y / height;
                let tempX = x / width;
                /**
                 * update width and height to new value
                 */
                width = field.getWidthAndHeight().width;
                height = field.getWidthAndHeight().height;
                /**
                 * update new coordinate of the ball
                 */
                x = tempX * width;
                y = tempY * height;
            }
        }
        /**
         * delete old ball and draw new ball
         * change ball direction when the ball touch the edge of browser
         */
        this.draw = function() {
            changeNotice();
            /**
             * delete old ball
             */
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            /**
             * change ball direction
             */
            if (x + speedX > canvas.width - ballRadius || x + speedX < ballRadius) {
                speedX = -speedX;
                baseSpeedX = -baseSpeedX;
            }
            if (y + speedY > canvas.height - ballRadius || y + speedY < ballRadius) {
                speedY = -speedY;
                baseSpeedY = -baseSpeedY;
            }
            drawBall();
            /**
             * new cordinate of the ball
             */
            x += speedX;
            y += speedY;
        }
        /**
         * 
         * @param {string} key for increase or decrease speed of the ball
         */
        function speedControl(key) {
            switch(key){
                case 'increase':
                    speedX += baseSpeedX;
                    speedY += baseSpeedY;
                    break;
                case 'decrease':
                    /**
                     * when the ball stop, cant decrease speed
                     */
                    if(speedX < 0.1 && speedX > -0.1 || speedY < 0.1 && speedY > -0.1) break;
                    else{
                        speedX -= baseSpeedX;
                        speedY -= baseSpeedY;
                        break;
                    }
            }
        }
        /**
         * reconize ArrowUp and ArrowDown key press and call speedControl() function
         * @param {string} key listen for key down event
         */
        this.keyReconize = function(key) {
            switch(key.key){
                case 'ArrowUp':
                    speedControl('increase');
                    break;
                case 'ArrowDown':
                    speedControl('decrease');
                    break;
            }
        }
    }
    let field = new Field();
    let ball = new Ball();
    setInterval(function() {
        field.setWidthAndHeight();
        ball.draw();
    }, 10);
    document.addEventListener('keydown', ball.keyReconize);