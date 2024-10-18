const audio = document.getElementById('background-audio');
const newAudio = document.getElementById('new-background-audio');
const playButton = document.querySelector('.play-button');
const lyricsContainer = document.getElementById('lyrics');
let timer;

const lyrics = [
    { text: "Oh Karna bersamamu semua terasa indah", time: 0.5 },
    { text: "Gundah gulana hatiku pun hancur sirna", time: 5.8 },
    { text: "Janji ku tak kan ku lepas wahai kau bidadariku dari surga", time: 14 },
    { text: "Tuk selamanya", time: 20 },
    { text: "Tuk selamanya", time: 24 },
    { text: "Tuk selamanya", time: 26 }
];

document.addEventListener('DOMContentLoaded', function() {
    audio.play(); // Background music auto-play

    let currentIndex = 0;

    audio.addEventListener('timeupdate', updateLyrics);
    newAudio.addEventListener('timeupdate', updateLyrics);

    function updateLyrics() {
        const currentTime = audio.paused ? newAudio.currentTime : audio.currentTime;

        if (currentTime < lyrics[currentIndex - 1]?.time) {
            currentIndex = 0;
            lyricsContainer.textContent = '';
        }

        if (currentIndex < lyrics.length && currentTime >= lyrics[currentIndex].time) {
            clearInterval(timer); // Clear previous timer
            lyricsContainer.style.display = 'block';
            const text = lyrics[currentIndex].text;
            lyricsContainer.textContent = ''; // Clear previous text
            let index = 0;
            timer = setInterval(() => {
                if (index < text.length) {
                    lyricsContainer.textContent += text[index];
                    index++;
                } else {
                    clearInterval(timer);
                }
            }, 100); // Speed of typing effect (milliseconds per character)
            currentIndex++;
        }
    }

    function resetLyrics() {
        currentIndex = 0;
        clearInterval(timer); // Clear timer when resetting lyrics
        lyricsContainer.textContent = '';
        lyricsContainer.style.display = 'none';
    }

    audio.addEventListener('ended', resetLyrics);
    newAudio.addEventListener('ended', resetLyrics);
    audio.addEventListener('play', resetLyrics);
    newAudio.addEventListener('play', resetLyrics);

    // Draggable Logo
    const logo = document.getElementById('draggable-logo');
    let shiftX = 0;
    let shiftY = 0;

    logo.addEventListener('mousedown', (event) => {
        shiftX = event.clientX - logo.getBoundingClientRect().left;
        shiftY = event.clientY - logo.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(event) {
        let x = event.pageX - shiftX;
        let y = event.pageY - shiftY;
        logo.style.left = `${x}px`;
        logo.style.top = `${y}px`;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    logo.ondragstart = function() {
        return false;
    };
});

// Function buat toggle background music
function togglePlay() {
    if (audio.paused) {
        audio.play();
        newAudio.pause(); // Jeda audio Tinandrose
        playButton.textContent = '⏸️';
    } else {
        audio.pause();
        playButton.textContent = '▶️';
    }
}

// Function buat toggle Tinandrose audio
function toggleNewAudio() {
    if (newAudio.paused) {
        newAudio.play();
        playButton.textContent = '⏸️';
    } else {
        newAudio.pause();
        playButton.textContent = '▶️';
    }
}
