document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

const alivehumansCasual = [
  {
    id: 1,
    name: "Jesús Manuel",
    alive: true,
  },
  {
    id: 2,
    name: "Israel",
    alive: true,
  },
  {
    id: 3,
    name: "Javier",
    alive: true,
  },
  {
    id: 4,
    name: "Nicolás",
    alive: true,
  },
  {
    id: 5,
    name: "Felipe",
    alive: true,
  },
  {
    id: 6,
    name: "Nando",
    alive: true,
  },
  {
    id: 7,
    name: "Alejandro",
    alive: true,
  },
  {
    id: 8,
    name: "Pablo",
    alive: true,
  },
  {
    id: 9,
    name: "Mario",
    alive: true,
  },
  {
    id: 10,
    name: "Rubén",
    alive: true,
  },
  {
    id: 11,
    name: "Pablo N",
    alive: true,
  },
  {
    id: 12,
    name: "Mauricio",
    alive: true,
  },
  {
    id: 13,
    name: "Adrián",
    alive: true,
  },
  {
    id: 14,
    name: "Jairo",
    alive: true,
  },
  {
    id: 15,
    name: "Judith",
    alive: true,
  },
  {
    id: 16,
    name: "Samuel",
    alive: true,
  },
];

function humanUbicationX(human) {
  const humanElement = document.getElementById(human.id);
  const coords = humanElement.getBoundingClientRect();
  const coordsX = (coords.left / window.innerWidth) * window.innerWidth;
  return coordsX;
}
function humanUbicationY(human) {
  const humanElement = document.getElementById(human.id);
  const coords = humanElement.getBoundingClientRect();
  const coordsY = (coords.top / window.innerHeight) * window.innerHeight;
  return coordsY;
}

function humanCoordsCalculator() {
  alivehumansCasual.forEach((human) => {
    human.coordsX = humanUbicationX(human);
    human.coordsY = humanUbicationY(human);
  });
}

humanCoordsCalculator();

window.addEventListener("resize", humanCoordsCalculator);

let coordsXeye = 0;
let coordsYeye = 0;
const doomEye = document.getElementById("eye");

let mouseX = 0;
let mouseY = 0;

function eyeFollowMouse(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  doomEye.style.transform = `translate(${mouseX - 50}px, ${mouseY - 80}px)`;
}

function trackingEyePosition() {
  const coordsEye = doomEye.getBoundingClientRect();

  coordsXeye = coordsEye.left;
  coordsYeye = coordsEye.top;

  requestAnimationFrame(trackingEyePosition);
}
trackingEyePosition();

if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
} else {
  document.addEventListener("mousemove", eyeFollowMouse);
}

let offsetX = 0;
let offsetY = 0;

