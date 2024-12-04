import '@testing-library/jest-dom';

describe('DOM and Event Listeners', () => {
  let rulesButtonMovil;
  let rulesButtonDesktop;
  let rulesBox;
  let sfxClick;
  let sfxRules;

  beforeEach(() => {
    // Crear elementos simulados en el DOM
    document.body.innerHTML = `
      <div id="rulesBox" class=""></div>
      <button id="rulesButtonMovil"></button>
      <button id="rulesButtonDesktop"></button>
      <button id="btn-casual"></button>
      <button id="btn-custom"></button>
      <button class="btn-game" data-href="main.html"></button>
    `;

    rulesButtonMovil = document.getElementById('rulesButtonMovil');
    rulesButtonDesktop = document.getElementById('rulesButtonDesktop');
    rulesBox = document.getElementById('rulesBox');

    // Mockear los sonidos
    sfxClick = { play: jest.fn() };
    sfxRules = { play: jest.fn() };

    global.Audio = jest.fn().mockImplementation(() => sfxClick);
    jest.spyOn(global, 'Audio').mockImplementation((src) => {
      if (src.includes('rules_layout')) return sfxRules;
      return sfxClick;
    });

    // Importar la lógica (simula incluir el código)
    require('../js/homeScript');
  });

  it('should toggle rulesBox visibility when rulesButtonMovil is clicked', () => {
    expect(rulesBox.classList.contains('visible')).toBe(false);

    rulesButtonMovil.click();

    expect(rulesBox.classList.contains('visible')).toBe(true);
  });
});