# grunt-spritesmith [![Build status](https://travis-ci.org/Ensighten/grunt-spritesmith.png?branch=master)](https://travis-ci.org/Ensighten/grunt-spritesmith)

Grunt task for converting a set of images into a spritesheet and corresponding CSS variables.

A folder of icons processed by `grunt-spritesmith`:

[![Fork icon][fork-icon]][fork-icon] ![+][]
[![GitHub icon][github-icon]][github-icon] ![+][]
[![Twitter icon][twitter-icon]][twitter-icon] ![=][]

generates a spritesheet:

[![Spritesheet][spritesheet]][spritesheet]

and CSS variables (available in [CSS][], [JSON][], [SASS][], [SCSS][SASS], [LESS][], [Stylus][]):

```stylus
$fork_offset_x = 0px;
$fork_offset_y = 0px;
$fork_width = 32px;
$fork_height = 32px;
...
$github_offset_x = -32px;
$github_offset_y = 0px;
$github_width = 32px;
$github_height = 32px;
...
```

[+]: docs/plus.png
[=]: docs/equals.png
[fork-icon]: docs/fork.png
[github-icon]: docs/github.png
[twitter-icon]: docs/twitter.png
[spritesheet]: docs/spritesheet.png

[CSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JSON]: http://www.json.org/
[SASS]: http://sass-lang.com/
[LESS]: http://lesscss.org/
[Stylus]: http://learnboost.github.com/stylus/

### Cross-platform support
`grunt-spritesmith` is supported and tested on Windows, Linux, and Mac OSX.

### Do you like `grunt-spritesmith`?
[Support us via gittip][gittip] or [spread word on Twitter][twitter]

[gittip]: https://www.gittip.com/twolfson/
[twitter]: https://twitter.com/intent/tweet?text=CSS%20sprites%20made%20easy%20via%20grunt-spritesmith&url=https%3A%2F%2Fgithub.com%2FEnsighten%2Fgrunt-spritesmith&via=twolfsn

## Getting Started
`grunt-spritesmith` can be installed via npm: `npm install grunt-spritesmith`

#### If you would like to use an engine with external dependencies, [verify you have satisfied its requirements][requirements]. ####

[requirements]: #requirements

Then, add and configure it to your grunt file (`grunt.js` or `Gruntfile.js` depending on your version):

```javascript
module.exports = function (grunt) {
  // Configure grunt
  grunt.initConfig({
    sprite:{
      all: {
        src: 'path/to/your/sprites/*.png',
        destImg: 'destination/of/spritesheet.png',
        destCSS: 'destination/of/sprites.css'
      }
    }
  });

  // Load in `grunt-spritesmith`
  grunt.loadNpmTasks('grunt-spritesmith');
```

Run the `grunt sprite` task:

```bash
$ grunt sprite
Running "sprite:all" (sprite) task
Files "spritesheet.png", "sprites.styl" created.

Done, without errors.
```

Results are a spritesheet and CSS:

[![Spritesheet][spritesheet]][spritesheet]

```
.icon-fork {
  background-image: url(spritesheet.png);
  background-position: 0px 0px;
  width: 32px;
  height: 32px;
}
...
```

## Usage
`grunt-spritesmith` is a [grunt multitask][multitask]. It is configured on a per-task basis using the following template:

[multitask]: http://gruntjs.com/configuring-tasks

```js
grunt.initConfig({
  'sprite': {
    'all': {
      // Sprite files to read in
      'src': ['public/images/sprites/*.png'],

      // Location to output spritesheet
      'destImg': 'public/images/sprite.png',

      // Stylus with variables under sprite names
      'destCSS': 'public/css/sprite_positions.styl',

      // OPTIONAL: Manual override for imgPath specified in CSS
      'imgPath': '../sprite.png',

      // OPTIONAL: Specify algorithm (top-down, left-right, diagonal [\ format],
          // alt-diagonal [/ format], binary-tree [best packing])
      // Visual representations can be found below
      'algorithm': 'alt-diagonal',

      // OPTIONAL: Specify padding between images
      'padding': 2,

      // OPTIONAL: Specify engine (auto, phantomjs, canvas, gm, pngsmith)
      'engine': 'canvas',

      // OPTIONAL: Specify CSS format (inferred from destCSS' extension by default)
          // (stylus, scss, scss_maps, sass, less, json, json_array, css)
      'cssFormat': 'json',

      // OPTIONAL: Specify a function or Mustache template to use for rendering destCSS
          // Mutually exclusive to cssFormat
      // More information can be found below
      'cssTemplate': 'public/css/sprite_positions.styl.mustache',

      // OPTIONAL: Map variable of each sprite
      'cssVarMap': function (sprite) {
        // `sprite` has `name`, `image` (full path), `x`, `y`
        //   `width`, `height`, `total_width`, `total_height`
        // EXAMPLE: Prefix all sprite names with 'sprite-'
        sprite.name = 'sprite-' + sprite.name;
      },

      // OPTIONAL: Specify settings for algorithm
      'algorithmOpts': {
        // Skip sorting of images for algorithm (useful for sprite animations)
        'sort': false
      },

      // OPTIONAL: Specify settings for engine
      'engineOpts': {
        'imagemagick': true
      },

      // OPTIONAL: Specify img options
      'imgOpts': {
         // Format of the image (inferred from destImg' extension by default) (jpg, png)
         'format': 'png',

         // gm only: Quality of image
         'quality': 90,

         // phantomjs only: Milliseconds to wait before terminating PhantomJS script
         'timeout': 10000
      },

      // OPTIONAL: Specify css options
      'cssOpts': {
        // Some templates allow for skipping of function declarations
        'functions': false,

        // CSS template allows for overriding of CSS selectors
        'cssClass': function (item) {
          return '.sprite-' + item.name;
        }
      }
    }
  }
});
```

