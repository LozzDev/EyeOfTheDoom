// Elementos del DOM
const rulesButtonMovil = document.getElementById("rulesButtonMovil");
const rulesButtonDesktop = document.getElementById("rulesButtonDesktop");
const rulesBox = document.getElementById("rulesBox");
const buttons = document.querySelectorAll(".btn-game");

// Sonidos
const sfxClick = new Audio("/sounds/button_click.mp3");
const sfxHover = new Audio("/sounds/button_hover.mp3");
const sfxRules = new Audio("/sounds/rules_layout.mp3");

// Alternar visibilidad de las reglas
function toggleRulesVisibility() {
	rulesBox.classList.toggle("visible");
}

if (rulesButtonMovil) {
	rulesButtonMovil.addEventListener("click", toggleRulesVisibility);
}

if (rulesButtonDesktop) {
	rulesButtonDesktop.addEventListener("click", toggleRulesVisibility);
}

function addSFX(button) {
	button.addEventListener("click", () => {
		if (button === rulesButtonMovil || button === rulesButtonDesktop) {
			sfxRules.play();
		}

		if (button === gameCasualButton || button === gameCustomButton) {
			sfxClick.play();
		}
	});

	button.addEventListener("mouseover", () => {
		sfxHover.play();
	});
}

function addSFXAndNavigate(button, link) {
	button.addEventListener("click", (event) => {
		event.preventDefault();
		sfxClick.play();

		setTimeout(() => {
			window.location.href = link; 
		}, 300);
	});
}

if (rulesButtonMovil) addSFX(rulesButtonMovil);
if (rulesButtonDesktop) addSFX(rulesButtonDesktop);

buttons.forEach((button) => {
	addSFX(button);
});

const gameCasualButton = document.getElementById("btn-casual");
const gameCustomButton = document.getElementById("btn-custom");

if (gameCasualButton) addSFXAndNavigate(gameCasualButton, "main.html");
if (gameCustomButton) addSFXAndNavigate(gameCustomButton, "custom.html");

if (rulesBox) {
	rulesBox.addEventListener("click", (event) => {
		event.stopPropagation();
	});
}

// Animación de transición
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
});

document.querySelectorAll(".btn-game").forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        const href = btn.getAttribute("data-href");
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = href;
        }, 700);
    });
});
