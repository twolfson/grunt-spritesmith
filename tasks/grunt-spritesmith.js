/*

grunt-spritesmith

*/

module.exports = function(grunt) {

  // import deps
  var path = require('path');
  var fs = require('fs');
  var spritesmith = require('spritesmith');
  var json2css = require('json2css');

  //register the task in grunt
  grunt.registerMultiTask('sprite', 'Images to Sprites via spritesmith', function() {

    // Merge in options to local scope
    var options = this.options({
      'imgPath': '',
      'algorithm': 'alt-diagonal',
      'cssname' : 'style.json',
      'spritename' : 'sprite.png',
      'engine': 'gm',
      'cssFormat': 'json',
      'imgOpts': {
         'format': 'png'
      }
    });

    var done = this.async();
    var files = this.files;

    function cleanResultCoords(result) {
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

      return cleanCoords;
    }

    //loop files    
    files.forEach(function(f, i) {
      // get the destination directory and set outfile names
      var dest = f.dest;
      var spritePath = f.dest + options.spritename;
      var stylePath = f.dest + options.cssname;

      // check all our files exist
      var images = f.src.filter(function(filepath) {
        return grunt.file.exists(filepath);
      });

      var spritesmithParams = {
        'src': images,
        'engine': options.engine || 'auto',
        'algorithm': options.algorithm || 'top-down',
        'exportOpts': options.imgOpts
      };

      //hacky diretory write
      if(!fs.existsSync(spritePath)){
        grunt.file.write(spritePath);
        grunt.file.delete(spritePath); //todo : jshint options
      }
      
      spritesmith(spritesmithParams, function (err, result) {
        if(!err) {
          var imgData = result.image;
          var cssData = json2css(cleanResultCoords(result), {format : options.cssFormat, formatOptions : options.imgPath});
          //write out the sprite
          fs.writeFileSync(spritePath, imgData, 'binary');
          //write out the CSS
          grunt.file.write(stylePath, cssData);
          //log
          grunt.log.writeln(spritePath +  " : " + ("OK").green);
        } else {
          grunt.log.warn('Smitesmith error for ' + dest);
          console.log(err);
          done(false);
        }
        //are we done?
        if(i == files.length -1) {          
          done(true);
        }
      });
    });
  });
};