---
title: Pinterest style layout with Bricky
excerpt: Pinterest / Masonry style layout has always been tricky to create. Thats why I created a very lightweight and free of dependencies Bricky.
photo: 2016-05-10.jpg
---

One of my recent clients wanted to use this trendy kind of layout well known for Tumblr or Pinterest users. I did a quick research and I haven’t found any plugin that fits my needs (responsive, lightweight and free of dependencies). All resources that I found are huge libraries, require jQuery dependency or don’t fit well into fluid layouts. Instead of going deeper with my research I decided to code it by myself. [Bricky](https://github.com/pawelgrzybek/bricky) (thanks to my good friend Kim for this name) is very lightweight (only 1.68KB minified) and dependency free small script withy minimum amount of options. It is open-sourced and you can download it from [Github](https://github.com/pawelgrzybek/bricky) or from [npm](https://www.npmjs.com/package/bricky). It did the job on my project so maybe you will find it useful as well. Have a look at the [CodePen demo](https://codepen.io/pawelgrzybek/pen/vGbzpW).


![Bricky - Masonry style layout without jQuery](/photos/2016-05-10-1.jpg)

## How does it work

Whenever I create a project like this, I’m starting with blank JavaScript file that is full of commented out instructions needed to accomplish the task. My initial plan to create this plugin looked similar to list below and it’s pretty much all what this script is doing.

1. Store all articles in array and remove them from the DOM.
2. Create a flex wrapper inside of the element defined in settings.
3. Dependable of the screen resolution create columns inside previously created wrapper (breakpoints and columns are configurable).
4. Loop through the articles inside the array and append one by one to the column with least space taken.
5. When screen is resized, clear the container and repeat process again. Debouncing intense event `resize` incredibly improve script's performance.

## How to use it

You can inject the script to your document markup manually or use one of the cool module bundlers like [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/) to use node-style `required('bricky')` way. Configuration is dead simple - only two required settings (parent & elements) and two optionally configurable (gutter & breakpoints).

### Options

All what I needed and nothing else...

```js
var pref = {
  parent: '.bricky',
  elements: 'article',
  gutter: '12px',
  breakpoints: [
    [600, 2],
    [900, 3],
    [1200, 4]
  ]
};
```

- `parent` - (required) string with query where bricky should be placed
- `elements` - (required) string with "bricks" query
- `gutter` - gutter width in relative or absolute units
- `breakpoints` - this array is a collection of nested arrays. Each of them is constructed as `[pxValueOfbreakpoint, howManycolumns]`. You can pass as many breakpoints as you want.

### Node style

In command line...

```
npm i -S bricky
```

In script file...

```js
// Assign 'bricky' module to Bricky variable
var Bricky = require('bricky');

// store object with setting in perf variable
var pref = {
  parent: '.bricky',
  elements: 'article',
  gutter: '12px',
  breakpoints: [
    [600, 2],
    [900, 3],
    [1200, 4]
  ]
};

// Instantiate new Bricky & invoke it
var mySuperLayout = new Bricky(pref);
mySuperLayout.start();
```

### Browser oldschool style

In document markup...

```html
<script src="../js/bricky.min.js"></script>
<script>
  // store object with setting in perf variable
  var pref = {
    parent: '.bricky',
    elements: 'article',
    gutter: '12px',
    breakpoints: [
      [600, 2],
      [900, 3],
      [1200, 4]
    ]
  };

  // Instantiate new Bricky & invoke it
  var mySuperLayout = new Bricky(pref);
  mySuperLayout.start();
</script>
```

Hopefully you found it useful. If you decide to use it on your porject, please send me a link - I'll be ultra proud and happy. Please report bugs and share your suggestions. Bye :*
