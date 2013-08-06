// Define our grunt file
module.exports = function (grunt) {
  // Configure the spritesheet
  grunt.initConfig({
    sprite: {
      styl: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'spritesheet.png',
        destCSS: 'main.styl',
        algorithm: 'binary-tree'
      },
      css: {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'spritesheet.css.png',
        destCSS: 'main.css'
      },

      'top-down': {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'top-down.png',
        destCSS: 'top-down.css',
        algorithm: 'top-down'
      },
      'left-right': {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'left-right.png',
        destCSS: 'left-right.css',
        algorithm: 'left-right'
      },
      'diagonal': {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'diagonal.png',
        destCSS: 'diagonal.css',
        algorithm: 'diagonal'
      },
      'alt-diagonal': {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'alt-diagonal.png',
        destCSS: 'alt-diagonal.css',
        algorithm: 'alt-diagonal'
      },
      'binary-tree': {
        src: ['fork.png', 'github.png', 'twitter.png'],
        destImg: 'binary-tree.png',
        destCSS: 'binary-tree.css',
        algorithm: 'binary-tree'
      },
    }
  });

  // Load in grunt-spritesmith
  grunt.loadTasks('../tasks');

  // Run the sprite task by default
  grunt.registerTask('default', ['sprite']);
};