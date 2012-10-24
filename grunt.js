module.exports = function (grunt) {
  grunt.initConfig({
    lint: {
      all: ["grunt.js", "tasks/*.js", "src-test/*.js"]
    }
  });

  grunt.registerTask("default", "lint");
  grunt.loadTasks("tasks");
};