module.exports = function (grunt) {
  // Configure our project
  grunt.initConfig({
    clean: ['src-test/scratch/']
  });

  // Load in our tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
};
