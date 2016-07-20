---
title: Page scrolling in vanilla JavaScript
excerpt: Scrolling to element on a page has always been easy with jQuery. It's getting a bit tricky in vanilla JavaScript — but definitely doable.
photo:
---

How many times have you seen an effect of page scrolling down after clicking a button? Probably thousands! It's been always extremely easy to do with popular DOM library — [jQuery](https://jquery.com/).

```js
$('.js-btn').click(() => {
    $('html, body').animate({
        scrollTop: $('.js-section').offset().top
    }, 200);
});
```

<p>
<p data-height="350" data-theme-id="14885" data-slug-hash="akqXro" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/akqXro/">Page scrolling in vanilla JavaScript 1</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

It is a great solution, working great and it's really well supported across the browsers. But there is a recent trend of abandoning jQuery because pure vanilla JavaScript DOM manipulation is a new hipster skill. I'm one of these hipsters by the way. With the ease of a modern APIs and amount of features that the land of JavaScript provides us nowadays it is not that difficult to leave chunky libraries behind.

On one of my recent projects my client asked me to implement these kind of scrolling on his SPA (single page app). Aha! "Challenge" I said! Today I think that "DOM nightmare inconsistency mission" is a better term to describe this scenario. If you are one of these hipsters let me save you couple of hours and share a tiny snippet with you.

## Smooth scrolling in pure vanilla JavaScript

Plan! To start a script it's always a good idea to have a plan in place. I prefer old-fashion love, rap music before 1995 and real piece of paper. I ended up with a plan like this.

!!! Image of my plan here !!!

Basiclly it goes like this:

1. On click check what time is it and current document position.
2. Decide where to scroll, effect duration and what to do when it's finished.
3. Scroll the element as long as you don't reach the destination.
4. If an element finished scrolling trigger some callback function.

Let's go through each of these steps one by one.

!!! Image of table with three documents scrollTo !!!


### On click check what time is it and current document position

The tricky part of these task was to determine which element is a scrollable. It's impossible to check it when the document is on it's very top so the easies solution was to scroll down a bit, read the results and move it back to the initial position. Looks tricky but does the job really well and allows us to target `document.documentElement` (for Internet Explorer, Microsoft Edge and Firefox) and `document.body` (for Chrome, Opera, Brave and Safari). I didn't test it on other less popular browser but hopefully this solution fulfills them all.

```js
function checkElement() {
  document.documentElement.scrollTop += 1;
  let elm = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
  document.documentElement.scrollTop -= 1;
  return elm;
}

let element = checkElement();
let start = element.scrollTop;
let startTime = Date.now();
```

### Decide where to scroll, effect duration and what to do when it's finished

The previous step is always going to be exactly the same when the function is triggered. This one may vary dependable of the position, scrolling duration that we may like to use and function that is fired when the scrolling reached it's destination. It makes sense to pass all these things as a function arguments, isn't it? To makes things visually more interesting I decided to add some optional timing function that we may apply as a one of the arguments. Have a look how it function wrapper looks like now.

```js
function scrollIt(destination, duration = 200, easing = 'linear', callback) {
  // function body here
}
```

### Scroll the element as long as you don't reach the destination

The popular JavaScript animation assets are setTimeout, setInterval, requestAnimationFrame and WEB Animation API. First two old school, third looks like a perfect candidate but the browser support and the last one isn't made to deal with these kind of situations - read more about it on my previous blogpost.

https://www.npmjs.com/package/scroll-to
https://github.com/component/ease/blob/master/index.js


<p>
<p data-height="350" data-theme-id="14885" data-slug-hash="QEQoZL" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/QEQoZL/">Page scrolling in vanilla JavaScript 2</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

```js
// scroll to jQuery replacement
function scrollIt(destination, duration = 200, easing = 'linear', callback) {
  // define timing functions
  let easings = {
    // no easing, no acceleration
    linear(t) {
      return t;
    },
    // accelerating from zero velocity
    easeInQuad(t) {
      return t * t;
    },
    // decelerating to zero velocity
    easeOutQuad(t) {
      return t * (2 - t);
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    // accelerating from zero velocity
    easeInCubic(t) {
      return t * t * t;
    },
    // decelerating to zero velocity
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    // accelerating from zero velocity
    easeInQuart(t) {
      return t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    // accelerating from zero velocity
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  function checkElement() {
    // returns document.documentElement for chrome and safari
    // document.body for rest of the world
    document.documentElement.scrollTop += 1;
    let elm = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
    document.documentElement.scrollTop -= 1;
    return elm;
  }

  let element = checkElement();
  let start = element.scrollTop;
  let startTime = Date.now();

  function scroll() {
    let now = Date.now();
    let time = Math.min(1, ((now - startTime) / duration));
    let timeFunction = easings[easing](time);
    element.scrollTop = (timeFunction * (destination - start)) + start;

    if (element.scrollTop === destination) {
      callback;
      return;
    }
    requestAnimationFrame(scroll);
  }
  scroll();
}
```

```js
scrollIt(sections[1].distance, 200, 'easeInQuad', makeActive(1));
```


## Performance wise...

jQuery 30fps, raf 60fps, 100 lines of code vs hundreds lines
Unfortunatelly raf doesnt suppry as huge array of browsers as raf covers
