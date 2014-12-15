// Load in dependencies
var fs = require('fs');

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
      mustacheStr: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'spritesheet.mustacheStr.png',
        destCSS: 'spritesheet.mustacheStr.css',
        cssTemplate: __dirname + '/mustacheStr.css.mustache'
      }
    }
  });

  // Load in grunt-spritesmith
  grunt.loadTasks('../tasks');

  // Run the sprite task by default
  grunt.registerTask('default', ['sprite']);
};
