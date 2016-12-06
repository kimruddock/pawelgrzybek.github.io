---
title: What's the deal with PointerEvent interface in JavaScript
excerpt: How to handle mouse event but keep great experience for users using their finger as a input device? How about pen / stylus? Pointer events to the rescue!
photo: 2016-12-06.jpg
---

Have you ever worked on a UI component that leans on events triggered by pointer device? It can be a mouse, touch pad or more precise tools like pencil very often used with iPad Pro or other devices like Samsung Galaxy Note. Touch devices are reading events triggered by your fingers. Wait a sec — it is 2016 — pressure and tilt-aware devices exists and presumably you hold one in your pocket.

Essentially to fulfill rich experience for all those scenarios is a mess. When `mouseleave` and `mouseout` is triggered? Does it bobble up? How to stop propagation of a event with keeping another one registered? What `touchenter` does? If those questions doesn't confuse you enough, have a look at [events reference](https://developer.mozilla.org/en-US/docs/Web/Events) — there is gazillion of them!

Time for good news! Recently updated [Google Chrome 55](https://developers.google.com/web/updates/2016/11/nic55) comes with [Pointer Events](https://w3c.github.io/pointerevents/url) interface that will help us to unify way of handling all input events in hardware agnostic way. Surprising [this is not](http://caniuse.com/#feat=pointer) one of those Chrome only features that we won't be able to use in production for next decades. It's been implemented in Microsoft Internet Explorer 11 and all Edge versions. Chrome and Opera just joining the bandwagon. Firefox with partial support and Safari without any known info about implementations are great candidates to use [polyfill](https://github.com/jquery/PEP) maintained by jQuery team.

> The primary goal is to provide a single set of events and interfaces that allow for easier authoring for cross-device pointer input while still allowing for device-specific handling only when necessary for an augmented experience.

## Kill three birds with one stone

Yeah three! Mouse, pen and touch. To make migration easier spec is designed based on naming taken from most generic mouse events. For example `mousedown` becomes `pointdown`. Just by making this change we are gaining an access to information like: pressure level, contact geometry, tilt etc.

So instead of doing...

```js
somethingCool.addEventListener('mousedown', () => {
  // do some more cool stuff here
});

somethingCool.addEventListener('touchdown', () => {
  // do some more cool stuff here
});
```

You can simply do

```js
somethingCool.addEventListener('pointerdown', () => {
  // do some more cool stuff here
});
```

If you would like to keep input specific event handling by using single pointer event you can use `pointerType` property. Example!

```js
somethingCool.addEventListener('pointerdown', (e) => {
  switch (e.pointerType) {
  case 'mouse':
    /* mouse detected */
    break;
  case 'pen':
    /* pen / stylus detected */
    break;
  case 'touch':
    /* touch detected */
    break;
  default:
    /* pointerType unknown or cannot be detected */
  }
});
```

## Other benefits of Pointer Events

Apart from cleaner and unified API to deal with user inputs, Pointer Events come with other benefits. The most important one is performance gain that comes built in by taking advantage of [passive event listeners](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md). Removing unnecessary blocked by browser events can make a huge impact on scrolling executed on touch devices. Have a look at [this video](https://youtu.be/65VMej8n23A) that show scrolling experience on CNN website - UX is immensely improved by using it!

## Love it! Use it!

As a not the biggest fan of polyfills I'm going to use it deliberately nowadays. For the time being a basic feature detection will do...

```js
if (window.PointerEvent) {
  // Yaah, the future is now!
} else {
  // Back to reality
}
```

Hopefully you like it same as I do. Any thoughts — comments section below is all yours! Helpful? Share buttons below provided too. Stay curious until next one fellas!
