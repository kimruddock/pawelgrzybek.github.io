---
title: Native CSS mixins with @apply rule
excerpt: I am very excited about recently added features to CSS. We discussed custom properties and now it is a time to talk about native mixins with @apply rule.
photo: 2016-04-18.jpg
---

I am very excited about recent evolution of CSS. Flexbox was a buzz word some time ago, today it is well supported and widely adopted part of spec. Few months back I published an [intro to CSS grid layout module](https://pawelgrzybek.com/lets-get-into-the-basics-of-css-grid-layout-model/) that is another approaching thing that will extremely change the way how we build our projects. Enormous popularity of preprocessors like Sass or LESS definitely influenced spec authors to carry variables to the language as a CSS Custom Properties. I recently published a [post](https://pawelgrzybek.com/css-custom-properties-explained/) that explains everything that you need to know about this powerful feature. Another think that developers and designers love in preprocessors are mixins. Good news my friend - [CSS @apply Rule](https://tabatkins.github.io/specs/css-apply-rule/) is just behind the corner. Let's embrace a native CSS mixins together.

> This specification defines the @apply rule, which allows an author to store a set of properties in a named variable, then reference them in other style rules.

Before we begin with some code snippets and examples I need to inform you that for the time of writing this article [the only implementation](https://www.chromestatus.com/feature/5753701012602880) is in Google Chrome Canary with "Experimental Web Platform features" flag enabled.

![Enable Experimental Web Platform Featured Flag in Google Chrome](/photos/2016-04-18-1.jpg)

## Syntax

If you familiar with syntax of CSS custom properties you won't struggle to memorize this one. Just wrap set of properties with curly braces like that...

```scss
:root {
  --heading-style: {
    font-family: cursive;
    font-weight: 700;
  };
}
```

Use mixin via new `@apply` at-rule.

```scss
h1 {
  @apply --heading-style;
}
```

<p data-height="170" data-theme-id="dark" data-slug-hash="MyGVoo" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/MyGVoo/">2016.04.18 - 1</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Local variables in CSS mixins

Sass allows us to pass list of locally defined variables to mixin. Unfortunately it isn't possible with `@apply` rule.

If you have some object oriented JavaScript experience, the first thing that you will try as a way around it is this...

```scss
:root {
  --brand-color: red;
  --heading-style: {
    color: var(--brand-color);
    font-family: cursive;
    font-weight: 700;
  };
}
```

```scss
h1 {
  --brand-color: green;
  @apply --heading-style;
}

/*
brand-color value pulled from root, not local block
value is red, not green
it is CSS, not JavScript
*/
```

...but it is not JavaScript my friend. It takes a value of variable from the place where set or properties is defined, not from the block that is "invoked" in. Hopefully we will get ability to pass a parameters to a mixin at some point in the future - fingers crossed.

## Use native CSS mixins today

As I mentioned before, the browser support for this feature is nearly none. [Chrome Platform Status](https://www.chromestatus.com/feature/5753701012602880) informs us that the first implementation is planned for Google Chrome 51 (behind the flag) and Opera 38. Any details about other browsers aren't revealed at the time of writing this article.

As a web developers we want to use the glory of future improvements now! Thats what we do with Babel and ECMAScript 2015. This is the reason why I like [PostCSS](http://postcss.org/) so much! If you have never used it yet, I highly encourage you to check my [introduction](https://pawelgrzybek.com/from-sass-to-postcss/) to PostCSS for Sass users. [Pascal Duez](https://twitter.com/pascalduez) created a [postcss-apply](https://github.com/pascalduez/postcss-apply) that transpiles `@apply` rule to syntax understandable by current browsers.

The feature detection for `@apply` isn't [that straight forward](https://pawelgrzybek.com/css-custom-properties-explained/#detect-the-browser-support-for-css-custom-properties) as with CSS Custom Properties. I'm sure this is just a matter of time to standardize the way to use it with `@support` rule. If you really need to detect a support for `@apply` rule, look at the [script](https://gist.github.com/malyw/477cd45bd0ed501a1c3ce0870ae16dd1) created by [Serg Gospodarets](https://twitter.com/malyw). Serg also published [list of great use cases](https://blog.gospodarets.com/css_apply_rule) for CSS Mixins on his blog.

Hopefully you liked it. See you next time :-*
