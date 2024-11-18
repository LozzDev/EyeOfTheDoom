let entries = [];

function storeEntry() {
    const inputField = document.getElementById("inputField_a");
    const mensajeError = document.getElementById("mensajeError_a");
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
}

function deleteEntry() {
    const deleteField = document.getElementById("deleteField_a");
    const mensajeError = document.getElementById("mensajeError_a");
    const contador = document.getElementById("contador_a");

    const entryToDelete = deleteField.value.trim();

    if (entryToDelete === "") {
        mensajeError.textContent = "Por favor, introduce un nombre para eliminar.";
        return;
    }

    const index = entries.indexOf(entryToDelete);
    if (index !== -1) {
        entries.splice(index, 1);
        mensajeError.textContent = `El usuario "${entryToDelete}" ha sido eliminado.`;
        deleteField.value = "";
        contador.textContent = `${entries.length}/16`;
    } else {
        mensajeError.textContent = `El usuario "${entryToDelete}" no está en la lista.`;
    }
}

function validarFormulario(event) {
    event.preventDefault();

    const mensajeError = document.getElementById("mensajeError_a");

    const nombre1 = document.getElementById("nombre1_a").value.trim();
    const nombre2 = document.getElementById("nombre2_a").value.trim();
    const nombre3 = document.getElementById("nombre3_a").value.trim();
    const nombre4 = document.getElementById("nombre4_a").value.trim();

    if (!nombre1 || !nombre2 || !nombre3 || !nombre4) {
        mensajeError.textContent = "Por favor, rellena los primeros 4 campos.";
        return;
    }

    mensajeError.textContent = "";
    alert("Formulario enviado con éxito.");

    window.location.href = "home.html";
}
