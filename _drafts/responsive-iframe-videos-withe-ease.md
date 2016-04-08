---
title: Responsive iframe videos with ease
excerpt:
photo: 2016-04-10.jpg
---

In this post I would like to share with you a easy script that I published few days ago. [Liquid video]() does exactly what the name suggest. It converts fixed sized iframe videos (from youTube, Vimeo and other services like that) to responsive ones that adapt to width of the container. It does exactly the same job as popular jQuey plugin [FitVid]() by Dave Rupert but doesn't rely on additional dependency. It is extremely lightweight (666b minified).

## How to use Liquid video

You have two options to use Liquid video. By manually injecting your code to source code of your project (sounds a bit old school) or via npm (preferred way).

### Manually inject to source code of your project

```html
<script src="js/liquid-video.min.js"></script>
<script>
var lv = new LiquidVideo(document.querySelectorAll('.post iframe'));
</script>
```

### Use with npm

```bash
npm i -S liquid-video
```

```bash
npm install --save liquid-video
```

```js
var lv = require=('liquid-video');
var poo = new lv(document.querySelectorAll('.post iframe'));
```
