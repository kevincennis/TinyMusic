module.exports = {
  src: {
    src: [
      'src/intro.js',
      'src/Note.js',
      'src/Sequence.js',
      'src/outro.js',
    ],
    dest: 'dist/<%= pkg.name %>.js'
  },
  shims: {
    src: [
      'test/shims/**/*.js'
    ],
    dest: 'test/shims.js'
  },
  test: {
    src: [
      'test/tests/**/*.js'
    ],
    dest: 'test/test.js'
  }
};
