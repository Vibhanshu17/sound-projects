export class AudioPlayer {
    #audioContext;
    oscillator;
    isPlaying;

    constructor (ctx) {
        this.#audioContext = ctx;
        this.oscillator = null;
        this.isPlaying = false;
    }

    playSound(frequency, timeout=500) {
        if (this.isPlaying) { return; }
        // if(this.isPlaying) {
        //     this.oscillator?.frequency.setValueAtTime(frequency, this.#audioContext.currentTime)
        //     return;
        // }

        this.oscillator = this.#audioContext.createOscillator();
        const gainNode = this.#audioContext.createGain();

        this.oscillator.frequency.setValueAtTime(frequency, this.#audioContext.currentTime);
        this.oscillator.connect(gainNode);
        gainNode.connect(this.#audioContext.destination);

        this.oscillator.start();
        this.isPlaying = true;

        setTimeout(() => this.stopSound(), timeout);
    }

    stopSound() {
        this.oscillator?.stop();
        this.oscillator = null;
        this.isPlaying = false;
    }
}
    // const audioContext = new window.AudioContext();
    // let oscillator = null;
    // let isPlaying = false;

    // const frequencyInput = document.getElementById('frequency');
    // const frequencyDisplay = document.getElementById('frequency-display');
    // const playButton = document.getElementById('play-button');
    // const stopButton = document.getElementById('stop-button');

    // frequencyInput.addEventListener('input', (event) => {
    //     const frequency = event.target.value;
    //     frequencyDisplay.textContent = `Frequency: ${frequency} Hz`;

    //     if (isPlaying && oscillator) { oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); }
    // });

    // function playSound(frequency) {
    //     if (isPlaying) return;  // Prevent multiple oscillators running at once

    //     oscillator = audioContext.createOscillator();
    //     const gainNode = audioContext.createGain();

    //     oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    //     oscillator.connect(gainNode);
    //     gainNode.connect(audioContext.destination);

    //     oscillator.start();
    //     isPlaying = true;

    //     setTimeout(stopSound, 5000);
    // }

    // function stopSound() {
    //     if (oscillator) { oscillator.stop(); oscillator = null; isPlaying = false; }
    // }

    // playButton.addEventListener('click', () => playSound(frequencyInput.value));
    // stopButton.addEventListener('click', stopSound);