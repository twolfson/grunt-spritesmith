var spritesmith = require('spritesmith'),
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
    spritesmith({'src': srcFiles}, function (err, result) {
      // If an error occurred, callback with it
      if (err) {
        return cb(err);
      }

      // Otherwise, write out the result to img
      fs.writeFileSync(img, result.image, 'binary');

      // Generate a listing of CSS variables
      var coordinates = result.coordinates,
          cssVars = [];

      // Iterate over the files used
      // TODO: This should be done via a template or something??
      Object.getOwnPropertyNames(coordinates).forEach(function (file) {
        // Extract the image name (exlcuding extension)
        var fullname = path.basename(file),
            nameParts = fullname.split('.');

        // If there is are more than 2 parts, pop the last one
        if (nameParts.length >= 2) {
          nameParts.pop();
        }

        var name = nameParts.join('.'),
            coords = coordinates[file];

        // Record all of the properties into cssVars
        // TODO: Find out of we can just make it an object in some namespace
        var x = coords.x + 'px',
            y = coords.y + 'px',
            offsetX = '-' + x,
            offsetY = '-' + y,
            width = coords.width + 'px',
            height = coords.height + 'px';
        cssVars.push('$' + name + '_x = ' + x + ';');
        cssVars.push('$' + name + '_y = ' + y + ';');
        cssVars.push('$' + name + '_offset_x = ' + offsetX + ';');
        cssVars.push('$' + name + '_offset_y = ' + offsetY + ';');
        cssVars.push('$' + name + '_width = ' + width + ';');
        cssVars.push('$' + name + '_height = ' + height + ';');
        cssVars.push('$' + name + ' = ' + [x, y, offsetX, offsetY, width, height].join(' ') + ';');
      });

      // Join the cssVars with line feeds
      var cssStr = cssVars.join('\n');

      // Write it out to the CSS file
      fs.writeFileSync(css, cssStr, 'utf8');

      // Callback
      cb(true);
    });
  }

  // Export the SpriteMaker function
  grunt.registerMultiTask('sprite', 'Spritesheet making utility', SpriteMaker);
};