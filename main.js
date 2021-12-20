/*--- Declaring Variables ---*/

let cards = [document.getElementById("card1"), document.getElementById("card2"), document.getElementById("card3"), document.getElementById("card4"), document.getElementById("card5"), document.getElementById("card6"), document.getElementById("card7"), document.getElementById("card8"), document.getElementById("card9"), document.getElementById("card10"), document.getElementById("card11"), document.getElementById("card12"), document.getElementById("card13"), document.getElementById("card14"), document.getElementById("card15"), document.getElementById("card16")];
let activeCards = cards.slice(0);

let correctAnswersDisplayed = document.getElementById("correctAnswers");
let incorrectAnswersDisplayed = document.getElementById("incorrectAnswers");
let highScore = document.getElementById("highScore");

let instructions = document.getElementById("myModal");
let instructionsButton = document.getElementById("instructionsButton");
let closeBtn = document.getElementById("closeModal");
let restartButton = document.getElementById("restartButton");

let fruit = ['<img class="turnedCard" src="images/croppedBanana.jpg" alt="Banana" aria-live="assertive">', '<img class="turnedCard" src="images/croppedChocolate.jpg" alt="Chocolate" aria-live="assertive">', '<img class="turnedCard" src="images/croppedCoffee.jpg" alt="Coffee" aria-live="assertive">', '<img class="turnedCard" src="images/croppedEggs.jpg" alt="Eggs" aria-live="assertive">', '<img class="turnedCard" src="images/croppedPancakes.jpg" alt="Pancakes" aria-live="assertive">', '<img class="turnedCard" src="images/croppedPineapple.jpg" alt="Pineapple" aria-live="assertive">', '<img class="turnedCard" src="images/croppedPizza.jpg" alt="Pizza" aria-live="assertive">', '<img class="turnedCard" src="images/croppedStrawberries.jpg" alt="Strawberries" aria-live="assertive">', '<img class="turnedCard" src="images/croppedBanana.jpg" alt="Banana" aria-live="assertive">', '<img class="turnedCard" src="images/croppedChocolate.jpg" alt="Chocolate" aria-live="assertive">', '<img class="turnedCard" src="images/croppedCoffee.jpg" alt="Coffee" aria-live="assertive">', '<img class="turnedCard" src="images/croppedEggs.jpg" alt="Eggs" aria-live="assertive">', '<img class="turnedCard" src="images/croppedPancakes.jpg" alt="Pancakes" aria-live="assertive">', '<img class="turnedCard" src="images/croppedPineapple.jpg" alt="Pineapple" aria-live="assertive">', '<img class="turnedCard" src="images/croppedPizza.jpg" alt="Pizza" aria-live="assertive">', '<img class="turnedCard" src="images/croppedStrawberries.jpg" alt="Strawberries" aria-live="assertive">'];

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
    console.log(cards);
    if (currentlyPlaying) {
        event.target.innerHTML = shuffledFood[event.target.getAttribute('dataNumber')];
        activeFlipped++;
        if (activeFlipped == 1) {
            firstFlipped = event.target.innerHTML;
            firstFlippedElement = event.target;
            firstFlippedElement.removeEventListener('click', clickCard);
            firstFlippedElement.removeEventListener('keyup', enterCard);
            firstFlippedElement.tabIndex = -1;
            removeActiveCard(firstFlippedElement);
        } else if (activeFlipped == 2) {
            secondFlipped = event.target.innerHTML;
            secondFlippedElement = event.target;
            if (firstFlipped == secondFlipped) {
                secondFlippedElement.removeEventListener('click', clickCard);
                secondFlippedElement.removeEventListener('keyup', enterCard);
                secondFlippedElement.tabIndex = -1;
                removeActiveCard(secondFlippedElement);
                correctAnswers++;
                correctAnswersDisplayed.innerHTML = correctAnswers;
                if (correctAnswers < 8) {
                    window.setTimeout(function () {
                        srSpeak(`Correct, that's ${correctAnswers} correct answers`);
                    }, 2000);
                }
                if (correctAnswers == 8) {
                    if (highScore.innerHTML == "" || parseInt(highScore.innerHTML) > incorrectAnswers) {
                        highScore.innerHTML = incorrectAnswers;
                    }
                    window.setTimeout(function () {
                        alert(`Well done! you won with only ${incorrectAnswers} incorrect answers`);
                        srSpeak(`Well done! you won with only ${incorrectAnswers} incorrect answers`);
                    }, 1000);
                }
            } else if (firstFlipped != secondFlipped) {
                currentlyPlaying = false;
                incorrectAnswers++;
                incorrectAnswersDisplayed.innerHTML = incorrectAnswers;
                addClickListener(firstFlippedElement);
                firstFlippedElement.tabIndex = 0;
                addActiveCard();
                window.setTimeout(function () {
                    firstFlippedElement.innerHTML = "";
                    secondFlippedElement.innerHTML = "";
                    currentlyPlaying = true;
                    srSpeak(`Incorrect`);
                }, 2000);
            }
            firstFlipped = "";
            secondFlipped = "";
            activeFlipped = 0;
        }
    }
}

function enterCard(event) {
    if (event.keyCode == 13) {
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

function resetTabIndex(x) {
    x.tabIndex = 0;
}

function minusTabIndex(x) {
    x.tabIndex = -1;
}

const showModal = () => {
    instructions.style.display = "block";
    closeBtn.focus();
    activeCards.forEach(minusTabIndex);
    restartButton.tabIndex = -1;
    instructionsButton.tabIndex = -1;
}

const hideModal = () => {
    instructions.style.display = "none";
    instructionsButton.focus();
    activeCards.forEach(resetTabIndex);
    restartButton.tabIndex = 0;
    instructionsButton.tabIndex = 0;
}

const resetCards = () => {
    if (currentlyPlaying) {
        cards.forEach(resetInnerHTML);
        shuffledNums = shuffleArray();
        shuffledFood = [];
        shuffledNums.forEach(locateFood);
        cards.forEach(addClickListener);
        cards.forEach(resetTabIndex);
        activeCards = cards.slice(0);
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
}

function srSpeak(text) {
    let el = document.createElement("div");
    let id = "speak-" + Date.now();
    el.setAttribute("id", id);
    el.setAttribute("aria-live", "polite");
    el.classList.add("sr-only");
    document.body.appendChild(el);

    window.setTimeout(function () {
        document.getElementById(id).innerHTML = text;
    }, 100);

    window.setTimeout(function () {
        document.body.removeChild(document.getElementById(id));
    }, 1000);
}

function removeActiveCard(x) {
    let index = activeCards.indexOf(x);
    activeCards.splice(index, 1);
}

function addActiveCard() {
    activeCards.push(firstFlippedElement);
}

/*--- Game Begin ---*/

shuffledNums = shuffleArray();

shuffledNums.forEach(locateFood);

cards.forEach(addClickListener);

/*-- Instructions and Reset buttons --*/

instructionsButton.addEventListener('click', showModal);
instructionsButton.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        showModal();
    }
});

closeBtn.addEventListener('click', hideModal);
closeBtn.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        hideModal();
    }
});
window.addEventListener('click', function (event) {
    if (event.target == instructions) {
        hideModal();
    }
});

restartButton.addEventListener('click', resetCards);