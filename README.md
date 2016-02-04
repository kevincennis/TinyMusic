TinyMusic
=========

[![Built Status](https://travis-ci.org/kevincennis/TinyMusic.svg?branch=master)](https://travis-ci.org/kevincennis/TinyMusic)

A simple, lightweight music synth/sequencer in JavaScript using the Web Audio API.

Here's a quick, hideous [demo](http://jsbin.com/nilepiviva/1/edit?js,output).

You can also see (a slightly modified version of) TinyMusic in action in this [js13k entry](http://js13kgames.com/entries/crasis).

Available on npm via `npm install tinymusic`.


---

## Changelog

Version 1.0.0 removes some weirdness around module format.

If you put `dist/TinyMusic.js` directly into your page with no
RequireJS/browserify/etc, you'll get a global object called `TinyMusic` that
exposes `Note` and `Sequence`.

Otherwise, you should be able to `require('tinymusic')` with browserify,
or `require('./node_modules/tinymusic/dist/TinyMusic.js')` with RequireJS,
which will give you an object containing both `Note` and `Sequence`.

## Quick Start

Getting started is pretty easy. Creating and playing a melody only takes a few lines of code.

```js
// create a new Web Audio API context
var ac = new AudioContext();

// set the playback tempo (120 beats per minute)
var tempo = 120;

// create some notes ('<Note Name> <Beat Length>')
// q = quarter note, h = half note (more on that later)
var note1 = new TinyMusic.Note('G3 q');
var note2 = new TinyMusic.Note('E4 q');
var note3 = new TinyMusic.Note('C4 h');

// create a new sequence
var sequence = new TinyMusic.Sequence( ac, tempo );

// add the notes
sequence.push( note1, note2, note3 );

// disable looping
sequence.loop = false;

// play it
sequence.play();

```

To eliminate a bit of boilerplate, you can also pass an array of strings to the `Sequence` constructor. Here's the last example, tweaked to take advantage of that:

```js
// create a new Web Audio API context
var ac = new AudioContext();

// set the playback tempo (120 beats per minute)
var tempo = 120;

// create a new sequence
var sequence = new TinyMusic.Sequence( ac, tempo, [
  'G3 q',
  'E4 q',
  'C4 h'
]);

// disable looping
sequence.loop = false;

// play it
sequence.play();
```

## Documentation

### Note

The `Note` constructor only accepts one argument: a string that dictates note frequency and duration. An example input string might look like `'A4 q'`.

In that example, `'A4'` refers to the frequency 440Hz ([more on that here](http://www.phy.mtu.edu/~suits/notefreqs.html)), and `'q'` means "quarter note".

To create a rest, you can pass in any "note name" that's not valid. I usually use `'-'`. So `'- q'` would be a quarter note rest (or one beat of silence for you non-music-types).

The duration component of the string can follow a few different forms:

- `'w'` is a whole note
- `'h'` is a half note
- `'q'` is a quarter note
- `'e'` is an eighth note
- `'s'` is a sixteenth note
- `'es'` is a dotted eighth note (eighth plus sixteenth). This works for any combination of the letters above.
- `'0.0125'` is a 32nd note, but any numeric value will work here. So `'2'` would be a half note, `'0.5'` would be an eighth note, etc.

After the constructor is run, `Note` instances have two properties:

- `frequency` is a number representing the note's frequency in Hz
- `duration` is the ratio of beat length (always 1) to the note's time value. `1` would be a quarter note, `0.5` a half note, etc.

### Sequence

The `Sequence` constructor accepts 3 arguments, but all are optional:

`ac` is an `AudioContext` instance. If not provided, one will be created -- but you *really* should provide one.
`tempo` is a tempo in beats per minute. If not provided, a default tempo of 120 will be set.
`arr` is an array of `Note` instances or strings (like the ones passed to the `Note` constructor).

The `Sequence` class has a bunch of methods and properties, but only a few are really intended to be "public":

#### Sequence.loop

The `loop` property is a boolean value that controls whether or not the sequence will play repeatedly. By default, its value is set to `true`.

#### Sequence.smoothing

The `smoothing` property controls portamento (smoothly sliding from one frequency to the next). The `smoothing` value should be a number between `0` (no smoothing) to `1` (lots of smoothing). The default value is `0`.

#### Sequence.staccato

The `staccato` property controls "choppiness". With a value of `0`, notes will play out for their entire duration. With a value of `1`, they'll be harshly truncated. By default, the `staccato` value is `0`.

#### Sequence.gain

The `gain` property is a Web Audio [`GainNode`](http://webaudio.github.io/web-audio-api/#GainNode).

There's too much to fully cover it here, but basically:

```js
var sequence = new TinyMusic.Sequence();

// the double "gain" isn't a typo. the GainNode instance has a property
// called "gain", which has a "value" that you can set
sequence.gain.gain.value = 0.5; // half volume
```

#### Sequence.bass

The `bass` property is a Web Audio [`BiquadFilterNode`](http://webaudio.github.io/web-audio-api/#the-biquadfilternode-interface).

If that sounds scary, just know this: it's basically just an EQ slider that controls low-end frequencies (centered around 100Hz by default)

```js
var sequence = new TinyMusic.Sequence();

// give the sequence some sweet, sweet bass (positive values add bass, negative values reduce it)
sequence.bass.gain.value = 10;
```

#### Sequence.mid

Same as `Sequence.bass`, but focuses on midrange frequencies (1000Hz by default)

#### Sequence.treble

Same as `Sequence.bass`, but focuses on higher frequencies (2500Hz by default)

#### Sequence.waveType

The `waveType` property defines what kind of oscillator the sequence will use. By default, oscillators use `'square'` waves because they sound totally fucking awesome. You can also use `'sine'`, `'sawtooth'`, or `'triangle'`.

#### Sequence.createCustomWave(real, imaginary)

Creates a custom waveType to use with `Sequence.waveType = 'custom'`. This will create and set a [periodicWaveForm](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode.setPeriodicWave) on the sequencer's OscillatorNode. `real` and `imaginary` should both be Arrays (they will be converted to Float32Array) and they must be the same length, or the AudioContext will generate an error. If no value is supplied for `imaginary`, `real` will be duplicated.

```js
var sequence = new TinyMusic.Sequence(ac, tempo, harmony);
sequence.play();

// An electric piano/organy (The Doors-ish) sound
sequence.createCustomWave([-0.8, 1, 0.8, 0.8, -0.8, -0.8, -1]);

// A soft, sine-like wave (a little grittier than plain "sine")
sequence.createCustomWave([-1,0,1,0,-1,0,1]);

// A bit grittier, sounds a little more like a horn
sequence.createCustomWave([-1,1,-1,1,-1,1],[1,0,1,0,1,0]);

// Trumpety
sequence.createCustomWave([-1,-0.9,-0.6,-0.3, 0, 0.3, 0.6, 0.9,1]);
```

#### Sequence.prototype.push()

The `push()` method accepts any number of `Note` instances (or "note strings" that can be passed to the `Note` constructor) and adds them to the sequence.

#### Sequence.prototype.play()

The `play()` method begins playback of your sequence. It optionally accepts a [Web Audio timestamp](http://webaudio.github.io/web-audio-api/#widl-AudioContext-currentTime) to determine when playback should begin.

If no timestamp is supplied (or the timestamp is in the past) playback will begin immediately.

#### Sequence.prototype.stop()

The `stop()` method stops all playback immediately.

### Full example

Here's a more elaborate demo that shows how to play multiple sequences in sync, as well as use gain and EQ:

```js
// create the audio context
var ac = new AudioContext(),
  // get the current Web Audio timestamp (this is when playback should begin)
  when = ac.currentTime,
  // set the tempo
  tempo = 132,
  // initialize some vars
  sequence1,
  sequence2,
  sequence3,
  // create an array of "note strings" that can be passed to a sequence
  lead = [
    '-   e',
    'Bb3 e',
    'A3  e',
    'Bb3 e',
    'G3  e',
    'A3  e',
    'F3  e',
    'G3  e',

    'E3  e',
    'F3  e',
    'G3  e',
    'F3  e',
    'E3  e',
    'F3  e',
    'D3  q',

    '-   e',
    'Bb3 s',
    'A3  s',
    'Bb3 e',
    'G3  e',
    'A3  e',
    'G3  e',
    'F3  e',
    'G3  e',

    'E3  e',
    'F3  e',
    'G3  e',
    'F3  e',
    'E3  s',
    'F3  s',
    'E3  e',
    'D3  q'
  ],
  harmony = [
    '-   e',
    'D4  e',
    'C4  e',
    'D4  e',
    'Bb3 e',
    'C4  e',
    'A3  e',
    'Bb3 e',

    'G3  e',
    'A3  e',
    'Bb3 e',
    'A3  e',
    'G3  e',
    'A3  e',
    'F3  q',

    '-   e',
    'D4  s',
    'C4  s',
    'D4  e',
    'Bb3 e',
    'C4  e',
    'Bb3 e',
    'A3  e',
    'Bb3 e',

    'G3  e',
    'A3  e',
    'Bb3 e',
    'A3  e',
    'G3  s',
    'A3  s',
    'G3  e',
    'F3  q'
  ],
  bass = [
    'D3  q',
    '-   h',
    'D3  q',

    'A2  q',
    '-   h',
    'A2  q',

    'Bb2 q',
    '-   h',
    'Bb2 q',

    'F2  h',
    'A2  h'
  ];

// create 3 new sequences (one for lead, one for harmony, one for bass)
sequence1 = new TinyMusic.Sequence( ac, tempo, lead );
sequence2 = new TinyMusic.Sequence( ac, tempo, harmony );
sequence3 = new TinyMusic.Sequence( ac, tempo, bass );

// set staccato and smoothing values for maximum coolness
sequence1.staccato = 0.55;
sequence2.staccato = 0.55;
sequence3.staccato = 0.05;
sequence3.smoothing = 0.4;

// adjust the levels so the bass and harmony aren't too loud
sequence1.gain.gain.value = 1.0;
sequence2.gain.gain.value = 0.8;
sequence3.gain.gain.value = 0.65;

// apply EQ settings
sequence1.mid.frequency.value = 800;
sequence1.mid.gain.value = 3;
sequence2.mid.frequency.value = 1200;
sequence3.mid.gain.value = 3;
sequence3.bass.gain.value = 6;
sequence3.bass.frequency.value = 80;
sequence3.mid.gain.value = -6;
sequence3.mid.frequency.value = 500;
sequence3.treble.gain.value = -2;
sequence3.treble.frequency.value = 1400;


//start the lead part immediately
sequence1.play( when );
// delay the harmony by 16 beats
sequence2.play( when + ( 60 / tempo ) * 16 );
// start the bass part immediately
sequence3.play( when );
```

## Development

- Install Node.js
- Run `npm install`
- Run `grunt`

Voila!

I also have `grunt watch` set up to automatically build when you change a source file.

## Contributing

Go for it. I wrote this in an afternoon, it could *probably* be improved. Pull
requests are completely welcome, but please make sure that the test suite
passes and that you conform to the [Idiomatic.js](https://github.com/rwaldron/idiomatic.js/) style guide.

## Issues

File 'em. I'm happy to fix bugs or answer questions.

I'm probably not gonna look to add many more features though, since this is really intended to be a very small library (people are using it for [js13k](http://js13kgames.com/), so, I mean...).
