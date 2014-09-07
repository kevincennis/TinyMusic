/* jshint -W101 */
var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

  configure: function( mode ) {
    var modes = {
      all: true
    };
    assert(
      typeof mode === 'string' &&
      modes[mode],
      'disallowNoVarOnFirstLine option requires string value \'all\''
    );
    this._mode = mode;
  },

  getOptionName: function() {
    return 'disallowNoVarOnFirstLine';
  },

  check: function( file, errors ) {
    var nextToken;

    file.iterateTokensByType('Keyword', function(token, index, tokens) {
      nextToken = tokens[index + 1];
      if ( token.value === 'var' ) {
        if ( token.loc.end.line !== nextToken.loc.start.line ) {
          errors.add('First variable must be on the same line as var keyword', token.loc.end);
        }
      }
    });
  }
};
