// Load in dependencies
var assert = require('assert');
var fs = require('fs');

// Set up default variables
var expectedDir = __dirname + '/expected_files/';
var actualDir = __dirname + '/scratch/';

// Start our tests
describe('grunt-spritesmith', function () {
  describe('converting a set of images', function () {
    it('generates an image', function () {
      // Load in the images
      // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there
      //   (i.e. are the images 90% similar)
      // var expectedCanvasImage = fs.readFileSync(expectedDir + 'canvas.png', 'binary');
      // var expectedGmImage = fs.readFileSync(expectedDir + 'gm.png', 'binary');
      var actualImage = fs.readFileSync(actualDir + 'sprite.png', 'binary');
      // var matchesImage = expectedCanvasImage === actualImage || expectedGmImage === actualImage;

      // Assert they are equal
      // TODO: Perform more accurate assertion
      assert(actualImage, 'Actual image does not match expected image');
    });

    it('generates CSS variables', function () {
      // Load in the sprite positions
      // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
      //   Stylus or a meta-language
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.styl', 'utf8');

      // Make sure the outputs match
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });

  describe('generating a jpg and JSON', function () {
    it('generates a jpg', function () {
      // Load in the images
      // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there
      //   (i.e. are the images 90% similar)
      var actualImage = fs.readFileSync(actualDir + 'sprite.jpg', 'binary');

      // Assert they are equal
      // TODO: Perform more accurate assertion
      assert(actualImage, 'Actual image does not match expected image');
    });

    it('generates JSON', function () {
      // Load in the sprite positions
      // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
      //   Stylus or a meta-language
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.json', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.json', 'utf8');

      // Make sure the outputs match
      assert.deepEqual(JSON.parse(actualCoords), JSON.parse(expectedCoords),
        'Generated output doesn\'t match expected output.');
    });
  });

  describe('running a task using overrides', function () {
    it('generates an image', function () {
      // Load in the images
      // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there
      //   (i.e. are the images 90% similar)
      var actualImage = fs.readFileSync(actualDir + 'sprite.overrides.png', 'binary');

      // Assert they are equal
      // TODO: Perform more accurate assertion
      assert(actualImage, 'Actual image does not match expected image');
    });

    it('generates coordinates', function () {
      // Load in the sprite positions
      // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
      //   Stylus or a meta-language
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.overrides.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.overrides.styl', 'utf8');

      // Make sure the outputs match
      assert.deepEqual(JSON.parse(actualCoords), JSON.parse(expectedCoords),
        'Generated output doesn\'t match expected output.');
    });
  });

  describe('generating an image in a nested location', function () {
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
    it('generates an empty image', function () {
      var img = fs.readFileSync(actualDir + 'empty/sprite.png', 'binary');
      assert.strictEqual(img, '');
    });

    it('generates no coordinates', function () {
      var coords = fs.readFileSync(actualDir + 'empty/sprite_positions.json', 'utf8');
      assert.strictEqual(coords, '{}');
    });
  });

  // DEV: This is testing an edge case. CSS options are not critical for module functionality.
  describe('running a task with css options', function () {
    it('uses the new selector', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'css_opts/sprite_positions.css', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'css_opts/sprite_positions.css', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  describe('running a task with a custom template function', function () {
    it('uses the template', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions_custom_function_template.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions_custom_function_template.styl', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  describe('running a task with a custom mustache template', function () {
    it('uses the template', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions_custom_mustache_template.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'sprite_positions_custom_mustache_template.styl', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  describe('running a task with custom CSS variable names', function () {
    it('uses the new variable names', function () {
      var expectedCoords = fs.readFileSync(expectedDir + 'css_var_map/sprite_positions.styl', 'utf8');
      var actualCoords = fs.readFileSync(actualDir + 'css_var_map/sprite_positions.styl', 'utf8');
      assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
    });
  });
});
