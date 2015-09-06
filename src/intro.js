(function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    define( [ 'exports' ], factory );
  } else if ( typeof exports === 'object' && typeof exports.nodeName !== 'string' ) {
    factory( exports );
  } else {
    factory( root.TinyMusic = {} );
  }
}( this, function ( exports ) {
