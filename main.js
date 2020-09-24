/*--- Declaring Variables ---*/

let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let card3 = document.getElementById("card3");
let card4 = document.getElementById("card4");
let card5 = document.getElementById("card5");
let card6 = document.getElementById("card6");
let card7 = document.getElementById("card7");
let card8 = document.getElementById("card8");
let card9 = document.getElementById("card9");
let card10 = document.getElementById("card10");
let card11 = document.getElementById("card11");
let card12 = document.getElementById("card12");
let card13 = document.getElementById("card13");
let card14 = document.getElementById("card14");
let card15 = document.getElementById("card15");
let card16 = document.getElementById("card16");

let correctAnswersDisplayed = document.getElementById("correctAnswers");
let incorrectAnswersDisplayed = document.getElementById("incorrectAnswers");

let instructions = document.getElementById("myModal");
let instructionsButton = document.getElementById("instructionsButton");
let closeBtn = document.getElementById("closeModal");
let restartButton = document.getElementById("restartButton");

let banana = '<img class="turnedCard" src="images/croppedBanana.jpg">';
let chocolate = '<img class="turnedCard" src="images/croppedChocolate.jpg">';
let coffee = '<img class="turnedCard" src="images/croppedCoffee.jpg">';
let eggs = '<img class="turnedCard" src="images/croppedEggs.jpg">';
let pancakes = '<img class="turnedCard" src="images/croppedPancakes.jpg">';
let pineapple = '<img class="turnedCard" src="images/croppedPineapple.jpg">';
let pizza = '<img class="turnedCard" src="images/croppedPizza.jpg">';
let strawberries = '<img class="turnedCard" src="images/croppedStrawberries.jpg">';

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
    for (a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; i = a.length; i--) {
        let random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        if (random) {
            shuffled.push(random);
        }
    }
    return shuffled;
}

const locateFood = x => {
    if (x == 1) {
        shuffledFood.push(banana);
    } else if (x == 2) {
        shuffledFood.push(chocolate);
    } else if (x == 3) {
        shuffledFood.push(coffee);
    } else if (x == 4) {
        shuffledFood.push(eggs);
    } else if (x == 5) {
        shuffledFood.push(pancakes);
    } else if (x == 6) {
        shuffledFood.push(pineapple);
    } else if (x == 7) {
        shuffledFood.push(pizza);
    } else if (x == 8) {
        shuffledFood.push(strawberries);
    } else if (x == 9) {
        shuffledFood.push(banana);
    } else if (x == 10) {
        shuffledFood.push(chocolate);
    } else if (x == 11) {
        shuffledFood.push(coffee);
    } else if (x == 12) {
        shuffledFood.push(eggs);
    } else if (x == 13) {
        shuffledFood.push(pancakes);
    } else if (x == 14) {
        shuffledFood.push(pineapple);
    } else if (x == 15) {
        shuffledFood.push(pizza);
    } else if (x == 16) {
        shuffledFood.push(strawberries);
    }
}

const clickCard = event => {
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
        } else if (activeFlipped == 2) {
            secondFlipped = event.target.innerHTML;
            secondFlippedElement = event.target;
            if (firstFlipped == secondFlipped) {
                correctAnswers++;
                correctAnswersDisplayed.innerHTML = correctAnswers;
                if (correctAnswers == 8) {
                    currentlyPlaying = false;
                    if (incorrectAnswers < 6) {
                        alert("Well played! This score is well above average");
                    } else if (incorrectAnswers < 12) {
                        alert("Not bad! This is a fairly impressive score");
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
                window.setTimeout(function () {
                    firstFlippedElement.innerHTML = "";
                    secondFlippedElement.innerHTML = "";
                    currentlyPlaying = true;
                }, 1000);
            }
            firstFlipped = "";
            firstFlippedID = "";
            secondFlipped = "";
            secondFlippedID = "";
            activeFlipped = 0;
        }
    }
}

const resetCards = () => {
    card1.innerHTML = '';
    card2.innerHTML = '';
    card3.innerHTML = '';
    card4.innerHTML = '';
    card5.innerHTML = '';
    card6.innerHTML = '';
    card7.innerHTML = '';
    card8.innerHTML = '';
    card9.innerHTML = '';
    card10.innerHTML = '';
    card11.innerHTML = '';
    card12.innerHTML = '';
    card13.innerHTML = '';
    card14.innerHTML = '';
    card15.innerHTML = '';
    card16.innerHTML = '';
    shuffledNums = shuffleArray();
    shuffledFood = [];
    shuffledNums.forEach(locateFood);
    correctAnswers = 0;
    incorrectAnswers = 0;
    correctAnswersDisplayed.innerHTML = "0";
    incorrectAnswersDisplayed.innerHTML = "0";
    firstFlipped = "";
    firstFlippedID = "";
    secondFlipped = "";
    secondFlippedID = "";
    activeFlipped = 0;
    currentlyPlaying = true;
}

/*--- Game Begin ---*/

shuffledNums = shuffleArray();

shuffledNums.forEach(locateFood);

card1.addEventListener('click', clickCard);
card2.addEventListener('click', clickCard);
card3.addEventListener('click', clickCard);
card4.addEventListener('click', clickCard);
card5.addEventListener('click', clickCard);
card6.addEventListener('click', clickCard);
card7.addEventListener('click', clickCard);
card8.addEventListener('click', clickCard);
card9.addEventListener('click', clickCard);
card10.addEventListener('click', clickCard);
card11.addEventListener('click', clickCard);
card12.addEventListener('click', clickCard);
card13.addEventListener('click', clickCard);
card14.addEventListener('click', clickCard);
card15.addEventListener('click', clickCard);
card16.addEventListener('click', clickCard);

instructionsButton.addEventListener('click', function(){
    instructions.style.display = "block";
});
closeBtn.addEventListener('click', function(){
    instructions.style.display = "none";
});
window.onclick = function(m) {
    if(m.target == instructions) {
        modal.style.display = "none";
    }
}

restartButton.addEventListener('click', resetCards);