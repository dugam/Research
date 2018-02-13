var paths = require('./paths');

module.exports = {
  src: paths.sourceAssets,
  watch: paths.sourceAssets + '/styles/**/*.scss',
  dest: paths.htmldocAssets + '/css',
  settings: {
  	imagePath: 'assets/images' // Used by the image-url helper
  },
  autoprefixer: { browsers: ['last 2 version'], cascade: false }
};
