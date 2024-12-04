const image = document.getElementById("main_logo_img_b");
const startButton = document.getElementById("body_start_button_b");
const skipButton = document.getElementById("body_skip_button_b");
let sfxClick = new Audio("../sounds/button_click.mp3");
const sfxHover = new Audio("../sounds/button_hover.mp3");
const sfxRules = new Audio("../sounds/rules_layout.mp3");

function startCredits() {
  setTimeout(() => {
    setTimeout(() => {
      showImage();
      showStartButton();
      hideSkipButton();
    }, 4300);
  }, 10000);
}

function showStartButton() {
  startButton.style.opacity = 1;
}

function hideSkipButton() {
  skipButton.style.display = "none";
}

function showImage() {
  image.classList.add("fade-in");
}

function skipIntro() {
  musicBackground.pause();
  musicBackground.currentTime = 0;
  image.classList.add("fade-in");
  hideSkipButton();
  showStartButton();
}

skipButton.addEventListener("click", skipIntro);
skipButton.addEventListener("click", () => {
  sfxClick.play();
});

startButton.addEventListener("click", (event) => {
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
});

startButton.addEventListener("mouseover", () => {
  
  sfxHover.play();
});

startCredits();

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

document.querySelectorAll(".body_button_b").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const href = btn.getAttribute("data-href");
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = href;
    }, 700);
  });
});
