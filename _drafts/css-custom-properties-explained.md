---
title: CSS Custom Properties explained
excerpt: CSS Custom Properties (colloquially known as a CSS Variables) are around the corner. Let's embrace the power of feature that we were waiting for long years.
photo: 2016-02-20.jpg
---

In programing languages term "variable" describes a storage location normally associated with an identifier that contains some value. Despite fact that CSS is a markup language, spec creators were very generous recently and gave us a tiny, but very powerful bit of real programing language. Excitement about native [CSS Custom Properties](https://www.w3.org/TR/css-variables/) is generally ignored by incorrect comparison to variables known from preprocessors like [Sass](http://sass-lang.com/) or [LESS](http://lesscss.org/). Don't follow this misconception and bare with me for the rest of this article and let's embrace the power of new native feature together.

## Syntax

 When I saw the syntax for a first time I wasn't a big fan of it. To be honest, not much changed since. One of the spec creators gave us a [fair explanation](http://www.xanthir.com/blog/b4KT0) behind the naming decisions.

> If we use $foo for variables, we'll be unable to use it for future "variable-like" things.

 Declaration can be made in any selector and it requires a valid identifier that starts with two dashes. Unlike other CSS properties, variable names are case-sensitive. They follow inheritance and specificity rules as all other ordinary properties. If you need a reminder how specificity in CSS works, I encourage you to read ["CSS Specificity explained"](https://pawelgrzybek.com/css-specificity-explained/) first. Common practice is to declare it in `:root` element to keep it accessible in all child selectors.

```css
:root {
  --brand-color: #06c;
}
```

To reference a variable value use `var()` function.

```css
h1 {
  color: var(--brand-color);
}
```

Custom properties can share values between each other.

```css
:root {
  --brand-color: #06c;
  --logo-color: var(--brand-color);
}
```

New var function allows fallback value in case that property wasn't declared beforehand.

```css
p {
  font-family: var(--font-stack, Roboto, Helvetica);
}

// Yes, quotation marks are not needed
// More about it here
// https://mathiasbynens.be/notes/unquoted-font-family
```

Variables cannot be a property names or part of a values. Following examples are not valid.

```css
.foo {
  --side: margin-top;
  var(--side): 20px;
}
```

```css
.foo {
  --gap: 20;
  margin-top: var(--gap)px;
}

// Use calc() instead
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```

## Difference between native CSS Custom Properties and Sass variables

Preprocessors like [Sass](http://sass-lang.com/) or [LESS](http://lesscss.org/) are fantastic! Variables known from these tools are not exactly the same as CSS Custom Properties tho. Variables knew from popular [PostCSS](http://postcss.org/) plugin called [cssnext](http://cssnext.io/) although use the same syntax as native CSS Custom Properties, behave exactly the same as those from Sass or LESS. They apply a static value to declaration during the compilation process. New native CSS feature applies a value to a DOM element on runtime and browser allows us to reassign it. Dynamic nature of this feature comes with list of the language facilities like media queries or cascading. Let's have a look at the classic example that is impossible with preprocessors, but works fine with native CSS.

```scss
$fz: 1rem;

@media (min-width: 60rem) {
  $fz: 1.5rem;
}

body {
  font-size: $fz;
}
```

Above example applies a static `font-size: 1rem` to `body` tag. Media query is completely ignored because media query is not something that works in C or Ruby compiler, it is something that works only in the browser. To make it work in Sass we have to create two separated variables and assign them dependable of the breakpoint. CSS Custom Properties don't require additional compilation process and browser applies the value on runtime. When we change the width of a viewport, value of property is reassigned as expected.

```css
:root {
  --fz: 1rem;
}

@media (min-width: 60rem) {
  :root {
    --fz: 1.5rem;
  }
}

body {
  font-size: var(--fz);
}
```

In my opinion it is freaking awesome and it opens an array of new options that wasn't possible before. I have a much more examples in back of my head, but hopefully this one clearly illustrates the subject.

## Working with CSS Custom Properties and JavaScript

The true power of CSS Custom Properties comes when we combine it together with JavaScript. Very few lines of code allows us to get and change the value of CSS custom property. Let's go through few simple examples.

### Get the value of CSS Custom Properties

To get a value of property we have to use `getPropertyValue()`.

```css
:root {
  --brand-color: salmon;
}
```

```js
var styles = getComputedStyle(document.documentElement);
var customProp = String(styles.getPropertyValue('--brand-color')).trim();

console.log(customProp);
// salmon
```

### Reassign the value of CSS Custom Properties

To reassign value `setProperty()` comes handy.

```css
:root {
  --brand-color: salmon;
}

p {
  color: var(--brand-color);
}
```

```js
document.documentElement.style.setProperty('--brand-color', 'purple');
```

```html
<p>I’m a purple paragraph!</p>
```

## Detect the browser support for CSS Custom Properties

Browser support for [CSS Variables](http://caniuse.com/#search=css%20var) isn't great at the time of writing this article. Google Chrome 49+, Firefox 31+, Safari 9.1+ and iOS 9.3+ doesn't make it reliable enough to use it in production. Luckily we few methods to detect the hero of today's article. [Native feature detection with CSS.supports() API](https://pawelgrzybek.com/native-feature-detection-with-csssupports-api/) helps us with that. Lets have a look how to use it in CSS and JavaScript.

```css
body {
  --brand-color: #98FB98;
  background-color: khaki;
}

@supports (background-color: var(--brand-color)) {
  body {
    background-color: var(--brand-color);
  }
}
```


```js
CSS.supports('background-color', 'var(--bg-color)');

// returns a boolean value
```

This method isn't bulletproof because support for `@support` isn't amazing at all. [Wes Bos posted](https://gist.github.com/wesbos/8b9a22adc1f60336a699) much more reliable method the other day. Thanks man!

```js
function testCSSVariables() {
  // create a new element
  var el = document.createElement('span');

  // add a new custom property and apply it as a background
  el.style.setProperty('--color', 'rgb(255, 198, 0)');
  el.style.setProperty('background', 'var(--color)');

  // print new element to the DOM
  document.body.appendChild(el);

  // assign computed styles of element
  var styles = getComputedStyle(el);

  // return true if background color is assigned correctlly, false otherwise
  var doesSupport = styles.backgroundColor === 'rgb(255, 198, 0)';

  // remove element from the DOM
  document.body.removeChild(el);

  // return boolean value
  return doesSupport;
}

testCSSVariables();
```

## Day / night mode switch

Codepen is already full of beautiful projects that use CSS Custom Properties. Mine is nothing near of this level of creativity but I had a good fun by doing that. I'm super curious how you used CSS Custom Properties. Don't be shy and post some link in comments section :)

!!! CODEPEN LINK HERE !!!
