var gulp      		= require('gulp'),
	watch     			= require('gulp-watch'),
	imagesConfig    = require('../config/images'),
	sassConfig      = require('../config/sass'),
	htmlConfig      = require('../config/html'),
	dataConfig     	= require('../config/data'),
	jsConfig        = require('../config/script');

gulp.task('watch', ['browserSync'], function() {
  watch(imagesConfig.src,    function() { gulp.start('images:min');     });
  watch(dataConfig.src,    function() { gulp.start('copy:default');     });
  watch(jsConfig.watch,     function() { gulp.start('js:watch');        });
  watch(sassConfig.watch,     function() { gulp.start('sass:build');    });
  // watch(htmlConfig.watch,   function() { gulp.start('html:build');      });
  watch(htmlConfig.watch,   function() { gulp.start('html:rebuildOnlyChange');      });
});
