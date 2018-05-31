# grunt-spritesmith [![Build status](https://travis-ci.org/twolfson/grunt-spritesmith.svg?branch=master)](https://travis-ci.org/twolfson/grunt-spritesmith) [![Subscribe to newsletter](https://img.shields.io/badge/newsletter-subscribe-blue.svg)](http://eepurl.com/bD4qkf)

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

### Retina support
As of `grunt-spritesmith@4.5.0`, retina spritesheets/templates are supported. See the [Retina parameters section](#retina-parameters) for more information.

### Cross-platform support
`grunt-spritesmith` is supported and tested on Windows, Linux, and Mac OS X.

### Do you like `grunt-spritesmith`?
[Support us via donations][support-us] or [spread word on Twitter][twitter]

[support-us]: http://bit.ly/support-spritesmith-1
[twitter]: https://twitter.com/intent/tweet?text=CSS%20sprites%20made%20easy%20via%20grunt-spritesmith&url=https%3A%2F%2Fgithub.com%2Ftwolfson%2Fgrunt-spritesmith&via=twolfsn

## Breaking changes in 5.0.0
We are normalizing sprite variables even further to convert any non-alphanumeric/non-dash/non-underscore character to a delimiter character (e.g. `-`). This allows us to support naming retina sprites with `@2x` suffixes, to prevent regressions like [#137][].

[#137]: https://github.com/twolfson/grunt-spritesmith/issues/137

## Breaking changes in 6.0.0
We have moved from [spritesmith-engine-spec@1.1.0][] to [spritesmith-engine-spec@2.0.0][]. This means if you use an custom engine (e.g. `gmsmith`, `canvassmith`), then you will need to upgrade it.

```bash
npm install my-engine-smith@latest --save-dev
```

This is to enable usage of streaming outputs from engines.

[spritesmith-engine-spec@1.1.0]: https://github.com/twolfson/spritesmith-engine-spec/tree/1.1.0
[spritesmith-engine-spec@2.0.0]: https://github.com/twolfson/spritesmith-engine-spec/tree/2.0.0

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
        dest: 'destination/of/spritesheet.png',
        destCss: 'destination/of/sprites.css'
      }
    }
  });

  // Load in `grunt-spritesmith`
  grunt.loadNpmTasks('grunt-spritesmith');
};
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

```css
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
- dest `String` - Output location for generated spritesheet
    - For example `path/to/output/spritesheet.png`
- destCss `String` - Output location for generated CSS
    - For example `path/to/output/sprites.css`
- imgPath `String` - Optional override for spritesheet path specified in CSS
    - For example if `../sprite.png` is given, then the CSS will have:
        - `background-image: url(../sprite.png);`
- padding `Number` - Padding to place to right and bottom between sprites
    - By default there is no padding
    - An example usage can be found in the [Examples section](#padding)
- algorithm `String` - Algorithm to use for positioning sprites in spritesheet
    - By default this is `binary-tree` which yields the best possible packing
    - An example usage can be found in the [Examples section](#algorithm)
    - For more algorithm options, see the [Algorithms section](#algorithms)
- algorithmOpts `Mixed` - Options to pass through to algorithm
    - For example we can skip sorting in some algorithms via `{algorithmOpts: {sort: false}}`
        - This is useful for sprite animations
    - See your algorithm's documentation for available options
        - https://github.com/twolfson/layout#algorithms
- engine `String` - `spritesmith` engine to use
    - By default this is `pixelsmith`, a `node` based engine
    - Alternative engines must be installed via `npm install`
    - An example usage can be found in the [Examples section](#engine)
    - For more engine options, see the [Engines section](#engines)
- engineOpts `Object` - Options to pass through to engine for settings
    - For example `phantomjssmith` accepts `timeout` via `{engineOpts: {timeout: 10000}}`
    - See your engine's documentation for available options
- imgOpts `Object` - Options to pass through to engine uring export
    - For example `gmsmith` supports `quality` via `{imgOpts: {quality: 75}}`
    - See your engine's documentation for available options
- cssFormat `String` - CSS format to use
    - By default this is the format inferred by `destCss'` extension
        - For example `.styl -> stylus`
    - For more format options, see our formatting library
        - https://github.com/twolfson/spritesheet-templates#templates
