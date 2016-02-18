---
title: CSS Custom Properties explained
excerpt: CSS Custom Properties (colloquially known as a CSS Variables) are around the corner. Let's embrace the power of feature that we were waiting for long years.
photo: 2016-02-20.jpg
---

In programing languages term "variable" describes a storage location normally associated with an identifier that contains some value. Despite fact that CSS is a mark up language, spec creators were very generous recently and gave us a tiny, but very powerful bit of real programing language. Excitement about native [CSS Custom Properties](https://www.w3.org/TR/css-variables/) is generally ignored by incorrect comparison to variables known from preprocessors like Sass or LESS. Don't follow this misconception and bare with me for the rest of this article and let's embrace the power of new native feature together.

## Syntax

 When I saw the syntax for a first time I wasn't a big fan of it. To be honest, not much changed since. One of the spec creators gave us a [fair explanation](http://www.xanthir.com/blog/b4KT0) behind the naming decisions.

 > If we use $foo for variables, we'll be unable to use it for future "variable-like" things.

 Declaration can be made in any selector and it requires a valid identifier that starts with two dashes. Unlike other CSS properties, variable names are case-sensitive. They follow inheritance and specificity rules as all other ordinary properties. If you need a reminder how specificity in CSS works, I encourage you to read ["CSS Specificity explained"](https://pawelgrzybek.com/css-specificity-explained/) first. Common practice is to declare it in `:root` element to make it accessible from all child selectors.

```css
:root {
  --brand-color: #06c;
}
```

To reference a variable value we have to use `var()` function.

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

New var function allows fallback value in case that propert wasn't declared beforehand.

```css
p {
  font-family: var(--font-stack, Roboto, Helvetica);
}

// Yes, quotation marks are not needed,
// More about it here:
// https://mathiasbynens.be/notes/unquoted-font-family
```

Variables cannot be a property names or part of a values. Following examples are not valid.

```css
// This one throws an error

.foo {
  --side: margin-top;
  var(--side): 20px;
}
```

```css
// This one throws an error

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

Preprocessors like [Sass](http://sass-lang.com/) or [LESS](http://lesscss.org/) are fantastic! Variables known from these tools are not exactly the same as CSS Custom Properties tho. Variables knew from popular [PostCSS](http://postcss.org/) plugin called [cssnext](http://cssnext.io/) although use the same syntax as native CSS Custom Properties, behave exactlly the same as those from Sass of LESS. They apply a static value to declaration during the compilation process. New native CSS feature applies a value to a DOM element on runtime and browser allows us to reassign it. Dynamic nature of this feature comes with rest of the language advantages like media queries or cascading. Let's have a look at the classic example that is imposible with preprocessors, but works fine with native CSS.

```scss
$fz: 1rem;

@media (min-width: 60rem) {
  $fz: 1.5rem;
}

body {
  font-size: $fz;
}
```

Above example applies a static `font-size: 1rem` to `body` tag. Media query is completely ignored because media query is not something that works in C or Ruby compiler, but it is something that works only in the browser. To make it work in Sass we have to create two separated variables and assign them dependable of the breakpoint. CSS Custom Properties don't require additional compilation process and browser applies the value on runtime. When we change the width of a viewport, value of property is reassigned as expected.

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

Browser support for [CSS Variables](http://caniuse.com/#search=css%20var) isn't great at the time of writing this article. Google Chrome 49+, Firefox 31+, Safari 9.1+ and iOS 9.3+ doesn't make it reliable enough to use it in production. Luckily we few methods to detect browser support for the hero of today's article. [Native feature detection with CSS.supports() API](https://pawelgrzybek.com/native-feature-detection-with-csssupports-api/) helps us with that. Lets have a look.

```css
body {
  --bg-color: #98FB98;
  background-color: khaki;
}

@supports (background-color: var(--bg-color)) {
  body {
    background-color: var(--bg-color);
  }
}

@supports not(background-color: var(--bg-color)) {
  body {
    background-color: tomato;
  }
}
```


```js
CSS.supports('background-color', 'var(--bg-color)')
```

It wasnt super reliable, and link Wes' method as well.





- example: Day / night mode switcher


