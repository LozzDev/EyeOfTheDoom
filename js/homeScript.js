// Obtener elementos del DOM
const rulesButtonMovil = document.getElementById("rulesButtonMovil");
const rulesButtonDesktop = document.getElementById("rulesButtonDesktop");
const rulesBox = document.getElementById("rulesBox");
const buttons = document.querySelectorAll(".btn-game");

// Declarar Sonidos
const sfxClick = new Audio("/sounds/button_click.mp3");
const sfxHover = new Audio("/sounds/button_hover.mp3");
const sfxRules = new Audio("/sounds/rules_layout.mp3");

// Función para alternar la visibilidad de la caja de reglas
function toggleRulesVisibility() {
	rulesBox.classList.toggle("visible");
}

// Añadir eventos a los botones para las reglas
if (rulesButtonMovil) {
	rulesButtonMovil.addEventListener("click", toggleRulesVisibility);
}

if (rulesButtonDesktop) {
	rulesButtonDesktop.addEventListener("click", toggleRulesVisibility);
}

// Función para añadir efectos de sonido
function addSFX(button) {
	button.addEventListener("click", () => {
		if (button === rulesButtonMovil || button === rulesButtonDesktop) {
			sfxRules.play();
		}

		// Sonido para los botones de juego
		if (button === gameCasualButton || button === gameCustomButton) {
			sfxClick.play();
		}
	});

	// Sonido al pasar el cursor
	button.addEventListener("mouseover", () => {
		sfxHover.play();
	});
}

// Función para manejar el clic y la navegación con el sonido
function addSFXAndNavigate(button, link) {
	button.addEventListener("click", (event) => {
		event.preventDefault(); // Evitar la navegación inmediata
		sfxClick.play(); // Reproducir el sonido

		// Después de un pequeño retraso para que el sonido se reproduzca, navegar
		setTimeout(() => {
			window.location.href = link; // Redirigir a la página
		}, 300); // 200ms para dar tiempo al sonido
	});
}

// Añadir los efectos a los botones de las reglas
if (rulesButtonMovil) addSFX(rulesButtonMovil);
if (rulesButtonDesktop) addSFX(rulesButtonDesktop);

// Añadir los efectos a los botones de las opciones del juego
buttons.forEach((button) => {
	addSFX(button);
});

// Asegurarse de que los botones "Game Casual" y "Game Custom" también tengan los efectos de sonido
const gameCasualButton = document.getElementById("btn-casual");
const gameCustomButton = document.getElementById("btn-custom");

// Aplicar la función de clic con sonido y navegación a los botones de juego
if (gameCasualButton) addSFXAndNavigate(gameCasualButton, "main.html");
if (gameCustomButton) addSFXAndNavigate(gameCustomButton, "custom.html");

// Asegurarse de que el sonido de las reglas solo se reproduzca cuando se presionan los botones de "Rules"
if (rulesBox) {
	rulesBox.addEventListener("click", (event) => {
		// Prevents the sound from triggering when interacting with the rules box itself
		event.stopPropagation();
	});
}
