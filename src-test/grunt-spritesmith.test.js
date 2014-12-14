// Load in dependencies
var assert = require('assert');
var fs = require('fs');

// Set up default variables
var expectedDir = __dirname + '/expected_files/';
var actualDir = __dirname + '/scratch/';

// Start our tests
describe('grunt-spritesmith', function () {
  it('default', function () {
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

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
    //   Stylus or a meta-language
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.styl', 'utf8');

    // Make sure the outputs match
    assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
  });

  it('jpg,json', function () {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there
    //   (i.e. are the images 90% similar)
    var actualImage = fs.readFileSync(actualDir + 'sprite.jpg', 'binary');

    // Assert they are equal
    // TODO: Perform more accurate assertion
    assert(actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
    //   Stylus or a meta-language
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.json', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.json', 'utf8');

    // Make sure the outputs match
    assert.deepEqual(JSON.parse(actualCoords), JSON.parse(expectedCoords),
      'Generated output doesn\'t match expected output.');
  });

  it('overrides', function () {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there
    //   (i.e. are the images 90% similar)
    var actualImage = fs.readFileSync(actualDir + 'sprite.overrides.png', 'binary');

    // Assert they are equal
    // TODO: Perform more accurate assertion
    assert(actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
    //   Stylus or a meta-language
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.overrides.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.overrides.styl', 'utf8');

    // Make sure the outputs match
    assert.deepEqual(JSON.parse(actualCoords), JSON.parse(expectedCoords),
      'Generated output doesn\'t match expected output.');
  });

  it('nested', function () {
    // Load in the coordinates and extract the path to the sprite file
    var coords = fs.readFileSync(actualDir + '3/4/sprite_positions.styl', 'utf8');

    // Assert the path is the relative one we expect
    assert.notEqual(coords.indexOf('../../nested/1/2/spritesheet.png'), -1);
  });

  // DEV: This is for testing an edge case -- don't let this strawman you in maintenance.
  it('empty', function () {
    // Setup
    var img = fs.readFileSync(actualDir + 'empty/sprite.png', 'binary');
    var coords = fs.readFileSync(actualDir + 'empty/sprite_positions.json', 'utf8');

    // Assert that an empty file and JSON blob are created
    assert.strictEqual(img, '');
    assert.strictEqual(coords, '{}');
  });

  // DEV: This is testing an edge case. CSS options are not critical for module functionality.
  it('cssOpts', function () {
    // Setup
    var expectedCoords = fs.readFileSync(expectedDir + 'css_opts/sprite_positions.css', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'css_opts/sprite_positions.css', 'utf8');

    // Make sure the outputs match
    assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  it('cssFunctionTemplate', function () {
    // Setup
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions_custom_function_template.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions_custom_function_template.styl', 'utf8');

    // Make sure the outputs match
    assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  it('cssMustacheTemplate', function () {
    // Setup
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions_custom_mustache_template.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions_custom_mustache_template.styl', 'utf8');

    // Make sure the outputs match
    assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
  });

  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  it('cssVarMap', function () {
    // Setup
    var expectedCoords = fs.readFileSync(expectedDir + 'css_var_map/sprite_positions.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'css_var_map/sprite_positions.styl', 'utf8');

    // Make sure the outputs match
    assert.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');
  });
});
