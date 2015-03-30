// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');
var getPixels = require('get-pixels');
var gruntUtils = require('./utils/grunt');

// Set up default variables
var expectedDir = __dirname + '/expected_files/';
var actualDir = __dirname + '/scratch/';

// Clean up output directory
before(function cleanupActualDir (done) {
  rimraf(actualDir, done);
});

// Start our tests
describe('grunt-spritesmith', function () {
  describe('converting a set of images', function () {
    gruntUtils.runTask('sprite:basic');

    it('generates an image', function (done) {
      // Load in the images and compare them
      getPixels(actualDir + 'sprite.basic.png', function handleActualPixels (err, actualImage) {
        if (err) { return done(err); }
        getPixels(expectedDir + 'pixelsmith.basic.png', function handleExpectedPixels (err, expectedImage) {
          if (err) { return done(err); }
          assert.deepEqual(actualImage, expectedImage, 'Actual image does not match expected image');
          done();
        });
      });
    });

    it('generates CSS variables', function () {
      // Load in the sprite positions
      // TODO: Assert the same variables exist -- which means loading this into either Stylus or a meta-language
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.basic.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.basic.styl', 'utf8');

      // Make sure the outputs match
      assert.strictEqual(actualCoords, expectedCoords);
    });
  });

  describe('converting a retina set of images', function () {
    gruntUtils.runTask('sprite:retina');

    it('generates an image', function (done) {
      // Load in the images and compare them
      getPixels(actualDir + 'sprite.retina.png', function handleActualPixels (err, actualImage) {
        if (err) { return done(err); }
        getPixels(expectedDir + 'pixelsmith.retina.png', function handleExpectedPixels (err, expectedImage) {
          if (err) { return done(err); }
          assert.deepEqual(actualImage, expectedImage, 'Actual image does not match expected image');
          done();
        });
      });
    });

    it('generates a retina image', function (done) {
      // Load in the images and compare them
      this.timeout(10000);
      getPixels(actualDir + 'sprite.retina-2x.png', function handleActualPixels (err, actualImage) {
        if (err) { return done(err); }
        getPixels(expectedDir + 'pixelsmith.retina-2x.png', function handleExpectedPixels (err, expectedImage) {
          if (err) { return done(err); }
          assert.deepEqual(actualImage, expectedImage, 'Actual image does not match expected image');
          done();
        });
      });
    });

    it('generates CSS and retina variables', function () {
      // Load in the sprite positions
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.retina.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.retina.styl', 'utf8');

      // Make sure the outputs match
      assert.strictEqual(actualCoords, expectedCoords);
    });
  });

  describe('generating a jpg and JSON', function () {
    gruntUtils.runTask('sprite:jpg,json');

    it('generates a jpg', function () {
      // Load in the images
      var actualImage = fs.readFileSync(actualDir + 'sprite.basic.jpg', 'binary');

      // Assert they are equal
      // TODO: Perform more accurate assertion (currently skipped due to being a JPG)
      assert(actualImage, 'Actual image does not match expected image');
    });

    it('generates JSON', function () {
      // Load in the sprite positions
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.basic.json', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.basic.json', 'utf8');

      // Make sure the outputs match
      assert.deepEqual(JSON.parse(actualCoords), JSON.parse(expectedCoords),
        'Generated output doesn\'t match expected output.');
    });
  });

  describe('running a task using overrides', function () {
    gruntUtils.runTask('sprite:overrides');

    it('generates an image', function () {
      // Load in the images
      var actualImage = fs.readFileSync(actualDir + 'sprite.overrides.png', 'binary');

      // Assert they are equal
      // TODO: Perform more accurate assertion (currently skipped due to being a JPG)
      assert(actualImage, 'Actual image does not match expected image');
    });

    it('generates coordinates', function () {
      // Load in the sprite positions
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.overrides.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.overrides.styl', 'utf8');

      // Make sure the outputs match
      assert.deepEqual(JSON.parse(actualCoords), JSON.parse(expectedCoords),
        'Generated output doesn\'t match expected output.');
    });
  });

  describe('generating an image in a nested location', function () {
    gruntUtils.runTask('sprite:nested');

    // TODO: Not entirely sure about the name of this test
    it('resolves a collapsed path', function () {
      // Load in the coordinates and extract the path to the sprite file
      var coords = fs.readFileSync(actualDir + '3/4/sprite_positions.styl', 'utf8');

      // Assert the path is the relative one we expect
      assert.notEqual(coords.indexOf('../../nested/1/2/spritesheet.png'), -1);
    });
  });
});

// Edge cases
describe('grunt-spritesmith', function () {
  // DEV: This is for testing an edge case -- don't let this strawman you in maintenance.
  describe('running a task with no images', function () {
    gruntUtils.runTask('sprite:empty');

    it('generates an empty image', function () {
      var img = fs.readFileSync(actualDir + 'sprite.empty.png', 'binary');
      assert.strictEqual(img, '');
    });

    it('generates no coordinates', function () {
      var coords = fs.readFileSync(actualDir + 'sprite_positions.empty.json', 'utf8');
      assert.strictEqual(coords, '{}');
    });
  });

  // DEV: This is testing an edge case. CSS options are not critical for module functionality.
  describe('running a task with css options', function () {
    gruntUtils.runTask('sprite:cssOpts');

    it('uses the new selector', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.cssOpts.css', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.cssOpts.css', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  describe('running a task with a custom template function', function () {
    gruntUtils.runTask('sprite:cssFunctionTemplate');

    it('uses the template', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.cssFunctionTemplate.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.cssFunctionTemplate.styl', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  describe('running a task with a custom handlebars template', function () {
    gruntUtils.runTask('sprite:cssHandlebarsTemplate');

    it('uses the template', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.cssHandlebarsTemplate.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.cssHandlebarsTemplate.styl', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  describe('running a task with custom CSS variable names', function () {
    gruntUtils.runTask('sprite:cssVarMap');

    it('uses the new variable names', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.cssVarMap.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.cssVarMap.styl', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });

  describe('running a retina task with custom CSS variable names', function () {
    gruntUtils.runTask('sprite:retinaMapped');

    it('uses the new variable names', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.retinaMapped.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.retinaMapped.styl', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });
});

describe('grunt-newer running grunt-spritesmith', function () {
  gruntUtils.runTask('newer:sprite:newer');

  it('has no errors', function () {
    assert.strictEqual(this.err, null);
  });

  it('generates an image', function () {
    var actualStats = fs.statSync(actualDir + 'sprite.newer.png');
    assert(actualStats);
  });
});
