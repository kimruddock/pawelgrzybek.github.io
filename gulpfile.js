const gulp = require('gulp');
const { exec } = require('child_process');
const bs = require('browser-sync');
const postcss = require('gulp-postcss');
const cssImport = require('postcss-import');
const nest = require('postcss-nested');
const customProps = require('postcss-custom-properties');
const calc = require('postcss-calc');
const nano = require('gulp-cssnano');


// Build jekyll project
gulp.task('jekyll', done => {
  exec('bundle exec jekyll build --drafts --quiet --future', () => done());
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
  const processors = [
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
