var gulp          = require('gulp');
var gulpSequence  = require('gulp-sequence');
var ghPages = require('gulp-gh-pages');

var del = require('del');

gulp.task('clean-publish', function () {
  return del('./.publish');
});

gulp.task('push', function() {
  return gulp.src('./htmldoc/**/*')
    .pipe(ghPages());
});

gulp.task('release', gulpSequence('clean', 'iconfont', 'sass:release', 'js:release', 'html:build','copy:default', 'images:min'));
gulp.task('deploy', gulpSequence('release', 'push', 'clean-publish'));
