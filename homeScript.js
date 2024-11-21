// Obtener elementos del DOM
const rulesButton = document.getElementById("rulesButton");
const rulesBox = document.getElementById("rulesBox");

// Alternar visibilidad de las reglas al hacer clic en el botón
rulesButton.addEventListener("click", () => {
    rulesBox.classList.toggle("visible"); // Añadir o quitar la clase "visible"
});
