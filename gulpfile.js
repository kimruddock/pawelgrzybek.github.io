var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  require('child_process').spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});


gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});


gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

// Compile sass, minify css, autoprefix
gulp.task('sass', function () {
  gulp.src('_sass/main.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('css'));
});


gulp.task('watch', function () {
    gulp.watch('_sass/*.scss', ['sass']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});


// default task
gulp.task('default', ['browser-sync', 'watch']);