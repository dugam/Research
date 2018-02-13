var gulp                  = require('gulp');
var concat                = require('gulp-concat');
var uglify                = require('gulp-uglify');
var path                  = require('path');
var paths                 = require('../config/paths');
var configLocal           = require('../config/script');
var jsbeautify            = require('gulp-jsbeautify');
var rename                = require('gulp-rename');
var jshint                = require('gulp-jshint');
var stylish               = require('jshint-stylish');
var browserSync           = require('browser-sync');
var changed               = require('gulp-changed');

var src  = {
  l10n: configLocal.src + '/l10n.js',
  libs: configLocal.src + '/libs/*.js',
  plugins: configLocal.src + '/plugins/*.js',
  app: configLocal.src + '/app.js'
};

gulp.task('script:libs', function() {
  isMin = false;

  return gulp.src([paths.vendor + '/jquery/dist/jquery.js', paths.vendor + '/modernizr/modernizr.js', paths.vendor + '/detectizr/dist/detectizr.js', src.libs])
    .pipe(concat('libs.js'))
    .pipe(jsbeautify({indentSize: 2}))
    .pipe(gulp.dest(configLocal.dest));
});

gulp.task('script:local', function() {
  isMin = false;

  return gulp.src([src.l10n, src.app, src.plugins])
    .pipe(jshint(path.resolve(__dirname, '../config/.jshintrc')))
    .pipe(jshint.reporter(stylish))
    .pipe(concat('app.js'))
    .pipe(jsbeautify({indentSize: 2}))
    .pipe(gulp.dest(configLocal.dest));
});

gulp.task('js:watch', function() {
  isMin = false;

  return gulp.src([src.l10n, src.app, src.plugins])
    .pipe(changed(configLocal.dest, {extension: '.js'}))
    .pipe(jshint(path.resolve(__dirname, '../config/.jshintrc')))
    .pipe(jshint.reporter(stylish))
    .pipe(concat('app.js'))
    .pipe(jsbeautify({indentSize: 2}))
    .pipe(gulp.dest(configLocal.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('script:min:libs', function() {
  isMin = true;

  return gulp.src([paths.vendor + '/jquery/dist/jquery.js', paths.vendor + '/modernizr/modernizr.js', paths.vendor + '/detectizr/dist/detectizr.js', src.libs])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest(configLocal.dest));
});

gulp.task('script:min:local', function() {
  isMin = true;
  return gulp.src([src.l10n, src.app, src.plugins])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(configLocal.dest));
});

gulp.task('js:build', ['browserify', 'script:libs', 'script:local']);
gulp.task('js:release', ['script:min:libs', 'script:min:local']);
