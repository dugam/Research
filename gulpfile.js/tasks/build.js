var gulp          = require('gulp');
var gulpSequence  = require('gulp-sequence');

gulp.task('default', gulpSequence('clean', 'iconfont', 'sass:build', 'js:build', 'html:build', 'copy:default', ['watch']));

