// Obtener elementos del DOM
const rulesButton = document.getElementById("rulesButton");
const rulesBox = document.getElementById("rulesBox");

// Alternar visibilidad de las reglas
rulesButton.addEventListener("click", () => {
	if (rulesBox.style.display === "none" || rulesBox.style.display === "") {
		rulesBox.style.display = "block"; // Muestra las reglas
	} else {
		rulesBox.style.display = "none"; // Oculta las reglas
	}
});