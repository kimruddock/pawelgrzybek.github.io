'use strict';

var gulp = require('gulp');
var cp = require('child_process');
var bs = require('browser-sync');
var postcss = require('gulp-postcss');
var cssImport = require('postcss-import');
var nest = require('postcss-nested');
var customProps = require('postcss-custom-properties');
var calc = require('postcss-calc');
var nano = require('gulp-cssnano');


// Build jekyll project
gulp.task('jekyll', (done) => {
  cp.spawn('jekyll', ['build', '--drafts', '--quiet', '--future'], { stdio: 'inherit' }).on('close', done);
});

// Rebuild and refresh project
gulp.task('reload', ['jekyll'], () => {
  bs.reload();
});

// Start BrowserSync server and serve _site directory
gulp.task('browser-sync', ['styles', 'jekyll'], () => {
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

// Process css, autoprefix, minify
gulp.task('styles', () => {
  var processors = [
    cssImport,
    customProps,
    calc,
    nest
  ];
  return gulp.src('_src/css/main.css')
    .pipe(postcss(processors))
    .pipe(nano())
    .pipe(gulp.dest('_includes'));
});

// Watch sass and all html posts
gulp.task('watch', () => {
  gulp.watch('_src/css/**/*.css', ['styles', 'reload']);
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_posts/*', '_drafts/*', '*.md'], ['reload']);
});

// default task
gulp.task('default', ['browser-sync', 'watch']);
