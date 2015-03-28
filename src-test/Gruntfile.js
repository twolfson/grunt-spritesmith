module.exports = function (grunt) {
  grunt.initConfig({
    sprite: {
      basic: {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_files/*.{jpg,png}',
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        dest: 'scratch/sprite.basic.png',
        destCss: 'scratch/sprite_positions.basic.styl'
      },
      retina: {
        src: ['test_files/sprite1*.png', 'test_files/sprite2*.jpg', 'test_files/sprite3*.png'],
        retinaSrcFilter: ['test_files/*-2x.{png,jpg}'],
        dest: 'scratch/sprite.retina.png',
        retinaDest: 'scratch/sprite.retina-2x.png',
        destCss: 'scratch/sprite_positions.retina.styl'
      },
      'jpg,json': {
        // TODO: This order is forced due to png/jpg ordering. We should fix this.
        // src: 'test_files/*.{jpg,png}',
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        dest: 'scratch/sprite.basic.jpg',
        destCss: 'scratch/sprite_positions.basic.json',
        // Use top-down to make maintenance easier
        algorithm: 'top-down'
      },
      overrides: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        dest: 'scratch/sprite.overrides.png',
        destCss: 'scratch/sprite_positions.overrides.styl',
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
        dest: 'scratch/nested/1/2/spritesheet.png',
        destCss: 'scratch/3/4/sprite_positions.styl'
      },
      empty: {
        src: [],
        dest: 'scratch/sprite.empty.png',
        destCss: 'scratch/sprite_positions.empty.json'
      },
      cssOpts: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        dest: 'scratch/sprite.cssOpts.png',
        destCss: 'scratch/sprite_positions.cssOpts.css',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssOpts: {
          cssSelector: function (sprite) {
            return '#container .' + sprite.name;
          }
        }
      },
      cssFunctionTemplate: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        dest: 'scratch/sprite.cssFunctionTemplate.png',
        destCss: 'scratch/sprite_positions.cssFunctionTemplate.styl',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssTemplate: function (data) {
          // Stringify only the first sprite
          return JSON.stringify(data.sprites[0], null, 4);
        }
      },
      cssHandlebarsTemplate: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        dest: 'scratch/sprite.cssHandlebarsTemplate.png',
        destCss: 'scratch/sprite_positions.cssHandlebarsTemplate.styl',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssTemplate: 'test_files/template.handlebars'
      },
      cssVarMap: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        dest: 'scratch/sprite.cssVarMap.png',
        destCss: 'scratch/sprite_positions.cssVarMap.styl',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssVarMap: function (sprite) {
          sprite.name = sprite.name.replace('sprite', 'icon');
        },
        // TODO: `cssSpritesheetName` should be tested separately
        cssSpritesheetName: 'icons'
      },
      retinaMapped: {
        src: ['test_files/sprite1*.png', 'test_files/sprite2*.jpg', 'test_files/sprite3*.png'],
        retinaSrcFilter: ['test_files/*-2x.{png,jpg}'],
        dest: 'scratch/sprite.retinaMapped.png',
        retinaDest: 'scratch/sprite.retinaMapped-2x.png',
        destCss: 'scratch/sprite_positions.retinaMapped.styl',
        // Use top-down to make maintenance easier
        algorithm: 'top-down',
        cssVarMap: function (sprite) {
          sprite.name = sprite.name.replace('sprite', 'icon');
        },
        cssSpritesheetName: 'icons',
        cssRetinaSpritesheetName: 'icons_retina',
        cssRetinaGroupsName: 'icon_groups'
      },
      newer: {
        src: ['test_files/sprite1.png', 'test_files/sprite2.jpg', 'test_files/sprite3.png'],
        dest: 'scratch/sprite.newer.png',
        destCss: 'scratch/sprite_positions.newer.styl'
      }
    }
  });

  // Load in grunt-spritesmith
  grunt.loadTasks('../tasks');

  // Load in grunt newer
  var previousDir = process.cwd();
  process.chdir(__dirname + '/../');
  grunt.loadNpmTasks('grunt-newer');
  process.chdir(previousDir);
};
