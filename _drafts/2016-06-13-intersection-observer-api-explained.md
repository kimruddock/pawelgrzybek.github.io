---
title: Intersection Observer API explained
excerpt: Detecting elements visible in the viewport has always been a tricky and expensive task. Not anymore — Intersection Observer API just landed in Chromium.
photo: 2016-06-13.jpg
---

Detecting elements visible in current viewport boundaries has always been tricky and performance expensive task. Lazy loaded images on Medium.com, infinite scrolling pictures of vegan food on Pinterest or animated images on every f*****g Tumblr theme are just few examples where this functionality found an strong adoption. Good news is coming! [`Intersection Observer API`](https://wicg.github.io/IntersectionObserver/) just landed in [Chromium 51](http://blog.chromium.org/2016/05/new-apis-to-help-developers-improve.html) and implementation of these kind of tricks is now much easier than has ever been before.

Bare in mind that we are talking about really fresh piece of API. At the moment of writing this article the browser support  is restricted to Google Chrome 51 and Opera 38. If you want to play around with it in older browsers you better thank to [Surma](https://twitter.com/dassurma) for this great [polyfill](https://github.com/surma-dump/IntersectionObserver/blob/polyfill/polyfill/intersectionobserver-polyfill.js).

## How to use Intersection Observer API

You don't have to declare listener that on every single scroll event triggers crazy `getBoundingClientRect()` calculations anymore. New API is much nicer to use and read. Simply create a new instance of `IntersectionObserver` that takes two arguments — callback function and option object. Trigger the `observe` method and pass an element that should be watched. When the element enters or exits the viewport, the callback function will be fired.

```js
var watchMe = new IntersectionObserver(callback, options);
watchMe.observe(elm);
```

By default, callback function will be fired whenever an element appears and leaves the viewport. Function returns an array of [`IntersectionObserverEntry`](https://wicg.github.io/IntersectionObserver/#intersection-observer-entry) objects and each of them contains properties about each element that appeared (`boundingClientRect`, `intersectionRatio`, `intersectionRect`, `rootBounds`, `target` and `time`).

Second parameter (`options`) let you to specify some settings by passing [`IntersectionObserverInit`](https://wicg.github.io/IntersectionObserver/#intersection-observer-init) object. It allows you to change the observer behavior by changing the context (`root`) that defaults to `null` which is document’s viewport, margin from the context boundaries (`rootMargin`) with default value `0px` or thresholds array of observed element (`threshold`).

If you need to observe more than one element, simply call `observe` method multiple times.

## Demo demo demo

Have you ever heard this quote by Stephen R. Covey from "The 7 Habits of Highly Effective People"?

> To learn and not to do is really not to learn. To know and not to do is really not to know.

Demo time! I created a list of paragraphs. By default all of them scaled down and see through. When paragraph passes a viewport edge by half of it's height (`threshold: [.5]`) then is animates to regular size and full opacity. Maybe it's not super creative, but it does the job and allows you to copy/paste my code and make some super funky effect :-)

<p>
<p data-height="400" data-theme-id="dark" data-slug-hash="YWqWXJ" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/YWqWXJ/">Intersection Observer API explained</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

Hopefully it helped you out. Don't be shy and share with some funky where you used Intersection Observer API explained. Question? Use the comment section below. If you liked it please don't hesitate to use share button below. Thanks!
