module.exports = {
  src: {
    files: 'src/**/*',
    tasks: [
      'concat',
      'uglify',
      'compare_size'
    ]
  }
};
