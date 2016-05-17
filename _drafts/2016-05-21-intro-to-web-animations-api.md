---
title: Intro to Web Animations API
excerpt: We have many methods to move things around on the web. Let’s embrace the power of future animations with Web Animations API.
photo: 2016-05-21.jpg
---

We have plenty ways to animate things in the web. The answer which one to use isn’t always easy. Each of them comes with pros & cons. Should we use CSS, `canvas`, Web GL, JavaScript `requestAnimationFrame` or `setInterval`? Maybe SMIL? Oh no — this one is dead by now. Maybe some external libraries like jQuery, GreenSock or VelocityJS? These are just few of possible ways to go. If you are keen to get to know a little bit more about these methods, I encourage you to read a fantastic article [“A Comparison of Animation Technologies”](https://css-tricks.com/comparison-animation-technologies/) by [Sarah Drasner](https://twitter.com/sarah_edo) on CSS-Tricks.


“Lord of the twins” is a funny descriptor that [Dave Rupert](https://twitter.com/davatron5000) named the [Web Animations API](https://w3c.github.io/web-animations/) in ShopTalk Show [episode](http://shoptalkshow.com/episodes/203-with-rachel-nabors-and-dan-wilson/) with [Rachel Nabors](https://twitter.com/rachelnabors) and [Dan Wilson](https://twitter.com/dancwilson) exclusively dedicated to this piece of spec. It is a combination of hardware accelerated CSS animations and power of JavaScript. This high-performance API exposes powerful animation methods that allow us to control animations of HTML and SVG elements.

## Are we ready to use WAAPI?

Web Animations API is relatively new with initial version of spec published in June 2012. At the moment of writing this article the [browser support](http://caniuse.com/#feat=web-animation) isn’t great. Even the browsers that support it offer a very inconsistent level of implementation. If you would like to play around with bleeding edge parts of this spec,  [Firefox Nightly build](https://nightly.mozilla.org/) is the best playground. The status of [Safari](https://webkit.org/status/#specification-web-animations) is under consideration and roadmap priority for [IE platform](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/webanimationsjavascriptapi) is medium. The first mobile implementation very recently met Android devices and we all are looking to have Web Animations API on iOS.

[![Browser support for Web Animations API](/photos/2016-05-21-1.jpg)](http://caniuse.com/#feat=web-animation)


The good news is that there is a very reliable [polyfill](https://github.com/web-animations/web-animations-js) that provides a support for Chrome, Firefox 27+, IE10+ (including Edge), Safari (iOS) 7.1+ and Safari (Mac) 9+. Actually it exists in three versions — [web-animations](https://github.com/web-animations/web-animations-js/blob/master/web-animations.min.js) that covers support of basic stable features, [web-animations-next](https://github.com/web-animations/web-animations-js/blob/master/web-animations-next.min.js) that allows us to use new proposed features and [web-animations-next-lite](https://github.com/web-animations/web-animations-js/blob/master/web-animations-next-lite.min.js) that is stripped down version of "next" without lesser used properties.

## Basic syntax

The heading above is the biggest lie of this article because something like “basic syntax” doesn’t exist. Spec is huge and there is so many constructors associated with WAAPI (more to come soon). Let’s just cover bare minimum that allows us to create something.

```js
element.animate(effect, options);
```

Please don't confuse this native [`animate()`](https://w3c.github.io/web-animations/#dom-animatable-animate) function with jQuery [`animate()`](http://api.jquery.com/animate/) - these are not related whatsoever. First parameter `effect` describes the movement of an animation. At this moment the only natively implemented option that can be used is an array full of keyframes. The future spec allows to use an object with array of values (as many values, that many keyframes). You can think about this parameter as it was `@keyframes` in CSS.

The bare minimum that needs to be passed as `options` parameter is duration in milliseconds. Luckily we can pass much more parameters to [`AnimationEffectTiming`](https://w3c.github.io/web-animations/#animationeffecttiming) object. Essentially think of this parameter as CSS animation related properties (animation-duration, animation-timing-function, animation-delay etc.).

## Won't believe until you see?

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
    delay: 500,
    endDelay: 0,
    fill: 'both',
    iterationStart: 0,
    iterations: 50,
    duration: 1000,
    direction: 'normal',
    easing: 'cubic-bezier(1,0,1,1)'
  }
);
```

As I told you before, think about the first parameter as a CSS `@keyframes` and second one as CSS `animation-*` properties inside declaration block. On every single keyframe I passed `offset` although it [could be skipped](http://w3c.github.io/web-animations/#spacing-keyframes) in this case. I did it intentionally to show you how to control offset of an animation — it does the same job as percentage value in front of every CSS keyframe. It can be represented as a fraction (ie. `1/4`) or decimal number (ie. `.25`). I used `endDelay` and `iterationStart` with value `0` (this value is a default when property is skipped) to give you an overview of [all possible options](https://w3c.github.io/web-animations/#dom-animationeffecttimingreadonly-delay). To have a clear comparison, have a look at the CSS animation with mirrored properties.

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

Hopefully this comparison to CSS helped you to understand the syntax. Remember — you are dealing with JS so use camel-case values from `style` object, not the properties name from CSS. For instance — `margin-bottom` is `marginBottom`. It's just an example, but animation of `margin` probably isn't a best idea from performance reasons. [Paul Lewis](https://twitter.com/aerotwist) & [Surma](https://twitter.com/DasSurma) created  [CSS Triggers](https://csstriggers.com/) - a handy reference of triggered events associated with animation of particular CSS properties. There is no restriction - whatever you can animate with CSS you can animate via WAAPI (including fancy [motion-path](https://www.w3.org/TR/motion-1/)).

![DOM style object](/photos/2016-05-21-3.jpg)

Cool, but does it really generate the same effect? Not really — the behavior of JavaScript `easing` and CSS `animation-timing-function` is different. WAAPI [timing function](https://w3c.github.io/web-animations/#time-transformations) is applied to whole iteration of an animation — as expected. Referred to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function), CSS `animation-timing-function` is applied on each step between keyframes.

> For keyframed animations, the timing function applies between keyframes rather than over the entire animation. In other words, the timing function is applied at the start of the keyframe and at the end of the keyframe.

Have a look...

<p>
  <p data-height="368" data-theme-id="dark" data-slug-hash="oxOmGG" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/oxOmGG/">oxOmGG</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>


## Animation methods & properties

For now we haven't seen any clear vantage of WAAPI over CSS animations. Let's reveal the difference between reactive JavaScript over declarative CSS. When `animate()` function is invoked a new instance of [`Animation`](https://w3c.github.io/web-animations/#the-animation-interface) interface is returned — formerly known as `AnimationPlayer`. Assigning animation to a variable allows us to use returned properties, methods and promises. Let's do it and print to console brand new toys.

```js
var move = document.querySelector('.box').animate([...], {...});
console.log(move);
```
![Web Animations API Animation object returned](/photos/2016-05-21-2.jpg)

Having an access to these goodness, allows us to create more complex effects. If you didn't dive into world of ES2015 Promises yet, it's worth to have a look at ["Asynchronous programming (background)"](http://exploringjs.com/es6/ch_async.html) by Dr. Axel Rauschmayer or ["ES6 Promises in Depth"](https://ponyfoo.com/articles/es6-promises-in-depth) by Nicolás Bevacqua. [Dan Wilson](https://twitter.com/dancwilson) wrote a helpful article about working with [Promises in Web Animations](http://danielcwilson.com/blog/2016/03/animations-and-promises/). Time for simple example...

<p>
<p data-height="616" data-theme-id="dark" data-slug-hash="EKJqxG" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/EKJqxG/">2016-05-21-2</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

## Let's talk about some constructors

Let's dig deeper. In previous example we assigned the result of `animate()` function to variable. When `animate()` is invoked [few steps perform](https://w3c.github.io/web-animations/#dom-animatable-animate) — new `KeyframeEffect` and `Animation` object is constructed, animation starts playing and then is returned. [Following the documentation](https://w3c.github.io/web-animations/#dom-animatable-animate) we can manually use `KeyframeEffect` and `Animation` global objects to instantiate new animation. The only browser that gives us an access to both of them is FirefoxNightly. Thanks again to all amazing [polyfill](https://github.com/web-animations/web-animations-js) creators! Have a quick look at the syntax.

```js
Animation(effect, timeline)
```

In current implementation the only valid value of `effect` parameter is an instance of `KeyframeEffect` object. I will show you more fancy things that we can pass here in a moment.

Another parameter `timeline`, connects newly created animation with source of time for synchronization purpose. As far as I know the only valid value here is default document timeline accessed by `document.timeline`. [Rachel Nabors](https://twitter.com/rachelnabors) (main contributor to Web Animations API [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)) suggests that in the future we may get new cool options to use.

> ...in the future there my be timelines associated with gestures or scrolling for example.

Let's quickly remind how we did it previous, and recreate the same animation by manually constructed object.

```js
// via function
var element = document.querySelector('.anime-js');
var effect = [...];
var options = {...};

var move = element.animate(effect, options);
```

```js
// via constructors
var element = document.querySelector('.anime-js');
var effect = [...];
var options = {...};

var keyframes = new KeyframeEffect(element, effect, options);
var move = new Animation(keyframes, element.ownerDocument.timeline);
move.play();
```

<p>
<p data-height="360" data-theme-id="dark" data-slug-hash="mPYmQj" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/mPYmQj/">2016-05-21-3</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

You are probably thinking now "Yeah, cool, by why should I bothered about constructors if I can use `animate()` function". Wait for it!

## GroupEffects & SequenceEffects

As I mentioned before, for the time being the only natively implemented property that we can use as an effect of animation is `KeyframeEffect`. In the future level 2 spec [we will](https://twitter.com/rachelnabors/status/631545063965720576) have an opportunity to use more sophisticated constructors like `GroupEffects` and `SequenceEffects`. It's possible to apply group of animations via CSS but chaining animations together always had been pain in the arse. Good news — polyfill allows us to use it today (although I think the implementation is buggy or I don't know how to correctly use it). Examples!

```js
var elem1 = document.querySelector('.box1');
var elem2 = document.querySelector('.box2');

var keyframes = {
  transform: ['none', 'translate(200px, 0)', 'translate(200px, 200px)', 'translate(0, 200px)', 'none']
};

var props = {
  duration: 1000,
  easing: 'cubic-bezier(1,0,1,1)',
  iterations: 50,
  direction: 'normal',
  delay: 500,
  fill: 'both'
};

var group = new GroupEffect(
  [
    new KeyframeEffect(elem1, keyframes, props),
    new KeyframeEffect(elem2, keyframes, props)
  ]
);

var move = new Animation(group, document.timeline);
```

<p>
<p data-height="360" data-theme-id="dark" data-slug-hash="WwBXxb" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/WwBXxb/">2016-05-21-4</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

And one more for `SequenceEffects`.

```js
var elem1 = document.querySelector('.box1');
var elem2 = document.querySelector('.box2');
var elem3 = document.querySelector('.box3');

var keyframes = {
  transform: ['none', 'translate(100px, 0)', 'translate(100px, 200px)', 'translate(0, 200px)', 'none']
};

var props = {
  duration: 1000,
  easing: 'cubic-bezier(1,0,1,1)',
  iterations: 2,
  direction: 'normal',
  delay: 0,
  fill: 'both'
};

var group = new SequenceEffect(
  [
    new KeyframeEffect(elem1, keyframes, props),
    new KeyframeEffect(elem2, keyframes, props),
    new KeyframeEffect(elem3, keyframes, props)
  ]
);

var move = new Animation(group, document.timeline);
```

<p>
<p data-height="360" data-theme-id="dark" data-slug-hash="wGbpWg" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/wGbpWg/">2016-05-21-5</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</p>

## The future of Web Animations API

- natively supported groups and sequenced animations
- possibly new timelines
- performance optimalisation for other properties

## People worth to follow and useful resources

- https://twitter.com/brianskold - Working on Web Animations and Firefox at Mozilla Japan
- https://twitter.com/rachelnabors - spec creator on MDN
- https://twitter.com/dancwilson -
- https://twitter.com/vlh
- https://twitter.com/sarah_edo

- [“Are we animated yet?”](https://birtles.github.io/areweanimatedyet/) is a dedicated website that tracks implementation progress of all the tomorrow’s features.
- Codepen to check browser support [http://codepen.io/danwilson/pen/XmWraY](http://codepen.io/danwilson/pen/XmWraY)
- State of the Animation with Rachel Nabors @ SFHTML5, https://youtu.be/GxOq1bnlZXk

## Conclusions

- sorry for not so creative examples
- hopefully it helped
- i will write more about waapi soon because im excited about this spec
- keep it fun
