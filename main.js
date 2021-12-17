/*--- Declaring Variables ---*/

let cards = [document.getElementById("card1"), document.getElementById("card2"), document.getElementById("card3"), document.getElementById("card4"), document.getElementById("card5"), document.getElementById("card6"), document.getElementById("card7"), document.getElementById("card8"), document.getElementById("card9"), document.getElementById("card10"), document.getElementById("card11"), document.getElementById("card12"), document.getElementById("card13"), document.getElementById("card14"), document.getElementById("card15"), document.getElementById("card16")];

let correctAnswersDisplayed = document.getElementById("correctAnswers");
let incorrectAnswersDisplayed = document.getElementById("incorrectAnswers");
let highScore = document.getElementById("highScore");

let instructions = document.getElementById("myModal");
let instructionsButton = document.getElementById("instructionsButton");
let closeBtn = document.getElementById("closeModal");
let restartButton = document.getElementById("restartButton");

let fruit = ['<img class="turnedCard" src="images/croppedBanana.jpg" alt="Banana">', '<img class="turnedCard" src="images/croppedChocolate.jpg" alt="Chocolate">', '<img class="turnedCard" src="images/croppedCoffee.jpg" alt="Coffee">', '<img class="turnedCard" src="images/croppedEggs.jpg" alt="Eggs">', '<img class="turnedCard" src="images/croppedPancakes.jpg" alt="Pancakes">', '<img class="turnedCard" src="images/croppedPineapple.jpg" alt="Pineapple">', '<img class="turnedCard" src="images/croppedPizza.jpg" alt="Pizza">', '<img class="turnedCard" src="images/croppedStrawberries.jpg" alt="Strawberries">', '<img class="turnedCard" src="images/croppedBanana.jpg" alt="Banana">', '<img class="turnedCard" src="images/croppedChocolate.jpg" alt="Chocolate">', '<img class="turnedCard" src="images/croppedCoffee.jpg" alt="Coffee">', '<img class="turnedCard" src="images/croppedEggs.jpg" alt="Eggs">', '<img class="turnedCard" src="images/croppedPancakes.jpg" alt="Pancakes">', '<img class="turnedCard" src="images/croppedPineapple.jpg" alt="Pineapple">', '<img class="turnedCard" src="images/croppedPizza.jpg" alt="Pizza">', '<img class="turnedCard" src="images/croppedStrawberries.jpg" alt="Strawberries">'];

let shuffledNums = [];
let shuffledFood = [];

let activeFlipped = 0;
let firstFlipped = "";
let firstFlippedElement = "";
let secondFlipped = "";
let secondFlippedElement = "";
let correctAnswers = 0;
let incorrectAnswers = 0;

let currentlyPlaying = true;

/*--- Building Functions ---*/

const shuffleArray = () => {
    let shuffled = [];
    for (a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; i = a.length; i--) {
        let random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        if (random != undefined) {
            shuffled.push(random);
        }
    }
    return shuffled;
}

const locateFood = x => {
    shuffledFood.push(fruit[x]);
}

