'use strict';

var gulp = require('gulp');
var bs = require('browser-sync');
var cp = require('child_process');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

// Build jekyll project
gulp.task('jekyll', (done) => {
  cp.spawn('jekyll', ['build', '--drafts', '--quiet'], { stdio: 'inherit' }).on('close', done);
});

// Rebuild and refresh project
gulp.task('reload', ['jekyll'], () => {
  bs.reload();
});

// Start BrowserSync server and serve _site directory
gulp.task('browser-sync', ['styles', 'scripts', 'jekyll'], () => {
  bs({
    ui: false,
    ghostMode: {
      clicks: true,
      forms: false,
      scroll: true
    },
    logPrefix: 'pawelgrzybek.com',
    notify: false,
    server: {
      baseDir: '_site'
    }
  });
});

// Compile sass, minify css, autoprefix
gulp.task('styles', () => {
  gulp.src('_src/sass/main.scss')
    .pipe(sass({
      includePaths: ['scss'],
      onError: bs.notify
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(nano())
    .pipe(gulp.dest('_includes'));
});

// Minify js files
gulp.task('scripts', () => {
  gulp.src('_js/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('_includes'));
});

// Watch sass and all html posts
gulp.task('watch', () => {
  gulp.watch('_src/sass/**/*.scss', ['styles', 'reload']);
  gulp.watch('_src/js/*.js', ['scripts', 'reload']);
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_posts/*', '_drafts/*'], ['reload']);
});

// default task
gulp.task('default', ['browser-sync', 'watch']);
