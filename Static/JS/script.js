const button = document.querySelector('.start-button');
const elements = document.querySelectorAll('.card');
const score = document.querySelector('.score');
const finishMessage = document.querySelector('.finish-message');
const errors = document.querySelector('.error');

let punteggio = 0;
let activeCard = null;
let interval = null;
let gameOver = false;

button.addEventListener("click", function() {
    button.disabled = true;
    startGame();
});

function startGame() {
    punteggio = 0;
    score.textContent = punteggio;
    finishMessage.textContent = ''; 
    gameOver = false;

    interval = setInterval(() => {
        if (activeCard) {
            activeCard.classList.remove('active'); 
        }

        const randomInteger = Math.floor(Math.random() * elements.length);
        activeCard = elements[randomInteger];
        activeCard.classList.add('active'); 

        
        activeCard.onclick = function() {
            if (!gameOver && activeCard.classList.contains('active')) { 
                punteggio++;
                score.textContent = `Punteggio: ${punteggio}`; 
                activeCard.classList.remove('active'); 
            } else {
                errors.textContent = 'Non puoi cliccare su questa carta!';
                setTimeout(() => {
                    errors.textContent = '';
                }, 1000);
            }
        };
    }, 1000);

    setTimeout(() => {
        clearInterval(interval); 
        button.disabled = false;
        gameOver = true;
        if (activeCard) {
            activeCard.classList.remove('active'); 
        }
        finishMessage.textContent = `Tempo scaduto! Punteggio finale: ${punteggio}`; 
    }, 30000); 
}