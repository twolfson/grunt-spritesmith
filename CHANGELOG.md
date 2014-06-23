# grunt-spritesmith changelog
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
