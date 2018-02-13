var paths = require('../config/paths');
var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function () {
  return del(paths.htmldoc);
});