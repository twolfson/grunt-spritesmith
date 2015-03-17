// Load in dependencies
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var async = require('async');
var templater = require('spritesheet-templates');
var spritesmith = require('spritesmith');
var url = require('url2');

// Define class to contain different extension handlers
function ExtFormat() {
  this.formatObj = {};
}
ExtFormat.prototype = {
  add: function (name, val) {
    this.formatObj[name] = val;
  },
  get: function (filepath) {
    // Grab the extension from the filepath
    var ext = path.extname(filepath);
    var lowerExt = ext.toLowerCase();

    // Look up the file extenion from our format object
    var formatObj = this.formatObj;
    var format = formatObj[lowerExt];
    return format;
  }
};

// Create img and css formats
var imgFormats = new ExtFormat();
var cssFormats = new ExtFormat();

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

module.exports = function gruntSpritesmith (grunt) {
  // Create a SpriteMaker function
  function SpriteMaker() {
    // Grab the raw configuration
    var data = this.data;

    // If we were invoked via `grunt-newer`, re-localize the info
    if (data.src === undefined && data.files) {
      data = data.files[0] || {};
    }

    // Determine the origin and destinations
    var src = data.src;
    var destImg = data.dest;
    var destCss = data.destCss;
    var cssTemplate = data.cssTemplate;
    var that = this;

    // Verify all properties are here
    if (!src || !destImg || !destCss) {
      return grunt.fatal('grunt.sprite requires a src, dest (img), and destCss property');
    }

    // Expand all filepaths (e.g. `*.png` -> `home.png`)
    var srcFiles = grunt.file.expand(src);

    // If there are settings for retina
    var srcRetinaFiles;
    var srcRetinaFilter = data.srcRetinaFilter;
    var destRetina = data.destRetina;
    if (srcRetinaFilter || destRetina) {
      // Verify our required set is present
      if (!srcRetinaFilter || !destRetina) {
        return grunt.fatal('Retina settings detected. We must have both `srcRetinaFilter` and `destRetina` ' +
          'provided for retina to work');
      }

      // Filter out our retina files
      srcRetinaFiles = [];
      srcFiles = srcFiles.filter(function filterSrcFile (filepath) {
        // If we have a retina file, filter it out
        if (grunt.file.match(srcRetinaFilter, filepath).length) {
          srcRetinaFiles.push(filepath);
          return false;
        // Otherwise, keep it in the src files
        } else {
          return true;
        }
      });
    }

    // Create an async callback
    var cb = this.async();

    // Determine the format of the image
    var imgOpts = data.imgOpts || {};
    var imgFormat = imgOpts.format || imgFormats.get(destImg) || 'png';

    // Set up the defautls for imgOpts
    _.defaults(imgOpts, {format: imgFormat});

    // Perpare spritesmith parameters
    var spritesmithParams = {
      src: srcFiles,
      engine: data.engine,
      algorithm: data.algorithm,
      padding: data.padding || 0,
      algorithmOpts: data.algorithmOpts || {},
      engineOpts: data.engineOpts || {},
      exportOpts: imgOpts
    };

    // In parallel
    async.parallel([
      // Run our normal task
      function normalSpritesheet (callback) {
        spritesmith(spritesmithParams, callback);
      },
      // If we have a retina task, run it as well
      function retinaSpritesheet (callback) {
        if (srcRetinaFiles) {
          var retinaParams = _.defaults({
            src: srcRetinaFiles
          }, spritesmithParams);
          spritesmith(retinaParams, callback);
        } else {
          process.nextTick(callback);
        }
      }
    ], function handleSpritesheets (err, resultArr) {
      // If an error occurred, callback with it
      if (err) {
        grunt.fatal(err);
        return cb(err);
      }

      // TODO: Handle multiple results with a lot of conditionals =(

      // Otherwise, write out the result to destImg
      var destImgDir = path.dirname(destImg);
      grunt.file.mkdir(destImgDir);
      fs.writeFileSync(destImg, result.image, 'binary');

      // Generate a listing of CSS variables
      var coordinates = result.coordinates;
      var properties = result.properties;
      var spritePath = data.imgPath || url.relative(destCss, destImg);
      var spritesheetInfo = {
        width: properties.width,
        height: properties.height,
        image: spritePath
      };
      var cssVarMap = data.cssVarMap || function noop () {};
      var cleanCoords = [];

      // Clean up the file name of the file
      Object.getOwnPropertyNames(coordinates).sort().forEach(function (file) {
        // Extract the image name (exlcuding extension)
        var fullname = path.basename(file);
        var nameParts = fullname.split('.');

        // If there is are more than 2 parts, pop the last one
        if (nameParts.length >= 2) {
          nameParts.pop();
        }

        // Extract out our name
        var name = nameParts.join('.');
        var coords = coordinates[file];

        // Specify the image for the sprite
        coords.name = name;
        coords.source_image = file;
        // DEV: `image`, `total_width`, `total_height` are deprecated as they are overwritten in `spritesheet-templates`
        coords.image = spritePath;
        coords.total_width = properties.width;
        coords.total_height = properties.height;

        // Map the coordinates through cssVarMap
        coords = cssVarMap(coords) || coords;

        // Save the cleaned name and coordinates
        cleanCoords.push(coords);
      });

      var cssFormat = 'spritesmith-custom';
      var cssOptions = data.cssOpts || {};

      // If there's a custom template, use it
      if (cssTemplate) {
        if (typeof cssTemplate === 'function') {
          templater.addTemplate(cssFormat, cssTemplate);
        } else {
          templater.addMustacheTemplate(cssFormat, fs.readFileSync(cssTemplate, 'utf8'));
        }
      } else {
      // Otherwise, override the cssFormat and fallback to 'json'
        cssFormat = data.cssFormat || cssFormats.get(destCss) || 'json';
      }

      // Render the variables via `spritesheet-templates`
      var cssStr = templater({
        items: cleanCoords,
        spritesheet: spritesheetInfo
      }, {
        format: cssFormat,
        formatOpts: cssOptions,
        spritesheetName: data.cssSpritesheetName
      });

      // Write it out to the CSS file
      var destCssDir = path.dirname(destCss);
      grunt.file.mkdir(destCssDir);
      fs.writeFileSync(destCss, cssStr, 'utf8');

      // Fail task if errors were logged.
      if (that.errorCount) { cb(false); }

      // Otherwise, print a success message.
      grunt.log.writeln('Files "' + destCss + '", "' + destImg + '" created.');

      // Callback
      cb(true);
    });
  }

  // Export the SpriteMaker function
  grunt.registerMultiTask('sprite', 'Spritesheet making utility', SpriteMaker);
};
