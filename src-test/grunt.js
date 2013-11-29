module.exports = function (grunt) {
  grunt.initConfig({
    clean: ['scratch/'],
    sprite: {
      'default': {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_files/*.{jpg,png}',
        src: ['test_files/sprite1.png','test_files/sprite2.jpg','test_files/sprite3.png'],
        destImg: 'scratch/sprite.png',
        destCSS: 'scratch/sprite_positions.styl'
      },
      'jpg,json': {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_files/*.{jpg,png}',
        src: ['test_files/sprite1.png','test_files/sprite2.jpg','test_files/sprite3.png'],
        destImg: 'scratch/sprite.jpg',
        destCSS: 'scratch/sprite_positions.json',
        engine: 'gm'
      },
      'overrides': {
        src: ['test_files/sprite1.png','test_files/sprite2.jpg','test_files/sprite3.png'],
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
        // src: 'test_files/*.{jpg,png}',
        src: ['test_files/sprite1.png','test_files/sprite2.jpg','test_files/sprite3.png'],
        destImg: 'scratch/nested/1/2/spritesheet.png',
        destCSS: 'scratch/3/4/sprite_positions.styl'
      },
      'empty': {
        src: [],
        destImg: 'scratch/empty/sprite.png',
        destCSS: 'scratch/empty/sprite_positions.json'
      },
      'css-opts': {
        src: ['test_files/sprite1.png','test_files/sprite2.jpg','test_files/sprite3.png'],
        destImg: 'scratch/css_opts/sprite.png',
        destCSS: 'scratch/css_opts/sprite_positions.css',
        cssOpts: {
          cssClass: function (item) {
            return '#container .' + item.name;
          }
        }
      },
      'cssFunctionTemplate': {
        src: ['test_files/sprite1.png','test_files/sprite2.jpg','test_files/sprite3.png'],
        destImg: 'scratch/sprite.png',
        destCSS: 'scratch/sprite_positions_custom_function_template.styl',
        cssTemplate: function (data) {
          // Stringify only the first item
          return JSON.stringify(data.items[0], null, 4);
        }
      },
      'cssMustacheTemplate': {
        src: ['test_files/sprite1.png','test_files/sprite2.jpg','test_files/sprite3.png'],
        destImg: 'scratch/sprite.png',
        destCSS: 'scratch/sprite_positions_custom_mustache_template.styl',
        cssTemplate: 'test_files/template.mustache'
      },
      'cssVarMap': {
        src: ['test_files/sprite1.png','test_files/sprite2.jpg','test_files/sprite3.png'],
        destImg: 'scratch/sprite.png',
        destCSS: 'scratch/css_var_map/sprite_positions.styl',
        cssVarMap: function (sprite) {
          sprite.name = sprite.name.replace('sprite', 'icon');
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