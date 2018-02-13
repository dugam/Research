var gulp = require('gulp');
var paths = require('../config/paths');
var config = require('../config/iconfonts');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var async = require('async');

gulp.task('iconfont', function(done){
  var iconStream = gulp.src(config.src)
    .pipe(iconfont({
      fontName: 'FontIconSVG',
      normalize: true,
      fontHeight: 1001
    }));
 
  async.parallel([
    function handleGlyphs (cb) {
      iconStream.on('glyphs', function(glyphs, options) {
        gulp.src(paths.tmp + '/_iconfonts.scss')
          .pipe(consolidate('lodash', {
            glyphs: glyphs,
            fontName: 'FontIconSVG',
            className: 'icon'
          }))
          .pipe(gulp.dest(paths.sourceAssets + '/styles/libs/'))
          .on('finish', cb);
      });
    },
    function handleFonts (cb) {
      iconStream
        .pipe(gulp.dest(config.dest))
        .on('finish', cb);
    }
  ], done);
});

