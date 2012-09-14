module.exports = function (grunt) {
  grunt.file.mkdir('scratch');

  grunt.initConfig({
    sprite: {
      all: {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_sprites/*.{jpg,png}',
        src: ['test_sprites/sprite1.png','test_sprites/sprite2.jpg','test_sprites/sprite3.png'],
        destImg: 'scratch/sprite.png',
        destCSS: 'scratch/sprite_positions.styl'
      }
    },
    test: {
      all: '*.test.js'
    }
  });

  grunt.loadTasks('../tasks');
  grunt.registerTask('default', 'sprite test');
};