let audio = new Audio('/sounds/eod_theme.mp3');
let isPlaying = false;

window.addEventListener('DOMContentLoaded', () => {
    const savedState = localStorage.getItem('musicState');
    const savedTime = localStorage.getItem('musicTime');

    if (savedState === 'playing') {
        isPlaying = true;
        audio.currentTime = savedTime ? parseFloat(savedTime) : 0;
        audio.play();
    } else {
        audio.currentTime = savedTime ? parseFloat(savedTime) : 0;
    }

    updateButton();
});

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }

    localStorage.setItem('musicState', isPlaying ? 'playing' : 'paused');
    updateButton();
}

function updateButton() {
    const button = document.getElementById('toggle_music');
    button.textContent = isPlaying ? 'Pause' : 'Play';
}

audio.addEventListener('timeupdate', () => {
    localStorage.setItem('musicTime', audio.currentTime);
});

document.getElementById('toggle_music').addEventListener('click', toggleMusic);