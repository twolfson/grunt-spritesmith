var spritesmith = require('spritesmith'),
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
    var data = this.data,
        src = data.src,
        destImg = data.destImg,
        destCSS = data.destCSS,
        cssTemplate = data.cssTemplate,
        that = this;

    // Verify all properties are here
    if (!src || !destImg || !destCSS) {
      return grunt.fatal("grunt.sprite requires a src, destImg, and destCSS property");
    }

    // Load in all images from the src
    var srcFiles = grunt.file.expand(src);

    // Create an async callback
    var cb = this.async();

    // Determine the format of the image
    var imgOpts = data.imgOpts || {},
        imgFormat = imgOpts.format || imgFormats.get(destImg) || 'png';

    // Set up the defautls for imgOpts
    _.defaults(imgOpts, {'format': imgFormat});

    // Run through spritesmith
    var spritesmithParams = {
          'src': srcFiles,
          'engine': data.engine || 'auto',
          'algorithm': data.algorithm || 'top-down',
          'padding': data.padding || 0,
          'algorithmOpts': data.algorithmOpts || {},
          'engineOpts': data.engineOpts || {},
          'exportOpts': imgOpts
        };
    spritesmith(spritesmithParams, function (err, result) {
      // If an error occurred, callback with it
      if (err) {
        grunt.fatal(err);
        return cb(err);
      }

      // Otherwise, write out the result to destImg
      var destImgDir = path.dirname(destImg);
      grunt.file.mkdir(destImgDir);
      fs.writeFileSync(destImg, result.image, 'binary');

      // Generate a listing of CSS variables
      var coordinates = result.coordinates,
          properties = result.properties,
          spritePath = data.imgPath || url.relative(destCSS, destImg),
          cssVarMap = data.cssVarMap || function noop () {},
          cleanCoords = [];

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
        coords.source_image = file;
        coords.image = spritePath;
        coords.total_width = properties.width;
        coords.total_height = properties.height;

        // Map the coordinates through cssVarMap
        coords = cssVarMap(coords) || coords;

        // Save the cleaned name and coordinates
        cleanCoords.push(coords);
      });

      var cssFormat = 'spritesmith-custom',
          cssOptions = data.cssOpts || {};

      // If there's a custom template, use it
      if (cssTemplate) {
        if (typeof cssTemplate === 'function') {
          json2css.addTemplate(cssFormat, cssTemplate);
        } else {
          json2css.addMustacheTemplate(cssFormat, fs.readFileSync(cssTemplate, 'utf8'));
        }
      } else {
      // Otherwise, override the cssFormat and fallback to 'json'
        cssFormat = data.cssFormat || cssFormats.get(destCSS) || 'json';
      }

      // Render the variables via json2css
      var cssStr = json2css(cleanCoords, {'format': cssFormat, 'formatOpts': cssOptions});

      // Write it out to the CSS file
      var destCSSDir = path.dirname(destCSS);
      grunt.file.mkdir(destCSSDir);
      fs.writeFileSync(destCSS, cssStr, 'utf8');

      // Fail task if errors were logged.
      if (that.errorCount) { cb(false); }

      // Otherwise, print a success message.
      grunt.log.writeln('Files "' + destCSS + '", "' + destImg + '" created.');

      // Callback
      cb(true);
    });
  }

  // Export the SpriteMaker function
  grunt.registerMultiTask('sprite', 'Spritesheet making utility', SpriteMaker);
};
