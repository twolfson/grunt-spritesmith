module.exports = function (grunt) {
  // Load in legacy config
  require('./grunt')(grunt);

  // Configure nodeunit as test
  var testConfig = grunt.config.get('test');
  grunt.config.set('nodeunit', testConfig);

  // Load in nodeunit
  process.chdir('..');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  process.chdir(__dirname);

  // Override default task
  grunt.registerTask('default', ['sprite', 'nodeunit']);
};