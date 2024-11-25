let audio = new Audio('/sounds/eod_theme.mp3');
let isPlaying = false;

window.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('musicState');
  const savedTime = localStorage.getItem('musicTime');

  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  if (savedState === 'playing') {
    isPlaying = true;
    audio.play().catch((error) => {
      console.warn('La reproducción automática está bloqueada:', error);
    });
  }

  updateButton();
});


function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch((error) => {
      console.warn('No se pudo reproducir el audio:', error);
    });
    isPlaying = true;
  }

  localStorage.setItem('musicState', isPlaying ? 'playing' : 'paused');
  updateButton(); 
}

function updateButton() {
  const musicIcon = document.getElementById('music_icon');
  musicIcon.src = isPlaying ? '/images/pause.png' : '/images/play.png';
  musicIcon.alt = isPlaying ? 'Pause' : 'Play';
}

audio.addEventListener('timeupdate', () => {
  localStorage.setItem('musicTime', audio.currentTime);
});

document.getElementById('toggle_music').addEventListener('click', toggleMusic);