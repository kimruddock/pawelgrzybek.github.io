# CSS Custom Properties explained

- widely knows as a [CSS variables](https://drafts.csswg.org/css-variables/)
- CSSWG definition

  "This module introduces a family of custom author-defined properties known collectively as custom properties, which allow an author to assign arbitrary values to a property with an author-chosen name, and the var() function, which allow an author to then use those values in other properties elsewhere in the document. This makes it easier to read large files, as seemingly-arbitrary values now have informative names, and makes editing such files much easier and less error-prone, as one only has to change the value once, in the custom property, and the change will propagate to all uses of that variable automatically."

- available in chrome 49+, ff 31+, safari 9.1+, iOS 9.3+
- its not the same as sass or less variables (these are static and can’t be changed at runtime)
- doesnt require external dependencies and additional compilation rpocess, "compilation hapens in the browser"
- basic syntax. To define: valid identifier that starts with two dashes. To reference via var() function.

```css
:root {
  --brand-color: #06c;
}

h1 {
  color: var(--brand-color);
}
```

- Unlike other CSS properties, custom property names are case-sensitive.
- Community complains for ugly syntax, why not $brand-color instead, more about it post by spec author http://www.xanthir.com/blog/b4KT0

  Mainly, I think there's more space to explore here. If we use $foo for variables, we'll be unable to use it for future "variable-like" things. For example, if we do define an alternate form that are more SASS-like (can be used anywhere, but are global; more "macros" than "variables") we'd have to use some other glyph for them. That's suboptimal.

- CSS Variables follows all specificity rules that we already know from plain old CSS
- part of spec quote

  Custom properties are ordinary properties, so they can be declared on any element, are resolved with the normal inheritance and cascade rules, can be made conditional with @media and other conditional rules, can be used in HTML’s style attribute, can be read or set using the CSSOM, etc.

```css
:root { --color: blue; }
div { --color: green; }
#alert { --color: red; }
* { color: var(--color); }
```

```html
<p>I inherited blue from the root element!</p>
<div>I got green set directly on me!</div>
<div id="alert">
  While I got red set directly on me!
  <p>I’m red too, because of inheritance!</p>
</div>
```

- specificyty allows us to use it easily with media queries

```css
:root {
  --gutter: 4px;
}

section {
  margin: var(--gutter);
}

@media (min-width: 600px) {
  :root {
    --gutter: 16px;
  }
}
```

- custom properies can share values from each other

```css
:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
```

- var function allows fallback value

```css
var(--font-stack, Roboto, Helvetica)

// Yes, quotation marks ar not needed, more about it here: https://mathiasbynens.be/notes/unquoted-font-family
```

- Variables cannot be property names

```css
// This one throws an error, not margin-top: 20px

.foo {
  --side: margin-top;
  var(--side): 20px;
}
```

- you can’t use variables as a part of value

```css
// This one throws an error, not margin-top: 20px
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

- in javascript use getPropertyValue() and setProperty()
- getPropertyValue()

```css
:root {
  --primary-color: red;
}

p {
  color: var(--primary-color);
}
```

```js
var styles = getComputedStyle(document.documentElement);
var value = String(styles.getPropertyValue('--primary-color')).trim(); // red
```

- setProperty()

```
/* CSS */
:root {
  --primary-color: red;
}

p {
  color: var(--primary-color);
}
```

```js
document.documentElement.style.setProperty('--primary-color', 'green');
```

- use setProperty() with different custom propoerty value

```js
document.documentElement.style.setProperty('--primary-color', 'var(--secondary-color)');
```

- example: 100 CSS mode switcher night / day

