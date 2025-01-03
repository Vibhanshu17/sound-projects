import { AudioPlayer } from "./audioPlayer.js";
import { Grid } from "./grid.js";


const C_SCALE = Array("C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5")
const noteFrequency = {
    C4: 261.63,
    CSharp4: 277.18,
    D4: 293.66, 
    DSharp4: 311.13,
    E4: 329.63,
    F4: 349.23,
    FSharp4: 369.99,
    G4: 392.00,
    GSharp4: 415.30,
    A4: 440.00,
    ASharp4: 466.16,
    B4: 493.88,
    C5: 523.25,
}


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
    B4: new Audio('sounds/B4.mp3'),
    C5: new Audio('sounds/C5.mp3')
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
    // sounds[note].currentTime = 0;  // Reset sound to start
    // sounds[note].play();
    audioPlayer.playSound(noteFrequency[note])
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
document.getElementById('C5').onclick = function() { playNote('C5'); };

playButton.addEventListener('click', () => audioPlayer.playSound(frequencyInput.value));
stopButton.addEventListener('click', () => audioPlayer.stopSound())

document.getElementById('c-scale').onclick = () => {
    C_SCALE.forEach((note, index) => setTimeout(() => audioPlayer.playSound(noteFrequency[note], 100), 500*index))
}

const R = 20, C = 20;
const gridObj = new Grid(R, C);

const gridElement = document.getElementById('grid')
const startAnimationButton = document.getElementById('startAnimation')
const stopAnimationButton = document.getElementById('stopAnimation')
const clearGridButton = document.getElementById('clearGrid')
const slider = document.getElementById('speedSlider')
const sliderValue = document.getElementById('speedSliderValue')

gridElement.appendChild(gridObj.createGrid(R, C))
startAnimationButton.onclick = () => gridObj.startAnimation(startAnimationButton, stopAnimationButton);
stopAnimationButton.onclick = () => gridObj.stopAnimation(startAnimationButton, stopAnimationButton)
clearGridButton.onclick = gridObj.clearGrid
slider.oninput = () => {
    gridObj.speedMultiplier = slider.value;
    sliderValue.textContent = slider.value;
}