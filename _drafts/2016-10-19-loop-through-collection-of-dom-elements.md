---
title: Loop through collection of DOM elements
excerpt: Looping through NodeList isn't that easy as iterating over JavaScript Array. In this article I am going to cover possible methods (and hacks).
photo: 2016-10-19.jpg
---

Is it easy to think of collection of DOM elements as a regular JavaScript Array. This is a gotcha that many beginners fell into (including myself). NodeLists doesn't share all the Array’s prototype methods, but there is a heap of ways to get the desired result. Let's go through the list of possible methods and hacks. No frameworks or libraries today - purse js day :)

## forEach

Aha! You know this method mainly from [Array's prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) but actually some browsers contain this function in [prototype of NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach) as well. Because of not sufficient Browser support I wouldn't consider it as a way to go though.

- Google Chrome - yeep
- Firefox >= 50
- IE - you guess
- Opera - yeep
- Safari (stable version) - nope
- Safari (Technology Preview) - yeep
- Android - nope
- Android (Chrome) - yeep
- Firefox Mobile - yeep
- iOS - nope

```js
const articles = document.querySelectorAll('article');

articles.forEach(a => {
  a.style.fontFamily = 'Comic Sans MS';
});

// Chrome - 'Comic Sans MS' rulez!
// Firefox - TypeError: ps.forEach is not a function
```





## forEach
isn't an array, it's a (non-live) NodeList.

[].forEach.call(divs, function(div) {
  // do whatever
  div.style.color = "red";
});

https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/

## for

for (i = 0; i < divs.length; ++i) {
  divs[i].style.color = "green";
}

## for of

es2015

for (let div of divs) {
  div.style.color = "blue";
}

## NodeList.prototype.forEach

```js
(function() {
    if (typeof NodeList.prototype.forEach === "undefined") {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    if (typeof HTMLCollection.prototype.forEach === "undefined") {
        HTMLCollection.prototype.forEach = Array.prototype.forEach;
    }
})();
```

This is pretty intense (probably dangerous and generally not recommended) but you could make NodeList have the same forEach function as Array does, then use it.

NodeList.prototype.forEach = Array.prototype.forEach;

var divs = document.querySelectorAll('div').forEach(function(el) {
  el.style.color = "orange";
})

## Convert collection to an Array

Array.prototype.slice.call(document.querySelectorAll(selector), 0);

## es2015 spread

[...document.querySelectorAll('img')].forEach(doStuff);

## Array.from

Array.from(querySelectorAll('img')).forEach(img => doStuff);


