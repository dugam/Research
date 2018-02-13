var path                = require('path');
var paths               = require('../config/paths');
var configLocal         = require('../config/sass');
var concat              = require('gulp-concat');
var gulp                = require('gulp');
var sass                = require('gulp-sass');
var cssbeautify         = require('gulp-cssbeautify');
var cssmin              = require('gulp-cssmin');
var rename              = require('gulp-rename');
var sasslint            = require('gulp-sass-lint');
var sourcemaps          = require('gulp-sourcemaps');
var stripCssComments    = require('gulp-strip-css-comments');
var browserSync         = require('browser-sync');
var autoprefixer        = require('gulp-autoprefixer');
var handleErrors        = require('../libs/handleErrors');

gulp.task('sass:libs', function() {
  isMin = false;

  gulp.src(configLocal.src + '/styles/libs.scss')
  .pipe(sourcemaps.init())
  .pipe(sass(configLocal.settings))
  .on('error', handleErrors)
  .pipe(cssbeautify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(configLocal.dest));
});

gulp.task('sass:local', function() {
  isMin = false;

  gulp.src(configLocal.src + '/styles/app.scss')
    .pipe(sasslint({
      options: { 'config-file': path.resolve(__dirname, '../config/scss-lint.yml')}
    }))
    .pipe(sasslint.format())
    .pipe(sourcemaps.init())
    .pipe(sass(configLocal.settings))
    .on('error', handleErrors)
    .pipe(cssbeautify())
    .pipe(autoprefixer(configLocal.autoprefixer))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(configLocal.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass:min:libs', function() {
  isMin = true;
  
  gulp.src(configLocal.src + '/styles/libs.scss')
  .pipe(sass(configLocal.settings))
  .on('error', handleErrors)
  .pipe(cssmin())
  .pipe(stripCssComments({preserve: false}))
  .pipe(rename('libs.min.css'))
  .pipe(gulp.dest(configLocal.dest));
});

gulp.task('sass:min:local', function() {
  isMin = true;

    gulp.src(configLocal.src + '/styles/app.scss')
      .pipe(sass(configLocal.settings))
      .on('error', handleErrors)
      .pipe(autoprefixer(configLocal.autoprefixer))
      .pipe(cssmin())
      .pipe(stripCssComments({preserve: false}))
      .pipe(rename('app.min.css'))
      .pipe(gulp.dest(configLocal.dest));
});

gulp.task('sass:build', ['sass:libs', 'sass:local']);
gulp.task('sass:release', ['sass:min:libs', 'sass:min:local']);
