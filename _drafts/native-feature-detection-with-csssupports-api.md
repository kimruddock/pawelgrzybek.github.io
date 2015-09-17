---
title: Native feature detection with CSS.supports() API
excerpt: Feature detection is bread and butter of every front end developer. CSS.supports() API allows us to use very elegant and intuitive form to do it.
photo: 2015-09-17.jpg
---

Feature detection is something that every front end developer faced at some point. There are many solutions to handle features incompatibility. It can be some CSS hack that overrides the previous rule, or JavaScript snippet that returns boolean value that dictates further steps. Possibly you came across more advanced solutions like [Modernizr](https://modernizr.com/), which recently has been updated and brought to us so many new checks.

There is one more method, not that widely used yet. One of the [CSS at-rules](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule) is `@supports`. It gives us very intuitive way to check browser capabilities. It also comes with JavaScript `CSS.supports()` API. Let's have a look at some snippets:

{% highlight scss %}
.foo {
  background: #f00;
  @supports (background: conic-gradient(#eee, #bbb)) {
    background: conic-gradient(#eee, #bbb)
  }
}
{% endhighlight %}

{% highlight js %}
if (CSS.supports('background', 'conic-gradient(#eee, #bbb)')) {
  console.log('your browser supports conic-gradient');
}
{% endhighlight %}

## Poor support for @support

I know this heading sounds silly, but it's 100% true. This feature is too nice to be ready to use. [Browser support](http://caniuse.com/#feat=css-supports-api) isn't good at all.

- Internet Explorer and Opera Mini - forgot about it
- Edge is OK
- Firefox >= 23
- Chrome >= 28
- Safari >= 9
- Opera >= 12.1
- iOS Safari >= 9
- Chrome for Android >= 44.

I live in hope that this feature will be implemented in all new browsers cores. That would be nice to have a that elegant way to detect browser features. For now better keep your CSS sane or use Modernizr.
