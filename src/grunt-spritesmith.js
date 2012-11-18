var spritesmith = require('spritesmith'),
    json2css = require('json2css'),
    fs = require('fs'),
    path = require('path');

function ExtFormat() {
  this.formatObj = {};
}
ext2format.prototype = {
  'add': function (name, val) {
    this.formatObj[name] = val;
  },
  'get': function (filepath) {
    // Grab the extension from the filepath
    var ext = path.extname(filepath),
        lowerExt = ext.toLowerCase();

    // Look up the file extenion from our format object
    var formatObj = this.formatObj,
        format = formatObj[lowerExt];
    return format;
  }
};

// Create img and css formats
var imgFormats = new ExtFormat(),
    cssFormats = new ExtFormat();

// Add our img formats
imgFormats.add('png', 'png');
imgFormats.add('jpg', 'jpeg');
imgFormats.add('jpeg', 'jpeg');

// Add our css formats
cssFormats.add('styl', 'stylus');
cssFormats.add('stylus', 'stylus');
cssFormats.add('json', 'json');

module.exports = function (grunt) {
  // Create a SpriteMaker function
  function SpriteMaker() {
    var data = this.data,
        src = data.src,
        destImg = data.destImg,
        destCSS = data.destCSS;

    // Verify all properties are here
    if (!src || !destImg || !destCSS) {
      return grunt.fatal("grunt.sprite requires a source, destImg, and destCSS property");
    }

    // Load in all images from the src
    var srcFiles = grunt.file.expand(src);

    // Create an async callback
    var cb = this.async();

    // Determine the format of the image
    var imgFormat = data.imgFormat || imgFormats.get(destImg) || 'png',
        cssFormat = data.cssFormat || cssFormats.get(destCSS) || 'json';

    // Run through spritesmith
    // TODO: Specify algorithm specification
    // TODO: Generate png or jpeg depending on extension
    spritesmith({'src': srcFiles}, function (err, result) {
      // If an error occurred, callback with it
      if (err) {
        return cb(err);
      }

      // Otherwise, write out the result to destImg
      fs.writeFileSync(destImg, result.image, 'binary');

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
      fs.writeFileSync(destCSS, cssStr, 'utf8');

      // Callback
      cb(true);
    });
  }

  // Export the SpriteMaker function
  grunt.registerMultiTask('sprite', 'Spritesheet making utility', SpriteMaker);
};