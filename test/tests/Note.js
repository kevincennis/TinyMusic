describe( 'Note', function(){

  describe( 'constructor', function() {

    it( 'should be a function', function() {
      assert.isFunction( TinyMusic.Note );
    });

    it( 'should accept 1 argument', function() {
      assert.lengthOf( TinyMusic.Note, 1 );
    });

    it( 'should resolve note names to frequencies', function() {
      var note = new TinyMusic.Note('A4 q');
      assert.equal( Math.round( note.frequency ), 440 );
    });

    it( 'should resolve unknown note names to 0', function() {
      var note = new TinyMusic.Note('- q');
      assert.equal( note.frequency, 0 );
    });

    it( 'should resolve duration names to ratios', function() {
      var whole = new TinyMusic.Note('A4 w'),
          half = new TinyMusic.Note('A4 h'),
          quarter = new TinyMusic.Note('A4 q'),
          eighth = new TinyMusic.Note('A4 e'),
          sixteenth = new TinyMusic.Note('A4 s'),
          dottedEighth = new TinyMusic.Note('A4 es');
      assert.equal( whole.duration, 4, 'whole note' );
      assert.equal( half.duration, 2, 'half note' );
      assert.equal( quarter.duration, 1, 'quarter note' );
      assert.equal( eighth.duration, 0.5, 'eighth note' );
      assert.equal( sixteenth.duration, 0.25, 'sisteenth note' );
      assert.equal( dottedEighth.duration, 0.75, 'dotted eighth note' );
    });

    it( 'should parse duration literals', function() {
      var _int = new TinyMusic.Note('A4 1'),
        _float = new TinyMusic.Note('A4 0.5');
      assert.equal( _int.duration, 1, 'integer' );
      assert.equal( _float.duration, 0.5, 'float' );
    });

  });

});