- cssTemplate `String|Function` - CSS template to use for rendering output CSS
    - This overrides `cssFormat`
    - If a `String` is provided, it must be a path to a [handlebars][] template
        - An example usage can be found in the [Examples section](#handlebars-template)
    - If a `Function` is provided, it must have a signature of `function (data)`
        - An example usage can be found in the [Examples section](#template-function)
    - For more templating information, see the [Templating section](#templating)
- cssHandlebarsHelpers `Object` - Container for helpers to register to [handlebars][] for our template
    - Each key-value pair is the name of a [handlebars][] helper corresponding to its function
    - For example, `{half: function (num) { return num/2; }` will add a [handlebars][] helper that halves numbers
- cssVarMap `Function` - Mapping function for each filename to CSS variable
    - For more information, see [Variable mapping](#variable-mapping)
- cssSpritesheetName `String` - Name to use for spritesheet related variables in preprocessor templates
- cssOpts `Object` - Options to pass through to templater
    - For example `{cssOpts: {functions: false}}` skips output of mixins
    - See your template's documentation for available options
        - https://github.com/twolfson/spritesheet-templates#templates

[multitask]: http://gruntjs.com/creating-tasks#multi-tasks
[handlebars]: http://handlebarsjs.com/

### Retina parameters
`grunt-spritesmith` supports retina spritesheet generation via `retinaSrcFilter` and `retinaDest`. If at least one of these is provided, then we will expect the other and enable retina spritesheet generation.

Repeated parameters have the same properties as above but are repeated for clarity with respect to retina spritesheets.

An example retina spritesheet setup can be found in the [Examples section](#retina-spritesheet).

- src `String|String[]` - Images to use for both normal and retina spritesheet
    - For example `sprites/*.png` should capture `sprite1.png` and `sprite1@2x.png`
    - These must be ordered such that when the retina images are filtered into a separate array, the normal and retina images will have the same indices
    - **We strongly encourage using the `@2x` suffix over `-retina` or `-2x`. There are known ordering issues caused when sharing a `-` delimiter between sprite names and the retina suffix (see [#137][])**
- retinaSrcFilter `String|String[]` - Images to filter out from `src` for our retina spritesheet
    - This can be a glob as with `src` (e.g. `sprite/*@2x.png`)
    - The path/glob used should line up with `src` (e.g. `src: 'sprite/*.png'`, `retinaSrcFilter: 'sprite/*@2x.png'`)
    - For example `sprites/*@2x.png` will filter out `sprite1@2x.png` for a separate retina spritesheet
        - Under the hood, we will group `sprite1.png` and `sprite1@2x.png` as a group of normal/retina sprites
- retinaDest `String` - Output location for generated retina spritesheet
    - For example `path/to/output@2x.png`
- retinaImgPath - Optional override for retina spritesheet path specified in CSS
    - For example `../sprite@2x.png`  will yield CSS with:
        - `background-image: url(../sprite@2x.png);`
- padding `Number` - Padding to place to right and bottom between sprites
    - By default there is no padding
    - In retina spritesheets, this number will be doubled to maintain perspective
- cssFormat `String` - CSS format to use
    - By default this is the format inferred by `destCss'` extension
        - For example `.styl -> stylus_retina`
    - For more format options, see our formatting library
        - https://github.com/twolfson/spritesheet-templates#retina-templates
- cssVarMap `Function` - Mapping function for each filename to CSS variable
    - This will run through normal and retina spritesheets
    - The name used for normal sprites dictates the group name for retina group variables (e.g. `$icon-home` will have group `$icon-home-group`)
    - For more information, see [Variable mapping](#variable-mapping)
- cssRetinaSpritesheetName `String` - Name to use for retina spritesheet related variables in preprocessor templates
- cssRetinaGroupsName `String` - Name to use for retina groups related variables in preprocessor templates

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

### Templating
The `cssTemplate` option allows for using a custom template. An example template can be found at:

https://github.com/twolfson/spritesheet-templates/blob/9.3.1/lib/templates/stylus.template.handlebars

The parameters passed into your template are known as `data`. We add some normalized properties via [`spritesheet-templates`][] for your convenience.

- data `Object` Container for parameters
    - sprites `Object[]` - Array of sprite information
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
    - spritesheet `Object` - Information about spritesheet
        - width `Number` - Width of entire spritesheet
        - total_height `Number` - Height of entire spritesheet
        - image `String` - Relative URL path from CSS to spritesheet
        - escaped_image `String` - URL encoded `image`
        - px `Object` - Container for numeric values including `px`
            - width `String` - `width` suffixed with `px`
            - height `String` - `height` suffixed with `px`
    - spritesheet_info `Object` - Container for `spritesheet` metadata and its representation
        - name `String` - Prefix for spritesheet variables
    - retina_sprites `Object[]` - Array of retina sprite information
        - This will only be accessible if we are generating a retina spritesheet
        - Properties are the same as `sprites` (e.g. `name`, `width`, `source_image`)
    - retina_spritesheet `Object` - Information about retina spritesheet
        - This will only be accessible if we are generating a retina spritesheet
        - Properties are the same as `spritesheet` (e.g. `width`, `px`)
    - retina_spritesheet_info `Object` - Container for `retina_spritesheet` metadata and its representation
        - This will only be accessible if we are generating a retina spritesheet
        - name `String` - Prefix for spritesheet variables
    - retina_groups `Object[]` - Array of objects that maps to normal and retina sprites
        - This will only be accessible if we are generating a retina spritesheet
        - * `Object` - Container for data about sprite mapping
            - name `String` - Name to refer to mapping by
            - index `Number` - Index of corresponding normal/retina sprites from `data.sprites`/`data.retina_sprites`
            - normal `Object` - Normal sprite from `data.sprites` that corresponds to our mapping
                - This has all the same properties as `data.sprites[*]` (e.g. `name`, `x`, `offset_y`, `px`)
            - retina `Object` - Retina sprite from `data.retina_sprites` that corresponds to our mapping
                - This has all the same properties as `data.retina_sprites[*]` (e.g. `name`, `x`, `offset_y`, `px`)
    - retina_groups_info `Object` - Optional container for metadata about `retina_groups` and its representation
        - This will only be accessible if we are generating a retina spritesheet
        - name `String` - Name for `retina_groups`
    - options `Object` - Options passed in via `cssOpts` in `grunt-spritesmith` config

[`spritesheet-templates`]: https://github.com/twolfson/spritesheet-templates

An example `sprite` is

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

If you are defining a Handlebars template, then you can inherit from an existing template via [`handlebars-layouts`][] (e.g. `{{#extend "scss"}}`). An example usage can be found in the [Examples section](#handlebars-inheritance).

[`handlebars-layouts`]: https://github.com/shannonmoeller/handlebars-layouts

Example usages can be found as:

- [Handlebars template](#handlebars-template)
- [Handlebars inheritance](#handlebars-inheritance)
- [Template function](#template-function)

#### Variable mapping
The `cssVarMap` option allows customization of the CSS variable names

> If you would like to customize CSS selectors in the `css` template, please see https://github.com/twolfson/spritesheet-templates#css

Your `cssVarMap` should be a function with the signature `function (sprite)`. It will receive the same parameters as `sprites` from [Templating](#templating) except for `escaped_image`, `offset_x`,` offset_y`, and `px`.

```js
// Prefix all sprite names with `sprite-` (e.g. `home` -> `sprite-home`)
cssVarMap: function (sprite) {
  sprite.name = 'sprite_' + sprite.name;
}

// Generates:
// $sprite_fork_x = 0px;
// $sprite_fork_y = 0px;

// As oppposed to default:
// $fork_x = 0px;
// $fork_y = 0px;
```

### Engines
An engine can greatly improve the speed of your build (e.g. `canvassmith`) or support obscure image formats (e.g. `gmsmith`).

All `spritesmith` engines adhere to a common specification:

https://github.com/twolfson/spritesmith-engine-spec

This repository adheres to specification version: **2.0.0**

Below is a list of known engines with their tradeoffs:

#### pixelsmith
[`pixelsmith`][] is a `node` based engine that runs on top of [`get-pixels`][] and [`save-pixels`][].

[`pixelsmith`]: https://github.com/twolfson/pixelsmith
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

## Examples
### Algorithm
In this example, we will use the `alt-diagonal` algorithm to layout sprites in a non-intersecting manner.

**Configuration:**

```js
{
  src: ['fork.png', 'github.png', 'twitter.png'],
  dest: 'spritesheet.algorithm.png',
  destCss: 'spritesheet.algorithm.styl',
  algorithm: 'alt-diagonal'
}
```

**Output:**

![algorithm spritesheet](docs/spritesheet.algorithm.png)

### Engine
In this example, we will use the `gmsmith` engine to support obscure image formats.

**Requirements:**

Install `gmsmith` to our `node_modules` via `npm install`.

```bash
npm install gmsmith
```

Alternatively, we can use `--save` or `--save-dev` to save to our `package.json's dependencies` or `devDependenices`.

```bash
npm install gmsmith --save  # Updates {"dependencies": {"gmsmith": "1.2.3"}}
npm install gmsmith --save-dev  # Updates {"devDependencies": {"gmsmith": "1.2.3"}}
```

**Configuration:**

```js
{
  src: ['fork.png', 'github.png', 'twitter.png'],
  dest: 'spritesheet.algorithm.png',
  destCss: 'spritesheet.algorithm.styl',
  engine: 'gmsmith'
}
```

**Output:**

![engine spritesheet](docs/spritesheet.engine.png)

### Padding
The `padding` option allows for inserting spacing between images.

**Configuration:**

```js
{
  src: ['fork.png', 'github.png', 'twitter.png'],
  dest: 'spritesheet.padding.png',
  destCss: 'spritesheet.padding.styl',
  padding: 20 // Exaggerated for visibility, normal usage is 1 or 2
}
```

**Output:**

![padding spritesheet](docs/spritesheet.padding.png)

### Retina spritesheet
In this example, we will use generate a normal and retina spritesheet via the `retinaSrcFilter` and `retinaDest` parameters.

**Configuration:**

```js
{
  // We have `fork.png`, `fork@2x.png`, ...
  src: ['fork*.png', 'github*.png', 'twitter*.png'],
  // This will filter out `fork@2x.png`, `github@2x.png`, ... for our retina spritesheet
  //   The normal spritesheet will now receive `fork.png`, `github.png`, ...
  retinaSrcFilter: ['*@2x.png'],
  dest: 'spritesheet.retina.png',
  retinaDest: 'spritesheet.retina@2x.png',
  destCss: 'spritesheet.retina.styl'
}
```

**Normal spritesheet:**

![Normal spritesheet](docs/spritesheet.retina.png)

**Retina spritesheet:**

![Retina spritesheet](docs/spritesheet.retina@2x.png)

### Handlebars template
In this example, we will use `cssTemplate` with a `handlebars` template to generate CSS that uses `:before` selectors.

**Template:**

```handlebars
{{#sprites}}
.icon-{{name}}:before {
  display: block;
  background-image: url({{{escaped_image}}});
  background-position: {{px.offset_x}} {{px.offset_y}};
  width: {{px.width}};
  height: {{px.height}};
}
{{/sprites}}
```

**Configuration:**

```js
{
  src: ['fork.png', 'github.png', 'twitter.png'],
  dest: 'spritesheet.handlebarsStr.png',
  destCss: 'spritesheet.handlebarsStr.css',
  cssTemplate: 'handlebarsStr.css.handlebars'
}
```

**Output:**

```css
.icon-fork:before {
  display: block;
  background-image: url(spritesheet.handlebarsStr.png);
  background-position: 0px 0px;
  width: 32px;
  height: 32px;
}
.icon-github:before {
/* ... */
```

### Handlebars inheritance
In this example, we will extend the SCSS template to provide minimal variables. The JSON at the front comes from the original template and is required to provide consistent casing and default options.

Different block sections for each template are documented in:

https://github.com/twolfson/spritesheet-templates

**Template:**

```handlebars
{
  // Default options
  'functions': true,
  'variableNameTransforms': ['dasherize']
}

{{#extend "scss"}}
{{#content "sprites"}}
{{#each sprites}}
${{strings.name}}: ({{px.x}}, {{px.y}}, {{px.offset_x}}, {{px.offset_y}}, {{px.width}}, {{px.height}}, {{px.total_width}}, {{px.total_height}}, '{{{escaped_image}}}', '{{name}}', );
{{/each}}
{{/content}}
{{#content "spritesheet"}}
${{spritesheet_info.strings.name_sprites}}: ({{#each sprites}}${{strings.name}}, {{/each}});
${{spritesheet_info.strings.name}}: ({{spritesheet.px.width}}, {{spritesheet.px.height}}, '{{{spritesheet.escaped_image}}}', ${{spritesheet_info.strings.name_sprites}}, );
{{/content}}
{{/extend}}
```

**Configuration:**

```js
{
  src: ['fork.png', 'github.png', 'twitter.png'],
  dest: 'spritesheet.handlebarsInheritance.png',
  destCss: 'spritesheet.handlebarsInheritance.css',
  cssTemplate: 'handlebarsInheritance.scss.handlebars'
}
```

**Output:**

```scss
$fork: (0px, 0px, 0px, 0px, 32px, 32px, 64px, 64px, 'spritesheet.handlebarsInheritance.png', 'fork', );
$github: (32px, 0px, -32px, 0px, 32px, 32px, 64px, 64px, 'spritesheet.handlebarsInheritance.png', 'github', );
$twitter: (0px, 32px, 0px, -32px, 32px, 32px, 64px, 64px, 'spritesheet.handlebarsInheritance.png', 'twitter', );
$spritesheet-sprites: ($fork, $github, $twitter, );
$spritesheet: (64px, 64px, 'spritesheet.handlebarsInheritance.png', $spritesheet-sprites, );
/* ... */
```

### Template function
In this example, we will use `cssTemplate` with a custom function that generates YAML.

**Configuration:**

```js
// var yaml = require('js-yaml');
{
  src: ['fork.png', 'github.png', 'twitter.png'],
  dest: 'spritesheet.yamlTemplate.png',
  destCss: 'spritesheet.yamlTemplate.yml',
  cssTemplate: function (data) {
    // Convert sprites from an array into an object
    var spriteObj = {};
    data.sprites.forEach(function (sprite) {
      // Grab the name and store the sprite under it
      var name = sprite.name;
      spriteObj[name] = sprite;

      // Delete the name from the sprite
      delete sprite.name;
    });

    // Return stringified spriteObj
    return yaml.safeDump(spriteObj);
  }
}
```

**Output:**

```yaml
fork:
  x: 0
  "y": 0
  width: 32
  height: 32
  source_image: fork.png
  image: spritesheet.yamlTemplate.png
  total_width: 64
  total_height: 64
  escaped_image: spritesheet.yamlTemplate.png
  offset_x: -0.0
  offset_y: -0.0
  px:
    x: 0px
    "y": 0px
    offset_x: 0px
    offset_y: 0px
    height: 32px
    width: 32px
    total_height: 64px
    total_width: 64px
github:
  x: 32
  # ...
```

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
Copyright (c) 2012 Todd Wolfson

Licensed under the MIT license.
