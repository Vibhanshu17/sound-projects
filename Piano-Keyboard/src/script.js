// import { AudioPlayer } from "../dist/audioContext"

import { AudioPlayer } from "./audioContext.js";

// Preload sounds
const sounds = {
    C4: new Audio('sounds/C4.mp3'),
    CSharp4: new Audio('sounds/CSharp4.mp3'),
    D4: new Audio('sounds/D4.mp3'),
    DSharp4: new Audio('sounds/DSharp4.mp3'),
    E4: new Audio('sounds/E4.mp3'),
    F4: new Audio('sounds/F4.mp3'),
    FSharp4: new Audio('sounds/FSharp4.mp3'),
    G4: new Audio('sounds/G4.mp3'),
    GSharp4: new Audio('sounds/GSharp4.mp3'),
    A4: new Audio('sounds/A4.mp3'),
    ASharp4: new Audio('sounds/ASharp4.mp3'),
    B4: new Audio('sounds/B4.mp3')
};

const audioContext = new window.AudioContext();
const audioPlayer = new AudioPlayer(audioContext);

const frequencyInput = document.getElementById('frequency')
const frequencyDisplay = document.getElementById('frequency-display')
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');

frequencyInput.addEventListener('input', (event) => {
    frequencyDisplay.textContent = `Frequency: ${event.target.value} Hz`;
})

function playNote(note) {
    sounds[note].currentTime = 0;  // Reset sound to start
    sounds[note].play();
}

// Add event listeners to each key
document.getElementById('C4').onclick = function() { playNote('C4'); };
document.getElementById('C#4').onclick = function() { playNote('CSharp4'); };
document.getElementById('D4').onclick = function() { playNote('D4'); };
document.getElementById('D#4').onclick = function() { playNote('DSharp4'); };
document.getElementById('E4').onclick = function() { playNote('E4'); };
document.getElementById('F4').onclick = function() { playNote('F4'); };
document.getElementById('F#4').onclick = function() { playNote('FSharp4'); };
document.getElementById('G4').onclick = function() { playNote('G4'); };
document.getElementById('G#4').onclick = function() { playNote('GSharp4'); };
document.getElementById('A4').onclick = function() { playNote('A4'); };
document.getElementById('A#4').onclick = function() { playNote('ASharp4'); };
document.getElementById('B4').onclick = function() { playNote('B4'); };

playButton.addEventListener('click', () => audioPlayer.playSound(frequencyInput.value));
stopButton.addEventListener('click', () => audioPlayer.stopSound())

document.getElementById('c-scale').onclick = () => {
    setTimeout(() => audioPlayer.playSound(261.63, 100), 0);
    setTimeout(() => audioPlayer.playSound(293.66, 100), 500);
    setTimeout(() => audioPlayer.playSound(329.63, 100), 1000);
    setTimeout(() => audioPlayer.playSound(349.23, 100), 1500);
    setTimeout(() => audioPlayer.playSound(392.00, 100), 2000);
    setTimeout(() => audioPlayer.playSound(440.00, 100), 2500);
    setTimeout(() => audioPlayer.playSound(493.88, 100), 3000);
    setTimeout(() => audioPlayer.playSound(523.25, 100), 3500);
}
