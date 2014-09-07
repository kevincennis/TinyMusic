module.exports = function( grunt ) {

  grunt.initConfig({
    // read package.json
    pkg: grunt.file.readJSON('package.json'),
    // auto-build on /src changes
    watch: require('./build/config/watch'),
    // style checker
    jscs: require('./build/config/jscs'),
    // concatenate js files and create uglify input source
    concat: require('./build/config/concat'),
    // minify
    uglify: require('./build/config/uglify'),
    // test server
    connect: require('./build/config/connect'),
    // tests
    mocha_phantomjs: require('./build/config/mocha'),
    // compare size of generated files
    compare_size: require('./build/config/comparesize')
  });

  // load npm plugins (all dependencies that match /^grunt/)
  require('load-grunt-tasks')( grunt );

  // default task
  grunt.registerTask( 'default', require('./build/tasks/default') );

};