function clickCard(event) {
    if (currentlyPlaying) {
        if (event.target.getAttribute('id') == 'card1') {
            event.target.innerHTML = shuffledFood[0];
        } else if (event.target.getAttribute('id') == 'card2') {
            event.target.innerHTML = shuffledFood[1];
        } else if (event.target.getAttribute('id') == 'card3') {
            event.target.innerHTML = shuffledFood[2];
        } else if (event.target.getAttribute('id') == 'card4') {
            event.target.innerHTML = shuffledFood[3];
        } else if (event.target.getAttribute('id') == 'card5') {
            event.target.innerHTML = shuffledFood[4];
        } else if (event.target.getAttribute('id') == 'card6') {
            event.target.innerHTML = shuffledFood[5];
        } else if (event.target.getAttribute('id') == 'card7') {
            event.target.innerHTML = shuffledFood[6];
        } else if (event.target.getAttribute('id') == 'card8') {
            event.target.innerHTML = shuffledFood[7];
        } else if (event.target.getAttribute('id') == 'card9') {
            event.target.innerHTML = shuffledFood[8];
        } else if (event.target.getAttribute('id') == 'card10') {
            event.target.innerHTML = shuffledFood[9];
        } else if (event.target.getAttribute('id') == 'card11') {
            event.target.innerHTML = shuffledFood[10];
        } else if (event.target.getAttribute('id') == 'card12') {
            event.target.innerHTML = shuffledFood[11];
        } else if (event.target.getAttribute('id') == 'card13') {
            event.target.innerHTML = shuffledFood[12];
        } else if (event.target.getAttribute('id') == 'card14') {
            event.target.innerHTML = shuffledFood[13];
        } else if (event.target.getAttribute('id') == 'card15') {
            event.target.innerHTML = shuffledFood[14];
        } else if (event.target.getAttribute('id') == 'card16') {
            event.target.innerHTML = shuffledFood[15];
        }
        activeFlipped++;
        if (activeFlipped == 1) {
            firstFlipped = event.target.innerHTML;
            firstFlippedElement = event.target;
            firstFlippedElement.removeEventListener('click', clickCard);
            firstFlippedElement.removeEventListener('keyup', enterCard);
        } else if (activeFlipped == 2) {
            secondFlipped = event.target.innerHTML;
            secondFlippedElement = event.target;
            if (firstFlipped == secondFlipped) {
                secondFlippedElement.removeEventListener('click', clickCard);
                secondFlippedElement.removeEventListener('keyup', enterCard);
                correctAnswers++;
                correctAnswersDisplayed.innerHTML = correctAnswers;
                if (correctAnswers == 8) {
                    currentlyPlaying = false;
                    if (highScore.innerHTML == "" || parseInt(highScore.innerHTML) > incorrectAnswers) {
                        highScore.innerHTML = incorrectAnswers;
                    }
                    if (incorrectAnswers < 6) {
                        alert("Wow, well played! This score is very impressive");
                    } else if (incorrectAnswers < 11) {
                        alert("Not bad! This is a reasonable score");
                    } else if (incorrectAnswers < 16) {
                        alert("Nice try! But you can definitely do better than this");
                    } else {
                        alert("Did you even try?!");
                    }
                }
            } else if (firstFlipped != secondFlipped) {
                currentlyPlaying = false;
                incorrectAnswers++;
                incorrectAnswersDisplayed.innerHTML = incorrectAnswers;
                addClickListener(firstFlippedElement);
                window.setTimeout(function () {
                    firstFlippedElement.innerHTML = "";
                    secondFlippedElement.innerHTML = "";
                    currentlyPlaying = true;
                }, 2000);
            }
            firstFlipped = "";
            secondFlipped = "";
            activeFlipped = 0;
        }
    }
}

function enterCard(event) {
    if(event.keyCode == 13) {
        clickCard(event);
    }
}

const resetInnerHTML = x => {
    x.innerHTML = "";
}

function addClickListener(x) {
    x.addEventListener('click', clickCard);
    x.addEventListener('keyup', enterCard);
}

const showModal = () => {
    instructions.style.display = "block";
}

const hideModal = () => {
    instructions.style.display = "none";
}

const resetCards = () => {
    cards.forEach(resetInnerHTML);
    shuffledNums = shuffleArray();
    shuffledFood = [];
    shuffledNums.forEach(locateFood);
    cards.forEach(addClickListener);
    correctAnswers = 0;
    incorrectAnswers = 0;
    correctAnswersDisplayed.innerHTML = "0";
    incorrectAnswersDisplayed.innerHTML = "0";
    firstFlipped = "";
    firstFlippedElement = "";
    secondFlipped = "";
    secondFlippedElement = "";
    activeFlipped = 0;
    currentlyPlaying = true;
}

/*--- Game Begin ---*/

shuffledNums = shuffleArray();

shuffledNums.forEach(locateFood);

cards.forEach(addClickListener);

/*-- Instructions and Reset buttons --*/

instructionsButton.addEventListener('click', showModal);
closeBtn.addEventListener('click', hideModal);
closeBtn.addEventListener('keyup', function(e) {
    if(e.keyCode == 13) {
        hideModal();
    }
});

window.addEventListener('click', function (event) {
    if (event.target == instructions) {
        hideModal();
    }
});

restartButton.addEventListener('click', resetCards);
