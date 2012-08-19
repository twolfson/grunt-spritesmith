module.exports = function (grunt) {
  grunt.initConfig({
    lint: {
      all: ["grunt.js", "src/*.js", "src-test/*.js"]
    }
  });

  grunt.registerTask("default", "lint");
  grunt.loadTasks("src");
};