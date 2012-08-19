module.exports = function (grunt) {
  grunt.initConfig({
    test: {
      all: '*.test.js'
    }
  });

  grunt.loadTasks('../src');
  grunt.registerTask('default', 'test');
};