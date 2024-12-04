import globalState from "./globalState.js";

let audio = new Audio("/sounds/eod_theme.mp3");
globalState.audio = audio;
let domContentLoadedTime = null;
let isAudioActivated = false;

function createPrompt() {
  const messageContainer = document.createElement("div");
  messageContainer.id = "musicPrompt";
  messageContainer.innerHTML = `
    <p>Touch the screen to activate the music</p>
    <div class="hand-emoji">
      <span>👆</span>
      <span>👆</span>
      <span>👆</span>
    </div>
  `;

  Object.assign(messageContainer.style, {
    position: "absolute",
    bottom: "3%",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    fontFamily: "'PIXELADE', sans-serif",
    fontSize: "18px",
    color: "white",
    background: "rgba(0, 0, 0, 0.6)",
    padding: "10px 20px",
    borderRadius: "10px",
    zIndex: 9999,
    pointerEvents: "none",
  });

  const emojiStyle = {
    display: "inline",
    marginTop: "10px",
    fontSize: "36px",
  };
  messageContainer.querySelector(".hand-emoji span").style = emojiStyle;

  document.body.appendChild(messageContainer);
}

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

  createPrompt();
});

audio.addEventListener("timeupdate", () => {
  localStorage.setItem("musicTime", audio.currentTime.toString());
});

document.body.addEventListener("click", () => {
  if (!isAudioActivated) {
    isAudioActivated = true;

    const savedTime = localStorage.getItem("musicTime");
    if (savedTime && domContentLoadedTime !== null && audio.duration > 0) {
      const timeSinceDomLoaded =
        (performance.now() - domContentLoadedTime) / 1000;
      const adjustedTime = parseFloat(savedTime) + timeSinceDomLoaded;
      audio.currentTime = Math.min(adjustedTime, audio.duration);
    }

    audio
      .play()
      .then(() => {
        if (audio.muted) {
          audio.muted = false;
          isAudioActivated = true;
        }

        const messageContainer = document.getElementById("musicPrompt");
        if (messageContainer) {
          messageContainer.style.transition = "opacity 0.5s";
          messageContainer.style.opacity = "0";
          setTimeout(() => messageContainer.remove(), 500);
        }
      })
      .catch((error) => {
        console.warn("Error al intentar reproducir el audio:", error);
        isAudioActivated = false;
      });
  }
});
