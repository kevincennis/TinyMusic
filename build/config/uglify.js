module.exports = {
  options: {
    sourceMap: true,
  },
  dist: {
    src: 'dist/<%= pkg.name %>.js',
    dest: 'dist/<%= pkg.name %>.min.js'
  }
};
