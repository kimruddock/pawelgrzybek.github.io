---
title: Native ECMAScript modules in the browser
excerpt: 
photo: 2017-04-20.jpg
---

Three things that I wish to ditch from my day to day front-end workflow. CSS preprocessors, JavaScript transpilers and module bundlers.

I love Sass but wouldn't be cool to have it's power build into the CSS? The good news is native [custom properties](https://pawelgrzybek.com/css-custom-properties-explained/) are much more powerful than statically declared ones from Sass. Mixins are amazing — so [`@apply` rule](https://pawelgrzybek.com/css-mixins-with-apply-rule/) is. [The vendor prefixes imbroglio](https://www.chromium.org/blink#vendor-prefixes) is over and will never get back. With all those goodies I would say that first of my dreams is fulfilled.

When [Babel](https://babeljs.io/) came around it was a like a living in the future. We were able to use modern features that browser didn't support at the time. Things changed though. Nowadays, browsers have a really [strong support](https://kangax.github.io/compat-table/es6/) for present-day features. Have a look at your gulp build task or webpack config — there is a chance that you don't need to transpile your code anymore. Second item from my wishlist became reality.

Recently released [Safari 10.1](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_1.html) brought a hope that one day I will put a checkbox next to the last thing that I would like to remove from my workflow — module bundlers.

## JavaScript modules

Before ECMAScript 2015 JavaScript never had a native way of working with modular codebase. For years web developers managed to find a number of ways to implement it: spliting codebase into seperated files, using [AMD (Asynchronous module definition)](https://en.wikipedia.org/wiki/Asynchronous_module_definition) with file loaders like [RequireJS](http://requirejs.org/) or making Node style [CommonJS](https://en.wikipedia.org/wiki/CommonJS) work in the browser via libraries like [Browserify](http://browserify.org/).

Finalized in June 2015 spec for 6th Edition of JavaScript changed a lot. One of the many amazing things that it brought was native way of working with modules. Turned out that it was immensely hard to implement it into browsers — module bundlers like [Webpack](https://webpack.js.org/) came into the game. They allow us to write code in modern way and spit out a bundled script understandable for the browser.

[Safari 10.1](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_1.html) as a first browser got an [100% of ECMAScript 2015 features coverage](https://kangax.github.io/compat-table/es6/#safari10_1). Really great work Apple ([Service Workers](https://jakearchibald.github.io/isserviceworkerready/) next please). It means that it is a first browser that let us use modular JavaScript codebase. Let's have a look at the nitty-gritty.

## Working with modules in the browser

If you have ever used `import` and `export` in your project, migrating this concept to a client won't be a challenging task for you. If you have never worked with it, give [this chapter](http://exploringjs.com/es6/ch_modules.html) of Dr. Axel Rauschmayer's book a quick read. MDN explanation or  let's build a very small example.
