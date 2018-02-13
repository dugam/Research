var paths = require('./paths');

module.exports = {
  watch: paths.sourceAssets + '/scripts/**/*.js',
  src: paths.sourceAssets + '/scripts/',
  dest: paths.htmldocAssets + '/js',
};
