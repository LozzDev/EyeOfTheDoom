const { getRandomName } = require('../js/customScript');
  
  test('elige un nombre aleatorio y lo elimina de la lista', () => {
    const availableNames = ["Alice", "Bob", "Charlie", "David"];
    
    const originalNames = [...availableNames];
    const randomName = getRandomName(availableNames);
    
    expect(availableNames).not.toContain(randomName);
    expect(originalNames).toContain(randomName);
  });
  
