module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: ["grunt.js", "tasks/*.js", "src-test/*.js"]
    },
    spritesmith : {
      test : {
        src : ['src-test/expected_files/*.png', 'src-test/expected_files/canvas.jpg'],
        dest : 'temp/'
      },
      testtwo : {
        files: [
          {
           dest : 'temp/2/',
           src : ['src-test/expected_files/*.png']
          },
          {            
           dest : 'temp/3/',
           src : ['src-test/expected_files/*.jpg']
          }
        ]
      }      
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadTasks("tasks");
  grunt.registerTask("default", "jshint");
};