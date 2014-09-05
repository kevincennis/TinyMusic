module.exports = {
  files: [
    'dist/<%= pkg.name %>.js',
    'dist/<%= pkg.name %>.min.js'
  ],
  options: {
    cache: 'build/.sizecache.json',
    compress: {
      gz: function( fileContents ) {
        return require('gzip-js').zip( fileContents, {} ).length;
      }
    }
  }
};
