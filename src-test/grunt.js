module.exports = function (grunt) {
  grunt.file.mkdir('scratch');

  grunt.initConfig({
    sprite: {
      'default': {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_sprites/*.{jpg,png}',
        src: ['test_sprites/sprite1.png','test_sprites/sprite2.jpg','test_sprites/sprite3.png'],
        destImg: 'scratch/sprite.png',
        destCSS: 'scratch/sprite_positions.styl'
      },
      'jpg,json': {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_sprites/*.{jpg,png}',
        src: ['test_sprites/sprite1.png','test_sprites/sprite2.jpg','test_sprites/sprite3.png'],
        destImg: 'scratch/sprite.jpg',
        destCSS: 'scratch/sprite_positions.json'
      },
      'overrides': {
        src: ['test_sprites/sprite1.png','test_sprites/sprite2.jpg','test_sprites/sprite3.png'],
        destImg: 'scratch/sprite.overrides.png',
        destCSS: 'scratch/sprite_positions.overrides.styl',
        cssFormat: 'json',
        imgOpts: {
          'format': 'jpg'
        },
        algorithm: 'alt-diagonal'
      },
      'filepaths': {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_sprites/*.{jpg,png}',
        src: ['test_sprites/sprite1.png','test_sprites/sprite2.jpg','test_sprites/sprite3.png'],
        destImg: 'scratch/nested/1/2/spritesheet.png',
        destCSS: 'scratch/3/4/sprite_positions.styl'
      },
      'empty': {
        src: [],
        destImg: 'scratch/empty/sprite.png',
        destCSS: 'scratch/empty/sprite_positions.json'
      }
    },
    test: {
      all: '*.test.js'
    }
  });

  grunt.loadTasks('../tasks');
  grunt.registerTask('default', 'sprite test');
};