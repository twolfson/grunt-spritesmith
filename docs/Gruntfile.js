// Load in dependencies
var yaml = require('js-yaml');

// Define our grunt file
module.exports = function (grunt) {
  // Configure the spritesheet
  grunt.initConfig({
    sprite: {
      spritesheet: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'spritesheet.png',
        destCSS: 'spritesheet.styl',
        algorithm: 'binary-tree'
      },
      padding: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'spritesheet.padding.png',
        destCSS: 'spritesheet.padding.styl',
        padding: 20 // Exaggerated for visibility, normal usage is 1 or 2
      },
      mustacheStr: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'spritesheet.mustacheStr.png',
        destCSS: 'spritesheet.mustacheStr.css',
        cssTemplate: __dirname + '/mustacheStr.css.mustache'
      },
      yamlTemplate: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'spritesheet.yamlTemplate.png',
        destCSS: 'spritesheet.yamlTemplate.yml',
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
