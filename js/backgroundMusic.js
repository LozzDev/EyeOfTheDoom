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
  } else {
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
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
      if (domContentLoadedTime !== null && audio.duration > 0) {
        const timeSinceDomLoaded = (performance.now() - domContentLoadedTime) / 1000; // Convertir a segundos
        const adjustedTime = parseFloat(savedTime) + timeSinceDomLoaded;

        audio.currentTime = Math.min(adjustedTime, audio.duration);

      } else {
        audio.currentTime = parseFloat(savedTime);
      }
    }

    audio.play()
      .then(() => {
        if (audio.muted) {
          audio.muted = false;
        }
      })
      .catch((error) => {
        console.warn("Error al intentar reproducir el audio:", error);
      });
  }
});