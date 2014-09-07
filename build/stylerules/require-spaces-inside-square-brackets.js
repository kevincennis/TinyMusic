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
      'requireSpacesInsideSquareBrackets option requires string value \'all\''
    );
    this._mode = mode;
  },

  getOptionName: function() {
    return 'requireSpacesInsideSquareBrackets';
  },

  check: function( file, errors ) {
    var tokens = file.getTokens();

    file.iterateNodesByType('MemberExpression', function( node ) {
      var keyStart, keyEnd, prev, next;
      // dot notation
      if ( !node.computed ) {
        return;
      }
      keyStart = file.getTokenPosByRangeStart(node.property.range[0]);
      keyEnd = file.getTokenPosByRangeStart(node.property.range[1]);
      prev = tokens[keyStart - 1];
      next = tokens[keyEnd];
      if ( prev && prev.range[1] === node.property.range[0] ) {
        errors.add('Missing space before expression', node.property.loc.start);
      }
      if ( next && next.range[0] === node.property.range[1] ) {
        errors.add('Missing space after expression', node.property.loc.end);
      }
    });
  }
};
