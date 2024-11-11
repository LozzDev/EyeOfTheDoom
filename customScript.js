let entries = [];

function storeEntry() {
    const inputField = document.getElementById("inputField_a");
    const mensajeError = document.getElementById("mensajeError_a");
    const storedEntries = document.getElementById("storedEntries_a");
    const contador = document.getElementById("contador_a");

    if (entries.length >= 16) {
        mensajeError.textContent = "Se ha alcanzado el límite de 16 entradas.";
        return;
    }

    const entry = inputField.value.trim();

    if (entry === "") {
        mensajeError.textContent = "Por favor, introduce un valor.";
        return;
    }

    mensajeError.textContent = "";

    entries.push(entry);

    inputField.value = "";

    contador.textContent = `${entries.length}/16`;

        entries.map((item, index) => `${index + 1}. ${item}`).join("<br>");
}

function validarFormulario(event) {
    event.preventDefault();

    const inputs = document.querySelectorAll('input[type="text"]');
    const mensajeError = document.getElementById("mensajeError_a");
    let todosLlenos = true;

    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            todosLlenos = false;
        }
    });

    if (!todosLlenos) {
        mensajeError.textContent = "Por favor, rellena todos los campos.";
    } else {
        mensajeError.textContent = "";
        alert("Formulario enviado con éxito.");
    }
}