const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bird = { x: 50, y: 150, size: 20, gravity: 1, lift: -10, velocity: 0 };
const pipes = [];
let pipeWidth = 50;
let gapHeight = 120;
let pipeSpeed = 2;
let pipeInterval = 90;
let frameCount = 0;
let score = 0;
let gameOver = false;
let countdown = 3; 
let countdownInterval;
let backgroundColor = "#70c5ce"; 

const restartButton = document.getElementById("restartButton");
restartButton.style.display = "none";

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes.length = 0;
    frameCount = 0;
    score = 0;
    gameOver = false;
    backgroundColor = "#70c5ce"; 
    restartButton.style.display = "none";
    startCountdown();
}

function setDifficulty(level) {
    if (level === "easy") {
        gapHeight = 150;
        pipeSpeed = 2;
        pipeInterval = 100;
    } else if (level === "medium") {
        gapHeight = 120;
        pipeSpeed = 3;
        pipeInterval = 90;
    } else if (level === "hard") {
        gapHeight = 90;
        pipeSpeed = 4;
        pipeInterval = 80;
    }
    resetGame();
}

function startCountdown() {
    countdown = 3;
    countdownInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        if (countdown > 0) {
            ctx.fillText(countdown, canvas.width / 2 - 10, canvas.height / 2);
        } 

        if (countdown === 0) {
            clearInterval(countdownInterval);
            gameLoop();
        }
        countdown--;
    }, 1000);
}

document.addEventListener("keydown", () => {
    if (!gameOver && countdown <= 0) bird.velocity = bird.lift;
});

function drawBird() {
    const birdWidth = bird.size * 1.5; 
    const birdHeight = bird.size * 1; 
    const beakSize = 10; 

    // Draw body
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.ellipse(
        bird.x + birdWidth / 2, 
        bird.y + birdHeight / 2, 
        birdWidth / 2, 
        birdHeight / 2, 
        0, 
        0, 
        2 * Math.PI 
    );
    ctx.fill();

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(bird.x + birdWidth, bird.y + birdHeight / 20);
    ctx.lineTo(bird.x + birdWidth + beakSize, bird.y + birdHeight / 2 - beakSize / 2);
    ctx.lineTo(bird.x + birdWidth + beakSize, bird.y + birdHeight / 2 + beakSize / 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
        bird.x + birdWidth / 2 + 2, 
        bird.y + birdHeight / 2 - 3, 
        2, 
        0,
        2 * Math.PI
    );
    ctx.fill();
}

function gameLoop() {
    
    if (score >= 5) backgroundColor = "pink";
    if (score >= 10) backgroundColor = "purple";
    if (score >= 15) backgroundColor = "red";

    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

 
    drawBird();

  
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.size > canvas.height) {
        bird.y = canvas.height - bird.size;
        gameOver = true;
    }
    if (bird.y < 0) bird.y = 0;

    
    if (frameCount % pipeInterval === 0) {
        const pipeY = Math.random() * (canvas.height - gapHeight - 40) + 20;
        pipes.push({ x: canvas.width, y: pipeY });
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        const pipe = pipes[i];
        pipe.x -= pipeSpeed;

        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y); 
        ctx.fillRect(pipe.x, pipe.y + gapHeight, pipeWidth, canvas.height - pipe.y - gapHeight); 

        if (
            bird.x + bird.size > pipe.x &&
            bird.x < pipe.x + pipeWidth &&
            (bird.y < pipe.y || bird.y + bird.size > pipe.y + gapHeight)
        ) {
            gameOver = true;
        }

        if (pipe.x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);

    if (!gameOver) {
        frameCount++;
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
        restartButton.style.display = "block";
    }
}

startCountdown();
