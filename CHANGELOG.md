# grunt-spritesmith changelog
6.3.1 - Upgraded to `spritesheet-templates@10.1.1` to correct `inline-block` examples in templates

6.3.0 - Upgraded to `spritesheet-templates@10.1.0` to add HTML comments to non-CSS templates

6.2.0 - Upgraded to `spritesmith@3.1.0` to add quality support for JPEGs

6.1.1 - Updated donation URL

6.1.0 - Upgraded to `spritesmith@3.0.0` to utilize streaming output

6.0.1 - Updated donation URL

6.0.0 - Upgraded to `spritesmith-engine-spec@2.0.0`

5.2.0 - Upgraded to `spritesmith@1.5.0` to add `specVersion` validation

5.1.8 - Updated link to specification

5.1.7 - Updated README to use bit.ly URL over Gratipay

5.1.6 - Increased mocha timeout and move to sudo-less Travis CI to fix builds

5.1.5 - Upgraded to `get-pixels@3.2.3` to use `pngjs@2`

5.1.4 - Added "Newsletter subscribe" badge to README

5.1.3 - Upgrade supported node to `>= 0.10.0`

5.1.2 - Added `foundry` for releases

5.1.1 - Added clarification that `retinaSrcFilter` should line up with `src`

5.1.0 - Upgraded to `spritesmith@4.1.0` to add better PNG support

5.0.0 - Upgraded to `spritesheet-templates@10.0.0` and moved to use `@2x` suffix for retina sprites

4.7.1 - Moved back to testing `iojs` on Travis CI

4.7.0 - Upgraded to `spritesheet-templates@9.6.0` to add `json_texture` template

4.6.3 - Moved iojs to allowed failure until https://github.com/npm/npm/issues/8406 gets patched

4.6.2 - Moved from deprecated `licenses` key to use `license` in `package.json`

4.6.1 - Fixes to README via @XhmikosR in #131

4.6.0 - Upgraded to `spritesheet-templates@9.5.0` and added handlebars helper registration

4.5.3 - Improved retina success message

4.5.2 - Added `node@0.12` and `iojs` to test suite. Upgraded to `gmsmith@0.0.8` to support their tests.

4.5.1 - Added documentation for retina template data

4.5.0 - Added retina spritesheet support

4.4.1 - Dropped `node@0.8` testing in Travis CI due to `jscs` dependency issues

4.4.0 - Upgraded to `spritesheet-templates@9.3.1` to pick up `spritesheet_info` introduction (anticipation for retina info)

4.3.2 - Upgraded to `spritesheet-templates@9.2.2` to pick up more granular templating

4.3.1 - Fixed code fence in README

4.3.0 - Upgraded to `spritesheet-templates@9.2.0` to add template inheritance support

4.2.0 - Upgraded to `spritesmith@1.3.0` to add background fill support to `pixelsmith`

4.1.0 - Upgraded to `spritesheet-templates@9.1.0` to add single sprite fixes/warnings

4.0.0 - Upgraded to `spritesheet-templates@9.0.0` to reintroduce `3.7.0` as a major release

3.9.0 - Upgraded to `spritesmith@1.2.0` to pick up optimal `binary-tree` fixes

3.8.1 - Completed "Getting Started" example in README. Via @Stratus3D in #115

3.8.0 - Reverted `3.7.0` release to remove breaking changes

3.7.0 - Upgraded to `spritesheet-templates@8.3.0` to pick up `variableNameTransforms` support

3.6.2 - Fixed broken tests due to `spritesheet-templates` patch upgrade

3.6.1 - Fixed example for `imgOpts` in README

3.6.0 - Upgraded to `spritesmith@1.1.0` to pick up `binary-tree` algorithm changes

3.5.0 - Upgraded to `spritesheet-templates@8.2.0` to pick up `spritesheet` variables and `sprites` mixin in preprocessor templates

3.4.0 - Upgraded to `spritesheet-templates@8.0.0` to pick up `spritesheet` variables in custom templates. Fixes #103

3.3.0 - Moved from `json2css` to `spritesheet-templates`, its renamed equivalent

3.2.0 - Upgraded to `json2css@6.1.0` to pick up CSS selector fix. Fixes #104

3.1.1 - Added more examples and links to examples

3.1.0 - Fixed `grunt-newer` support

3.0.2 - Removed legacy installs from Travis CI

3.0.1 - Fixed broken test

3.0.0 - Major release with multiple breaking changes:

