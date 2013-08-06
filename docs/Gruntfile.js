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
      }
    }
  });

  // Load in grunt-spritesmith
  grunt.loadTasks('../tasks');

  // Run the sprite task by default
  grunt.registerTask('default', ['sprite']);
};