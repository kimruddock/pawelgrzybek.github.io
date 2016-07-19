---
title: Smooth page scroll in vanilla JavaScript
excerpt: Smooth scrolling to particular element of a page always has been tricky without jQuert animate function. Not anymore — scrl is out!
photo:
---

https://www.npmjs.com/package/scroll-to
https://github.com/component/ease/blob/master/index.js

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