function eyeFollowGyroscope(event) {
  const tiltX = event.beta || 0;
  const tiltY = event.gamma || 0;

  const minTiltX = -45;
  const maxTiltX = 45;
  const minTiltY = -45;
  const maxTiltY = 45;

  const clampedTiltX = Math.max(minTiltX, Math.min(tiltX, maxTiltX));
  const clampedTiltY = Math.max(minTiltY, Math.min(tiltY, maxTiltY));

  let targetOffsetX = clampedTiltY * 10;
  let targetOffsetY = clampedTiltX * 10;

  const eyeRect = doomEye.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const maxOffsetX = windowWidth - eyeRect.width;
  const minOffsetX = 0;

  const maxOffsetY = windowHeight - eyeRect.height;
  const minOffsetY = 0;

  targetOffsetX = Math.max(minOffsetX, Math.min(targetOffsetX, maxOffsetX));
  targetOffsetY = Math.max(minOffsetY, Math.min(targetOffsetY, maxOffsetY));

  offsetX += (targetOffsetX - offsetX) * 0.1;
  offsetY += (targetOffsetY - offsetY) * 0.1;

  doomEye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

if (
  typeof DeviceOrientationEvent !== "undefined" &&
  typeof DeviceOrientationEvent.requestPermission === "function"
) {
  DeviceOrientationEvent.requestPermission()
    .then((permissionState) => {
      if (permissionState === "granted") {
        window.addEventListener("deviceorientation", eyeFollowGyroscope);
      } else {
        alert("Permiso denegado para usar el giroscopio.");
      }
    })
    .catch(console.error);
} else {
  window.addEventListener("deviceorientation", eyeFollowGyroscope);
}

function killAliveHumans(aliveHumansArray) {
  let randomHuman = Math.floor(Math.random() * aliveHumansArray.length);

  while (aliveHumansArray[randomHuman].alive == false) {
    randomHuman = Math.floor(Math.random() * aliveHumansArray.length);
  }

  aliveHumansArray[randomHuman].alive = false;

  return aliveHumansArray[randomHuman];
}

const executeHumansArray = [];
let indexLimitClicker = 0;
let canClick = true;
const shoot = new Audio("../sounds/eye_shot.mp3");
const deadAstronautSound = new Audio("../sounds/exploding_astronaut.mp3");
const winSound = new Audio("../sounds/winning.mp3");
function executerCasual() {
  const doomEyeImage = document.getElementById("eye-image");
  doomEyeImage.setAttribute(
    "src",
    "../images/Sprites/Eye/Attack/eye-attack.gif"
  );
  shoot.play();
  if (!canClick) return;

  canClick = false;

  setTimeout(() => {
    canClick = true;
  }, 900);

  if (indexLimitClicker >= 15) {
    document.removeEventListener("click", executerCasual);

    return;
  }

  const executedHuman = killAliveHumans(alivehumansCasual);
  executeHumansArray.push(executedHuman.name);

  let human = document.getElementById(executedHuman.id);
  let humanCoordsX = executedHuman.coordsX;
  let humanCoordsY = executedHuman.coordsY;

  const laser = document.getElementById("laser");
  laser.style.display = "block";

  const shootAnimation = `
        @keyframes shootAnimation{
            0%{
                transform: translate(${
                  (coordsXeye / window.innerWidth) * window.innerWidth
                }px, ${
    (coordsYeye / window.innerHeight) * window.innerHeight
  }px);
            }
            100%{
                transform: translate(${
                  (humanCoordsX / window.innerWidth) * window.innerWidth
                }px, ${
    (humanCoordsY / window.innerHeight) * window.innerHeight
  }px) rotate(800deg);
            }
        }
        
    `;

  const style = document.createElement("style");
  style.textContent = shootAnimation;
  document.head.appendChild(style);

  laser.style.animation = "shootAnimation 0.9s ";

  const textElement = document.createElement("div");
  textElement.textContent = `${executedHuman.name} has been executed`;
  textElement.style.position = "absolute";
  textElement.style.bottom = "20px";
  textElement.style.left = "50%";
  textElement.style.transform = "translateX(-50%)";
  textElement.style.color = "white";

  if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    textElement.style.fontSize = "17px";
  } else {
    textElement.style.fontSize = "36px";
  }

  textElement.style.fontFamily = "pixelade";
  textElement.style.opacity = "1";
  textElement.style.transition = "all 3s ease-out";

  document.body.appendChild(textElement);

  setTimeout(() => {
    textElement.style.transform = "translateX(-50%) translateY(-100px)";
    textElement.style.opacity = "0";
  }, 100);

  setTimeout(() => {
    textElement.remove();
  }, 3100);

  setTimeout(() => {
    laser.style.display = "none";

    if (indexLimitClicker != 15) {
      doomEyeImage.setAttribute("src", "../images/eye.png");
    }

    human.style.opacity = 0;
  }, 900);

  setTimeout(() => {
    human.setAttribute("src", "../images/Blood_Effect.gif");
    laser.setAttribute("src", "../images/yellowBallExplosion.gif");
    deadAstronautSound.play();
  }, 500);

  laser.setAttribute("src", "../images/yellowBall.gif");
  indexLimitClicker++;

  if (indexLimitClicker == 15) {
    alivehumansCasual.forEach((human) => {
      if (human.alive == true) {
        executeHumansArray.push(human.name);
      }
    });
    
    doomEyeImage.setAttribute(
      "src",
      "../images/Sprites/Eye/Death/dead-animation.gif"
    );

    setTimeout(() => {
      createEndPage(executeHumansArray);
      winSound.play();
    }, 3000);
  }
  
}

const container = document.querySelector(".drop_effect");

const createRipple = (e) => {
  let ripple = document.createElement("span");

  let x = coordsXeye + 50;
  let y = coordsYeye + 50;

  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  container.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 5000);

  
};

document.addEventListener("click", executerCasual);
document.addEventListener("click", createRipple);

