// Obtener elementos del DOM
const rulesButtonMovil = document.getElementById("rulesButtonMovil");
const rulesButtonDesktop = document.getElementById("rulesButtonDesktop");
const rulesBox = document.getElementById("rulesBox");

// Alternar visibilidad de las reglas al hacer clic en los botones
if (rulesButtonMovil) {
    rulesButtonMovil.addEventListener("click", () => {
        rulesBox.classList.toggle("visible");
    });
}

if (rulesButtonDesktop) {
    rulesButtonDesktop.addEventListener("click", () => {
        rulesBox.classList.toggle("visible");
    });
}
