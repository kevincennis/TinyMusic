module.exports = {
  src: [ 'src/*.js', '!src/intro.js', '!src/outro.js' ],
  options: {
    maximumLineLength: 80,
    requireCurlyBraces: [
      'if',
      'else',
      'for',
      'while',
      'do',
      'try',
      'catch'
    ],
    requireSpaceAfterKeywords: [
      'if',
      'else',
      'for',
      'while',
      'do',
      'switch',
      'return',
      'try',
      'catch'
    ],
    requireSpaceBeforeBlockStatements: true,
    requireParenthesesAroundIIFE: true,
    requireSpacesInConditionalExpression: true,
    requireSpacesInFunctionExpression: {
      beforeOpeningCurlyBrace: true
    },
    disallowSpacesInFunctionExpression: {
      beforeOpeningRoundBrace: true
    },
    requireSpacesInAnonymousFunctionExpression: {
      beforeOpeningCurlyBrace: true
    },
    disallowSpacesInAnonymousFunctionExpression: {
      beforeOpeningRoundBrace: true
    },
    requireSpacesInNamedFunctionExpression: {
      beforeOpeningCurlyBrace: true
    },
    disallowSpacesInNamedFunctionExpression: {
      beforeOpeningRoundBrace: true
    },
    requireSpacesInFunctionDeclaration: {
      beforeOpeningCurlyBrace: true
    },
    disallowSpacesInFunctionDeclaration: {
      beforeOpeningRoundBrace: true
    },
    requireMultipleVarDecl: true,
    requireBlocksOnNewline: true,
    // except for `catch`
    disallowEmptyBlocks: true,
    requireSpacesInsideObjectBrackets: 'all',
    requireSpacesInsideArrayBrackets: 'all',
    disallowSpaceAfterObjectKeys: true,
    requireOperatorBeforeLineBreak: [
      '?',
      '=',
      '+',
      '-',
      '/',
      '*',
      '==',
      '===',
      '!=',
      '!==',
      '>',
      '>=',
      '<',
      '<='
    ],
    disallowLeftStickedOperators: [
      '?',
      '=',
      '+',
      '-',
      '/',
      '*',
      '==',
      '===',
      '!=',
      '!==',
      '>',
      '>=',
      '<',
      '<='
    ],
    requireRightStickedOperators: [
      '!'
    ],
    disallowRightStickedOperators: [
      '?',
      '\/',
      '*',
      ':',
      '=',
      '==',
      '===',
      '!=',
      '!==',
      '>',
      '>=',
      '<',
      '<='
    ],
    requireLeftStickedOperators: [
      ','
    ],
    disallowSpaceAfterPrefixUnaryOperators: [
      '++',
      '--',
      '+',
      '-'
    ],
    disallowSpaceBeforePostfixUnaryOperators: [
      '++',
      '--'
    ],
    requireSpaceBeforeBinaryOperators: [
      '+',
      '-',
      '\/',
      '*',
      '=',
      '==',
      '===',
      '!=',
      '!==',
      '>',
      '>=',
      '<',
      '<='
    ],
    requireSpaceAfterBinaryOperators: [
      '+',
      '-',
      '\/',
      '*',
      '=',
      '==',
      '===',
      '!=',
      '!==',
      '>',
      '>=',
      '<',
      '<='
    ],
    requireCamelCaseOrUpperCaseIdentifiers: true,
    disallowKeywords: [
      'with'
    ],
    disallowMultipleLineStrings: true,
    disallowMultipleLineBreaks: true,
    disallowKeywordsOnNewLine: [
      'else',
      'catch'
    ],
    requireLineFeedAtFileEnd: true,
    validateLineBreaks: 'LF',
    validateQuoteMarks: '\'',
    validateIndentation: 2,
    disallowMixedSpacesAndTabs: true,
    disallowTrailingWhitespace: true,
    disallowTrailingComma: true,
    requireCapitalizedConstructors: true,
    requireDotNotation: true,

    // custom rules
    additionalRules: ['build/stylerules/*.js'],
    requireSpacesInsideParentheses: 'all',
    requireSpacesInsideSquareBrackets: 'all',
    disallowNoVarOnFirstLine: 'all',
  }
};