function createEndPage(arrayExecutedHumans) {
  const mainPage = document.getElementById("main");
  const head = document.head;
  const body = document.body;
  mainPage.remove();
  document.body.style.cursor = "default";

  const style = document.createElement("style");
  style.textContent = `
        
    @font-face {
    font-family: 'Pixelade';
    src: url('../fonts/PIXELADE.woff2') format('woff2'),
      url('../fonts/PIXELADE.woff') format('woff'),
      url('../fonts/PIXELADE.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: 'Pixelade', sans-serif;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    background-image: url("../images/fondo.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    
    
  }
  
  .astronaut{
    width: 50px;
  }

  #astronaut1{
    width: 100px;
  }
  #astronaut2{
    width: 75px;
  }
  #astronaut3{
    width: 60px;
  }

  .parent-div-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .parent-div-1-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .ranking-title {
    font-size: 2rem;
    letter-spacing: 25px;
    
    color: #ffffec;
  }
  
  .parent-div-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .child-div-2-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
  
  }
  
  .child-div-2-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
  
  }

  .child-div-2-2-1{
    display: flex;
    align-items: center;
  }

  .child-div-2-2-2{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  
  .parent-div-3 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .child-div-3-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .child-div-3-2 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .child-div-3-3 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .parent-div-4 {
    display: flex;
    gap: 14%;
    margin-top: 1%;
    justify-content: center;
    align-items: center;
  }
  
  #lastOne {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  p {
    color: red;
    font-size: 16px;
  }

  
  .btn_izquierda, .btn_derecha {
    background-color: #c51e32;
    letter-spacing: 5px;
    width: 200px;
    height: 36px;
    color: #ffffec;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    
    font-size: 27px;
  }

  .btn_izquierda{
    width: 150px;
  }

  .parent-div-5{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  }
  #winnerText{
        color: white;
  }
  

  @media (min-width: 901px){
    html, body {
      margin: 0;
      padding: 0;
      background-image: url("../images/fondo.png");
      min-height: 100vh;
      background-position: center;
      background-repeat: no-repeat;
    }
    .astronaut{
      width: 100px;
    }
    #astronaut1{
      width: 150px;
    }
    #astronaut2{
      width: 100px;
    }
    #astronaut3{
      width: 100px;
    }
    .parent-div-1 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .parent-div-1-1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    
    .ranking-title {
      font-size: 2rem;
      letter-spacing: 25px;
      
      color: #ffffec;
    }
    
    .parent-div-2 {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .child-div-2-1 {
      display: flex;
      flex-direction: row;
      align-items: center;
    
    }
    
    .child-div-2-2 {
      display: flex;
      flex-direction: row;
      align-items: center;
    
    }
    
    .parent-div-3 {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .child-div-3-1 {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    .child-div-3-2 {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    .child-div-3-3 {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    .parent-div-4 {
      display: flex;
      gap: 20%;
      margin-top: 1%;
      justify-content: center;
      align-items: center;
    }
    
    #lastOne {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    p {
      color: red;
      font-size: 32px;
    }

    
    .btn_izquierda, .btn_derecha {
      background-color: #c51e32;
      letter-spacing: 5px;
      width: 256px;
      height: 36px;
      color: #ffffec;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 25px;
      font-size: 27px;
    }
    .btn_derecha{
      float: right;
    }
    .parent-div-5{
      display:flex;
      flex-direction: row;
      justify-content: center;
      gap: 30%;
    }
      #winnerText{
        color: white;
      }
  }
    `;
  head.appendChild(style);

  const parentDiv1 = document.createElement("div");
  parentDiv1.className = "parent-div-1";

  const childDiv1 = document.createElement("div");
  childDiv1.className = "parent-div-1-1";

  const logoImage = document.createElement("img");
  logoImage.src = "../images/logo2.png";
  logoImage.alt = "logoLetras";
  logoImage.className = "logo_imagen";
  logoImage.width = 400;

  const rankingTitle = document.createElement("h1");
  rankingTitle.className = "ranking-title";
  rankingTitle.textContent = "RANKING";

  childDiv1.appendChild(logoImage);
  childDiv1.appendChild(rankingTitle);
  parentDiv1.appendChild(childDiv1);

  const parentDiv2 = document.createElement("div");
  parentDiv2.className = "parent-div-2";

  const childDiv2_1 = document.createElement("div");
  childDiv2_1.className = "child-div-2-1";

  const astronaut1 = document.createElement("img");
  astronaut1.src = "../images/Sprites/Astronauts/astronaut_01.gif";
  astronaut1.id = "astronaut1";
  astronaut1.className = "astronaut";

  const firstText = document.createElement("p");
  firstText.textContent = `1st ${executeHumansArray[15]}`;
  firstText.id = "winnerText";
  childDiv2_1.appendChild(astronaut1);
  childDiv2_1.appendChild(firstText);

  const childDiv2_2 = document.createElement("div");
  childDiv2_2.className = "child-div-2-2";

  const childDiv2_2_1 = document.createElement("div");
  childDiv2_2_1.className = "child-div-2-2-1";

  const astronaut2 = document.createElement("img");
  astronaut2.src = "../images/Sprites/Astronauts/dead-astronaut.png";
  astronaut2.id = "astronaut2";
  astronaut2.className = "astronaut";

  const secondText = document.createElement("p");
  secondText.textContent = `2nd ${executeHumansArray[14]}`;

  childDiv2_2_1.appendChild(astronaut2);
  childDiv2_2_1.appendChild(secondText);

  const childDiv2_2_2 = document.createElement("div");
  childDiv2_2_2.className = "child-div-2-2-2";

  const astronaut3 = document.createElement("img");
  astronaut3.src = "../images/Sprites/Astronauts/dead-astronaut.png";
  astronaut3.id = "astronaut3";
  astronaut3.className = "astronaut";

  const thirdText = document.createElement("p");
  thirdText.textContent = `3rd ${executeHumansArray[13]}`;

  childDiv2_2_2.appendChild(astronaut3);
  childDiv2_2_2.appendChild(thirdText);

  childDiv2_2.appendChild(childDiv2_2_1);
  childDiv2_2.appendChild(childDiv2_2_2);

  parentDiv2.appendChild(childDiv2_1);
  parentDiv2.appendChild(childDiv2_2);

  const parentDiv3 = document.createElement("div");
  parentDiv3.className = "parent-div-3";

  const childDiv3_1 = document.createElement("div");
  childDiv3_1.className = "child-div-3-1";

  const astronautsGroup1 = [
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `4th ${executeHumansArray[12]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `5th ${executeHumansArray[11]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `6th ${executeHumansArray[10]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `7th ${executeHumansArray[9]}`,
    },
  ];

  astronautsGroup1.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.src;
    img.className = "astronaut";

    const text = document.createElement("p");
    text.textContent = item.text;

    childDiv3_1.appendChild(img);
    childDiv3_1.appendChild(text);
  });

  const childDiv3_2 = document.createElement("div");
  childDiv3_2.className = "child-div-3-2";

  const astronautsGroup2 = [
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `8th ${executeHumansArray[8]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `9th ${executeHumansArray[7]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `10th ${executeHumansArray[6]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `11th ${executeHumansArray[5]}`,
    },
  ];

  astronautsGroup2.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.src;
    img.className = "astronaut";

    const text = document.createElement("p");
    text.textContent = item.text;

    childDiv3_2.appendChild(img);
    childDiv3_2.appendChild(text);
  });

  const childDiv3_3 = document.createElement("div");
  childDiv3_3.className = "child-div-3-3";

  const astronautsGroup3 = [
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `12th ${executeHumansArray[4]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `13th ${executeHumansArray[3]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `14th ${executeHumansArray[2]}`,
    },
    {
      src: "../images/Sprites/Astronauts/dead-astronaut.png",
      text: `15th ${executeHumansArray[1]}`,
    },
  ];

  astronautsGroup3.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.src;
    img.className = "astronaut";

    const text = document.createElement("p");
    text.textContent = item.text;

    childDiv3_3.appendChild(img);
    childDiv3_3.appendChild(text);
  });

  parentDiv3.appendChild(childDiv3_1);
  parentDiv3.appendChild(childDiv3_2);
  parentDiv3.appendChild(childDiv3_3);

  const parentDiv4 = document.createElement("div");
  parentDiv4.className = "parent-div-4";

  const lastOneDiv = document.createElement("div");
  lastOneDiv.id = "lastOne";

  const astronaut16 = document.createElement("img");
  astronaut16.src = "../images/Sprites/Astronauts/dead-astronaut.png";
  astronaut16.className = "astronaut";

  const lastText = document.createElement("p");
  lastText.textContent = `16th ${executeHumansArray[0]}`;

  lastOneDiv.appendChild(astronaut16);
  lastOneDiv.appendChild(lastText);
  parentDiv4.appendChild(lastOneDiv);

  const parentDiv5 = document.createElement("div");
  parentDiv5.className = "parent-div-5";

  const creditsButton = document.createElement("button");
  creditsButton.className = "btn_izquierda";
  creditsButton.textContent = "Credits";

  creditsButton.addEventListener("click", () => {
    window.location.href = "../html/credits.html";
  });

  const replayButton = document.createElement("button");
  replayButton.className = "btn_derecha";
  replayButton.textContent = "Replay";

  replayButton.addEventListener("click", () => {
    window.location.href = "../html/home.html";
  });

  parentDiv5.appendChild(creditsButton);
  parentDiv5.appendChild(replayButton);

  document.body.appendChild(parentDiv1);
  document.body.appendChild(parentDiv2);
  document.body.appendChild(parentDiv3);
  document.body.appendChild(parentDiv4);
  document.body.appendChild(parentDiv5);
}
