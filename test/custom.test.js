const { getRandomName } = require('../js/customScript');

test('elige un nombre aleatorio y lo elimina de la lista', () => {
  const availableNames = ["Alice", "Bob", "Charlie", "David"];
  
  const randomName = getRandomName(availableNames); // Llama a la función
  expect(availableNames).not.toContain(randomName); // Verifica que el nombre ha sido eliminado
  expect(["Alice", "Bob", "Charlie", "David"]).toContain(randomName); // Verifica que el nombre estaba en la lista original
});