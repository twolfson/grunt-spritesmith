var spritesmith = require('spritesmith'),
    async = require('async'),
    json2css = require('json2css'),
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    url = require('url2');

function ExtFormat() {
  this.formatObj = {};
}
ExtFormat.prototype = {
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
imgFormats.add('.png', 'png');
imgFormats.add('.jpg', 'jpeg');
imgFormats.add('.jpeg', 'jpeg');

// Add our css formats
cssFormats.add('.styl', 'stylus');
cssFormats.add('.stylus', 'stylus');
cssFormats.add('.sass', 'sass');
cssFormats.add('.scss', 'scss');
cssFormats.add('.less', 'less');
cssFormats.add('.json', 'json');
cssFormats.add('.css', 'css');

module.exports = function (grunt) {
  // Create a SpriteMaker function
  function SpriteMaker() {
    var data = this.options({}),
        destCSS = data.destCSS,
        cssTemplate = data.cssTemplate,
        that = this;

    // Verify all properties are here 
    if (this.files.length === 0) {
      return grunt.fatal("grunt.sprite requires files.");
    }
    if (!destCSS) {
      return grunt.fatal('grunt.sprite requires a "destCSS" property.');
    }

    // Create an async callback
    var cb = this.async();

    // A list of objects containing sprite coordinates.
    var cleanCoords = [];

    // Process one entry from "this.files".  Write the destination image file
    // and add items to cleanCoords.
    var processFilesEntry = function(file, callback) {
      if (!file.dest || file.src.length === 0) {
        callback("missing 'dest' or 'src'");
        return;
      }

      // Determine the format of the image
      var imgOpts = data.imgOpts || {},
          imgFormat = imgOpts.format || imgFormats.get(destImg) || 'png';

      // Set up the defautls for imgOpts
      _.defaults(imgOpts, {'format': imgFormat});

      // Run through spritesmith
      var spritesmithParams = {
        'src': file.src,
        'engine': data.engine || 'auto',
        'algorithm': data.algorithm || 'top-down',
        'padding': data.padding || 0,
        'engineOpts': data.engineOpts || {},
        'exportOpts': imgOpts
      };
      var destImg = file.dest;
      spritesmith(spritesmithParams, function (err, result) {
        // If an error occurred, callback with it
        if (err) {
          grunt.fatal(err);
          return callback(err);
        }

        // Otherwise, write out the result to destImg
        var destImgDir = path.dirname(destImg);
        grunt.file.mkdir(destImgDir);
        fs.writeFileSync(destImg, result.image, 'binary');

        grunt.verbose.writeln('File "' + destImg + '" created.');

        // Generate a listing of CSS variables
        var coordinates = result.coordinates,
            properties = result.properties,
            spritePath = data.imgPath || url.relative(destCSS, destImg),
            cssVarMap = data.cssVarMap || function noop () {};

        // Clean up the file name of the file
        Object.getOwnPropertyNames(coordinates).sort().forEach(function (file) {
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

          // Specify the image for the sprite
          coords.name = name;
          coords.image = spritePath;
          coords.total_width = properties.width;
          coords.total_height = properties.height;

          // Map the coordinates through cssVarMap
          coords = cssVarMap(coords) || coords;

          // Save the cleaned name and coordinates
          cleanCoords.push(coords);
        });

        callback(null);
      });
    };

    // Be very conservative with parallelization.
    // Some of spritesmith engines blow up on file descriptor limits
    // if the parallelization is high - particularly on MacOS which has
    // an extremely low default file descriptor limit.
    var parallelLimit = 2;
    async.eachLimit(this.files, parallelLimit, processFilesEntry, function(err) {
      if (err) {
        grunt.fatal(err);
        return cb(false);
      }

      var cssFormat = 'spritesmith-custom',
          cssOptions = data.cssOpts || {};

      // If there's a custom template, use it
      if (cssTemplate) {
        json2css.addMustacheTemplate(cssFormat, fs.readFileSync(cssTemplate, 'utf8'));
      } else {
      // Otherwise, override the cssFormat and fallback to 'json'
        cssFormat = data.cssFormat || cssFormats.get(destCSS) || 'json';
      }

      // Set a flag that mustache templates can use to know if this is the last item.
      // This is useful when a template wants to emit comma-separated items.
      cleanCoords[cleanCoords.length-1].last = true;

      // Render the variables via json2css
      var cssStr = json2css(cleanCoords, {'format': cssFormat, 'formatOpts': cssOptions});

      // Write it out to the CSS file
      var destCSSDir = path.dirname(destCSS);
      grunt.file.mkdir(destCSSDir);
      fs.writeFileSync(destCSS, cssStr, 'utf8');

      // Fail task if errors were logged.
      if (that.errorCount) { cb(false); }

      // Otherwise, print a success message.
      grunt.verbose.writeln('File "' + destCSS + '" created.');
      cb(true);
    });
  }

  // Export the SpriteMaker function
  grunt.registerMultiTask('sprite', 'Spritesheet making utility', SpriteMaker);
};