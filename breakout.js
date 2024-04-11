
// Making the initial coordinate of the ball random
// The playing pattern wouldn't be the same everytime

let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d'),
    ballRadius = 9,
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
    y = canvas.height - 40,
    dx = 2,
    dy = -2;

let paddleHeight = 12,
    paddleWidth = 72;

// Paddle initial position
let paddleX = (canvas.width - paddleWidth) / 2;

// Changing bricks values
let rowCount = 8,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0;
    RowColor = ['#320036', '#4c0052', '#66006e', '#80008a', '#9702a3', '#b104bf', '#d400e6', '#ed19ff', '#f03dff', '#f05dfc', 'white', 'white', 'white']

// Bricks array
let bricks = [];
for (let i = 0; i < columnCount; i++) {
    bricks[i] = [];
    for (let l = 0; l < rowCount; l++) {
        // Set position of bricks
        bricks[i][l] = { x: 0, y: 0, status: 1 };
    }
}

// Mouse moving eventListener and function
document.addEventListener("mousemove", mouseMoveHandler, false);

// Move paddle with mouse
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 5);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}



// Draw Bricks
function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 4);
                ctx.fillStyle = RowColor[r];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Track score
function trackScore() {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Brick Broken : ' + score, 8, 24);
}

// Check ball hit bricks
function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // Check win
                    if (score === rowCount * columnCount) {
                        alert('You Win!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Main function
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    // Detect left and right walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Detect top wall
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Detect paddle hits
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // If ball don't hit paddle
            alert('Game Over!');
            document.location.reload();
        }
    }

    // Bottom wall
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // Move Ball

    if (score < 10 && score > -1) {
        x += dx;
        y += dy;
    } else if (score < 20 && score > 9) {
        x += dx * 1.1;
        y += dy * 1.1;
    } else if (score < 30 && score > 19) {
        x += dx * 1.3;
        y += dy * 1.3;
    } else if (score < 40 && score > 29) {
        x += dx * 1.5;
        y += dy * 1.5;
    } else if (score < 50 && score > 39) {
        x += dx * 1.7;
        y += dy * 1.7;
    } else {
        x += dx * 2;
        y += dy * 2;
    }


}

setInterval(init, 10);