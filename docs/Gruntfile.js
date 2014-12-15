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
      cssVarMap: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.cssVarMap.png',
        destCss: 'spritesheet.cssVarMap.styl',
        cssVarMap: function (sprite) {
          sprite.name = 'sprite_' + sprite.name;
        }
      },
      mustacheStr: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.mustacheStr.png',
        destCss: 'spritesheet.mustacheStr.css',
        cssTemplate: __dirname + '/mustacheStr.css.mustache'
      },
      yamlTemplate: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        dest: 'spritesheet.yamlTemplate.png',
        destCss: 'spritesheet.yamlTemplate.yml',
        cssTemplate: function (params) {
          // Convert items from an array into an object
          var itemObj = {};
          params.items.forEach(function (item) {
            // Grab the name and store the item under it
            var name = item.name;
            itemObj[name] = item;

            // Delete the name from the item
            delete item.name;
          });

          // Return stringified itemObj
          return yaml.safeDump(itemObj);
        }
      }
    }
  });

  // Load in grunt-spritesmith
  grunt.loadTasks('../tasks');

  // Run the sprite task by default
  grunt.registerTask('default', ['sprite']);
};
