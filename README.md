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
[Support us via gratipay][gratipay] or [spread word on Twitter][twitter]

[gratipay]: https://gratipay.com/twolfson/
[twitter]: https://twitter.com/intent/tweet?text=CSS%20sprites%20made%20easy%20via%20grunt-spritesmith&url=https%3A%2F%2Fgithub.com%2FEnsighten%2Fgrunt-spritesmith&via=twolfsn

## Breaking changes in 3.0.0
We have moved to `pixelsmith` as the default `engine`. It is `node` based and should support your sprites. Any other engines must be installed outside of `spritesmith`. This will lead to cleaner and faster installations.

We have moved to `binary-tree` as the default `algorithm`. We changed this to give the best possible packing out of the box. If you were using `top-down` as the default, please specify it in your configuration.

## Getting Started
`grunt-spritesmith` can be installed via npm: `npm install grunt-spritesmith`

Then, add and configure it to your `Gruntfile.js`:

```js
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
Files "destination/of/spritesheet.png", "destination/of/sprites.css" created.

Done, without errors.
```

Results are a spritesheet:

[![Spritesheet][spritesheet]][spritesheet]

and CSS:

```
.icon-fork {
  background-image: url(spritesheet.png);
  background-position: 0px 0px;
  width: 32px;
  height: 32px;
}
...
```

## Documentation
`grunt-spritesmith` is a [grunt multitask][multitask]. It supports the following parameters:

- src `String|String[]` - Images to use as sprites in spritesheet
    - For example this can be a glob, `sprites/*.png` or an array of files `['sprite1.png', sprite2.png']`
- destImg `String` - Output location for generated spritesheet
- destCSS `String` - Output location for generated CSS
- imgPath `String` - Optional override for path specified in CSS
    - For example if `../sprite.png` is given, then the CSS will have:
        - `background-image: url(../sprite.png);`
- padding `Number` - Padding to place to right and bottom between sprites
    - By default there is no padding
    - // TODO: Add example
