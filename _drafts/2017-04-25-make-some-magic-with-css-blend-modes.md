---
title: Make some magic with CSS blend modes
excerpt: Bloody wars between web designers and front-end developers about blending modes. These times are over — thanks to the power of CSS!
photo: 2017-04-25.jpg
---

It was an ordinary Wednesday morning, enjoying my morning espresso shot at [Engine Creative](https://twitter.com/enginecreative), when suddenly my lovely colleague Chloe put on my desk the latest issue of [net magazine](https://twitter.com/netmag) that post man just delivered. I had a quick glance at the cover art that says "Make magic with CSS". Pfff — I totally ignored it — I know everything about CSS, don't I? It was a really nice espresso.

It is an ordinary Sunday morning, enjoying my morning espresso shot on my sofa —  time for some press. After reading first three paragraphs of "Make magic with CSS" by [Aga Naplocha](https://twitter.com/aganaplocha) I realized that I really felt behind with my CSS. It is a really nice espresso but I'm going to brew more because today is a day to catch up with some CSS magic — blend modes.

## Blend modes essentials

If you have ever used any image editing software like Adobe Photoshop, Affinity Photo or Sketch App you probably have some experience with blending modes. Yes — it is one of those features that designers love as it is the shortcut for beautifulness but front-end developers hate as it is laborious to implement. A-ha! Not anymore! I will show you how in a second but first let's put here some [Wikipedia](https://en.wikipedia.org/wiki/Blend_modes) theory.

> Blend modes in digital image editing are used to determine how two layers are blended into each other. However, as each pixel has a numerical representation, a large number of ways to blend two layers is possible.

!!! IMAGE OF BLEND MODES FROM PS, AFFINITY PHOTO and SKETCH !!!

For lots of designers and developers working with blend modes is a very experimental process. Memorizing all mathematical calculations isn't required to use them effectively. It doesn't take much time to juggle with some options in Photoshop but it can be very time consuming when the same needs to be done in CSS or JavaScript. A little bit of consciousness helps and I will do my best to give you some.

### Blend mode by group

Photoshop and Sketch separate blending options into few meaningful groups. Unfortunately Affinity Photo presents it's options in non-grouped manner (worth to add in future version). I'm not going to describe algorithm behind each of them as there is plenty of [detailed explanations](https://photoshoptrainingchannel.com/blending-modes-explained/) out there — brief group summary is enough to grasp the concept.

!!! LIS OF BLENDING MODE OPTION ON SKETCH APP !!!

#### Normal

There isn't any math algorithm applied. If you are wondering why "Dissolve" belongs to this group in some apps as it generates quire random results. Exactlly — [random results](https://en.wikipedia.org/wiki/Blend_modes#Dissolve).

#### Darken

As the name suggests — the result will be darker than blended layer. The base color is a pure white. Every pixel darker than a white, result in a darker output of blended pixels. Using this mode with pure white layers won't generate any effect. Generates inverted effects to modes that belong to "Lighten" category.

#### Lighten

As the name suggests — the result will be lighter than blended layer. The base color is a pure black. Every pixel brighter than a black, result in a lighten output of blended pixels. Using this mode with pure black layers won't generate any effect. Generates inverted effects to modes that belong to "Darken" category.

#### Contrast

Darken Blend Modes use pure white as a neutral point. Lighten ones use pure black. Contrast group takes 50% gray as a base color to recalculate the blended result. The purpose of this category is to manipulate contrast of an image. Set of modes beloved by photographers.

#### Inversion blend modes

This set of blend modes calculate the difference or color inversion between two layers. In a results colors are canceled or inverted in a color wheel.

#### Component blend modes

Component group allow us to blend primary color components: hue, saturation and brightness.

### Software vs. CSS reality

Web design software is much more generous than the web platform is in terms of the available options. Adobe Photoshop gives us an access to 27 blend modes, Sketch gives us 16 options and Affinity Photo offers crazy 30 variations.

Accordingly to recent [Compositing and Blending Level Spec](https://drafts.fxtf.org/compositing-1/), CSS comes with 16 values that we can use in our projects. These are exactly the same values as we see in Sketch — thats one of the reasons why I really love Sketch so much.

!!! PHOTO OS BLENDING MODES FROM ALL APPS CROSSED UNAVAILABLE OPTIONS !!!

## Working with CSS blend modes

Enough of theory — time for some practice.

### background-blend-mode

### mix-blend-mode

### But IE... 3 lines of JS — well supported in IE

- js detection:

```js
const supportsMixBlendMode = window.getComputedStyle(document.body).mixBlendMode;
const supportsBackgroundBlendMode = window.getComputedStyle(document.body).backgroundBlendMode;
```

## I missed you CSS

- thanks aga for inspiration
- codepen full of super creative examples
- its a day when i start using it in production
- una kravets and her projects and talk


!!! HELP !!!

- https://photoshoptrainingchannel.com/blending-modes-explained/
- https://www.smashingmagazine.com/2016/05/web-image-effects-performance-showdown/
- https://vimeo.com/181110918
- http://arttheweb.com/ by Una Kravets
