global.Audio = jest.fn().mockImplementation(() => {
  return {
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
  };
});

const {
  updateVisibility,
  storeEntry,
  deleteEntry,
  validateFormulary,
  getRandomName
} = require('../js/customScript');

// Simular el DOM antes de cada prueba
beforeEach(() => {
  document.body.innerHTML = `
    <div>
      <input id="inputField_a" />
      <input id="deleteField_a" />
      <div class="deleteUser-container_a" style="display:none;"></div>
      <div id="error_a"></div>
      <div id="cont_a">0/16</div>
      <input id="name1_a" />
      <input id="name2_a" />
      <input id="name3_a" />
      <input id="name4_a" />
    </div>
  `;
});

// Test 1: Probar la función updateVisibility
test('debe actualizar la visibilidad del contenedor de eliminación cuando hay entradas', () => {
  updateVisibility();
  const deleteUserContainer = document.querySelector(".deleteUser-container_a");
  expect(deleteUserContainer.style.display).toBe("none");

  // Simula agregar una entrada
  const entries = ["Alice"];
  updateVisibility();
  expect(deleteUserContainer.style.display).toBe("flex");
});

// Test 2: Probar la función storeEntry
test('debe almacenar una entrada correctamente', () => {
  const inputField = document.getElementById("inputField_a");
  inputField.value = "Alice";
  storeEntry();

  const error = document.getElementById("error_a");
  const cont = document.getElementById("cont_a");

  expect(error.textContent).toBe("");
  expect(cont.textContent).toBe("1/16");
  expect(entries).toContain("Alice");
});

// Test 3: Probar la función deleteEntry
test('debe eliminar una entrada correctamente', () => {
  // Agregar una entrada primero
  entries.push("Alice");
  const deleteField = document.getElementById("deleteField_a");
  deleteField.value = "alice";

  deleteEntry();

  const error = document.getElementById("error_a");
  const cont = document.getElementById("cont_a");

  expect(error.textContent).toBe('The user "alice" has been removed.');
  expect(entries).not.toContain("Alice");
  expect(cont.textContent).toBe("0/16");
});

// Test 4: Probar la función getRandomName
test('debe devolver un nombre aleatorio de la lista y eliminarlo', () => {
  const availableNames = ["Alice", "Bob", "Charlie"];
  const randomName = getRandomName(availableNames);

  expect(availableNames).not.toContain(randomName);
  expect(availableNames.length).toBe(2); // El nombre fue eliminado
});

// Test 5: Probar la función validateFormulary
test('debe mostrar un error si los campos no están completos', () => {
  const error = document.getElementById("error_a");

  // Simular la validación con los campos vacíos
  validateFormulary({ preventDefault: jest.fn() });

  expect(error.textContent).toBe("Please fill in the first 4 fields.");
});
