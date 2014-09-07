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
      'requireSpacesInsideParentheses option requires string value \'all\''
    );
    this._mode = mode;
  },

  getOptionName: function() {
    return 'requireSpacesInsideParentheses';
  },

  check: function( file, errors ) {
    var mode = this._mode, nextToken, prevToken,
      okayRight = /\)|\}|\]/, okayLeft = /\(|\{|\[/;

    function isComment( position ) {
      return file.getComments().some(function( comment ) {
        return position >= comment.range[0] && position < comment.range[1];
      });
    }

    // Iterate punctuators since '(', ')' can exist in multiple contexts.
    file.iterateTokensByType('Punctuator', function(token, index, tokens) {
      nextToken = tokens[index + 1];
      prevToken = tokens[index - 1];
      if ( token.value === '(' ) {
        // Skip the cases where we allow no space even if spaces are required.
        if ( nextToken.type === 'Punctuator' && nextToken.value === ')' ) {
          return;
        }

        // Don't require spaces for nested parens, objects, or arrays
        if ( nextToken.type === 'Punctuator' && okayLeft.test(nextToken.value) ) {
          return;
        }

        // Don't require spaces for function
        if ( nextToken.type === 'Keyword' && nextToken.value === 'function' ) {
          return;
        }

        // No spaces for single arg string
        if ( nextToken.type === 'String' && tokens[index + 2].value === ')' ) {
          if ( token.range[1] === nextToken.range[0] && token.loc.end.line === nextToken.loc.start.line ) {
            return;
          }
          errors.add('No space allowed before single argument string', token.loc.end);
          return;
        }

        if (( token.range[1] === nextToken.range[0] &&
              token.loc.end.line === nextToken.loc.start.line ) ||
              isComment( token.range[1] )) {
          errors.add('Missing space after opening round bracket', token.loc.end);
        }
      }

      if ( token.value === ')' ) {
        // Skip the cases where we allow no space even if spaces are required.
        if ( prevToken.type === 'Punctuator' && prevToken.value === '(' ) {
          return;
        }

        // Don't require spaces for nested parens, objects, or arrays
        if ( prevToken.type === 'Punctuator' && okayRight.test(prevToken.value) ) {
          return;
        }

        // No spaces for single arg string
        if ( prevToken.type === 'String' && tokens[index - 2 ].value === '(' ) {
          if ( token.range[0] === prevToken.range[1] && token.loc.end.line === prevToken.loc.start.line ) {
            return;
          }
          errors.add('No space allowed after single argument string', token.loc.end.line, token.loc.end.column - 2);
          return;
        }

        // Don't require trailing space for closing paren followed by
        // closing curly
        if ( nextToken.type === 'Punctuator' && okayRight.test(nextToken.value) ) {
          return;
        }

        if (( token.range[0] === prevToken.range[1] &&
              token.loc.end.line === prevToken.loc.start.line ) ||
              isComment( token.range[0] - 1 )) {
          errors.add('Missing space before closing round bracket', token.loc.end.line, token.loc.end.column - 2);
        }
      }
    });
  }
};
