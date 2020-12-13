let gulp        = require('gulp');
let browserSync = require('browser-sync').create();

// Static server
gulp.task('bsync', function() {
    browserSync.init({
        server: {
            baseDir: "assets"
        }
    });
});
