let audio = new Audio("/sounds/eod_theme.mp3");
let domContentLoadedTime = null; // Tiempo de carga del DOM

// Detectar cuando el DOM está completamente cargado
window.addEventListener("DOMContentLoaded", () => {
  // Guardar el momento exacto en que se cargó el DOM
  domContentLoadedTime = performance.now();

  // Detectar si estamos en index.html
  const isIndexPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  if (isIndexPage) {
    // Si estamos en index.html, reiniciar el audio al principio
    audio.currentTime = 0;
    console.log("Página principal detectada. Audio reiniciado.");
  } else {
    // Si no estamos en index.html, restaurar el tiempo desde localStorage
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
      console.log("Progreso del audio restaurado:", audio.currentTime);
    }
  }

  // Configuración básica para el audio
  audio.loop = true; // Hacer que el audio se reproduzca en bucle
  audio.muted = true; // Comienza silenciado, pero esto se cambiará después

  // Intentar cargar el audio (sin reproducir aún)
  audio.load();
});

// Guardar el progreso del audio en localStorage
audio.addEventListener("timeupdate", () => {
  localStorage.setItem("musicTime", audio.currentTime);
});

// Evento para reproducir y desmutear el audio cuando el usuario haga clic en el body
document.body.addEventListener("click", () => {
  const isIndexPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  if (isIndexPage) {
    // Calcular el tiempo transcurrido desde la carga del DOM
    if (domContentLoadedTime !== null && audio.duration > 0) {
      const timeSinceDomLoaded = (performance.now() - domContentLoadedTime) / 1000; // Convertir a segundos
      console.log(
        `Tiempo desde la carga del DOM: ${timeSinceDomLoaded.toFixed(2)} s`
      );

      // Ajustar el audio para que comience desde el punto adecuado
      audio.currentTime = timeSinceDomLoaded % audio.duration; // Modulo para evitar overflow si es muy largo
      console.log(`Audio sincronizado a: ${audio.currentTime.toFixed(2)} s`);
    }
  }

  // Desmutear el audio si está silenciado
  if (audio.muted) {
    audio.muted = false;
    console.log("Audio desmuteado");
  }

  // Reproducir el audio si está pausado
  if (audio.paused) {
    audio.play().catch((error) => {
      console.warn("Error al intentar reproducir el audio:", error);
    });
  }
});