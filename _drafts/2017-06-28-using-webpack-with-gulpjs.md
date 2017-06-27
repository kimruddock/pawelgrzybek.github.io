---
title: Using webpack with gulp.js
excerpt: Webpack is a module bundler for modern JavaScript apps. Gulp describes itselt as a platform-agnostic task runner. Can they work together? Easily! Have a look.
photo: 2017-06-28.jpg
---

[Webpack](https://webpack.js.org/) is a popular module bundler for modern JavaScript applications. It's biggest advantage is it's flexibility — it can be as simple or as complicated as you need it to be. It doesn't matter if you live on the edge and your app is full of modern ES2015 modules or still depends on some legacy code written in AMD style — this tool gets you covered.

If I'm not working on `jsFuckingEverythingInMyWholeLife.js` project I like to use [gulp.js](http://gulpjs.com/). It is a user friendly task runner that handles common tasks like: Sass compilation, media assets compression etc. There is a chance that you may need to add a tiny bit of JavaScript functionality to a project? Any solution for this one?

## webpack + gulp.js = <3

Let's combine a simplicity of gulp API and webpack to take advantage of a modern JavaScript workflow. Less talking, more coding…

```
npm i -D gulp webpack webpack-stream
```

```js
// gulpfile.js

const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('js', () => {
  gulp.src('./src/js/index.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist/js'));
});
```

Task is ready. Lets tell webpack what to do now.

```
npm i -D babel-core babel-loader babel-preset-latest
```

```js
// webpack.config.js

module.exports = {
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['latest', { modules: false }],
          ],
        },
      },
    ],
  },
};
```

It is just an example of basic configuration file. From this point you can go crazy with your [settings](https://webpack.js.org/configuration/). To use the task now just run in terminal:

```
 _________
< gulp js >
 ---------
        \   ^__^
         \  (@@)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
