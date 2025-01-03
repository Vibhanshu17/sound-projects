var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AudioPlayer_audioContext, _AudioPlayer_oscillator;
export class AudioPlayer {
    constructor(ctx) {
        _AudioPlayer_audioContext.set(this, void 0);
        _AudioPlayer_oscillator.set(this, void 0);
        __classPrivateFieldSet(this, _AudioPlayer_audioContext, ctx, "f");
        __classPrivateFieldSet(this, _AudioPlayer_oscillator, null, "f");
        this.isPlaying = false;
    }
    playSound(frequency) {
        var _a;
        if (this.isPlaying) {
            (_a = __classPrivateFieldGet(this, _AudioPlayer_oscillator, "f")) === null || _a === void 0 ? void 0 : _a.frequency.setValueAtTime(frequency, __classPrivateFieldGet(this, _AudioPlayer_audioContext, "f").currentTime);
            return;
        }
        __classPrivateFieldSet(this, _AudioPlayer_oscillator, __classPrivateFieldGet(this, _AudioPlayer_audioContext, "f").createOscillator(), "f");
        const gainNode = __classPrivateFieldGet(this, _AudioPlayer_audioContext, "f").createGain();
        __classPrivateFieldGet(this, _AudioPlayer_oscillator, "f").frequency.setValueAtTime(frequency, __classPrivateFieldGet(this, _AudioPlayer_audioContext, "f").currentTime);
        __classPrivateFieldGet(this, _AudioPlayer_oscillator, "f").connect(gainNode);
        gainNode.connect(__classPrivateFieldGet(this, _AudioPlayer_audioContext, "f").destination);
        __classPrivateFieldGet(this, _AudioPlayer_oscillator, "f").start();
        this.isPlaying = true;
        setTimeout(this.stopSound, 5000);
    }
    stopSound() {
        if (__classPrivateFieldGet(this, _AudioPlayer_oscillator, "f")) {
            __classPrivateFieldGet(this, _AudioPlayer_oscillator, "f").stop();
            __classPrivateFieldSet(this, _AudioPlayer_oscillator, null, "f");
            this.isPlaying = false;
        }
    }
}
_AudioPlayer_audioContext = new WeakMap(), _AudioPlayer_oscillator = new WeakMap();
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
