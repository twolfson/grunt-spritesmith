var spritesmith = require('spritesmith'),
    json2css = require('json2css'),
    fs = require('fs'),
    path = require('path');

module.exports = function (grunt) {
  // Create a SpriteMaker function
  function SpriteMaker() {
    var data = this.data,
        src = data.src,
        img = data.destImg,
        css = data.destCSS;

    // Verify all properties are here
    if (!src || !img || !css) {
      return grunt.fatal("grunt.sprite requires a source, destImg, and destCSS property");
    }

    // Load in all images from the src
    var srcFiles = grunt.file.expand(src);

    // Create an async callback
    var cb = this.async();

    // Run through spritesmith
    // TODO: Specify algorithm specification
    spritesmith({'src': srcFiles}, function (err, result) {
      // If an error occurred, callback with it
      if (err) {
        return cb(err);
      }

      // Otherwise, write out the result to img
      fs.writeFileSync(img, result.image, 'binary');

      // Generate a listing of CSS variables
      var coordinates = result.coordinates,
          cleanCoords = {};

      // Clean up the file name of the file
      Object.getOwnPropertyNames(coordinates).forEach(function (file) {
        // Extract the image name (exlcuding extension)
        var fullname = path.basename(file),
            nameParts = fullname.split('.');

        // If there is are more than 2 parts, pop the last one
        if (nameParts.length >= 2) {
          nameParts.pop();
        }

        // Extract out our name
        var name = nameParts.join('.'),
            coords = coordinates[file];

        // Save the cleaned name and coordinates
        cleanCoords[name] = coords;
      });

      // Render the variables via json2css
      // TODO: Specify that thing we did in spritesmith yesterday
      // TODO: Allow for json2css options
      var cssStr = json2css(cleanCoords, {'format': 'stylus'});

      // Write it out to the CSS file
      fs.writeFileSync(css, cssStr, 'utf8');

      // Callback
      cb(true);
    });
  }

  // Export the SpriteMaker function
  grunt.registerMultiTask('sprite', 'Spritesheet making utility', SpriteMaker);
};