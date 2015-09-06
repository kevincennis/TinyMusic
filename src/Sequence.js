/*
 * Sequence class
 */

// create a new Sequence
function Sequence( ac, tempo, arr ) {
  this.ac = ac || new AudioContext();
  this.createFxNodes();
  this.tempo = tempo || 120;
  this.loop = true;
  this.smoothing = 0;
  this.staccato = 0;
  this.notes = [];
  this.push.apply( this, arr || [] );
}

// create gain and EQ nodes, then connect 'em
Sequence.prototype.createFxNodes = function() {
  var eq = [ [ 'bass', 100 ], [ 'mid', 1000 ], [ 'treble', 2500 ] ],
    prev = this.gain = this.ac.createGain();
  eq.forEach(function( config, filter ) {
    filter = this[ config[ 0 ] ] = this.ac.createBiquadFilter();
    filter.type = 'peaking';
    filter.frequency.value = config[ 1 ];
    prev.connect( prev = filter );
  }.bind( this ));
  prev.connect( this.ac.destination );
  return this;
};

// accepts Note instances or strings (e.g. 'A4 e')
Sequence.prototype.push = function() {
  Array.prototype.forEach.call( arguments, function( note ) {
    this.notes.push( note instanceof Note ? note : new Note( note ) );
  }.bind( this ));
  return this;
};

// create a custom waveform as opposed to "sawtooth", "triangle", etc
Sequence.prototype.createCustomWave = function( real, imag ) {
  // Allow user to specify only one array and dupe it for imag.
  if ( !imag ) {
    imag = real;
  }

  // Wave type must be custom to apply period wave.
  this.waveType = 'custom';

  // Reset customWave
  this.customWave = [ new Float32Array( real ), new Float32Array( imag ) ];
};

// recreate the oscillator node (happens on every play)
Sequence.prototype.createOscillator = function() {
  this.stop();
  this.osc = this.ac.createOscillator();

  // customWave should be an array of Float32Arrays. The more elements in
  // each Float32Array, the dirtier (saw-like) the wave is
  if ( this.customWave ) {
    this.osc.setPeriodicWave(
      this.ac.createPeriodicWave.apply( this.ac, this.customWave )
    );
  } else {
    this.osc.type = this.waveType || 'square';
  }

  this.osc.connect( this.gain );
  return this;
};

// schedules this.notes[ index ] to play at the given time
// returns an AudioContext timestamp of when the note will *end*
Sequence.prototype.scheduleNote = function( index, when ) {
  var duration = 60 / this.tempo * this.notes[ index ].duration,
    cutoff = duration * ( 1 - ( this.staccato || 0 ) );

  this.setFrequency( this.notes[ index ].frequency, when );

  if ( this.smoothing && this.notes[ index ].frequency ) {
    this.slide( index, when, cutoff );
  }

  this.setFrequency( 0, when + cutoff );
  return when + duration;
};

// get the next note
Sequence.prototype.getNextNote = function( index ) {
  return this.notes[ index < this.notes.length - 1 ? index + 1 : 0 ];
};

// how long do we wait before beginning the slide? (in seconds)
Sequence.prototype.getSlideStartDelay = function( duration ) {
  return duration - Math.min( duration, 60 / this.tempo * this.smoothing );
};

// slide the note at <index> into the next note at the given time,
// and apply staccato effect if needed
Sequence.prototype.slide = function( index, when, cutoff ) {
  var next = this.getNextNote( index ),
    start = this.getSlideStartDelay( cutoff );
  this.setFrequency( this.notes[ index ].frequency, when + start );
  this.rampFrequency( next.frequency, when + cutoff );
  return this;
};

// set frequency at time
Sequence.prototype.setFrequency = function( freq, when ) {
  this.osc.frequency.setValueAtTime( freq, when );
  return this;
};

// ramp to frequency at time
Sequence.prototype.rampFrequency = function( freq, when ) {
  this.osc.frequency.linearRampToValueAtTime( freq, when );
  return this;
};

// run through all notes in the sequence and schedule them
Sequence.prototype.play = function( when ) {
  when = typeof when === 'number' ? when : this.ac.currentTime;

  this.createOscillator();
  this.osc.start( when );

  this.notes.forEach(function( note, i ) {
    when = this.scheduleNote( i, when );
  }.bind( this ));

  this.osc.stop( when );
  this.osc.onended = this.loop ? this.play.bind( this, when ) : null;

  return this;
};

// stop playback, null out the oscillator, cancel parameter automation
Sequence.prototype.stop = function() {
  if ( this.osc ) {
    this.osc.onended = null;
    this.osc.disconnect();
    this.osc = null;
  }
  return this;
};
