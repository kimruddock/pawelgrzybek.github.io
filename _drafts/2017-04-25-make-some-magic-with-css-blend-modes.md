---
title: Make some magic with CSS blend modes
excerpt: Bloody wars between web designers and front-end developers about blending modes. These times are over — thanks to the power of CSS!
photo: 2017-04-25.jpg
---

It was an ordinary Wednesday morning, enjoying my morning espresso shot at [Engine Creative](https://twitter.com/enginecreative), when suddenly my lovely colleague Chloe put on my desk the latest issue of [net magazine](https://twitter.com/netmag) that post man just delivered. I had a quick glance at the cover art that says "Make magic with CSS". Pfff — I totally ignored it — I know everything about CSS, don't I? It was a really nice espresso.

It is an ordinary Sunday morning, enjoying my morning espresso shot on my sofa —  time for some press. After reading first three paragraphs of "Make magic with CSS" by [Aga Naplocha](https://twitter.com/aganaplocha) I realized that I really felt behind with my CSS. It is a really nice espresso but I'm going to brew more because today is a day to catch up with some CSS magic — blend modes.

## Blend modes essentials

If you have ever used any image editing software like Adobe Photoshop, Affinity Photo or Sketch App you probably have some experience with blending modes. Yes — it is one of those features that designers love as it is the shortcut for beautifulness but front-end developers hate as it is laborious to implement. A-ha! Not anymore! I will show you how in a second but first let's put here some theory from [Wikipedia](https://en.wikipedia.org/wiki/Blend_modes).

> Blend modes in digital image editing are used to determine how two layers are blended into each other. However, as each pixel has a numerical representation, a large number of ways to blend two layers is possible.

!!! IMAGE OF BLEND MODES FROM PS, AFFINITY PHOTO and SKETCH !!!

For lots of designers and developers working with blend modes is a very experimental process. Memorizing all mathematical calculations responsible for each available option isn't required to use them effectively. It doesn't take much time to juggle with some options in Photoshop but it can be very time consuming when the same needs to be done in CSS or JavaScript. A little bit of consciousness helps and I will do my best to give you some.

### Blend mode by group

Photoshop offers 27 blending mode, Sketch 16 (screenshot below) and both of these apps separate them into few groups. Affinity Photo gives us access to 30 options but they are ungrouped (worth to add in future version). I'm not going to describe algorythm behind each of thm as there is plenty of [detailed explanations](https://photoshoptrainingchannel.com/blending-modes-explained/) out there — brief group summary is enough to grasp the concept.

!!! LIS OF BLENDING MODE OPTION ON SKETCH APP !!!

this is good one!!!
https://photoshoptrainingchannel.com/blending-modes-explained/ !!!

#### Normal

There isn't any math algorithm applied. If you are wondering why "Dissolve" belongs to this as it generates quire random results. Exactlly — [random results](https://en.wikipedia.org/wiki/Blend_modes#Dissolve).

#### Darken 

...anything that is darker than pure white is going to darken the image below
...it is using white as a base color so it won't affect anything on pure white background


#### Lighten 

...anything that is brighter than pure black is going to lighten the image below
...it is using black as a base color so it won't affect anything on pure black background
mirror t o darken, gived inverted effect

#### Contrast

...in the Darken Blend Modes, White was the neutral point.
...in the Lighten Blend Modes, Black was the neutral point.
...in the Contrast Blend Modes the 50% Grey is the neutral point
...anything that isn’t 50% gray will be adding contrast and changing brightnes  of  layers below
... loved by photographers to add cool effects

#### Inversion blend modes

...depending on the underlying layer, it’s either going to invert or cancel out the colors
... rarely used by photographers, used wisely can achieve nice effects, for example 3D

#### Component blend modes

...the component blending modes use different combinations of the primary color componets (hue, saturation, and brightness) to create the blend.








### Blend modes on the web vs. graphic software

- spac https://drafts.fxtf.org/compositing-1/
- background-blend-mode
- mix-blend-mode
- cmyk example http://codepen.io/bennettfeely/pen/qBJyj
- opacity fallback
- canvas fallback
- js detection:

```js
const supportsMixBlendMode = window.getComputedStyle(document.body).mixBlendMode;
const supportsBackgroundBlendMode = window.getComputedStyle(document.body).backgroundBlendMode;
```

- https://photoshoptrainingchannel.com/blending-modes-explained/
- https://www.smashingmagazine.com/2016/05/web-image-effects-performance-showdown/
- https://vimeo.com/181110918
- http://arttheweb.com/ by Una Kravets
