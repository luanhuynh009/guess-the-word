const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remain = document.querySelector(".remaining");
const remainNumber = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const againButton = document.querySelector(".play-again");

const word = "Magnolia";

const updateProgress = function(word) {
    updateProgressText = [];
    for (const letter in word) {
        updateProgressText.push("●");
    }
    wordProgress.innerText = updateProgressText.join("");
}

updateProgress("Magnolia");

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = guessInput.value;
    console.log(guess);
    guessInput.value = "";
});