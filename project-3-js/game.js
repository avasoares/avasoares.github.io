const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const bird = { x: 50, y: 150, size: 20, gravity: 1, lift: -15, velocity: 0 };
const pipes = [];
const pipeWidth = 50;
const gapHeight = 120;
const pipeInterval = 90; // frames between pipes
let frameCount = 0;
let score = 0;
let gameOver = false;

// Game controls
document.addEventListener("keydown", () => {
    if (!gameOver) bird.velocity = bird.lift;
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);

    // Gravity
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Stop bird from going off-screen
    if (bird.y + bird.size > canvas.height) {
        bird.y = canvas.height - bird.size;
        gameOver = true;
    }
    if (bird.y < 0) bird.y = 0;

    // Handle pipes
    if (frameCount % pipeInterval === 0) {
        const pipeY = Math.random() * (canvas.height - gapHeight - 40) + 20;
        pipes.push({ x: canvas.width, y: pipeY });
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        const pipe = pipes[i];
        pipe.x -= 2;

        // Draw pipes
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y); // Top pipe
        ctx.fillRect(pipe.x, pipe.y + gapHeight, pipeWidth, canvas.height - pipe.y - gapHeight); // Bottom pipe

        // Check for collisions
        if (
            bird.x + bird.size > pipe.x &&
            bird.x < pipe.x + pipeWidth &&
            (bird.y < pipe.y || bird.y + bird.size > pipe.y + gapHeight)
        ) {
            gameOver = true;
        }

        // Remove off-screen pipes and increase score
        if (pipe.x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }

    // Draw score
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
    }
}
<script src="game.js"></script>
gameLoop();
