const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameboard = document.querySelector('.clouds');

const gameOverMessage = document.getElementById('game-over-3');
const pulosSuccess = document.getElementById('pulos-success');
gameboard.src = './images/clouds.png';

let pulos = 0;

// Função para atualizar o número de pulos no HTML
function atualizarContagemDePulos() {
    document.getElementById('pulos').innerText = 'Pulos: ' + pulos;
}


const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            gameOver();
            return; // Encerra a função de pulo caso o jogo tenha terminado
        }
    }, 500);

    // Incrementa o contador de pulos após a animação de pulo
    pulos++;
    // Dispara o evento customizado 'atualizarPulos'
    document.dispatchEvent(new Event('atualizarPulos'));
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        clearInterval(loop);

    }

}, 10)

document.addEventListener('atualizarPulos', atualizarContagemDePulos);

// Adiciona um event listener para a tecla de pulo (por exemplo, a barra de espaço)
document.addEventListener('keydown', function (event) {
    // Verifica se a tecla pressionada é a barra de espaço (ou outra tecla de sua escolha)
    if (event.key === ' ') {
        jump();
    }
});

// Inicializa a contagem de pulos ao iniciar o jogo
atualizarContagemDePulos();