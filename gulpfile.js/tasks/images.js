var config          = require('../config/images');
var gulp            = require('gulp');
var gulpImagemin    = require('gulp-imagemin');

gulp.task('images:min', function() {
  return gulp.src(config.src)
    .pipe(gulpImagemin({progessive: true, optimizationLevel: 7, interlaced: true}))
    .pipe(gulp.dest(config.dest));
});
