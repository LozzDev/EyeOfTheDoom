let audio = new Audio("/sounds/eod_theme.mp3");
export { audio };
let domContentLoadedTime = null;


// Detectar cuando el DOM está completamente cargado
window.addEventListener("DOMContentLoaded", () => {
  domContentLoadedTime = performance.now();

  const isIndexPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  if (isIndexPage) {
    audio.currentTime = 0;
    console.log("Página principal detectada. Audio reiniciado.");
  } else {
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
      console.log("Progreso del audio restaurado:", audio.currentTime);
    }
  }

  audio.loop = true; 
  audio.muted = true; 
  audio.load();
});

// Guardar el progreso del audio en localStorage
audio.addEventListener("timeupdate", () => {
  localStorage.setItem("musicTime", audio.currentTime);
});

// Evento para manejar el mouseover (en páginas distintas de index.html)
document.body.addEventListener("mouseover", () => {
  const isIndexPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  if (!isIndexPage) {
    audio.play()
      .then(() => {
        if (audio.muted) {
          audio.muted = false;
          console.log("Audio desmuteado en mouseover");
        }
      })
      .catch((error) => {
        console.warn("Error al intentar reproducir el audio:", error);
      });
  }
});

// Evento para manejar el click en index.html
document.body.addEventListener("click", () => {
  const isIndexPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  if (isIndexPage) {
    if (domContentLoadedTime !== null && audio.duration > 0) {
      const timeSinceDomLoaded = (performance.now() - domContentLoadedTime) / 1000;
      audio.currentTime = timeSinceDomLoaded % audio.duration;
      console.log(`Audio sincronizado a: ${audio.currentTime.toFixed(2)} s`);
    }

    audio.play()
      .then(() => {
        if (audio.muted) {
          audio.muted = false;
          console.log("Audio desmuteado en click");
        }
      })
      .catch((error) => {
        console.warn("Error al intentar reproducir el audio:", error);
      });
  }
});