---
title: Intersection Observer API explained
excerpt: Detecting elements visible on the viewport has always been a tricky and expensive task. Not anymore — Intersection Observer API just landed in Chromium.
photo: 2016-06-13.jpg
---

Detecting elements visible on current viewport boundaries has always been tricky and performance expensive task. Lazy loaded images on Medium.com, infinite scrolling pictures of vegan food on Pinterest or animated images on every f*****g Tumblr theme are just few examples where this functionality found a strong adoption. [Reporting of ad "visibility"](http://www.iab.com/viewability-has-arrived-what-you-need-to-know-to-see-through-this-sea-change/) for monetizing purpose is another important use case. Good news is coming! Web platform doesn't have to struggle to do all these things manually anymore — [`Intersection Observer API`](https://wicg.github.io/IntersectionObserver/) just landed in [Chromium 51](http://blog.chromium.org/2016/05/new-apis-to-help-developers-improve.html). It allows us to do these things with ease, reduce CPU usage, increase battery life and eliminate rendering junk.

Bare in mind that we are talking about really new API. At the moment of writing this article the [browser support](https://www.chromestatus.com/feature/5695342691483648) is restricted to Google Chrome 51 and Opera 38. If you want to play around with it in older browsers you better thank to [Surma](https://twitter.com/dassurma) for this great [polyfill](https://github.com/surma-dump/IntersectionObserver/blob/polyfill/polyfill/intersectionobserver-polyfill.js).

![IntersectionObserver in Google Chrome Canary](/photos/2016-06-13-1.jpg)

## How to use Intersection Observer API

You don't have to declare listener that on every single scroll event triggers crazy `getBoundingClientRect()` calculations anymore. New API is much nicer to use and read. Simply create a new instance of `IntersectionObserver` that takes two arguments — callback function and optional option object. Trigger the `observe` method and pass an element that should be watched. When the element enters or exits the viewport, the callback function will be fired.

```js
var watchMe = new IntersectionObserver(callback, options);
watchMe.observe(elm);
```

By default, callback function will be fired whenever an element appears and leaves the viewport. Function returns an array of [`IntersectionObserverEntry`](https://wicg.github.io/IntersectionObserver/#intersection-observer-entry) objects and each of them contains properties about each element that has been shown on the viewport (`boundingClientRect`, `intersectionRatio`, `intersectionRect`, `rootBounds`, `target` and `time`).

Second parameter (`options`) let you to specify some settings by passing [`IntersectionObserverInit`](https://wicg.github.io/IntersectionObserver/#intersection-observer-init) object. You can change the context (`root`) that defaults to `null` which is document’s viewport, margin from the context boundaries (`rootMargin`) with default value `0px` and thresholds array of observed element (`threshold`).

If you need to observe more than one element, simply call `observe` method multiple times.

## Demo time

Have you ever heard this quote by Stephen R. Covey from "The 7 Habits of Highly Effective People"?

> To learn and not to do is really not to learn. To know and not to do is really not to know.

Demo time! I created a list of paragraphs. Initially all of them are scaled down and see through. When paragraph passes a viewport edge by half of it's height (`threshold: [0.5]`) then is animates to regular size and full opacity. Maybe it's not super creative, but it does the job and allows you to copy/paste my code and make some super funky stuff :-)

```js
// callback function that will be fired
// when element apears in viewport
function onEntry(entry) {
  entry.forEach((change) => {
    change.target.classList.add('visable');
  });
}

// list of options
let options = {
  threshold: [0.5]
};

// Instantiate a new Intersection Observer
let observer = new IntersectionObserver(onEntry, options);

// list of paragraphs
let elements = document.querySelectorAll('p');

// loop through all elements
// pass each element to observe method
// ES2015 for-of loop can traverse through DOM Elements
for (let elm of elements) {
  observer.observe(elm);
}

```

<p>
<p data-height="400" data-theme-id="dark" data-slug-hash="YWqWXJ" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/YWqWXJ/">Intersection Observer API explained</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

Hopefully it helped you out. Don't be shy and show your results of using Intersection Observer API. Question? Use the comment section below. If you liked this article don't hesitate to use share button please. Thanks!
