var spritesmith = require('spritesmith');

module.exports = function (grunt) {
  // Create a SpriteMaker function
  function SpriteMaker() {
    var data = this.data,
        src = data.source,
        img = data.destImg,
        css = data.destCSS;

    // Verify all properties are here
    if (!src || !img || !css) {
      return grunt.fail("grunt.sprite requires a source, destImg, and destCSS property");
    }

    // Load in all images from the src
    var srcFiles = grunt.file.expand(src);

    // Create an async callback
    var cb = this.async();

    // Run through spritesmith
    spritesmith(srcFiles, function (err, result) {
      // If an error occurred, callback with it
      if (err) {
        return cb(err);
      }

      // Otherwise, log the result
      console.log(result);
      cb(true);
    });
  }

  // Export the SpriteMaker function
  grunt.registerMultiTask('sprite', 'Spritesheet making utility', SpriteMaker);
};