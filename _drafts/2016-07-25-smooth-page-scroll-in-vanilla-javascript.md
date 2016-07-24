---
title: Page scrolling in vanilla JavaScript
excerpt: Scrolling to element on a page has always been easy with jQuery. It's getting a bit tricky in vanilla JavaScript — but definitely doable.
photo:
---

How many times have you seen an effect of page scrolling down after clicking a button? Probably thousands! It's been always extremely easy to do with popular library — [jQuery](https://jquery.com/).

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

It is a decent solution, working great and it's really well supported across the browsers. But there is a recent trend of abandoning jQuery because pure vanilla JavaScript DOM manipulation is a new hipster skill. I'm one of those hipsters by the way. With the ease of a modern APIs and amount of features that the land of JavaScript has to offer nowadays it is not that difficult to drop chunky libraries behind.

On one of my recent projects my client asked me to implement these kind of scrolling on his SPA (single page app). Aha! "Challenge" I said! Today I think that "DOM nightmare inconsistency mission" is a better term to describe this scenario. If you are one of these hipsters let me save you couple of hours and share a tiny snippet with you.

## Smooth scrolling in pure vanilla JavaScript

Plan! To start a script it's always a good idea to have a plan in place. Basiclly it goes like this:

1. Determine where to scroll, duration, easing and optional callback.
2. On click — grab a timestamp and current document position.
3. Scroll the element as long as you don't reach the destination.
4. If an element finished scrolling trigger optional callback function.

### Determine where to scroll, duration, easing and optional callback

All further steps are always going to be exactly the same when the function is triggered. This one may vary dependable of the destination, scrolling duration, timing function and callback that is invoked when the scrolling reaches it's destination. It makes sense to pass all these things as a function arguments, isn't it? Destination is the only required argument. Duration and easing function can take some sensible default values (thanks to ES2015 default argument values) and callback function should be optional. Have a look at a wrapper of our function declaration.

```js
function scrollIt(element, duration = 200, easing = 'linear', callback) {
  // object with some some timing functions
  // function body here
}
```

### On click — grab a timestamp and current document position

The tricky part of these task was to determine which element is a scrollable one. It's impossible to check it when the document is on it's very top so the easies solution was to scroll down a bit, read the results and move it back to the initial position. Looks tricky but does the job really well and allows us to target `document.documentElement` (for Internet Explorer, Microsoft Edge and Firefox) and `document.body` (for Chrome, Opera, Brave and Safari). If you know any cleaner solution I'll be very thankful.

!!! Image of table with three documents scrollTo !!!

```js
function checkBody() {
  document.documentElement.scrollTop += 1;
  const body = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
  document.documentElement.scrollTop -= 1;
  return body;
}

const body = checkBody();
const start = body.scrollTop;
const startTime = Date.now();

const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
const destination = documentHeight - element.offsetTop < windowHeight ? documentHeight - windowHeight : element.offsetTop;
```

### Scroll the element as long as you don't reach the destination

The popular JavaScript animation solution are mainly based on [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout), [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval), [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/VRDisplay/requestAnimationFrame) and [WEB Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). First two — old school. `requestAnimationFrame` looks like a perfect candidate and if you think differently you are living your life wrong. The last one isn't made to deal with these kind of situations — read more about it on one of my previous [articles](https://pawelgrzybek.com/intro-to-the-web-animations-api/).

```js
function scroll() {
  const now = Date.now();
  const time = Math.min(1, ((now - startTime) / duration));
  const timeFunction = easings[easing](time);
  body.scrollTop = (timeFunction * (destination - start)) + start;

  if (body.scrollTop === destination) {
    callback();
    return;
  }
  requestAnimationFrame(scroll);
}
scroll();
```

### If an element finished scrolling trigger optional callback function.

The last step is to trigger a callback function whenever the document reached it's destination. This one requires to add one more line to condition that checks the current position and destination inside `scroll` function.

```js
if (body.scrollTop === destination) {
  callback();
  return;
}
```

### Puting it all together

The whole function looks like this.

```js
function scrollIt(element, duration = 200, easing = 'linear', callback) {
  // define timing functions
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  // Returns document.documentElement for Chrome and Safari
  // document.body for rest of the world
  function checkBody() {
    document.documentElement.scrollTop += 1;
    const body = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
    document.documentElement.scrollTop -= 1;
    return body;
  }

  const body = checkBody();
  const start = body.scrollTop;
  const startTime = Date.now();

  // Prevent requestAnimationFrame from infinte loop
  // In situation is too low on the page
  // And scroll to this position isint possible
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destination = documentHeight - element.offsetTop < windowHeight ? documentHeight - windowHeight : element.offsetTop;

  function scroll() {
    const now = Date.now();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    body.scrollTop = (timeFunction * (destination - start)) + start;

    if (body.scrollTop === destination) {
      callback();
      return;
    }
    requestAnimationFrame(scroll);
  }
  scroll();
}
```

...and to invoke it

```js
const elm = document.querySelector('.js-section');
scrollIt(elm, 300, 'easeInQuad', done);
```

or simply

```js
const elm = document.querySelector('.js-section');
scrollIt(elm);
```

<p>
<p data-height="350" data-theme-id="14885" data-slug-hash="QEQoZL" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/QEQoZL/">Page scrolling in vanilla JavaScript 2</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

## Wrap it up

Let me know what do you think about my solution. I know that the [browser support](http://caniuse.com/#feat=requestanimationframe) isn't that amazing compared to jQuery solution. The compromise between browser support, bloating code and performance is the question that you need to answer yourself dependable of the project. I had a good fun building this script and even more enjoyable part is sharing it with you. Have a great day everyone!
