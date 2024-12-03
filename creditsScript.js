const image = document.getElementById("main_logo_img_b");
const startButton = document.getElementById("body_start_button_b");
const skipButton = document.getElementById("body_skip_button_b");
let musicBackground = new Audio('./sounds/eod_theme.mp3');
let sfxClick = new Audio('./sounds/button_click.mp3');

// Reproduce la música de fondo al iniciar los créditos
function startCredits() {
  musicBackground.play();
  setTimeout(() => {
    setTimeout(() => {
      showImage();
      showStartButton();
      hideSkipButton();
    }, 4300); // Muestra el contenido al finalizar los créditos
  }, 10000); // Duración de la animación de créditos
}

// Muestra el botón "Play Again"
function showStartButton() {
  startButton.style.opacity = 1;
}

// Oculta el botón "Skip"
function hideSkipButton() {
  skipButton.style.display = "none";
}

// Muestra el logo
function showImage() {
  image.classList.add("fade-in");
}

// Permite saltar los créditos
function skipIntro() {
  musicBackground.pause();
  musicBackground.currentTime = 0;
  image.classList.add("fade-in");
  hideSkipButton();
  showStartButton();
}

// Eventos
skipButton.addEventListener("click", skipIntro);
skipButton.addEventListener("click", () => {
  sfxClick.play();
});

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  sfxClick.play().then(() => {
    setTimeout(() => {
      window.location.href = startButton.parentElement.href;
    }, 300);
  }).catch(error => {
    console.error("Error reproduciendo el sonido:", error);
    window.location.href = startButton.parentElement.href;
  });
});

// Inicia los créditos
startCredits();



// Animación de transición
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
