

let blackjackGame = {
    'you': { 'scorespan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scorespan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2','3','4','5','6','7','8','9','10','K','Q','J', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11] },
    'wins': { 'score': 0, 'div': '#wins' },
    'losses': { 'score': 0, 'div': '#losses' },
    'draws': { 'score': 0, 'div': '#draws' },
    'canhit': true,
    'canstand': false,
    'candeal': false,
}
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector("#blackjack-hit-button").addEventListener('click', hit);
document.querySelector("#blackjack-deal-button").addEventListener('click', deal);
document.querySelector("#blackjack-stand-button").addEventListener('click', stand);

 function hit() {
    if (blackjackGame['canhit'] = true && YOU['score'] < 21 
            && blackjackGame['candeal'] === false) {
        blackjackGame['canstand'] = true;
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);  
    }
   else if (YOU['score'] >= 21) {
        blackjackGame['canhit'] === false;
    }
}
function randomCard() {

    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}


function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {

        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}


function deal() {


    if (blackjackGame['canhit'] === false && blackjackGame['canstand'] === false) {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector(YOU['scorespan']).textContent = 0;
        document.querySelector(DEALER['scorespan']).textContent = 0;
        document.querySelector('#blackjack-result').textContent = 'Let`s play';
        document.querySelector('#blackjack-result').style.color = 'black';
        document.querySelector(YOU['scorespan']).style.color = 'white';
        document.querySelector(DEALER['scorespan']).style.color = 'white';

        blackjackGame['canhit'] = true;
        blackjackGame['candeal'] = false;


    }



}

function updateScore(card, activePlayer) {

    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
  


}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score']+' LOST';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

function stand() {


    blackjackGame['canhit'] = false;

    while ( blackjackGame['canstand'] === true) {

        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);

        if (DEALER['score'] === 21) {
            blackjackGame['canstand'] = false;
            let winner = computeWinner();
            showResult(winner);
            blackjackGame['candeal'] = true;
           
        }
       else if (DEALER['score'] > YOU['score']) {
            blackjackGame['canstand'] = false;
            let winner = computeWinner();
            showResult(winner);
            blackjackGame['candeal'] = true;
            
        }
        else if (YOU['score'] > 21 && DEALER['score'] >= 0){
        blackjackGame['canstand'] = false;
            let winner = computeWinner();
            showResult(winner);
            blackjackGame['candeal'] = true;
            
    }}
}


function computeWinner() {
    let winner;


    blackjackGame['canstand'] = false;
    // You score is less than 21 
    if (YOU['score'] <= 21) {


        // if your score is less than 21 and mor than the Dealer

        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {

            blackjackGame['wins']['score']++;
            winner = YOU;
            blackjackGame['candeal'] = true;

        } else if ((YOU['score'] < DEALER['score']) && (DEALER['score'] <= 21)) {


            blackjackGame['losses']['score']++;
            winner = DEALER;
            blackjackGame['candeal'] = true;

        }
        // if the Scores are equal
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']['score']++;
            blackjackGame['candeal'] = true;

        }
    }
    // Your score is more than 21 and the Dealer is less or equal to 21
     if (YOU['score'] > 21 ) {

        
        blackjackGame['losses']['score']++;
            winner = DEALER;
            
            blackjackGame['candeal'] = true;

    } 
    return winner;

}

function showResult(winner) {
    let message, messageColor;

    if (winner === YOU) {

        message = 'You won';
        messageColor = 'green';
        winSound.play();
    } else if (winner === DEALER) {
        messageColor = 'red';
        message = 'You lost';
        lossSound.play();
    } else {
        message = "It's draw";
        messageColor = 'black';


    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
    document.querySelector('#wins').textContent = blackjackGame['wins']['score'];
    document.querySelector('#losses').textContent = blackjackGame['losses']['score'];
    document.querySelector('#draws').textContent = blackjackGame['draws']['score'];

}