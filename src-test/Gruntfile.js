module.exports = function (grunt) {
  grunt.initConfig({
    sprite: {
      basic: {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_files/*.{jpg,png}',
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        destImg: 'scratch/sprite.basic.png',
        destCSS: 'scratch/sprite_positions.basic.styl'
      },
      'jpg,json': {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_files/*.{jpg,png}',
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        destImg: 'scratch/sprite.basic.jpg',
        destCSS: 'scratch/sprite_positions.basic.json',
        // Use top-down to make maintenance easier
        algorithm: 'top-down'
      },
      overrides: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        destImg: 'scratch/sprite.overrides.png',
        destCSS: 'scratch/sprite_positions.overrides.styl',
        cssFormat: 'json',
        imgOpts: {
          format: 'jpg'
        },
        algorithm: 'alt-diagonal',
        engine: 'gmsmith'
      },
      nested: {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_files/*.{jpg,png}',
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        destImg: 'scratch/nested/1/2/spritesheet.png',
        destCSS: 'scratch/3/4/sprite_positions.styl'
      },
      empty: {
        src: [],
        destImg: 'scratch/sprite.empty.png',
        destCSS: 'scratch/sprite_positions.empty.json'
      },
      cssOpts: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        destImg: 'scratch/sprite.cssOpts.png',
        destCSS: 'scratch/sprite_positions.cssOpts.css',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssOpts: {
          cssClass: function (item) {
            return '#container .' + item.name;
          }
        }
      },
      cssFunctionTemplate: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        destImg: 'scratch/sprite.cssFunctionTemplate.png',
        destCSS: 'scratch/sprite_positions.cssFunctionTemplate.styl',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssTemplate: function (data) {
          // Stringify only the first item
          return JSON.stringify(data.items[0], null, 4);
        }
      },
      cssMustacheTemplate: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        destImg: 'scratch/sprite.cssMustacheTemplate.png',
        destCSS: 'scratch/sprite_positions.cssMustacheTemplate.styl',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssTemplate: 'test_files/template.mustache'
      },
      cssVarMap: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        destImg: 'scratch/sprite.cssVarMap.png',
        destCSS: 'scratch/sprite_positions.cssVarMap.styl',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssVarMap: function (sprite) {
          sprite.name = sprite.name.replace('sprite', 'icon');
        }
      }
    }
  });

  // Load in grunt-spritesmith
  grunt.loadTasks('../tasks');

  // Override default task
  grunt.registerTask('default', ['sprite']);
};
