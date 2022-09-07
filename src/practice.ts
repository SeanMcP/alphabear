import party from "party-js";
import { choose, shuffle } from "./helpers";

const usp = new URLSearchParams(location.search);
const letters = usp.get("letters")?.split(",") ?? [];
const letterCase = usp.get("case")?.split(",") ?? [];
const family = usp.get("family")?.split(",") ?? [];
const style = usp.get("style")?.split(",") ?? [];

let currentIndex = 0;
let lettersSet = shuffle(letters);

const appContainer = document.getElementById("app")!;
const progressBar = document.querySelector("progress")!;

function renderLetter() {
  appContainer.textContent = "";

  const letterButton = document.createElement("button");
  letterButton.textContent = lettersSet[currentIndex];
  letterButton.classList.add(choose(letterCase));
  letterButton.classList.add(choose(family));
  letterButton.classList.add(choose(style));

  letterButton.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(letterButton.textContent);
    speechSynthesis.speak(utterance);
  });

  appContainer.appendChild(letterButton);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  const incorrectButton = document.createElement("button");
  incorrectButton.textContent = "✘";
  incorrectButton.addEventListener("click", () => {
    lettersSet.push(lettersSet[currentIndex]);
    currentIndex++;
    renderLetter();
  });

  buttonsContainer.appendChild(incorrectButton);

  const correctButton = document.createElement("button");
  correctButton.textContent = "✔️";
  correctButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= lettersSet.length) {
      currentIndex = 0;
      lettersSet = shuffle(lettersSet);
    }
    progressBar.value = parseInt(progressBar.value) + 1;
    if (progressBar.value == 5) {
      party.confetti(appContainer, {
        count: party.variation.range(50, 100),
        size: party.variation.range(1, 2),
      });
      // Timeout to let the browser paint at 5 first
      setTimeout(() => {
        progressBar.value = 0;
        renderLetter();
      }, 2400); // About the duration of the confetti animation
    } else {
      renderLetter();
    }
  });

  buttonsContainer.appendChild(correctButton);

  appContainer.appendChild(buttonsContainer);
}

renderLetter();
