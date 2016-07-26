---
title: Page scrolling in vanilla JavaScript
excerpt: Scrolling to an element on a page has always been easy with jQuery. It's a bit tricky in vanilla JavaScript — but definitely doable.
photo: 2016-07-25.jpg
---

How many times have you seen the effect of a page scrolling down after clicking a button? Probably thousands! It's always been extremely easy to do with the popular [jQuery](https://jquery.com/) library.

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

It is a decent solution, works great and it's really well supported across the browsers. But there is a recent trend of abandoning jQuery because pure vanilla JavaScript DOM manipulation is the new hipster skill (I'm one of those hipsters by the way). With the ease of modern APIs and the amount of features that the JavaScript landscape has to offer nowadays it is not that difficult to leave chunky libraries behind.

On one recent project my client asked me to implement this kind of scrolling on his SPA (single page app). Aha! A "challenge" I said! Today I think "DOM-nightmare-inconsistency-mission" is a better term to describe this scenario. If you are one of those hipsters let me save you a couple of hours and share this tiny snippet with you.

## Page scrolling without jQuery

Plan! To start a script it's always a good idea to have a plan in place. Basically it goes like this:

1. Determine where to scroll, the duration, the easing function and an optional callback.
2. On click — grab a timestamp and the current document position.
3. Scroll to the element as long as you don't reach the destination.
4. If the element has finished scrolling trigger an optional callback function.

### Determine where to scroll, the duration, the easing function and an optional callback

All the other steps are always going to be exactly the same. This one may vary depending on the destination, the scrolling duration, the timing function and any callback that is invoked when the scrolling reaches it's destination. It makes sense to pass all these things as function arguments, right? The destination is the only required argument. The duration and easing function possess some sensible default values (thanks to ES2015 default arguments) and the callback function should be optional. Have a look at the wrapper of our function declaration.

```js
function scrollIt(element, duration = 200, easing = 'linear', callback) {
  // object with some some timing functions
  // function body here
}
```

### On click — grab a timestamp and the current document position

The tricky part of this task was to determine which element is the scrollable one. It's impossible to check this when the document is at the very top so the easiest solution was to scroll down a bit, read the scrolled value and move it back to the initial position. It looks tricky but does the job really well and allows us to target `document.documentElement` (for Internet Explorer, Microsoft Edge and Firefox) and `document.body` (for Chrome, Opera, Brave and Safari). If you can tell me of a cleaner solution I'll be very thankful.

![document.documentElement vs document.body table](/photos/2016-07-25-1.jpg)


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

### Scroll to the element as long as you don't reach the destination

The most popular JavaScript animation solutions are mainly based on [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout), [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval), the [WEB Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) and [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/VRDisplay/requestAnimationFrame). The first two are pretty old school. The Web Animation API isn't made to deal with these kind of situations — read more about it in one of my previous [articles](https://pawelgrzybek.com/intro-to-the-web-animations-api/). So `requestAnimationFrame` looks like a perfect candidate for this scenario.

```js
function scroll() {
  const now = Date.now();
  const time = Math.min(1, ((now - startTime) / duration));
  const timeFunction = easings[easing](time);
  body.scrollTop = (timeFunction * (destination - start)) + start;

  if (body.scrollTop === destination) {
    return;
  }
  requestAnimationFrame(scroll);
}
scroll();
```

### If the element has finished scrolling trigger an optional callback function

The last step is to trigger a callback function whenever the document reaches its destination. This requires adding one more line to the condition that checks the current position and destination inside the `scroll` function.

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

  // Height checks to prevent requestAnimationFrame from infinitely looping
  // If the function tries to scroll below the visible document area
  // it should only scroll to the bottom of the document
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

### A future solution using scroll-behavior: smooth

**UPDATE!** As correctly pointed out by [Šime Vidas](https://twitter.com/simevidas) there is another solution. There is a property of the [CSSOM View module](https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_View) called [`scroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior). This is a native solution for the problem that I'm trying to solve by my script. The implementation is extremely easy, but unfortunately this method [isn't supported well enough](http://caniuse.com/#feat=css-scroll-behavior) to be used reliably (yet). It doesn't allow us to control timing functions or the duration either. It takes the user-agent values as its defaults. If you want to test examples below, use Firefox or Google Chrome with [Experimental Web Platform features](chrome://flags/#enable-experimental-web-platform-features) flag enabled.

```js
function scrollIt(element) {
  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': element.offsetTop
  });
}
```

```js
const elm = document.querySelector('.js-section');
scrollIt(elm);
```

<p>
<p data-height="300" data-theme-id="14885" data-slug-hash="QEAZdP" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/QEAZdP/">2016.07.25 - 3</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

And one more example using just a CSS (Firefox only)

```css
body {
  scroll-behavior: smooth;
}
```

```html
<a href="#one" class="btn">Section 1</a>
<div id="one" class="section">Section 1</div>
```

<p>
<p data-height="350" data-theme-id="14885" data-slug-hash="RRyXxJ" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/RRyXxJ/">2016.07.25 - 4</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

## Wrap it up

Please let me know what you think about my solution. I know that the [browser support](http://caniuse.com/#feat=requestanimationframe) isn't that amazing compared to the usual jQuery solution. The compromise between browser support, bloating code and performance is a question that you need to answer yourself depending on your project. I had good fun building this script but it's even more enjoyable for me to share it with you.
