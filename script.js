const paragraph = document.getElementById("main_paragraph_b");
const image = document.getElementById("main_logo_img_b");
const startButton = document.getElementById("body_start_button_b");
const skipButton = document.getElementById("body_skip_button_b");
const text = "In the distant future, humanity is on the brink of extinction. A dark and evil entity has awakened in the depths of the cosmos: The Eye of the Abyss. With its cosmic power, it has fixed its gaze on the Earth, determined to consume it and plunge it into an abyss of eternal darkness. But all is not lost. An elite group of 16 brave astronauts has been assembled to confront the threat and stop the coming apocalypse. The battle for the fate of humanity has begun. The Eye of the Abyss watches every move... and the countdown to the destruction of the world has already begun. Will the pilots be able to stop it before its gaze becomes irreversible?";
let index = 0;
let typingInterval;

function typeWriter() {
  if (index < text.length) {
    paragraph.textContent += text.charAt(index);
    index++;
    typingInterval = setTimeout(typeWriter, 50);
  } else {
    setTimeout(() => {
      paragraph.classList.add("fade-out");
      setTimeout(showImage, 1000);
      setTimeout(showStartButton, 1000);  
      setTimeout(hideSkipButton, 1000);
    }, 1000);
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

typeWriter();