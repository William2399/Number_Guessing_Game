//Declare and initialize constants and variables
const playerGuess = document.querySelector('.playerGuess');
const submit_button = document.querySelector('.submit_button');
const guess_record = document.querySelector('.guess_record');
const guess_result = document.querySelector('.guess_result');
const random_num = document.querySelector('.random_num');
const guess_hint = document.querySelector('.guess_hint');
const num_guesses = document.querySelector('.num_guesses');
let randomNum = Math.floor(Math.random() * 100) + 1;
let guess_count = 10;
let replay_button;
num_guesses.textContent = '10';

//Apply style to given element
function applyStyle(element){
    element.style.width = '350px';
    element.style.padding = '5px';        
    element.style.textAlign = 'center';
    element.style.margin = '0 auto';
    element.style.marginBottom = '10px'
}

//Reveal the random number
function revealRandom(){
    guess_hint.textContent = '';
    random_num.textContent = `The correct number was: ${randomNum}`;
    random_num.style.backgroundColor = 'rgba(255,215,0,0.5)';
}

//Refresh and refocus the input element
function resetInput(){
    playerGuess.value = '';
    playerGuess.focus();
}

//Evaluate the player's input
function evaluateInput() {
    if (guess_count === 10){
        guess_record.textContent = "Guess History: ";
        guess_record.style.display = 'block';
        guess_record.style.textAlign = 'center';
        applyStyle(guess_result);
        applyStyle(random_num);
        applyStyle(guess_hint);
    }

    const guess_content = Number(playerGuess.value);

    if (guess_content !== randomNum){
        guess_result.textContent = 'Incorrect!';
        guess_result.style.backgroundColor = 'rgba(255,0,0,0.5)';
        guess_hint.style.backgroundColor = 'rgba(211,211,211,0.5)';
        guess_record.textContent += (guess_content + ' ');
        if (guess_content < randomNum){
            guess_hint.textContent = 'The number you gave was too low';
        } else {
            guess_hint.textContent = 'The number you gave was too high';
        }
    } else {
        guess_record.textContent += (guess_content + ' ');
        guess_result.textContent = 'CONGRATULATIONS. YOU WIN!'
        guess_result.style.backgroundColor = 'rgba(0,255,0,0.5)';
        revealRandom();
        gameOver();
    }

    if (guess_count !== 0){
        guess_count-=1;
        num_guesses.textContent = `${guess_count}`;
        resetInput();
        if (guess_count === 0){
            guess_result.textContent = 'GAME OVER. YOU LOSE!';
            guess_result.style.backgroundColor = 'rgba(255,0,0,0.5)';
            revealRandom();
            gameOver();
        }
    }
}

//End the number guessing game
function gameOver() {
    playerGuess.disabled = true;
    submit_button.disabled = true;
    guess_hint.style.backgroundColor = 'rgba(0,0,0,0)'
    playAgain();
}

//Provide player with option to play again
function playAgain() {
    replay_button = document.createElement('button');
    replay_button.textContent = 'PLAY AGAIN';
    document.body.appendChild(replay_button);
    replay_button.style.display = 'flex';
    replay_button.style.margin = '0 auto';
    replay_button.style.padding = '10px';
    replay_button.style.fontSize = '16px';
    replay_button.style.fontWeight = 'bold';
    replay_button.style.color = 'white';
    replay_button.style.backgroundColor = 'rgba(0,0,0,0.6)';
    replay_button.style.border = 'none';
    replay_button.style.outline = 'none';
    replay_button.style.borderRadius = '5px';
    replay_button.addEventListener('click', redoGame);
}

//Resets the game to original state
function redoGame() {
    guess_record.textContent = '';
    guess_result.textContent = '';
    guess_result.style.backgroundColor = 'rgba(0,0,0,0)';
    random_num.textContent = '';
    random_num.style.backgroundColor = 'rgba(0,0,0,0)';
    guess_hint.textContent = ''; 
    guess_count = 10;
    num_guesses.textContent = '10';

    replay_button.parentNode.removeChild(replay_button);
    playerGuess.disabled = false;
    submit_button.disabled = false;
    resetInput();
    randomNum = Math.floor(Math.random() * 100) + 1;
}

submit_button.addEventListener('click', evaluateInput);