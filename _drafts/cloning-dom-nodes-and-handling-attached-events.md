---
title: Cloning DOM nodes and handling attached events
excerpt: As s creator and maintainer of popular DOM library I came across a need to clone an element. Sounds trivially right? This is what I learned.
photo: 2017-06-22.jpg
---

You maybe aware that I'm a creator and the only maintainer of [Siema](https://pawelgrzybek.com/siema/) — simple carousel script that gained quite unexpected popularity on Github. Thanks! As I'm constantly improving and working on new features I recently came across a tiny challenge when I had to clone some DOM elements. Let me share with you few handy tips and few details that is worth to bare in mind.

!! GIF WITH ANIMATED FUNCTIONALITY !!

Tiny functionality above is out todays playground. We are going to split the whole process into two tasks — cloning and reaataching event listener that belong to cloned element.

## Cloning DOM elements

### cloneNode()
### importNode()

there are some minor differences in implementation that don't really matter when we shift / clone elements that belong to the same document. jsPerf show that importNode performs just a tiny bit better https://jsperf.com/innerhtml-vs-importnode/6 but it doesnt really matter - i doubt that you will ever have a need to clone thousands elements on the page.

## Reattach event listener of cloned element

After clonningn element it creates a shalow copy of an element as it carry events attached to it. We can add all the event listeners manually to your the cloned node but there is a hope we can do better.

### Event delegation

### jQuery clone() method

When I hear buzz about droping jQuery it makes me angry. Peoplle drop much heavier liblaries like Angular just to have a nice form validation but bithcing about good old jQuery.

jQuery's clone method uses a wrapper function around cloneNode() method that additionalyy trasks all listeners attached to each node. Thats why it is able to generate a deep copy of a node with all event lusteners
shallow copy / deep copy

## DOM clonning explained

Hopefully it makes sense and this article helped you out just a little bit. Thanks for reading and dont forget about some sharing buttons below — I'm sure that your friends don't know much about clonning yet. Peace!
