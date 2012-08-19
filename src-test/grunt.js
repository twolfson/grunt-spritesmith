module.exports = function (grunt) {
  grunt.file.mkdir('scratch');

  grunt.initConfig({
    sprite: {
      all: {
        // source: 'test_sprites/*.{jpg,png}',
        source: ['test_sprites/sprite1.png','test_sprites/sprite2.jpg','test_sprites/sprite3.png'],
        destImg: 'scratch/sprite.png',
        destCSS: 'scratch/sprite_positions.styl'
      }
    },
    test: {
      all: '*.test.js'
    }
  });

  grunt.loadTasks('../src');
  grunt.registerTask('default', 'sprite test');
};