- Upgraded to `spritesmith@1.0.0`
    - Moved to `pixelsmith` as default engine
    - Removed all other engines
    - Moved to `binary-tree` as default algorithm
- Overhauled documentation
- Made tests consistent
- Renamed `destImg` and `destCSS` to `dest` and `destCss`
    - Adds `grunt-newer` support
    - Makes naming consistent within repo
- Upgraded to `json2css@6.0.0`
    - Renames `cssClass` to `cssSelector` to make it more semantic

2.4.3 - Fixed up image assertion inside tests

2.4.2 - Moved from `nodeunit` to `mocha` for testing, leading to more granular/reusable tests.

2.4.1 - Removed unused `grunt-contrib-jshint` dependency

2.4.0 - Dropped `grunt@0.3` support

2.3.3 - Fixed race condition in Travis CI

2.3.2 - Fixed broken regression in Travis CI

2.3.1 - Fixed up Travis CI configuration

2.3.0 - Moved to `twolfson-style` to make code consistent

2.2.0 - Upgraded to `spritesmith@0.20.0` to pick up `phantomjssmith's` JPEG support

2.1.3 - Fixed `npm` and `node@0.8` issue in Travis CI

2.1.2 - Corrected task output accuracy via @lightningtgc in #91

2.1.1 - Updated README format

2.1.0 - Upgraded to `json2css@5.2.0` for useful CSS comments

2.0.0 - Upgraded to `json2css@5.0.0` to pick up `scss_maps` corrections

1.26.1 - Fixed `node@0.8` for Travis CI

1.26.0 - Upgraded to `spritesmith@0.19.0` and added `algorithmOpts` to allow for skipping image sorting

1.25.0 - Upgraded to `json2css@4.4.0` to pick up `scss_maps` height fix

1.24.0 - Upgraded to `json2css@4.3.0` to pick up `scss_maps` template

1.23.0 - Locked down version of `url2` to `1.0.0` to prevent semver issues. Via @ajohnstone in #74

1.22.0 - Upgraded to `spritesmith@0.18.0` to update `gmsmith`, allowing for implicit `imagemagick` detection

1.21.2 - Added FAQs for engine requirements

1.21.1 - Updated package.json description

1.21.0 - Upgraded to `spritesmith@0.17.0` to add `pngsmith` engine, allowing external dependency-free installs

1.20.0 - Added `source_image` to data dump via github/wilson-lewis' work #59

1.19.0 - Upgraded to `spritesmith@0.16.0` to support `giflib` for `canvassmith`

1.18.0 - Upgraded to `spritesmith@0.15.0` to add `timeout` option for `phantomjssmith`

1.17.0 - Added support for `cssTemplate` as a function

1.16.0 - Upgraded to `json2css@4.2.0` to fix SCSS template for libsass

1.15.0 - Upgraded to `spritesmith@0.14.0` to fix `preinstall` script for imagemagick

1.14.0 - Moved development grunt.js from grunt@0.3 to grunt@0.4. We are still supporting grunt@0.3 in the tests.

1.13.0 - Upgraded to `spritesmith@0.13.0` to fix long URL bug in `phantomjssmith`

1.12.0 - Upgraded to `spritesmith@0.12.1` to get reduced file size `phantomjssmith`

1.11.4 - Fixed link in README

1.11.3 - Corrected package.json and added `bugs`, `homepage`, and `contributors` fields

1.11.2 - Rearranged README sections

1.11.1 - Added engine differences and errors to FAQ in README

1.11.0 - Added `cssVarMap` option

1.10.1 - Relocated "Donating" section

1.10.0 - Integrated Travis CI

1.9.0 - Added `cssTemplate` option

1.8.0 - Moved to `json2css@4.1.0` for `jsonArray` template

1.7.1 - Added documentation for overriding CSS selectors

1.7.0 - Added sorting for consistency of generated stylesheets and less noise in version control

1.6.2 - Updated README to give more visual examples

1.6.1 - Nothing happened

1.6.0 - Updated to `spritesmith@0.11.0` for optimized padded spritesheets

1.5.2 - Updating `repositories` field to `repository`

1.5.0 - Updated to `spritesmith@0.10.0` for adding `padding` parameter

1.4.0 - Updated to `spritesmith@0.9.0` and `json2css@3.2.0` for `total_width` and `total_height` properties in stylesheets

1.3.0 - Updated to `spritesmith@0.8.0` for `engineOpts` support and `imagemagick` flag in `gmsmith`

1.2.0 - Updated to `json2css@3.1.1` which features URL escaping for image paths

Before 1.2.0 - See `git log`
