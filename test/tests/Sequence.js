describe( 'Sequence', function(){

  describe( 'constructor', function() {

    it( 'should be a function', function() {
      assert.isFunction( Note );
    });

    it( 'should accept 3 arguments', function() {
      assert.lengthOf( Sequence, 3 );
    });

  });

  describe( 'push()', function() {

    it( 'should accept strings', function() {
      var fixture = { notes: [] };
      Sequence.prototype.push.call( fixture, 'A4 q', 'A4 h' );
      assert.lengthOf( fixture.notes, 2, 'Notes added' );
      assert.instanceOf( fixture.notes[ 0 ], Note, 'Strings converted to Note instances' );
    });

    it( 'should accept Note instances', function() {
      var fixture = { notes: [] },
        note1 = new Note('A4 q'),
        note2 = new Note('A4 h');
      Sequence.prototype.push.call( fixture, note1, note2 );
      assert.lengthOf( fixture.notes, 2, 'Notes added' );
      assert.equal( fixture.notes[ 0 ], note1, 'First note added correctly' );
      assert.equal( fixture.notes[ 1 ], note2, 'Second note added correctly' );
    });

  });

});
