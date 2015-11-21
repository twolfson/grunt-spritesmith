// Load in dependencies
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var async = require('async');
var templater = require('spritesheet-templates');
var Spritesmith = require('spritesmith');
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

function getCoordinateName(filepath) {
  // Extract the image name (exlcuding extension)
  var fullname = path.basename(filepath);
  var nameParts = fullname.split('.');

  // If there is are more than 2 parts, pop the last one
  if (nameParts.length >= 2) {
    nameParts.pop();
  }

  // Return our modified filename
  return nameParts.join('.');
}

module.exports = function gruntSpritesmith (grunt) {
  // Create a gruntSpritesmithFn function
  function gruntSpritesmithFn() {
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
    var retinaSrcFiles;
    var retinaSrcFilter = data.retinaSrcFilter;
    var retinaDestImg = data.retinaDest;
    if (retinaSrcFilter || retinaDestImg) {
      grunt.log.debug('Retina settings detected');

      // Verify our required set is present
      if (!retinaSrcFilter || !retinaDestImg) {
        return grunt.fatal('Retina settings detected. We must have both `retinaSrcFilter` and `retinaDest` ' +
          'provided for retina to work');
      }

      // Filter out our retina files
      retinaSrcFiles = [];
      srcFiles = srcFiles.filter(function filterSrcFile (filepath) {
        // If we have a retina file, filter it out
        if (grunt.file.match(retinaSrcFilter, filepath).length) {
          retinaSrcFiles.push(filepath);
          return false;
        // Otherwise, keep it in the src files
        } else {
          return true;
        }
      });
      grunt.verbose.writeln('Retina images found: ' + retinaSrcFiles.join(', '));

      // If we have a different amount of normal and retina images, complain and leave
      if (srcFiles.length !== retinaSrcFiles.length) {
        return grunt.fatal('Retina settings detected but ' + retinaSrcFiles.length + ' retina images were found. ' +
          'We have ' + srcFiles.length + ' normal images and expect these numbers to line up. ' +
          'Please double check `retinaSrcFilter`.');
      }
    }

    // Create an async callback
    var callback = this.async();

    // Determine the format of the image
    var imgOpts = data.imgOpts || {};
    var imgFormat = imgOpts.format || imgFormats.get(destImg) || 'png';

    // Set up the defautls for imgOpts
    _.defaults(imgOpts, {format: imgFormat});

    // Prepare spritesmith parameters
    var spritesmithParams = {
      engine: data.engine,
      algorithm: data.algorithm,
      padding: data.padding || 0,
      algorithmOpts: data.algorithmOpts || {},
      engineOpts: data.engineOpts || {},
      exportOpts: imgOpts
    };

    // Construct our spritesmiths
    var spritesmith = new Spritesmith(spritesmithParams);
    var retinaSpritesmithParams;
    var retinaSpritesmith;
    if (retinaSrcFiles) {
      retinaSpritesmithParams = _.defaults({
        padding: spritesmithParams.padding * 2
      }, spritesmithParams);
      retinaSpritesmith = new Spritesmith(retinaSpritesmithParams);
    }

    // In parallel
    async.parallel([
      // Load in our normal images
      function generateNormalImages (callback) {
        spritesmith.createImages(srcFiles, callback);
      },
      // If we have retina images, load them in as well
      function generateRetinaImages (callback) {
        if (retinaSrcFiles) {
          retinaSpritesmith.createImages(retinaSrcFiles, callback);
        } else {
          process.nextTick(callback);
        }
      }
    ], function handleImages (err, resultArr) {
      // If an error occurred, callback with it
      if (err) {
        grunt.fatal(err);
        return callback(err);
      }

      // Otherwise, validate our images line up
      var normalSprites = resultArr[0];
      var retinaSprites = resultArr[1];
      // TODO: Validate error looks good
      if (retinaSprites) {
        normalSprites.forEach(function validateSprites (normalSprite, i) {
          var retinaSprite = retinaSprites[i];
          if (retinaSprite.width !== normalSprite.width * 2 || retinaSprite.height !== normalSprite.height * 2) {
            grunt.log.warn('Normal sprite has inconsistent size with retina sprite. ' +
              '"' + srcFiles[i] + '" is ' + normalSprite.width + 'x' + normalSprite.height + ' while ' +
              '"' + retinaSrcFiles[i] + '" is ' + retinaSprite.width + 'x' + retinaSprite.height + '.');
          }
        });
      }

      // Process our sprites into spritesheets
      var result = spritesmith.processImages(normalSprites, spritesmithParams);
      var retinaResult;
      if (retinaSprites) {
        retinaResult = retinaSpritesmith.processImages(retinaSprites, retinaSpritesmithParams);
      }

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
      Object.getOwnPropertyNames(coordinates).sort().forEach(function prepareTemplateData (file) {
        // Extract out our name
        var name = getCoordinateName(file);
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

      // If we have retina sprites
      var retinaCleanCoords;
      var retinaGroups;
      var retinaSpritesheetInfo;
      if (retinaResult) {
        // Generate a listing of CSS variables
        var retinaCoordinates = retinaResult.coordinates;
        var retinaProperties = retinaResult.properties;
        var retinaSpritePath = data.retinaImgPath || url.relative(destCss, retinaDestImg);
        retinaSpritesheetInfo = {
          width: retinaProperties.width,
          height: retinaProperties.height,
          image: retinaSpritePath
        };
        // DEV: We reuse cssVarMap
        retinaCleanCoords = [];

        // Clean up the file name of the file
        Object.getOwnPropertyNames(retinaCoordinates).sort().forEach(function prepareRetinaTemplateData (file) {
          var name = getCoordinateName(file);
          var coords = retinaCoordinates[file];
          coords.name = name;
          coords.source_image = file;
          coords.image = retinaSpritePath;
          coords.total_width = retinaProperties.width;
          coords.total_height = retinaProperties.height;
          coords = cssVarMap(coords) || coords;
          retinaCleanCoords.push(coords);
        });

        // Generate groups for our coordinates
        retinaGroups = cleanCoords.map(function getRetinaGroups (normalSprite, i) {
          // DEV: Name is inherited from `cssVarMap` on normal sprite
          return {
            name: normalSprite.name,
            index: i
          };
        });
      }

      // If we have handlebars helpers, register them
      var handlebarsHelpers = data.cssHandlebarsHelpers;
      if (handlebarsHelpers) {
        Object.keys(handlebarsHelpers).forEach(function registerHelper (helperKey) {
          templater.registerHandlebarsHelper(helperKey, handlebarsHelpers[helperKey]);
        });
      }

      // If there is a custom template, use it
      var cssFormat = 'spritesmith-custom';
      var cssOptions = data.cssOpts || {};
      if (cssTemplate) {
        if (typeof cssTemplate === 'function') {
          templater.addTemplate(cssFormat, cssTemplate);
        } else {
          templater.addHandlebarsTemplate(cssFormat, fs.readFileSync(cssTemplate, 'utf8'));
        }
      // Otherwise, override the cssFormat and fallback to 'json'
      } else {
        cssFormat = data.cssFormat;
        if (!cssFormat) {
          cssFormat = cssFormats.get(destCss) || 'json';

          // If we are dealing with retina items, move to retina flavor (e.g. `scss` -> `scss_retina`)
          if (retinaGroups) {
            cssFormat += '_retina';
          }
        }
      }

      // Render the variables via `spritesheet-templates`
      var cssStr = templater({
        sprites: cleanCoords,
        spritesheet: spritesheetInfo,
        spritesheet_info: {
          name: data.cssSpritesheetName
        },
        retina_groups: retinaGroups,
        retina_sprites: retinaCleanCoords,
        retina_spritesheet: retinaSpritesheetInfo,
        retina_spritesheet_info: {
          name: data.cssRetinaSpritesheetName
        },
        retina_groups_info: {
          name: data.cssRetinaGroupsName
        }
      }, {
        format: cssFormat,
        formatOpts: cssOptions
      });

      // Write out the content
      async.parallel([
        function outputNormalImage (cb) {
          // Create our directory
          var destImgDir = path.dirname(destImg);
          grunt.file.mkdir(destImgDir);

          // Generate our write stream and pipe the image to it
          var writeStream = fs.createWriteStream(destImg);
          writeStream.on('error', cb);
          writeStream.on('finish', cb);
          result.image.pipe(writeStream);
        },
        function outputRetinaImage (cb) {
          if (retinaResult) {
            var retinaDestImgDir = path.dirname(retinaDestImg);
            grunt.file.mkdir(retinaDestImgDir);
            var retinaWriteStream = fs.createWriteStream(retinaDestImg);
            retinaWriteStream.on('error', cb);
            retinaWriteStream.on('finish', cb);
            retinaResult.image.pipe(retinaWriteStream);
          } else {
            process.nextTick(cb);
          }
        },
        function outputCss (cb) {
          var destCssDir = path.dirname(destCss);
          grunt.file.mkdir(destCssDir);
          fs.writeFile(destCss, cssStr, 'utf8', cb);
        }
      ], function handleError (err) {
        // If there was an error, fail with it
        if (err) {
          grunt.fatal(err);
          return callback(err);
        }

        // Fail task if errors were logged
        if (that.errorCount) { callback(false); }

        // Otherwise, print a success message
        if (retinaDestImg) {
          grunt.log.writeln('Files "' + destCss + '", "' + destImg + '", "' + retinaDestImg + '" created.');
        } else {
          grunt.log.writeln('Files "' + destCss + '", "' + destImg + '" created.');
        }

        // Callback
        callback(true);
      });
    });
  }

  // Export the gruntSpritesmithFn function
  grunt.registerMultiTask('sprite', 'Spritesheet making utility', gruntSpritesmithFn);
};
