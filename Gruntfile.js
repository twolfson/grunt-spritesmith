module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: ["grunt.js", "tasks/*.js", "src-test/*.js"]
    }
  });

  grunt.registerTask("default", "jshint");

  grunt.loadNpmTasks('grunt-contrib-jshint');
};