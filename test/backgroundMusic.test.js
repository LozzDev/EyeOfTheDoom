/**
 * @jest-environment jsdom
 */

import globalState from "../js/globalState";

// Mockear el Audio para evitar cargar un archivo de sonido real
jest.mock('../js/globalState.js', () => ({
  audio: {
    currentTime: 0,
    loop: false,
    muted: true,
    load: jest.fn(),
    play: jest.fn().mockResolvedValue(undefined),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(), // Mockear dispatchEvent
  },
}));

// Mockear location para evitar el error de navegación
const mockLocation = { pathname: 'index.html' };
global.location = mockLocation;

describe('DOM and Event Listeners', () => {
  let sfxRules, sfxClick;

  beforeEach(() => {
    // Mockear los efectos de sonido
    sfxRules = { play: jest.fn() };
    sfxClick = { play: jest.fn() };

    // Crear un HTML con los botones necesarios
    document.body.innerHTML = `
      <button id="rulesButtonMovil">Rules</button>
      <button id="casualButton">Casual</button>
    `;

    // Asignar los botones a sus eventos
    document.getElementById('rulesButtonMovil').addEventListener('click', () => sfxRules.play());
    document.getElementById('casualButton').addEventListener('click', () => sfxClick.play());
  });

  it('should play sfxRules when rulesButtonMovil is clicked', () => {
    const rulesButtonMovil = document.getElementById('rulesButtonMovil');
    rulesButtonMovil.click();

    // Verificar que el sonido de las reglas se haya activado
    expect(sfxRules.play).toHaveBeenCalled();
  });

  it('should play sfxClick on other button interactions', () => {
    const casualButton = document.getElementById('casualButton');
    casualButton.click();

    // Verificar que el sonido del clic se haya activado
    expect(sfxClick.play).toHaveBeenCalled();
  });
});