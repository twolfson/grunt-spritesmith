var fs = require('fs');

module.exports = {
  'default': function (test) {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there (i.e. are the images 90% similar)
    var expectedCanvasImage = fs.readFileSync(__dirname + '/expected_files/canvas.png', 'binary'),
        expectedGmImage = fs.readFileSync(__dirname + '/expected_files/gm.png', 'binary'),
        actualImage = fs.readFileSync(__dirname + '/scratch/sprite.png', 'binary'),
        matchesImage = expectedCanvasImage === actualImage || expectedGmImage === actualImage;

    // Assert they are equal
    test.ok(actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either Stylus or a meta-language
    var expectedCoords = fs.readFileSync(__dirname + '/expected_files/sprite_positions.styl', 'utf8'),
        actualCoords = fs.readFileSync(__dirname + '/scratch/sprite_positions.styl', 'utf8');

    // Break up the expected coords into each line
    var expectedLines = expectedCoords.split(/\n/g);

    // Iterate over each line
    expectedLines.forEach(function (line) {
      // Trim the line
      line = line.trim();

      // If there is no line, skip it
      if (!line) {
        return;
      }

      // Assert that the line exists in actualCoords
      var index = actualCoords.indexOf(line);
      test.notEqual(index, -1, 'Line not found in actual coordinates: ' + line);
    });

    // Callback since we are done testing
    test.done();
  },
  'jpg,json': function (test) {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there (i.e. are the images 90% similar)
    var expectedCanvasImage = fs.readFileSync(__dirname + '/expected_files/canvas.jpg', 'binary'),
        expectedGmImage = fs.readFileSync(__dirname + '/expected_files/gm.jpg', 'binary'),
        actualImage = fs.readFileSync(__dirname + '/scratch/sprite.jpg', 'binary'),
        matchesImage = expectedCanvasImage === actualImage || expectedGmImage === actualImage;

    // Assert they are equal
    test.ok(actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either Stylus or a meta-language
    var expectedCoords = fs.readFileSync(__dirname + '/expected_files/sprite_positions.json', 'utf8'),
        actualCoords = fs.readFileSync(__dirname + '/scratch/sprite_positions.json', 'utf8');

    // Break up the expected coords into each line
    var expectedLines = expectedCoords.split(/\n/g);

    // Iterate over each line
    expectedLines.forEach(function (line) {
      // Trim the line
      line = line.trim();

      // If there is no line, skip it
      if (!line) {
        return;
      }

      // Assert that the line exists in actualCoords
      var index = actualCoords.indexOf(line);
      test.notEqual(index, -1, 'Line not found in actual coordinates: ' + line);
    });

    // Callback since we are done testing
    test.done();
  },
  'overrides': function (test) {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there (i.e. are the images 90% similar)
    var expectedCanvasImage = fs.readFileSync(__dirname + '/expected_files/canvas.overrides.png', 'binary'),
        expectedGmImage = fs.readFileSync(__dirname + '/expected_files/gm.overrides.png', 'binary'),
        actualImage = fs.readFileSync(__dirname + '/scratch/sprite.overrides.png', 'binary'),
        matchesImage = expectedCanvasImage === actualImage || expectedGmImage === actualImage;

    // Assert they are equal
    test.ok(actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either Stylus or a meta-language
    var expectedCoords = fs.readFileSync(__dirname + '/expected_files/sprite_positions.overrides.styl', 'utf8'),
        actualCoords = fs.readFileSync(__dirname + '/scratch/sprite_positions.overrides.styl', 'utf8');

    // Break up the expected coords into each line
    var expectedLines = expectedCoords.split(/\n/g);

    // Iterate over each line
    expectedLines.forEach(function (line) {
      // Trim the line
      line = line.trim();

      // If there is no line, skip it
      if (!line) {
        return;
      }

      // Assert that the line exists in actualCoords
      var index = actualCoords.indexOf(line);
      test.notEqual(index, -1, 'Line not found in actual coordinates: ' + line);
    });

    // Callback since we are done testing
    test.done();
  },
  'filepaths': function (test) {
    // Load in the coordinates and extract the path to the sprite file
    var coords = fs.readFileSync(__dirname + '/scratch/3/4/sprite_positions.styl', 'utf8'),
        imgPathResults = coords.match(/spriteBackground\(\) \{[\n\s]+return '([^']+)'/) || [],
        imgRelPath = imgPathResults[1] || '';

    // Assert the path is the relative one we expect
    test.strictEqual(imgRelPath, '../../nested/1/2/spritesheet.png');

    // Finish the test
    test.done();
  },
  // DEV: This is for testing an edge case -- don't let this strawman you in maintenance.
  'empty': function (test) {
    // Setup
    test.expect(2);
    var img = fs.readFileSync(__dirname + '/scratch/empty/sprite.png', 'binary'),
        coords = fs.readFileSync(__dirname + '/scratch/empty/sprite_positions.json', 'utf8');

    // Assert that an empty file and JSON blob are created
    test.strictEqual(img, '');
    test.strictEqual(coords, '{}');

    // Callback
    test.done();
  }
};