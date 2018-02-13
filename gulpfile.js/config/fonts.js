var paths = require('./paths');

module.exports = {
  src: [paths.sourceAssets + '/fonts/**/*', paths.vendor + '/bootstrap-sass/assets/fonts/bootstrap/**/*'],
  dest: paths.htmldocAssets + '/fonts'
};