- algorithm `String` - Algorithm to use for positioning sprites in spritesheet
    - By default this is `binary-tree` which yields the best possible packing
    - For more algorithm options, see the [Algorithms section](#algorithms)
- algorithmOpts `Mixed` - Options to pass through to algorithm
    - For example we can skip sorting in some algorithms via `{algorithmOpts: {sort: false}}`
        - This is useful for sprite animations
    - // TODO: Document this inside of layout
    - // TODO: Add link to algorithms section or layout
- engine `String` - `spritesmith` engine to use
    - By default this is `pixelsmith`, a `node` based engine
    - For more engine options, see the [Engines section](#engines)
- engineOpts `Object` - Options to pass through to engine for settings
    - For example `phantomjssmith` accepts `timeout` via `{engineOpts: {timeout: 10000}}`
    - See your engine's documentation for available options
- imgOpts `Object` - Options to pass through to engine uring export
    - For example `gmsmith` supports `quality` via `{exportOpts: {quality: 75}}`
    - See your engine's documentation for available options
- cssFormat `String` - CSS format to use
    - By default this is the format inferred by `destCSS's` extension
        - For example `.styl -> stylus`
    - // TODO: Document me inside of `json2css` (stylus, scss, scss_maps, sass, less, json, json_array, css)
    - // TODO: Link me
    - // TODO: Add example
    - For more format options, see the [Formats section][]
- cssTemplate `String|Function` - CSS template to use for rendering output CSS
    - This overrides `cssFormat`
    - If a `String` is provided, it must be a [mustache][] template
    - If a `Function` is provided, it must have a signature of `function (data)`
    - // TODO: Add example
    - // TODO: Document properties
- cssVarMap `String|Function` - Mapping function for each filename to CSS variable
    - // TODO: Add documentation and link to documentation
    - cssVarMap: function (sprite) {
- cssOpts `Object` - Options to pass through to templater
    - For example `{cssOpts: {functions: false}}` skips output of mixins
    - See your templates
        - // TODO: Link to json2css with documentation cssSelector
        - cssClass: function (item) {

### Algorithms
Images can be laid out in different fashions depending on the algorithm. We use [`layout`][] to provide you as many options as possible. At the time of writing, here are your options for `algorithm`:

[`layout`]: https://github.com/twolfson/layout

|         `top-down`        |          `left-right`         |         `diagonal`        |           `alt-diagonal`          |          `binary-tree`          |
|---------------------------|-------------------------------|---------------------------|-----------------------------------|---------------------------------|
| ![top-down][top-down-img] | ![left-right][left-right-img] | ![diagonal][diagonal-img] | ![alt-diagonal][alt-diagonal-img] | ![binary-tree][binary-tree-img] |

[top-down-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/top-down.png
[left-right-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/left-right.png
[diagonal-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/diagonal.png
[alt-diagonal-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/alt-diagonal.png
[binary-tree-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/binary-tree.png

More information can be found in the [`layout`][] documentation:

https://github.com/twolfson/layout

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

### Engines
An engine can greatly improve the speed of your build (e.g. `canvassmith`) or support obscure image formats (e.g. `gmsmith`).

All `spritesmith` engines adhere to a common specification and test suite:

https://github.com/twolfson/spritesmith-engine-test

Below is a list of known engines with their tradeoffs:

#### pixelsmith
[`pixelsmith`][] is a `node` based engine that runs on top of [`get-pixels`][] and [`save-pixels`][].

[`get-pixels`]: https://github.com/mikolalysenko/get-pixels
[`save-pixels`]: https://github.com/mikolalysenko/save-pixels

**Key differences:** Doesn't support uncommon image formats (e.g. `tiff`) and not as fast as a compiled library (e.g. `canvassmith`).

#### phantomjssmith
[`phantomjssmith`][] is a [phantomjs][] based engine. It was originally built to provide cross-platform compatibility but has since been succeeded by [`pixelsmith`][].

**Requirements:** [phantomjs][] must be installed on your machine and on your `PATH` environment variable. Visit [the phantomjs website][phantomjs] for installation instructions.

**Key differences:** `phantomjs` is cross-platform and supports all image formats.

[`phantomjssmith`]: https://github.com/twolfson/phantomjssmith
[phantomjs]: http://phantomjs.org/

#### canvassmith
[`canvassmith`][] is a [node-canvas][] based engine that runs on top of [Cairo][].

**Requirements:** [Cairo][] and [node-gyp][] must be installed on your machine.

Instructions on how to install [Cairo][] are provided in the [node-canvas wiki][].

[node-gyp][] should be installed via `npm`:

```bash
npm install -g node-gyp
```

**Key differences:** `canvas` has the best performance (useful for over 100 sprites). However, it is `UNIX` only.

[`canvassmith`]: https://github.com/twolfson/canvassmith
[node-canvas]: https://github.com/learnboost/node-canvas
[Cairo]: http://cairographics.org/
[node-canvas wiki]: (https://github.com/LearnBoost/node-canvas/wiki/_pages
[node-gyp]: https://github.com/TooTallNate/node-gyp/

#### gmsmith
[`gmsmith`][] is a [`gm`][] based engine that runs on top of either [Graphics Magick][] or [Image Magick][].

**Requirements:** Either [Graphics Magick][] or [Image Magick][] must be installed on your machine.

For the best results, install from the site rather than through a package manager (e.g. `apt-get`). This avoids potential transparency issues which have been reported.

[Image Magick][] is implicitly discovered. However, you can explicitly use it via `engineOpts`

```js
{
  engineOpts: {
    imagemagick: true
  }
}
```

**Key differences:** `gmsmith` allows for configuring image quality whereas others do not.

[`gmsmith`]: https://github.com/twolfson/gmsmith
[`gm`]: https://github.com/aheckmann/gm
[Graphics Magick]: http://www.graphicsmagick.org/
[Image Magick]: http://imagemagick.org/

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint` and test via `npm test`.

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
