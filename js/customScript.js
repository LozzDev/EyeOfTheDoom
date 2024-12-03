let entries = [];
let sfxClick = new Audio('/sounds/button_click.mp3');
let sfxHover = new Audio('/sounds/button_hover.mp3');
const playButton1 = document.getElementById("submitbtn_a");
const playButton2 = document.getElementById("submitbtn2_a");
const backButton = document.getElementById("backButton_a");


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

  const index = entries.findIndex(
    (entry) => entry.toLowerCase() === entryToDelete
  );

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
  window.location.href = "../html/main.html";
}

function getRandomName(availableNames) {
  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const randomName = availableNames[randomIndex];
  availableNames.splice(randomIndex, 1);
  return randomName;
}

function getRandomName(availableNames) {
  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const randomName = availableNames[randomIndex];
  availableNames.splice(randomIndex, 1);
  return randomName;
}

function validateFormulary2(event) {
  event.preventDefault();

  const customNameList = [];

  const error = document.getElementById("error_a");

  const name1 = document.getElementById("name1F2_a").value.trim();
  const name2 = document.getElementById("name2F2_a").value.trim();
  const name3 = document.getElementById("name3F2_a").value.trim();
  const name4 = document.getElementById("name4F2_a").value.trim();

  if (!name1 || !name2 || !name3 || !name4) {
    error.textContent = "Please fill in the first 4 fields.";
    return;
  }

  customNameList.push(name1);
  customNameList.push(name2);
  customNameList.push(name3);
  customNameList.push(name4);

  const nameInputs = [
    document.getElementById("name1F2_a"),
    document.getElementById("name2F2_a"),
    document.getElementById("name3F2_a"),
    document.getElementById("name4F2_a"),
    document.getElementById("name5F2_a"),
    document.getElementById("name6F2_a"),
    document.getElementById("name7F2_a"),
    document.getElementById("name8F2_a"),
    document.getElementById("name9F2_a"),
    document.getElementById("name10F2_a"),
    document.getElementById("name11F2_a"),
    document.getElementById("name12F2_a"),
    document.getElementById("name13F2_a"),
    document.getElementById("name14F2_a"),
    document.getElementById("name15F2_a"),
    document.getElementById("name16F2_a"),
  ];

  let humanList = JSON.parse(localStorage.getItem("humansAlive"));

  const availableNames = humanList.map(human => human.name);

  console.log("Nombres disponibles:", availableNames);

  nameInputs.forEach((input) => {
    if (!input.value.trim()) {
      if (availableNames.length === 0) {
        error.textContent = "Not enough unique names available.";
        return;
      }
      input.value = getRandomName(availableNames);
      customNameList.push(input.value);
    }
  });

  const inputValues = nameInputs.map((input) => input.value.trim());

  localStorage.setItem("inputValues", JSON.stringify(inputValues));

  console.log(inputValues);

  error.textContent = "";

  window.location.href = "../html/mainCustom.html";
}

playButton1.addEventListener("click", () =>{
  sfxClick.play();
  });
playButton1.addEventListener("mouseover", () => {
  sfxHover.play();
})

playButton2.addEventListener("click", () =>{
  sfxClick.play();
  });
  playButton2.addEventListener("mouseover", () => {
  sfxHover.play();
})

backButton.addEventListener("click", () =>{
  sfxClick.play();
  });
  backButton.addEventListener("mouseover", () => {
  sfxHover.play();
})

function goBack(event) {
  event.preventDefault();

  window.location.href = "../html/home.html";
}