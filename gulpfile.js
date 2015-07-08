var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  parker = require('gulp-parker'),
  uglify = require('gulp-uglify'),
  messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
  };


// Build jekyll project
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  require('child_process').spawn('jekyll', ['build', '--drafts'], {stdio: 'inherit'})
    .on('close', done);
});


// Rebuild and refresh jekyll project
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});


// Start BrowserSync Server and serve _site directory
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
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('_includes'));
});


// Minify js files
gulp.task('uglify', function () {
  gulp.src('_js/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('_includes'));
});


// Watch sass and all html posts
gulp.task('watch', function () {
  gulp.watch('_sass/**/*.scss', ['sass', 'jekyll-rebuild']);
  gulp.watch('_js/*.js', ['uglify', 'jekyll-rebuild']);
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_posts/*'], ['jekyll-rebuild']);
});


// CSS Analysis
gulp.task('parker', function() {
  return gulp.src('_includes/main.css')
    .pipe(parker());
});

// default task
gulp.task('default', ['browser-sync', 'watch']);