### Algorithms
|     top-down (default)    |           left-right          |          diagonal         |            alt-diagonal           |           binary-tree           |
| ------------------------- | ----------------------------- | ------------------------- | --------------------------------- | ------------------------------- |
| [![top-down][]][top-down] | [![left-right][]][left-right] | [![diagonal][]][diagonal] | [![alt-diagonal][]][alt-diagonal] | [![binary-tree][]][binary-tree] |

For best packing, use `binary-tree` which uses a solution to the [rectangle packing problem][packing-problem].

[packing-problem]: http://en.wikipedia.org/wiki/Packing_problem

If you are worried about sprites being visible within other sprites, use `alt-diagonal`.

If you are using a repeating background, `top-down` or `left-right` depending on your occasion.

The `diagonal` algorithm exists for you if you need it.

[top-down]: docs/top-down.png
[left-right]: docs/left-right.png
[diagonal]: docs/diagonal.png
[alt-diagonal]: docs/alt-diagonal.png
[binary-tree]: docs/binary-tree.png

### cssTemplate
The `cssTemplate` option allows for specification of a custom templating function or [`Mustache`][mustache.js] template to render your CSS.

If you pass in a `Function`, it should have a signature of `function (params) {}` and return a `String`.

If you pass in a `String`, we treat this as a path; reading in the file and rendering it via [mustache.js][]. The template will be passed the same `params` as in the `Function` case.

> An example template is https://github.com/twolfson/json2css/blob/4.2.0/lib/templates/stylus.template.mustache

[mustache.js]: http://mustache.github.io/

#### `params`
`params` is an object with some normalization nicities from [`json2css`][], our default collection of templates.

- params `Object`
    - items `Object[]` - Array of sprite information
      - name `String` - Name of the sprite file (sans extension)
      - x `Number` - Horizontal position of sprite's left edge in spritesheet
      - y `Number` - Vertical position of sprite's top edge in spritesheet
      - width `Number` - Width of sprite
      - height `Number` - Height of sprite
      - total_width `Number` - Width of entire spritesheet
      - total_height `Number` - Height of entire spritesheet
      - image `String` - Relative URL path from CSS to spritesheet
      - escaped_image `String` - URL encoded `image`
      - source_image `String` - Path to the original sprite file
      - offset_x `Number` - Negative value of `x`. Useful to `background-position`
      - offset_y `Number` - Negative value of `y`. Useful to `background-position`
      - px `Object` - Container for numeric values including `px`
        - x `String` - `x` suffixed with `px`
        - y `String` - `y` suffixed with `px`
        - width `String` - `width` suffixed with `px`
        - height `String` - `height` suffixed with `px`
        - total_width `String` - `total_width` suffixed with `px`
        - total_height `String` - `total_height` suffixed with `px`
        - offset_x `String` - `offset_x` suffixed with `px`
        - offset_y `String` - `offset_y` suffixed with `px`
    - options `Object` - Options passed in via `cssOpts` in `grunt-spritesmith` config

[`json2css`]: https://github.com/twolfson/json2css

An example sprite `item` is

```js
{
  "name": "sprite2",
  "x": 10,
  "y": 20,
  "width": 20,
  "height": 30,
  "total_width": 80,
  "total_height": 100,
  "image": "nested/dir/spritesheet.png",
  "escaped_image": "nested/dir/spritesheet.png",
  "source_image": "path/to/original/sprite.png",
  "offset_x": -10,
  "offset_y": -20,
  "px": {
    "x": "10px",
    "y": "20px",
    "width": "20px",
    "height": "30px",
    "total_width": "80px",
    "total_height": "100px",
    "offset_x": "-10px",
    "offset_y": "-20px"
  }
}
```

## Requirements
For cross-platform accessibility, [spritesmith][spritesmith] has and supports multiple sprite engines. However, each of these current engines has a different set of external dependencies.

