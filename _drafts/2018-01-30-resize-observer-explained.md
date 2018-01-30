---
title: Resize Observer explained
excerpt: How many times have you attached a resize listener to a whole document just to track changes on single DOM element. These times are over — Resize Observer is here.
photo: 2018-01-30.jpg
---

How many times have you attached a `resize` listener to a `window` object just to track a single DOM element? I have done it many times just because I had no other choice. There is an issue though — `scroll` and `resize` events are just performance bottlenecks. Nowadays, the `scroll` event can be replaced with [Intersection Observer that I explained](https://pawelgrzybek.com/the-intersection-observer-api-explained/) before. There is a hope for a `resize` event — [Resize Observer](https://wicg.github.io/ResizeObserver/).

## I don't care about window resize

What is the issue with `windw.onresize` then? Essentially you have to trigger a callback every single time when size of a window changes — it doesn't necessarily mean that the element of interest changes its dimensions. This is a performance heavy event because it fires frequently and blocks a thread preventing buttery smooth flow of our website.
Look at [this CodePen](https://codepen.io/pawelgrzybek/pen/qxERYa) to understand an issue (open and resize windows size).

```js
// define a callback
function callback() {
  // something here
}

// add resize listener to window object
window.addEventListener('resize', callback)
```

<p>
<p data-height="320" data-theme-id="light" data-slug-hash="qxERYa" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-pen-title="2018-01-30-1" class="codepen">See the Pen <a href="https://codepen.io/pawelgrzybek/pen/qxERYa/">2018-01-30-1</a> by Pawel Grzybek (<a href="https://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</p>

![window.onresize callbacks](/photos/2018-01-30-1.gif)

Can you see the issue? We try to update the size of a box but the callback fires when the windows changes its dimensions, not a box that we care about.

## Fire a callback only when you need it — thanks to Resize Observer

Similarly to [previously explained Intersection Observer](https://pawelgrzybek.com/the-intersection-observer-api-explained/) the API of Resize Observer is very simple. You have to instantiate a new `ResizeObserver` object with a callback function in a constructor. Look at the example now (open it in a new window and play around with its size). Can you see the difference? Pay attention to when and how often tha callback is triggered.

```js
// define a callback
function callback() {
  // something here
}

// instantiate new observer
const myObserver = new ResizeObserver(callback);

// Observe one or multiple elements
myObserver.observe(someElement);
```

<p>
<p data-height="320" data-theme-id="light" data-slug-hash="paveWg" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-pen-title="2018-01-30-2" class="codepen">See the Pen <a href="https://codepen.io/pawelgrzybek/pen/paveWg/">2018-01-30-2</a> by Pawel Grzybek (<a href="https://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</p>

![Resize Observer callbacks](/photos/2018-01-30-2.gif)

## Yes, you can use it now

Although the Resize Observer is supported only in Google Chrome 64+ and it is not fully polyfillable, there is a simple way to check if the browser supports it or not. If it does — take an advantage of it. If it doesn't `window.onresize` will serve us well as it did for long years.

```js
if ('ResizeObserver' in window) {
  // new ResizeObserver( callback );
}
else {
  // window.addEventListener('resize', callback)
}
```

![Resize Observer support table](/photos/2018-01-30-3.jpg)

## Helpful resources

- [Resize Observer 1 specification](https://wicg.github.io/ResizeObserver/)
- [ResizeObserver explainer document](https://github.com/WICG/ResizeObserver/blob/master/explainer.md)
- [ResizeObserver: It’s Like document.onresize for Elements by Surma](https://developers.google.com/web/updates/2016/10/resizeobserver)
