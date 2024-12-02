import globalState from "./globalState.js";

const paragraph = document.getElementById("main_div_paragraph_b");
const image = document.getElementById("main_logo_img_b");
const startButton = document.getElementById("body_start_button_b");
const skipButton = document.getElementById("body_skip_button_b");
const text =
  "In a distant future, humanity stands on the edge of extinction. A dark entity, the Eye of the Doom, has awakened in the depths of space. With immense power, it has fixed its gaze on Earth, aiming to consume it in eternal darkness. Yet hope remains: a team of 16 brave astronauts has been assembled to face this threat and stop what is coming.";
let index = 0;
let typingInterval;
let sfxClick = new Audio("/sounds/button_click.mp3");
let sfxHover = new Audio("/sounds/button_hover.mp3");

function setRedText() {
  let eyeOfTheAbyssTextInterval = [];
  let searchPhrase = "Eye of the Doom";
  for (let i = 0; i <= text.length - searchPhrase.length; i++) {
    if (text.slice(i, i + searchPhrase.length) === searchPhrase) {
      for (let j = 0; j < searchPhrase.length; j++) {
        eyeOfTheAbyssTextInterval.push(i + j);
      }
    }
  }
  return eyeOfTheAbyssTextInterval;
}

setTimeout(() => {
  setTimeout(fadeSkipButton, 1000);
}, 300);

function fadeSkipButton() {
  skipButton.style.opacity = 1;
}

function generateHiddenText() {
  const eyeOfTheAbyssTextInterval = setRedText();

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.style.visibility = "hidden";
    span.className = "main_div_paragraph_span_b";

    if (eyeOfTheAbyssTextInterval.includes(i)) {
      span.style.color = "#c51e32"; 
    }

    paragraph.appendChild(span);
  });
}

function revealHiddenText() {
  const spans = document.querySelectorAll(".main_div_paragraph_span_b");
  if (index < spans.length) {
    spans[index].style.visibility = "visible";
    index++;
    typingInterval = setTimeout(revealHiddenText, 52);
  } else {
    setTimeout(() => {
      paragraph.classList.add("fade-out");
      setTimeout(showImage, 1000);
      setTimeout(showStartButton, 1000);
      setTimeout(hideSkipButton, 1000);
    }, 2000);
  }
}

function hideSkipButton() {
  skipButton.style.display = "none";
}

function showImage() {
  image.classList.add("fade-in");
}

function showStartButton() {
  startButton.style.opacity = 1;
  startButton.style.pointerEvents = "auto"; 
}

function hideStartButton() {
  startButton.style.opacity = 0;
  startButton.style.pointerEvents = "none"; 
}

hideStartButton();

function skipIntro() {
  clearTimeout(typingInterval);
  paragraph.classList.add("fade-out");
  paragraph.style.transition = "none";
  image.classList.add("fade-in");
  hideSkipButton();
  showStartButton();

  const audio = globalState.audio;

  if (audio.readyState >= 2) { 
    audio.pause();
    audio.load();
    audio.currentTime = 24; 

    localStorage.setItem("musicTime", audio.currentTime.toString());
    console.log("Nuevo tiempo de audio guardado en localStorage:", audio.currentTime);

    setTimeout(() => {
      audio.play().then(() => {
        if (audio.muted) {
          audio.muted = false;
        }
      }).catch((error) => {
        console.warn("Error al reproducir el audio:", error);
      });
    }, 50);
  }
}

skipButton.addEventListener("click", skipIntro);
skipButton.addEventListener("click", () => {
  sfxClick.play();
});
skipButton.addEventListener("mouseover", () => {
  sfxHover.play();
});

startButton.addEventListener("mouseover", () => {
  if (window.getComputedStyle(startButton).opacity === "1") {
    sfxHover.play();
  }
});

startButton.addEventListener("click", (event) => {
  if (window.getComputedStyle(startButton).opacity === "1") {
    event.preventDefault();
    sfxClick
      .play()
      .then(() => {
        setTimeout(() => {
          window.location.href = startButton.parentElement.href;
        }, 300);
      })
      .catch((error) => {
        console.error("Error reproduciendo el sonido:", error);
        window.location.href = startButton.parentElement.href;
      });
  } else {
    console.warn("El botón Start no está visible y no debería ser interactivo.");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

document.querySelector(".body_a_b").addEventListener("click", (event) => {
  event.preventDefault();

  const href = event.currentTarget.getAttribute("href");
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = href;
  }, 700);
});

generateHiddenText();
revealHiddenText();