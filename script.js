// seleciona o canvas e o botão de reiniciar
const canvas = document.getElementById('canvas');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');

// Define o tamanho do seus canvas
canvas.width = 1000;
canvas.height = 300;

// define o contexto do canvas
const ctx = canvas.getContext('2d');

// define a velocidade do jogo e a altura do pulo do dinossauro
let gameSpeed = 6;
let dinoYSpeed = 0;

// define as dimensões do dinossauro, do cacto e do chão
const dinoWidth = 60;
const dinoHeight = 80;
const cactusWidth = 50;
const cactusHeight = 100;
const groundY = canvas.height - 50;

// define as posições iniciais do dinossauro e do cacto
let dinoX = 50;
let dinoY = groundY - dinoHeight;
let cactusX = canvas.width + Math.random() * 500;
let cactusY = groundY - cactusHeight;

// define a gravidade e se a tecla de espaço está pressionada
const gravity = 1.5;
let isKeyDown = false;

// define a pontuação e se o jogo acabou
let score = 0;
let isGameOver = false;

// desenha o dinossauro na tela
function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);
}

// desenha o cacto na tela
function drawCactus() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(cactusX, cactusY, cactusWidth, cactusHeight);
}

// desenha o chão na tela
function drawGround() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, groundY, canvas.width, 50);
}

// atualiza o cacto
function updateCactus() {
    cactusX -= gameSpeed;
    if (cactusX < -cactusWidth) {
        cactusX = canvas.width + Math.random() * 500;
        score++;
    }
    if (isCollision(dinoX, dinoY, dinoWidth, dinoHeight, cactusX, cactusY, cactusWidth, cactusHeight)) {
        isGameOver = true;
        restartButton.style.display = '';
    }
}

// atualiza o dinossauro
function updateDino() {
    if (isKeyDown) {
        dinoYSpeed = -20;
    }
    dinoY += dinoYSpeed;
    dinoYSpeed += gravity;
    if (dinoY > groundY - dinoHeight) {
        dinoY = groundY - dinoHeight;
        dinoYSpeed = 0;
    }
}

// verifica colisão entre dois retângulos
function isCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2;
}

// atualiza a tela
function update() {
    // limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // desenha o dinossauro, o cacto e o chão
    drawDino();
    drawCactus();
    drawGround();

    // atualiza o cacto e o dinossauro
    updateCactus();
    updateDino();

    // exibe a pontuação na tela
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 20, 40);
    // se o jogo acabou, exibe a mensagem "Game Over"
    if (isGameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 130, canvas.height / 2 - 25);
        startButton.style.display = 'none';
        return;
    }

    // atualiza o jogo
    requestAnimationFrame(update);

}

// adiciona um evento de teclado para a tecla de espaço
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        isKeyDown = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.code === 'Space') {
        isKeyDown = false;
    }
});

// adiciona um evento de clique para o botão de reiniciar
restartButton.addEventListener('click', function () {
    location.reload();
});

// inicia o jogo
update();