[spritesmith]: https://github.com/Ensighten/spritesmith

If you are running into issues, consult the [FAQ section](#faqs).

### pngsmith
The `pngsmith` engine uses [`pngparse`][], an JavaScript `png` parser, to interpret images into [`ndarrays`][]. This requires no additional steps before installation.

**Key differences:** It requires no additional installation steps but you are limited to `.png` files for your source files.

[`pngparse`]: https://github.com/darkskyapp/pngparse
[`ndarrays`]: https://github.com/mikolalysenko/ndarray

### phantomjs
The `phantomjs` engine relies on having [phantomjs][] installed on your machine. Visit [the phantomjs website][phantomjs] for installation instructions.

**Key differences:** `phantomjs` is the easiest engine to install that supports all image formats.

[spritesmith][] has been tested against `phantomjs@1.9.0`.

[phantomjs]: http://phantomjs.org/

### canvas
The `canvas` engine uses [node-canvas][] which has a dependency on [Cairo][cairo].

**Key differences:** `canvas` has the best performance (useful for over 100 sprites). However, it is `UNIX` only.

Instructions on how to install [Cairo][cairo] are provided in the [node-canvas wiki][node-canvas-wiki].

Additionally, you will need to install [node-gyp][] for the C++ bindings.
```shell
sudo npm install -g node-gyp
```

[node-canvas]: https://github.com/learnboost/node-canvas
[cairo]: http://cairographics.org/
[node-canvas-wiki]: https://github.com/LearnBoost/node-canvas/wiki/_pages
[node-gyp]: https://github.com/TooTallNate/node-gyp/

### gm (Graphics Magick / Image Magick)
The `gm` engine depends on [Graphics Magick][graphics-magick] or [Image Magick][image-magick].

**Key differences:** `gm` has the most options for export via `imgOpts`.

[graphics-magick]: http://www.graphicsmagick.org/
[image-magick]: http://imagemagick.org/

For the best results, install from the site rather than through a package manager (e.g. `apt-get`). This avoids potential transparency issues which have been reported.

[spritesmith][] has been developed and tested against `1.3.17`.

[Image Magick][image-magick] is implicitly discovered. However, you can explicitly use it via `engineOpts`

```js
{
  'engineOpts': {
    'imagemagick': true
  }
}
```

## FAQs
### I am seeing errors during installation.
If `npm` exits normally, everything should work. These errors are being caused by `npm` attempting to install the various `spritesmith` engines.

### `spritesmith` is saying my engine "could not be loaded"
If you have specified an `engine` in your config, then you must satisfy its requirements *before* installing `grunt-spritesmith`.

To remedy this, verify you have installed the appropriate set of requirements for your engine:

https://github.com/Ensighten/grunt-spritesmith#requirements

Afterwards, re-install `grunt-spritesmith` so it detects the satisfied requirements for your engine.

```bash
npm install grunt-spritesmith
```

### `spritesmith` is saying "no spritesmith engine could be loaded for your machine"
If you are running `grunt-spritesmith` before `1.21.0`, then you have not satisfied any of the requirements for any of the engines *before* installing `grunt-spritesmith`. If you are running `1.21.0` or greater, then there is a bug and please open a new issue.

> The current version of `grunt-spritesmith` can be determined via `npm ls grunt-spritesmith`.

To remedy the issue before `1.21.0`, choose an engine and verify you have installed the appropriate set of requirements:

https://github.com/Ensighten/grunt-spritesmith#requirements

Afterwards, re-install `grunt-spritesmith` so it detects the satisfied requirements for your engine.

```bash
npm install grunt-spritesmith
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt/) and test via `npm test`.

### Algorithms
Algorithms are maintained via [twolfson/layout](https://github.com/twolfson/layout). If you would like to add one, please submit it via a pull request.

### Engines and image options
Engines and image options are maintained via [Ensighten/spritesmith](https://github.com/Ensighten/spritesmith). If you would like to add one, please submit it via a pull request.

### CSS formats
CSS formats are maintained via [twolfson/json2css](https://github.com/twolfson/json2css). If you would like to add one, please submit it via a pull request.

## Attribution
[GitHub][github-icon] and [Twitter][twitter-icon] icons were taken from [Alex Peattie's JustVector Social Icons][justvector].

[Fork][noun-fork-icon] designed by [P.J. Onori][onori] from The Noun Project

[Plus][+] and [Equals][=] icons were built using the [Ubuntu Light typeface][ubuntu-light].

[justvector]: http://alexpeattie.com/projects/justvector_icons/
[noun-fork-icon]: http://thenounproject.com/noun/fork/#icon-No2813
[onori]: http://thenounproject.com/somerandomdude
[ubuntu-light]: http://font.ubuntu.com/

## License
Copyright (c) 2012-2014 Ensighten

Licensed under the MIT license.
