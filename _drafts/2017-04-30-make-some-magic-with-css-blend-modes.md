---
title: Make some magic with CSS blend modes
excerpt: Bloody wars between web designers and front-end developers about blending modes. These times are over — thanks to the power of CSS!
photo: 2017-04-30.jpg
---

It was an ordinary Wednesday morning, enjoying my morning espresso shot at [Engine Creative](https://twitter.com/enginecreative), when suddenly my lovely colleague Chloe put on my desk the latest issue of the [net magazine](https://twitter.com/netmag) that a post man just delivered. I had a quick glance at the cover art that says "Make magic with CSS". Pfff — I totally ignored it — I know everything about CSS, don't I? It was a really nice espresso.

It is an ordinary Sunday morning, enjoying my morning espresso shot on my sofa —  time for some press. After reading first three paragraphs of "Make magic with CSS" by [Aga Naplocha](https://twitter.com/aganaplocha) I realized that I really felt behind with my CSS skills. It is a really nice espresso but I'm going to brew more because today is a day to catch up with some CSS magic — blend modes.

## Blend modes essentials

If you have ever used any image editing software like an Adobe Photoshop, Affinity Photo or Sketch App you probably have some experience with blending modes. Yes — it is one of those features that designers love as it is the shortcut for beautifulness but front-end developers hate as it is laborious to implement. A-ha! Not anymore! I will show you how in a second but first let's put some [Wikipedia](https://en.wikipedia.org/wiki/Blend_modes) theory here.

> Blend modes in digital image editing are used to determine how two layers are blended into each other. However, as each pixel has a numerical representation, a large number of ways to blend two layers is possible.

![Blend modes in Adobe Photoshop, Sketch App and Affinity Photo](/photos/2017-04-30-1.jpg)

For lots of designers and developers working with blend modes is a very experimental process. Memorizing all mathematical calculations isn't required to use them effectively. It doesn't take much time to juggle with some options in Photoshop but it can be very time consuming when the same needs to be done in CSS or JavaScript. A little bit of understanding helps and I will do my best to help you with that.

### Blend modes by group

Photoshop and Sketch separate blending options into few meaningful groups. Unfortunately Affinity Photo presents it's options in non-grouped manner (worth to add in future version). I'm not going to describe the algorithm behind each of them as there is plenty of [detailed explanations](https://photoshoptrainingchannel.com/blending-modes-explained/) out there — brief group summary is enough to grasp the concept.

![Grouped blend modes in Sketch App](/photos/2017-04-30-2.jpg)

#### Normal

There isn't any mathematical algorithm applied. If you are wondering why this very random looking "Dissolve" mode belongs to this group, you just answeared your question — [random](https://en.wikipedia.org/wiki/Blend_modes#Dissolve). Examples below presents "Normal" blend mode.

![Blend mode - Normal group](/photos/2017-04-30-3.jpg)

#### Darken

As the name suggests — the result will be darker than initial look of the blended layer. The base color is a pure white. Every pixel darker than a white, result in a darken output of blended pixels. Using this mode with the pure white layers won't generate any effect. Generates inverted effects to modes from "Lighten" category. Examples below presents "Darken" blend mode.

![Blend mode - Darken group](/photos/2017-04-30-4.jpg)

#### Lighten

As the name suggests — the result will be lighter than initial look of the blended layer. The base color is a pure black. Every pixel brighter than a black, result in a lighten output of blended pixels. Using this mode with the pure black layers won't generate any effect. Generates inverted effects to modes from "Darken" category. Examples below presents "Lighten" blend mode.

![Blend mode - Lighten group](/photos/2017-04-30-5.jpg)

#### Contrast

Darken blend modes use pure white as a neutral point. Lighten ones use pure black. Contrast group takes 50% gray as a base color to recalculate the blended result. The purpose of this category is to manipulate the contrast of an image. Examples below presents "Hard Light" blend mode.

![Blend mode - Contrast group](/photos/2017-04-30-6.jpg)

#### Inversion

This set of blend modes calculate the difference or color inversion between two layers. In a results colors are canceled or inverted in a color wheel. Examples below presents "Difference" blend mode.

![Blend mode - Inversion group](/photos/2017-04-30-7.jpg)

#### Component

Component group allow to blend primary color components: hue, saturation and brightness. Examples below presents "Hue" blend mode.

![Blend mode - Component group](/photos/2017-04-30-8.jpg)

### Software vs. web reality

Web design software is much more generous in available options than the web platform is. Adobe Photoshop gives us an access to 27 blend modes, Sketch gives us 16 options and Affinity Photo offers crazy 30 variations.

Accordingly to recent [Compositing and Blending Level Spec](https://drafts.fxtf.org/compositing-1/), CSS comes with 16 values that we can use in our projects. These are exactly the same values as these available in Sketch — thats one of the reasons why I really love Sketch so much.

## Working with CSS blend modes

Enough of theory — time for some practice. As mentioned second ago, CSS allows us to use the follwing values:

- [`normal`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-normal) (initial value)
- [`multiply`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-multiply)
- [`screen`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-screen)
- [`overlay`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-overlay)
- [`darken`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-darken)
- [`lighten`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-lighten)
- [`color-dodge`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-color-dodge)
- [`color-burn`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-color-burn)
- [`hard-light`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-hard-light)
- [`soft-light`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-soft-light)
- [`difference`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-difference)
- [`exclusion`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-exclusion)
- [`hue`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-hue)
- [`saturation`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-saturation)
- [`color`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-color)
- [`luminosity`](https://www.w3.org/TR/compositing-1/#valdef-blend-mode-luminosity)

There are two CSS properties out there that allow us to work with blend modes: [`background-blend-mode`](https://www.w3.org/TR/compositing-1/#propdef-background-blend-mode) and [`mix-blend-mode`](https://www.w3.org/TR/compositing-1/#mix-blend-mode). The effect that those values produce is exactlly identical but the use case of them if different. Let's have a quick look at both of them.

### background-blend-mode

As it say on the tin `background-blend-mode` applies blend mode to `background-color` or `background-image`. It can take multiple values when we use more than one background. Using it with gradients can produce really impresive results — but I will leave creativity to you. Let's have a look at some simple example.

```css
.box {
  background-color: #D3545B;
  background-image: url('image.jpg');
  background-blend-mode: multiply;
}
```

<p>
<p data-height="572" data-theme-id="14885" data-slug-hash="oWYgwd" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-pen-title="2017-04-30-1" class="codepen">See the Pen <a href="https://codepen.io/pawelgrzybek/pen/oWYgwd/">2017-04-30-1</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</p>

### mix-blend-mode

It would be a bit restricted to use blending modes with backgrounds only. That is the reason why `mix-blend-mode` exists. It allows us to blend any elements with it's backgrop.

```css
.page {
  background-image: url('image.jpg');
}

.box {
  background-image: repeating-linear-gradient(
    45deg,
    #D3545B,
    #D3545B 2rem,
    transparent 2rem,
    transparent 3rem
  );
  mix-blend-mode: darken;
}
```

<p>
<p data-height="572" data-theme-id="14885" data-slug-hash="bWBNzV" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-pen-title="2017-04-30-2" class="codepen">See the Pen <a href="https://codepen.io/pawelgrzybek/pen/bWBNzV/">2017-04-30-2</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</p>

Friendly reminder! There is a bug in Chrome. Blending with `body` element is broken in Google's browser — works like a charm in other ones though.

### But Internet Explorer, Edge and Safari...

Let's be honest — the browser support isn't fantastic. Internet Explorer and Edge don't support it at all. Desktop and mobile Safari has a real issue with all non-separable blend modes: `hue`, `saturation`, `color`, `luminosity`.

![Blend modes support in the browsers](/photos/2017-04-30-9.jpg)

Let me introduce a new term now — "no blend modes first". The project on old-school browser shouldn't be any less functional as the one on the latest Google Chrome. Take the support for wonky feature as an opportunity, not as a something that should dictate your design decisions. But if you really, really must to…

```js
if(!window.getComputedStyle(document.body).mixBlendMode) {
  document.body.className += ' no-mix-blend-mode';
}

if(!window.getComputedStyle(document.body).backgroundBlendMode) {
  document.body.className += ' no-background-blend-mode';
}
```

```css
.box {
  background-color: #D3545B;
  background-image: url('image.jpg');
  background-blend-mode: hard-light;
}

.no-background-blend-mode .box {
  background-image: url('some-fallback-image.jpg');
}
```

And here is a result on latest Google Chrome and Internet Explorer 9.

![Cross browser Internet Explorer 9 CSS blend mode](/photos/2017-04-30-10.jpg)

<p>
<p data-height="472" data-theme-id="14885" data-slug-hash="GmNmJK" data-default-tab="result" data-user="pawelgrzybek" data-embed-version="2" data-pen-title="2017-04-30-3" class="codepen">See the Pen <a href="https://codepen.io/pawelgrzybek/pen/GmNmJK/">2017-04-30-3</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</p>

## I missed you CSS

[Aga](https://twitter.com/aganaplocha), thanks for your inspiration to write this article. I promise to catch up some latest CSS magic — actually I really miss it.

Hopefully this article helped you out guys. For me, writing it was a really enjoyable path to learn it. I officially announce that I'm staring using CSS blend modes on production today. Until next time CSS magicians!
