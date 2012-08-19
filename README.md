grunt-spritesmith
=================
Grunt library for using spritesmith

Usage
-----
```js
grunt.initConfig({
  'sprite': {
    'all': {
      'source': ['public/images/sprites/**'],
      'destImg': 'public/images/sprite.png',
      'destCSS': 'public/css/sprite_positions.styl'
    }
  }
});
```

TODO: For destCSS, allow different formats and even a function?
For the formats, I would try .styl --type=less
