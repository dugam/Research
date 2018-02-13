var gulp          = require('gulp');

function copyTask(config) {
	config.forEach(function(config) {
    return gulp.src(config.src)
    	.pipe(gulp.dest(config.dest));
  });
}

gulp.task('copy:default', function(){
	return copyTask([require('../config/fonts'), require('../config/media'), require('../config/images'), require('../config/root'), require('../config/data')]);
});
