module.exports = function (grunt) {
  grunt.initConfig({
    lint: {
      all: ["grunt.js"]
    }
  });

  grunt.registerTask("default", "lint");
  grunt.loadTasks("src");
};