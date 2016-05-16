---
title: Intro to Web Animations API
excerpt: We have many methods to move things around on the web. Let’s embrace the power of future animations with Web Animations API.
photo: 2016-05-21.jpg
---

We have plenty of ways to animate things in the web. The answer which one to use isn’t always easy. Each of them comes with pros & cons. Should we use CSS, `canvas`, Web GL, JavaScript `requestAnimationFrame` or `setInterval`? Maybe SMIL? Oh no — this one is dead by now. Maybe some external libraries like jQuery, GreenSock or VelocityJS? These are just few of possible ways to go. If you are keen to get to know a little bit more about these methods, I encourage you to read a fantastic article [“A Comparison of Animation Technologies”](https://css-tricks.com/comparison-animation-technologies/) by [Sarah Drasner](https://twitter.com/sarah_edo) on CSS-Tricks.


“Lord of the twins” is a funny descriptor that [Dave Rupert](https://twitter.com/davatron5000) named the [Web Animations API](https://w3c.github.io/web-animations/) in ShopTalk Show [episode](http://shoptalkshow.com/episodes/203-with-rachel-nabors-and-dan-wilson/) with [Rachel Nabors](https://twitter.com/rachelnabors) and [Dan Wilson](https://twitter.com/dancwilson) exclusively dedicated to this piece of spec. It is a combination of hardware accelerated CSS animations and power of JavaScript. This high-performance API exposes powerful animation methods that allow us to control animations of HTML and SVG elements.

## Are we ready to use WAAPI?

Web Animations API is relatively new with initial version of spec published in June 2012. At the moment of writing this article the [browser support]() isn’t great. Even the browsers that support it offer a very inconsistent level of implementation. If you would like to play around with bleeding edge parts of this spec,  [Firefox Nightly build](https://nightly.mozilla.org/) is the best playground. The status of [Webkit](https://webkit.org/status/#specification-web-animations) is under consideration and roadmap priority for [IE platform](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/webanimationsjavascriptapi) is medium.

[![Browser support for Web Animations API](/photos/2016-05-21-1.jpg)](http://caniuse.com/#feat=web-animation)


The good news is that there is a very reliable [polyfill](https://github.com/web-animations/web-animations-js) that provides a support for Chrome, Firefox 27+, IE10+ (including Edge), Safari (iOS) 7.1+ and Safari (Mac) 9+. Actually it exists in three versions - [web-animations](https://github.com/web-animations/web-animations-js/blob/master/web-animations.min.js) that covers support of basic stable features, [web-animations-next](https://github.com/web-animations/web-animations-js/blob/master/web-animations-next.min.js) that allows us to use new proposed features and [web-animations-next-light](https://github.com/web-animations/web-animations-js/blob/master/web-animations-next-lite.min.js) that is stripped down version of "next" without lesser used properties.

## Basic syntax

The heading above is the biggest lie of this article because something like “basic syntax” doesn’t exist. Spec is huge and there is so many constructors associated with WAAPI. Let’s just cover bare minimum that allows us to create something.

```js
elem.animate(effect, options);
```

Please don't confuse this native [`animate()`](https://w3c.github.io/web-animations/#dom-animatable-animate) function with jQuery [`animate()`](http://api.jquery.com/animate/) - these are not related whatsoever. First parameter `effect` describes the effect of an animation. At this moment the only natively implemented option that we can use is an object full of keyframes. When function is invoked, new `KeyframeEffect` object is created. In Level 2 spec we will be able to use more fancy things like `GroupEffects` and `SequenceEffects`. If you would like to use them today, [polyfill](https://github.com/web-animations/web-animations-js) is needed because Firefox nightly build is the only browser that supports some upcoming parts of a new spec. You can think about this parameter as it was `@keyframes` in CSS.

The bare minimum that needs to be passed as `options` parameter is duration in milliseconds. Luckily we can pass a much more parameters to [`AnimationEffectTiming`](https://w3c.github.io/web-animations/#animationeffecttiming) object. Essentially think of it as CSS animation related properties (animation-duration, animation-timing-function, animation-delay etc.).

## Just do it, do it, do it now

Enough of theoretical gibberish — time for a practical example. If you have some previous experience with CSS animations,  the piece of code below should look very familiar.

```js
document.querySelector('.box').animate(
  [
    {
      offset: 0,
      transform: 'none'
    },
    {
      offset: 0.25,
      transform: 'translate(200px, 0)'
    },
    {
      offset: 0.5,
      transform: 'translate(200px, 200px)'
    },
    {
      offset: 0.75,
      transform: 'translate(0, 200px)'
    },
    {
      offset: 1,
      transform: 'none'
    }
  ],
  {
    duration: 1000,
    easing: 'cubic-bezier(1,0,1,1)',
    iterations: 50,
    direction: 'normal',
    delay: 500,
    fill: 'both'
  }
);
```

As I told you before, think about the first parameter as a CSS `@keyframes` and second one as an `animation-*` properties in CSS declaration block. On every single keyframe I passed `offset` although it could be skipped in this case. I did it intentionally to show how to control offset of an animation — it's a demical representation that does exactlly the same job as percentage value in front of every CSS keyframe. I used `endDelay` and `iterationStart` with value `0` (this value is a default when property is skipped) to give you an overview of [all possible options](https://w3c.github.io/web-animations/#dom-animationeffecttimingreadonly-delay). To have a clear comparison, have a look at the CSS animation with mirrored properties.

```css
@keyframes move {
  0% {
    transform: none;
  }

  25% {
    transform: translate(200px, 0);
  }

  50% {
    transform: translate(200px, 200px);
  }

  75% {
    transform: translate(0, 200px);
  }

  100% {
    transform: none;
  }
}

.box {
  animation-name: move;
  animation-duration: 1000ms;
  animation-timing-function: cubic-bezier(1,0,1,1);
  animation-delay: 500ms;
  animation-iteration-count: 50;
  animation-direction: normal;
  animation-fill-mode: both;
  animation-play-state: running;
}

/* or as a shorthand */

.box {
  animation: move 500ms linear 500ms 10 normal both running;
}
```

Hopefully this comparison to CSS helped you to understand the syntax. But does it really generate the same effect? Not really. The behavior of JavaScript `easing` and CSS `animation-timing-function` is different. WAAPI [timing function](https://w3c.github.io/web-animations/#time-transformations) is applied to whole iteration of an animation — as expected. Referred to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function), CSS `animation-timing-function` is applied on each movement between keyframes.

> For keyframed animations, the timing function applies between keyframes rather than over the entire animation. In other words, the timing function is applied at the start of the keyframe and at the end of the keyframe.

Have a look...

<p>
  <p data-height="368" data-theme-id="dark" data-slug-hash="oxOmGG" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/oxOmGG/">oxOmGG</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>


## The power of WAAPI

For now we haven't seen anything that we cannot do via CSS. Let's make it happen. WAAPI `animate()` function apart from starting an animation does one more thing, returns a new instance of [Animation](https://w3c.github.io/web-animations/#the-animation-interface) interface that is equipped with very powerful properties and methods. Assigning animation to a variable gives us a power of invoking these methods later on. Let's do it and print to console brand new toys.

```js
var move = document.querySelector('.box').animate(blah, blah);
console.log(move);
```
![Web Animations API Animation object returned](/photos/2016-05-21-2.jpg)

This is the main advantage of WAAPI over the CSS animations. It is going to be even more powerful in the future. Having an access to these bad boys, allows us to create a things like this...

<p>
<p data-height="609" data-theme-id="dark" data-slug-hash="EKJqxG" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/EKJqxG/">2016-05-21-2</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

## The future of WAAPI

## People worth to follow and useful resources

- https://twitter.com/brianskold - Working on Web Animations and Firefox at Mozilla Japan
- https://twitter.com/rachelnabors - spec creator on MDN
- https://twitter.com/dancwilson -
- https://twitter.com/vlh
- https://twitter.com/sarah_edo

- [“Are we animated yet?”](https://birtles.github.io/areweanimatedyet/) is a dedicated website that tracks implementation progress of all the tomorrow’s features.
