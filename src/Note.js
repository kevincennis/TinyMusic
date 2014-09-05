/*
 * Private stuffz
 */

var enharmonics = 'B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb',
  middleC = 440 * Math.pow( Math.pow( 2, 1 / 12 ), -9 ),
  numeric = /^[0-9.]+$/,
  octaveOffset = 4,
  space = /\s+/,
  num = /(\d+)/,
  offsets = {};

// populate the offset lookup (note distance from C, in semitones)
enharmonics.split('|').forEach(function( val, i ) {
  val.split('-').forEach(function( note ) {
    offsets[ note ] = i;
  });
});

/*
 * Note class
 *
 * new Note ('A4 q') === 440Hz, quarter note
 * new Note ('- e') === 0Hz (basically a rest), eigth note
 * new Note ('A4 es') === 440Hz, dotted eighth note (eighth + sixteenth)
 * new Note ('A4 0.0125') === 440Hz, 32nd note (or any arbitrary
 * divisor/multiple of 1 beat)
 *
 */

// create a new Note instance from a string
function Note( str ) {
  var couple = str.split( space );
  // frequency, in Hz
  this.frequency = Note.getFrequency( couple[ 0 ] ) || 0;
  // duration, as a ratio of 1 beat (quarter note = 1, half note = 0.5, etc.)
  this.duration = Note.getDuration( couple[ 1 ] ) || 0;
}

// convert a note name (e.g. 'A4') to a frequency (e.g. 440.00)
Note.getFrequency = function( name ) {
  var couple = name.split( num ),
    distance = offsets[ couple[ 0 ] ],
    octaveDiff = ( couple[ 1 ] || octaveOffset ) - octaveOffset,
    freq = middleC * Math.pow( Math.pow( 2, 1 / 12 ), distance );
  return freq * Math.pow( 2, octaveDiff );
};

// convert a duration string (e.g. 'q') to a number (e.g. 1)
// also accepts numeric strings (e.g '0.125')
// and compund durations (e.g. 'es' for dotted-eight or eighth plus sixteenth)
Note.getDuration = function( symbol ) {
  return numeric.test( symbol ) ? parseFloat( symbol ) :
    symbol.toLowerCase().split('').reduce(function( prev, curr ) {
      return prev + ( curr === 'w' ? 4 : curr === 'h' ? 2 :
        curr === 'q' ? 1 : curr === 'e' ? 0.5 :
        curr === 's' ? 0.25 : 0 );
    }, 0 );
};
