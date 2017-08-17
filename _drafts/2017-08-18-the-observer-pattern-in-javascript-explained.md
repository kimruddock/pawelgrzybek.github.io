---
title: The Observer Pattern in JavaScript explained
excerpt: This popular pattern used by tons of JavaScript applications may save yuo from injecting costy dependencies to you project. Easy, clean and very useful.
photo: 2015-08-18.jpg
---

The Observer Pattern is a popular pattern used across all sort of JavaScript applications. The instance (subject) maintains a collection of objects (observers) and notifies them all when change to the state occurs. Does it sound difficult to you? Yes, it was upsetting to me as well when I came across this pattern for a first time. A tiny practical example may help you to grasp it.

Imagine that you have to update multiple elements simultaneously when some event occurs (typing inside the `input` field perhaps). You need to be able to add more (subscribe) elements that react (observe) to a change of an input value. Removing subscription (unsubscribe) can be handy if you no longer need to brodcast state changes to a particular object. Do you get the idea now? Let's code it!

```js
// define a class
class Observer {
  // each instance of the Observer class
  // starts with an empty array of things (observers)
  // that react for a state change
  constructor() {
    this.observers = [];
  }

  // add ability to subscribe to a new object / DOM element
  // esentially, add soemthing to observers array
  subscribe(f) {
    this.observers.push(f);
  }

  // add ability to unsubscribe from particular object
  // esentially, remove soemthing from observers array
  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  // update all subscribed objects / DOM elements
  // and pass some data to each of them
  notify(data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}
```

The usecase example goes like this…

```js
// some DOM references
const input = document.querySelector('.js-input');
const p1 = document.querySelector('.js-p1');
const p2 = document.querySelector('.js-p2');
const p3 = document.querySelector('.js-p3');

// some actions to add to observers array
const updateP1 = text => p1.textContent = text;
const updateP2 = text => p2.textContent = text;
const updateP3 = text => p3.textContent = text;

// instantiate new Observer class
const headingsObserver = new Observer();

// subscribe to some observers
headingsObserver.subscribe(updateP1);
headingsObserver.subscribe(updateP2);
headingsObserver.subscribe(updateP3);
```

With tiny little help of few control buttons (added to make the demo more interactive), it gives you the power to do this kind of cool things with just a few lines of code. Isn't it nice?

<p>
<p data-height="431" data-theme-id="14885" data-slug-hash="XaVRyY" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-pen-title="XaVRyY" class="codepen">See the Pen <a href="https://codepen.io/pawelgrzybek/pen/XaVRyY/">XaVRyY</a> by Pawel Grzybek (<a href="https://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</p>

This very simplified version of the observer pattern can save you from downloading some costy frameworks like Vue of React. If you are looking for detailed explanation of it, I can't recommend enough a ["Learning JavaScript Design Patterns"](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript) by Addy Osmani. Classic! Sometimes "Publication / Subscription" is used interchangeably to describe this pattern, although [there are some minor differences](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript) between them and Addy points them all in his book. Hopefully I this article helped you out. Until next time curious people :-)
