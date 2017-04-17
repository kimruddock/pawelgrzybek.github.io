---
title: Make some magic with CSS blend modes
excerpt: Bloody wars between web designers and front-end developers about blending modes. These times are over — thanks to the power of CSS!
photo: 2017-04-25.jpg
---

It was an ordinary Wednesday morning, enjoying my morning espresso shot at [Engine Creative](https://twitter.com/enginecreative), when suddenly my lovely colleague Chloe put on my desk the latest issue of [net magazine](https://twitter.com/netmag) that post man just delivered. I had a quick glance at the cover art that says "Make magic with CSS". Of course — I totally ignored it — I know everything about CSS, don't I? It was a really nice espresso.

It is an ordinary Sunday morning, enjoying my morning espresso shot on my sofa —  time for some press. After reading first three paragraphs of "Make magic with CSS" by [Aga Naplocha](https://twitter.com/aganaplocha) I relized that I really felt behind with my CSS. It is a really nice espresso but I'm going to brew more because today is a time to catch up some CSS magic — blending modes.

## Blend modes essentials

If you have ever used any image editing software like Adobe Photoshop, Affinity Photo or Sketch App you probably have some experience with blending modes. Yes — it is one of those features that designers love because it is the way for beautifulness but front-end developers hate as it is pain to implement on web. A-ha! Not anymore! I will show you how in a second but first let's put here some theory from [Wikipedia](https://en.wikipedia.org/wiki/Blend_modes), as quotes on articles always look good.

> Blend modes in digital image editing are used to determine how two layers are blended into each other. However, as each pixel has a numerical representation, a large number of ways to blend two layers is possible.

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
