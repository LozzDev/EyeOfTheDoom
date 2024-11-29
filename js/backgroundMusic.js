import globalState from "./globalState.js";

let audio = new Audio("/sounds/eod_theme.mp3");
globalState.audio = audio; 
let domContentLoadedTime = null;


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
      console.log("Progreso del audio restaurado desde localStorage:", audio.currentTime);
    }
  }

  audio.loop = true;
  audio.muted = true;
  audio.load();
});

audio.addEventListener("timeupdate", () => {
  localStorage.setItem("musicTime", audio.currentTime.toString());
});

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

document.body.addEventListener("click", () => {
  const isIndexPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  if (isIndexPage) {
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
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