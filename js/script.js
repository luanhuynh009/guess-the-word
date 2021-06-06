const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remain = document.querySelector(".remaining");
const remainNumber = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const againButton = document.querySelector(".play-again");
const guessedLettersList = [];
let remainingGuess = 8;
let word = "magnolia";

const getWord = async function () {
    const newWord = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    )
    const data = await newWord.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    updateProgress(word);
}

getWord();

const updateProgress = function(word) {
    const updateProgressText = [];
    for (const letter in word) {
        updateProgressText.push("●");
    }
    wordProgress.innerText = updateProgressText.join("");
}

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = guessInput.value;
    console.log(guess);
    guessInput.value = "";
    guessMessage.innerText = "";
    const updatedMessage = validate(guess);
    makeGuess(guess);
    console.log(updatedMessage);
});

const validate = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        guessMessage.innerText = "Please make sure to guess at least one letter.";
    }
    else if (input.length > 1) {
        guessMessage.innerText = "Please only enter one letter.";
    }
    else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Please only enter letter from A to Z.";
    }
    else {
        return input;
    }
}

const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if (guessedLettersList.includes(letter)) {
        guessMessage.innerText = "You have already guessed this letter";
    }
    else {
        guessedLettersList.push(letter);
        updatePlayerGuess(guessedLettersList);
    }
    updateSolution(guessedLettersList); 
    remainingGuessCount(letter); 
}

console.log(guessedLettersList);

const updatePlayerGuess = function (){
    guessedLetters.innerHTML = "";
    for (let letter of guessedLettersList) {
        let li = document.createElement("li");
        li.innerHTML = `${letter}`
        guessedLetters.append(li);
    }
}

const updateSolution = function(guessedLettersList) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLettersList.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        else {
            revealWord.push("●");
        }
    }
    wordProgress.innerText = revealWord.join("");
    winCheck();
}

const winCheck = function(){
    if (word.toUpperCase() === wordProgress.innerText) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You have guessed the word correctly!</p>`;
    }
}

const remainingGuessCount = function(guess){
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)){
        remainingGuess -= 1;
        guessMessage.innerText = "This letter is not a part of the solution";
    }
    else {
        guessMessage.innerText = "This letter is a part of the solution";
    }

    if (remainingGuess === 0){
        guessButton.classList.add("hide");
        guessMessage.innerText = "Game Over!";
        remain.innerHTML = `You have <span>${remainingGuess}</span> guesses left.`
    }
    else {
        remain.innerHTML = `You have <span>${remainingGuess}</span> guesses left.`
    }
}