describe( 'Sequence', function(){

  describe( 'constructor', function() {

    it( 'should be a function', function() {
      assert.isFunction( TinyMusic.Sequence );
    });

    it( 'should accept 3 arguments', function() {
      assert.lengthOf( TinyMusic.Sequence, 3 );
    });

  });

  describe( 'createCustomWave()', function() {
    it( 'should set "waveType" property of Sequence instance to "custom"', function() {
      var fixture = {
        waveType: "square"
      };

      TinyMusic.Sequence.prototype.createCustomWave.call( fixture , [ -0.8, 1, 0.8, 0.8, -0.8, -0.8, -1 ]);
      assert.equal( fixture.waveType, "custom" );
    });
  });

  describe( 'push()', function() {

    it( 'should accept strings', function() {
      var fixture = { notes: [] };
      TinyMusic.Sequence.prototype.push.call( fixture, 'A4 q', 'A4 h' );
      assert.lengthOf( fixture.notes, 2, 'Notes added' );
      assert.instanceOf( fixture.notes[ 0 ], TinyMusic.Note, 'Strings converted to Note instances' );
    });

    it( 'should accept Note instances', function() {
      var fixture = { notes: [] },
        note1 = new TinyMusic.Note('A4 q'),
        note2 = new TinyMusic.Note('A4 h');
      TinyMusic.Sequence.prototype.push.call( fixture, note1, note2 );
      assert.lengthOf( fixture.notes, 2, 'Notes added' );
      assert.equal( fixture.notes[ 0 ], note1, 'First note added correctly' );
      assert.equal( fixture.notes[ 1 ], note2, 'Second note added correctly' );
    });

  });

});
