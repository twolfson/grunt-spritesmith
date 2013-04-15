module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: ["grunt.js", "tasks/*.js", "src-test/*.js"]
    },
    sprite : {
      test : {
        src : ['src-test/test_sprites/sprite1.png', 'src-test/test_sprites/sprite2.png'],
        dest : 'temp/'
      },
      testtwo : {
        options : {
          'imgPath': '', // Manual override for imgPath specified in CSS
          'algorithm': 'alt-diagonal', // Specify algorithm (top-down, left-right, diagonal, alt-diagonal)
          'cssname' : 'style.json', // output CSS file name
          'spritename' : 'sprite.png', // out sprite file name
          'engine': 'gm', // Specify engine (auto, canvas, gm)
          'cssFormat': 'json', // Specify CSS format
          'imgOpts': { // Specify img options
            'format': 'png',
            'quality' : 100
          }
        },
        files: [
          {
           dest : 'temp/2/',
           src : ['src-test/test_sprites/*.png']
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