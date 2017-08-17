---
title: The Observer Pattern in JavaScript explained
excerpt: This popular pattern used by tons of JavaScript applications may save yuo from injecting costy dependencies to you project. Easy, clean and very useful.
photo: 2015-08-18.jpg
---

The Observer Pattern is a popular pattern used across all sort of JavaScript applications. The instance (subject) maintains collection of objects (observers) and notifies them all when change to the state occurs. Does it sound difficult to you? Yes, it was upsetting to me when I came across this pattern for a first time too. Tiny practical example may help you to grasp it.

Imagine that you would like to update multiple elements (`h1`, `h2` and `h3`) simultaneously when some event occurs (typing inside the `input` field perhaps). You need to be able to add more (subscribe) elements that react (observe) to a value of a input. Removing subscription (unsubscribe) can be handy if you no longer need to reflect state changes in particular object. Do you get the idea now? Let's code it!

```js
// define a class
class Observer {
  // each instance of Observer class
  // starts with empty array of things (observers)
  // that react for a state change
  constructor() {
    this.observers = [];
  }

  // add ability to subscribe to new objects / DOM elements
  // esentially, add soemthing to observers array
  subscribe(f) {
    this.observers.push(f);
  }

  // add ability to unsubscribe to a particular object
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

Hopefully the comments above help you to understand this pattern. This is an usecase example…

```js
// some DOM references
const input = document.querySelector('.js-input');
const h1 = document.querySelector('.js-h1');
const h2 = document.querySelector('.js-h2');
const h3 = document.querySelector('.js-h3');

// some actions to add to observers array
const updateH1 = text => h1.textContent = text;
const updateH2 = text => h2.textContent = text;
const updateH3 = text => h3.textContent = text;

// instantiate new Observer class
const headingsObserver = new Observer();

// subscribe to some observers
headingsObserver.subscribe(updateH1);
headingsObserver.subscribe(updateH2);
headingsObserver.subscribe(updateH3);
```

With tiny little help of few control buttons, it gives you the power to do this kind of cool things with just a few lines of code. Isn't it nice?

!!!! CODEPEN HERE !!!!


- [the best explanation of this pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript) can be found in "Learning JavaScript Design Patterns" by Addy Osmani — classic that every JavaScript developer should know
- Pub / Sub which is a short for Publication / Subscription sometimes is used interchangeably to descibe this pattern, although [there are some minor differences](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript) between them and Add Osmanni descibes them all in his book.

example 

- instantiate an observer (the subject)
- subscribe to methods that should be triggered when an event occurs
- notify all observers with new data that is coming from the event
- codepen

- commonly used in js apps
- the use case is wide and sometimes it may save you from injecting a costy frameworks like Vue or React
