const paragraph = document.getElementById("main_div_paragraph_b");
const image = document.getElementById("main_logo_img_b");
const startButton = document.getElementById("body_start_button_b");
const skipButton = document.getElementById("body_skip_button_b");
const text =
  "In the distant future, humanity is on the brink of extinction. A dark and evil entity has awakened in the depths of the cosmos: The Eye of the Abyss. With its cosmic power, it has fixed its gaze on the Earth, determined to consume it and plunge it into an abyss of eternal darkness. But all is not lost. An elite group of 16 brave astronauts has been assembled to confront the threat and stop the coming apocalypse. The battle for the fate of humanity has begun. The Eye of the Abyss watches every move... and the countdown to the destruction of the world has already begun. Will the pilots be able to stop it before its gaze becomes irreversible?";
let index = 0;
let typingInterval;

function generateHiddenText() {
  // Corregir el método `split("")` para dividir cada carácter
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.style.visibility = "hidden";
    span.className = "main_div_paragraph_span_b";
    paragraph.appendChild(span);
  });
}

// Revela los caracteres de texto uno por uno
function revealHiddenText() {
  const spans = document.querySelectorAll(".main_div_paragraph_span_b"); // Corregir el selector
  if (index < spans.length) {
    spans[index].style.visibility = "visible";
    index++;
    typingInterval = setTimeout(revealHiddenText, 60);
  } else {
    setTimeout(() => {
      paragraph.classList.add("fade-out");
      setTimeout(showImage, 1000);
      setTimeout(showStartButton, 1000);
      setTimeout(hideSkipButton, 1000);
    }, 500);
  }
}

// Oculta el botón de omitir
function hideSkipButton() {
  skipButton.style.display = "none";
}

// Muestra la imagen con un efecto de fade-in
function showImage() {
  image.classList.add("fade-in");
}

// Muestra el botón de inicio
function showStartButton() {
  startButton.style.opacity = 1;
}

// Función para omitir la animación de introducción
function skipIntro() {
  clearTimeout(typingInterval); // Detiene el efecto de escribir
  paragraph.classList.add("fade-out");
  paragraph.style.transition = "none"; 
  image.classList.add("fade-in"); 
  image.style.transition = "none";
  hideSkipButton();
  showStartButton();
}

// Asigna la función de omitir al botón de omitir
skipButton.addEventListener("click", skipIntro);

// Llama a `generateHiddenText` para crear los spans y luego inicia la animación
generateHiddenText();
revealHiddenText();