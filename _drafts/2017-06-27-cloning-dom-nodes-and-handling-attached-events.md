---
title: Cloning DOM nodes and handling attached events
excerpt: As a creator and maintainer of a popular DOM library, I found myself in a situation when I had to clone an element. Sounds trivially? This is what I learned.
photo: 2017-06-27.jpg
---

I'm a creator and the only maintainer of [Siema](https://pawelgrzybek.com/siema/) — simple carousel library that gained quite unexpected popularity on [Github](https://github.com/pawelgrzybek/siema). Thanks! I constantly improve and work hard to drop some new features every once in a while. I recently came across a tiny challenge — I had to clone some DOM elements. Let me share with you what I learned. Short and easy.

## Cloning DOM elements

To clone a DOM element we have two options: [`cloneNode()`](https://developer.mozilla.org/en/docs/Web/API/Node/cloneNode) and [`importNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/importNode). The difference between these two methods are very minor and it shouldn't really matter which one you use to perform cloning within a single document. If you are a performance freak — [jsPerf](https://jsperf.com/innerhtml-vs-importnode/6) shows a tiny faster computation for `importNode()`. Don't really care too much about it please and use this one that makes more sense for you. I doubt that you will ever need to clone thousands elements on the page.

```js
// using cloneNode()
const sourceElement = document.querySelector('.js-source');
const destination = document.querySelector('.js-destination');

const copy = sourceElement.cloneNode(true);
destination.appendChild(copy);
```

```js
// using importNode()
const sourceElement = document.querySelector('.js-source');
const destination = document.querySelector('.js-destination');

const copy = document.importNode(sourceElement, true);
destination.appendChild(copy);
```

## Reattach event listener of cloned element

After cloning, an element is loosing a reference to all events attached via JavaScript. It creates something commonly known as a shallow copy. We can manually reattach all the event listeners to cloned node but it sounds like a tedious task. Back in the days we could find something like [`EventListenerList()`](https://www.w3.org/TR/2001/WD-DOM-Level-3-Events-20010823/events.html#Events-EventListenerList) in the DOM spec. It would be very helpful to solve out issue but unfortunately it has been removed from the specification ages ago and the implementation isn't available on any browser. The reason of ditching this part of spec can be found on multiple [W3C mailing conversation](https://stackoverflow.com/a/7814692/2290040).

> [...] what is the motivation for adding this functionality at all? Previously, the working group resolved to remove the related but less powerful hasEventListenerNS method for lack of a use case, and because there are potential security issues.

### Event delegation

### jQuery clone() method

When I hear buzz about droping jQuery it makes me angry. Peoplle drop much heavier liblaries like Angular just to have a nice form validation but bithcing about good old jQuery.

"jQuery, YUI, Moo etc. keeps a copy of the eventListeners when you add them to elements so that you have access to a list. So for those libraries:"

jQuery's clone method uses a wrapper function around cloneNode() method that additionalyy trasks all listeners attached to each node. Thats why it is able to generate a deep copy of a node with all event lusteners
shallow copy / deep copy

## Easy, yeah?

Hopefully it makes sense and this article helped you out just a little bit. Thanks for reading and don't forget about some sharing buttons below — I'm sure that your friends don't know much about clonning yet. Peace!
