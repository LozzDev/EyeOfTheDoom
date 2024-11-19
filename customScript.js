let entries = [];

function updateVisibility() {
    const deleteUserContainer = document.querySelector(".deleteUser-container_a");
    
    if (entries.length > 0) {
        deleteUserContainer.style.display = "flex";
    } else {
        deleteUserContainer.style.display = "none";
    }
}

function storeEntry() {
    const inputField = document.getElementById("inputField_a");
    const mensajeError = document.getElementById("mensajeError_a");
    const contador = document.getElementById("contador_a");

    if (entries.length >= 16) {
        mensajeError.textContent = "The 16-entry limit has been reached.";
        return;
    }

    const entry = inputField.value.trim();

    if (entry === "") {
        mensajeError.textContent = "Please enter a value.";
        return;
    }

    mensajeError.textContent = "";
    entries.push(entry);
    inputField.value = "";
    contador.textContent = `${entries.length}/16`;

    updateVisibility();
}

function deleteEntry() {
    const deleteField = document.getElementById("deleteField_a");
    const mensajeError = document.getElementById("mensajeError_a");
    const contador = document.getElementById("contador_a");

    const entryToDelete = deleteField.value.trim().toLowerCase();

    if (entryToDelete === "") {
        mensajeError.textContent = "Please enter a name to delete.";
        return;
    }

    const index = entries.findIndex(entry => entry.toLowerCase() === entryToDelete);

    if (index !== -1) {
        entries.splice(index, 1);
        mensajeError.textContent = `The user "${entryToDelete}" has been removed.`;
        deleteField.value = "";
        contador.textContent = `${entries.length}/16`;

        updateVisibility();
    } else {
        mensajeError.textContent = `The user "${entryToDelete}" is not on the list.`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateVisibility();
});

function validarFormulario(event) {
    event.preventDefault();

    const mensajeError = document.getElementById("mensajeError_a");

    const nombre1 = document.getElementById("nombre1_a").value.trim();
    const nombre2 = document.getElementById("nombre2_a").value.trim();
    const nombre3 = document.getElementById("nombre3_a").value.trim();
    const nombre4 = document.getElementById("nombre4_a").value.trim();

    if (!nombre1 || !nombre2 || !nombre3 || !nombre4) {
        mensajeError.textContent = "Please fill in the first 4 fields.";
        return;
    }

    mensajeError.textContent = "";
    alert("Form successfully submitted.");

    window.location.href = "main.html";
}
