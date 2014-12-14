module.exports = function (grunt) {
  // Configure our project
  grunt.initConfig({
    clean: ['src-test/scratch/'],
    nodeunit: {
      all: 'src-test/*.test.js'
    }
  });

  // Load in our tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
};
