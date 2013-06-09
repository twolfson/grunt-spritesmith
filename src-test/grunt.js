module.exports = function (grunt) {
  grunt.initConfig({
    clean: ['scratch/'],
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
        destCSS: 'scratch/sprite_positions.json',
        engine: 'gm'
      },
      'overrides': {
        src: ['test_sprites/sprite1.png','test_sprites/sprite2.jpg','test_sprites/sprite3.png'],
        destImg: 'scratch/sprite.overrides.png',
        destCSS: 'scratch/sprite_positions.overrides.styl',
        cssFormat: 'json',
        imgOpts: {
          'format': 'jpg'
        },
        algorithm: 'alt-diagonal',
        engine: 'gm'
      },
      'nested': {
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
      },
      'css-opts': {
        src: ['test_sprites/sprite1.png','test_sprites/sprite2.jpg','test_sprites/sprite3.png'],
        destImg: 'scratch/css_opts/sprite.png',
        destCSS: 'scratch/css_opts/sprite_positions.css',
        cssOpts: {
          cssClass: function (item) {
            return '#container .' + item.name;
          }
        }
      }
    },
    test: {
      all: '*.test.js'
    }
  });

  grunt.loadTasks('../tasks');

  // Change directories for grunt@0.4
  process.chdir('..');
  grunt.loadNpmTasks('grunt-contrib-clean');
  process.chdir(__dirname);

  grunt.registerTask('default', 'clean sprite test');
};