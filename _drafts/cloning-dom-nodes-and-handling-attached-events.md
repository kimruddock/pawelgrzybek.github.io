---
title: Cloning DOM nodes and handling attached events
excerpt: 
photo: 2017-06-22.jpg
---

You maybe aware that I'm a creator and the only maintainer of [Siema](https://pawelgrzybek.com/siema/) — simple carousel script that gained quite unexpected popularity on Github. Thanks! As I'm constantly improving and working on new features I recently came across a tiny challenge when I had to clone some DOM elements. Let me share with you few handy tips and few details that is worth to bare in mind.

## Cloning DOM elements

### cloneNode()
###
shallow copy / deep copy

there are some minor diferences in implementation that doesnt really matter when we shift / clone elements that belong to the same documnt. jsPerf show that importNode is just a tiny bit faster https://jsperf.com/innerhtml-vs-importnode/6 but it doesnt really matter - i doubt that you will ever have a need to clone thousands elements

