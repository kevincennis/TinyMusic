if ( !Function.prototype.bind ) {
  Function.prototype.bind = function( ctx ) {
    var bound,
      func = this,
      slice = Array.prototype.slice,
      args = slice.call( arguments, 1 ),
      err = 'Function.prototype.bind called on incompatible ' + func;
    if ( 'function' !== typeof this ) {
      throw new TypeError( err );
    }
    bound = function() {
      var result;
      // called with new keyword
      if ( this instanceof bound ) {
        result = func.apply( this, args.concat( slice.call( arguments ) ) );
        // deal with constructors that have explicit return values
        return ( Object( result ) === result ) ? result : this;
      }
      // called without new keyword
      return func.apply( ctx, args.concat( slice.call( arguments ) ) );
    };
    // set up prototype chain for bound function
    bound.prototype = Object.create( this.prototype );
    return bound;
  };
}
