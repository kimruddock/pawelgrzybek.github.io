---
title: Events bubbling and capturing
excerpt: JavaScript allows us to trigger a handler function for an event that accured on DOM element. Things are getting a bit trickier when elements are nested.
photo: 2018-02-10.jpg
---

You probably worked with DOM events before. Things like: `click`, `mousedown`, `keydown` or `submit`. We attach handler functions to elements that are listening to particular those events to do some cool things on our websites. Open a navigation, update counter, submit a form or hijack a speed of a mouse scroll (please, stop doing that) just to name few use cases. Example:

```html
<button>Not clicked yet</button>
```

```js
// reference to DOM element
const button = document.querySelector('button');

// handler function
function handler(event) {
  const element = event.currentTarget;
  const now = new Date().toLocaleTimeString();
  
  element.textContent = `Clicked at: ${now}`;
}

// add a listener for click event to DOm event
button.addEventListener('click', handler);
```
