---
title: Native ECMAScript modules in the browser
excerpt: 
photo: 2017-04-20.jpg
---

Three things that I wish to ditch from my day to day front-end workflow: CSS preprocessors, JavaScript transpilers and module bundlers. Let me elaborate…

I love Sass but wouldn't be cool to have it's power build into the CSS? The good news is native [custom properties](https://pawelgrzybek.com/css-custom-properties-explained/) are much more powerful than statically declared ones from Sass. Mixins are amazing — so [`@apply` rule](https://pawelgrzybek.com/css-mixins-with-apply-rule/) is. [The vendor prefixes imbroglio](https://www.chromium.org/blink#vendor-prefixes) is over and will never get back. With all those goodies I would say that first of my dreams is fulfilled.

When [Babel](https://babeljs.io/) came around it was like living in the future. We were able to use modern features that browser didn't support at the time. Things changed though. Nowadays, browsers have a really [strong support](https://kangax.github.io/compat-table/es6/) for present-day ingredients. Have a look at your gulp build task or webpack config — there is a chance that you don't need to transpile your code anymore. Second item from my wishlist became reality.

Recently released [Safari 10.1](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_1.html) brought a hope that one day I will put a checkbox next to the last thing that I would like to remove from my workflow — module bundlers.

## JavaScript modules

Before 2015 JavaScript never had a native way of working with modular codebases. For years web developers managed to find a number of ways to implement it: spliting codebase into seperated files and scopes, using [AMD (Asynchronous module definition)](https://en.wikipedia.org/wiki/Asynchronous_module_definition) with file loaders like [RequireJS](http://requirejs.org/) or making Node style [CommonJS](https://en.wikipedia.org/wiki/CommonJS) work in the browser via libraries like [Browserify](http://browserify.org/).

Finalized in June 2015 spec for [6th Edition](http://www.ecma-international.org/ecma-262/6.0/) of JavaScript changed a lot. One of the many amazing things that it brought was native way of working with modules. Turned out that it was [immensely hard](https://blog.whatwg.org/js-modules) to implement it to the web platform — module bundlers like [Webpack](https://webpack.js.org/) came into the game. They allow us to write code in modern way and spit out a bundled script understandable by the browser.

[Safari 10.1](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_1.html) as a first browser got an [100% complete coverage for ECMAScript 2015 features](https://kangax.github.io/compat-table/es6/#safari10_1). Really great work Apple ([Service Workers](https://jakearchibald.github.io/isserviceworkerready/) next please). It means that it is a first browser that let us use native modules. Let's have a look at the nitty-gritty.

## Working with modules in the browser

If you have ever used `import` and `export` in your project, migrating this concept to a client won't be a challenging task. If you have never worked with it, give [this chapter](http://exploringjs.com/es6/ch_modules.html) of Dr. Axel Rauschmayer's book a quick read.

Nothing works better than a practical example. Let's create a script that prints a stylish log message into the console. Let's split it out into two files — `index.js` containing the "logic" and `print.js` with reusable print function. It goes something like this (sorry for the broken ES2015 syntax highlighting).

```js
// index.js

import print from './print.js';
print('Native ECMAScript modules in the browser');
```

```js
// print.js

export default message => {
  console.log(
    `%c ${message}`,
    `
    color: hotpink;
    font-family: Comic Sans MS;
    font-size: 1.5rem;
    `
  );
};
```

In the world of module bundlers we need to run this set of files through it to get bundled file that contains our script and some boilerplate on top of it. Then we have to smash `script` tag with `src` attribute that points to this file and everything just works. Now lets forget about bundling for a sec and take advantage of a browser that can finally resolve all dependencies for us. This is how to do it baby…

```html
<script src="./index.js" type="module"></script>
```

Yes the essence lies here — `type="module"`. Accordingly [to spec](https://html.spec.whatwg.org/multipage/scripting.html#script-type-module-example-1) these few characters tells the browser that it can be used to include an external module scripts. This is exactly what we need! Pay attention to `import` path inside `index.js` file — it needs to be concrete path to an imported file (including extension). Let's open it in the browser (more about the support later on).

![Native ECMAScript modules in Safari](/photos/2017-04-20-1.jpg)

Browser managed to resolved dependency of `print.js` file. No Webpack magic here! This is beautiful, isn't it?

## But my browser doesn't… Yes it does!

A quick word about support of native modules across the browsers and some possible solution. At the time of writing this article it is looking like this:

- Chrome is [working on it](https://www.chromestatus.com/feature/5365692190687232)
- [Firefox Nightly](https://www.mozilla.org/en-GB/firefox/channel/desktop/) under the `dom.moduleScripts.enabled` flag
- Microsofr EDGE under ["Enable experimental JavaScript features"](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/moduleses6/?q=module) flag
- Safari — hell yeah!

![Browser support for Native ECMAScript modules](/photos/2017-04-20-2.jpg)

It doesn't look very promissing and the situation is definitely not ready to use it on production. There is a hope though! Lets have look what console of any browser that lacks of modules support show when I open our pretty print example.

![Native ECMAScript modules in Google Chrome](/photos/2017-04-20-3.jpg)

So what happened here? NOTHING! Totally nothing. Because Google Chrome doesn't support JavaScript modules it totally ignores it. You probably know where I'm going with this.

```html
<script src="./index.js" type="module"></script>
<script src="bundle.js" nomodule></script>
```

Yes! When modules are not supported natively let's use something that worked for us for ages. As a fallback script let's use an output file of our module bundler of choice. It works perfectlly well now in the browser that doesn't have a clue how to handle JavaScript modules. To make sure that we are not duplicating the same functionality for browsers that support it, exactly for this reason [`nomodule`](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-nomodule) attribute has been recently added to a spec. Let's have a look at the results in Safari and Google Chrome now…

![Native ECMAScript modules in Safari Technology Preview and Google Chrome](/photos/2017-04-20-4.jpg)

At the time of writing this post [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) is the only browser that supports `nomodule` attribute. One day I will come back to this article and get rid of this paragraph — crafty plan.

## Last word about JavaScript modules

That is it. I hope that you are equally excited about native modules like myself. I would like to leave you here with two conclusions.

Last few years introduced so many tools and added massive complexity to a front-end development. Rapid change of JavaScript workflow constantly attracts new developers and scares the other ones. Module bundling is one of those things that adds a gigantic confusion — hopefuly by this post I convinced you that it won't last forever. This thing just became much simpler.

The thing that I love about web is it's unpredictibilty and active transformation. One day, one thing become much simpler and the new one comes in to confuse our brains even more. Can't wait to see what the future will bring us…
