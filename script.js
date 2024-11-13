const paragraph = document.getElementById("main_div_paragraph_b");
const image = document.getElementById("main_logo_img_b");
const startButton = document.getElementById("body_start_button_b");
const skipButton = document.getElementById("body_skip_button_b");
const text =
  "In a distant future, humanity stands on the edge of extinction. A dark entity, the Eye of the Abyss, has awakened in the depths of space. With immense power, it has fixed its gaze on Earth, aiming to consume it in eternal darkness. Yet hope remains: a team of 16 brave astronauts has been assembled to face this threat and stop what is coming.";
let index = 0;
let typingInterval;


function setRedText() {
  let eyeOfTheAbyssTextInterval = [];
  let searchPhrase = "Eye of the Abyss";
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
  setTimeout(fadeSkipButton, 1000)
}, 300);

function fadeSkipButton(){
  skipButton.style.opacity= 1; 
}
function generateHiddenText() {
  const eyeOfTheAbyssTextInterval = setRedText();

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.style.visibility = "hidden"; // Inicialmente invisibles
    span.className = "main_div_paragraph_span_b";

    // Si el índice está en el intervalo de la frase "Eye of the Abyss", cambia el color a rojo
    if (eyeOfTheAbyssTextInterval.includes(i)) {
      span.style.color = "#c51e32"; // Cambia el color a rojo
    }

    paragraph.appendChild(span); // Añadir el span al DOM
  });
}


function revealHiddenText() {
  const spans = document.querySelectorAll(".main_div_paragraph_span_b");
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

function hideSkipButton() {
  skipButton.style.display = "none";
}

function showImage() {
  image.classList.add("fade-in");
}

function showStartButton() {
  startButton.style.opacity = 1;
}

function skipIntro() {
  clearTimeout(typingInterval); 
  paragraph.classList.add("fade-out");
  paragraph.style.transition = "none"; 
  image.classList.add("fade-in"); 
  image.style.transition = "none";
  hideSkipButton();
  showStartButton();
}

skipButton.addEventListener("click", skipIntro);

generateHiddenText();
revealHiddenText();