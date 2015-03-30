// Load in dependencies
var yaml = require('js-yaml');

// Define our grunt file
module.exports = function (grunt) {
  // Configure the spritesheet
  grunt.initConfig({
    sprite: {
      spritesheet: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.png',
        destCss: 'spritesheet.styl',
        algorithm: 'binary-tree'
      },
      algorithm: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.algorithm.png',
        destCss: 'spritesheet.algorithm.styl',
        algorithm: 'alt-diagonal'
      },
      engine: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.engine.png',
        destCss: 'spritesheet.engine.styl',
        engine: 'gmsmith'
      },
      padding: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.padding.png',
        destCss: 'spritesheet.padding.styl',
        padding: 20 // Exaggerated for visibility, normal usage is 1 or 2
      },
      retina: {
        // We have `fork.png`, `fork-2x.png`, ...
        src: ['fork*.png', 'github*.png', 'twitter*.png'],
        // This will filter out `fork-2x.png`, `github-2x.png`, ... for our retina spritesheet
        //   The normal spritesheet will now receive `fork.png`, `github.png`, ...
        retinaSrcFilter: ['*-2x.png'],
        dest: 'spritesheet.retina.png',
        retinaDest: 'spritesheet.retina-2x.png',
        destCss: 'spritesheet.retina.styl'
      },
      cssVarMap: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.cssVarMap.png',
        destCss: 'spritesheet.cssVarMap.styl',
        cssVarMap: function (sprite) {
          sprite.name = 'sprite_' + sprite.name;
        }
      },
      handlebarsStr: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.handlebarsStr.png',
        destCss: 'spritesheet.handlebarsStr.css',
        cssTemplate: __dirname + '/handlebarsStr.css.handlebars'
      },
      handlebarsInheritance: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.handlebarsInheritance.png',
        destCss: 'spritesheet.handlebarsInheritance.scss',
        cssTemplate: 'handlebarsInheritance.scss.handlebars'
      },
      yamlTemplate: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.yamlTemplate.png',
        destCss: 'spritesheet.yamlTemplate.yml',
        cssTemplate: function (data) {
          // Convert sprites from an array into an object
          var spriteObj = {};
          data.sprites.forEach(function (sprite) {
            // Grab the name and store the sprite under it
            var name = sprite.name;
            spriteObj[name] = sprite;

            // Delete the name from the sprite
            delete sprite.name;
          });

          // Return stringified spriteObj
          return yaml.safeDump(spriteObj);
        }
      }
    }
  });

  // Load in grunt-spritesmith
  grunt.loadTasks('../tasks');

  // Run the sprite task by default
  grunt.registerTask('default', ['sprite']);
};
