let frequencies = [
    16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87,
    32.70, 34.65, 36.71, 38.89, 41.20, 43.65, 46.25, 49.00, 51.91, 55.00, 58.27, 61.74,
    65.41, 69.30, 73.42, 77.78, 82.41, 87.31, 92.50, 98.00, 103.8, 110.0, 116.5, 123.5,
    130.8, 138.6, 146.8, 155.6, 164.8, 174.6, 185.0, 196.0, 207.7, 220.0, 233.1, 246.9,
    261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9,
    523.3, 554.4, 587.3, 622.3, 659.3, 698.5, 740.0, 784.0, 830.6, 880.0, 932.3, 987.8,
    1047, 1109, 1175, 1245, 1319, 1397, 1480, 1568, 1661, 1760, 1865, 1976,
    2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136, 3322, 3520, 3729, 3951,
    4186, 4435, 4699, 4978, 5274, 5588, 5920, 6272, 6645, 7040, 7459, 7902
];

let letters = [
    'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'
];

let notes: { [key: string]: Array<number> } = {};

let current = 0;
for (let i = 0; i < 9; i++) {
    for (let letter of letters) {
        if (!notes[letter]) notes[letter] = [];
        notes[letter][i] = frequencies[current];
        current++;
    }
}

console.log(notes);

window.addEventListener('DOMContentLoaded', () => {
    let button = document.createElement('button');
    button.innerText = 'play';
    button.addEventListener('click', () => {
        var context = new AudioContext();

        var song = [notes['Eb'][4], notes['F#'][4], notes['F'][4], notes['G'][4], notes['B'][4], notes['A'][4], notes['Bb'][4]];
        var duration = 2;
        var interval = 2;

        function play(frequency: number, time: number) {
            var o = context.createOscillator();
            var g = context.createGain();
            o.connect(g);
            g.connect(context.destination);
            g.gain.exponentialRampToValueAtTime(
                0.00001, context.currentTime + duration + time
            );
            o.frequency.value = frequency;
            o.type = 'sawtooth';
            o.start(time);
        }

        for (var i = 0; i < song.length; i++) {
            play(song[i], i * interval);
        }
    });
    document.body.appendChild(button);
});
