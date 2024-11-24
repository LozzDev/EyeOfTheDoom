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
    const error = document.getElementById("error_a");
    const cont = document.getElementById("cont_a");

    if (entries.length >= 16) {
        error.textContent = "The 16-entry limit has been reached.";
        return;
    }

    const entry = inputField.value.trim();

    if (entry === "") {
        error.textContent = "Please enter a value.";
        return;
    }

    error.textContent = "";
    entries.push(entry);
    inputField.value = "";
    cont.textContent = `${entries.length}/16`;

    updateVisibility();
}

function deleteEntry() {
    const deleteField = document.getElementById("deleteField_a");
    const error = document.getElementById("error_a");
    const cont = document.getElementById("cont_a");

    const entryToDelete = deleteField.value.trim().toLowerCase();

    if (entryToDelete === "") {
        error.textContent = "Please enter a name to delete.";
        return;
    }

    const index = entries.findIndex(entry => entry.toLowerCase() === entryToDelete);

    if (index !== -1) {
        entries.splice(index, 1);
        error.textContent = `The user "${entryToDelete}" has been removed.`;
        deleteField.value = "";
        cont.textContent = `${entries.length}/16`;

        updateVisibility();
    } else {
        error.textContent = `The user "${entryToDelete}" is not on the list.`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateVisibility();
});

function validateFormulary(event) {
    event.preventDefault();

    const error = document.getElementById("error_a");

    const name1 = document.getElementById("name1_a").value.trim();
    const name2 = document.getElementById("name2_a").value.trim();
    const name3 = document.getElementById("name3_a").value.trim();
    const name4 = document.getElementById("name4_a").value.trim();

    if (!name1 || !name2 || !name3 || !name4) {
        error.textContent = "Please fill in the first 4 fields.";
        return;
    }

    error.textContent = "";
    alert("Form successfully submitted.");

    window.location.href = "main.html";
}

/* import { alivehumansCasual } from './mainScript';

function getRandomName() {
    const randomIndex = Math.floor(Math.random() * alivehumansCasual.length);
    return alivehumansCasual[randomIndex].name;
}

function validateFormulary2(event) {
    event.preventDefault();

    const error = document.getElementById("error_a");
    const nameInputs = [
        document.getElementById("name5_a"),
        document.getElementById("name6_a"),
        document.getElementById("name7_a"),
        document.getElementById("name8_a"),
        document.getElementById("name9_a"),
        document.getElementById("name10_a"),
        document.getElementById("name11_a"),
        document.getElementById("name12_a"),
        document.getElementById("name13_a"),
        document.getElementById("name14_a"),
        document.getElementById("name15_a"),
        document.getElementById("name16_a")
    ];

    nameInputs.forEach((input) => {
        if (!input.value.trim()) {
            input.value = getRandomName();
        }
    });

    error.textContent = "";

    window.location.href = "main.html";
}
    */

function goBack(event) {
    event.preventDefault();

    window.location.href = "home.html";
}
