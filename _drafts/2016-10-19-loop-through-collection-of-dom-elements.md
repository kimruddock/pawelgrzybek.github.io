---
title: Loop through collection of DOM elements
excerpt: Looping through NodeList isn't that easy as iterating over JavaScript Array. In this article I am going to cover possible methods (and hacks).
photo: 2016-10-19.jpg
---

Is it easy to think of collection of DOM elements as a regular JavaScript Array. This is a gotcha that many beginners fell into (including myself). NodeLists doesn't share all the Array’s prototype methods, but there is a heap of ways to get the desired result. Let's go through the list of possible methods and hacks. No frameworks or libraries today - purse js day :)

## forEach()

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

## Array.prototype.forEach()

If `forEach()` doesn't exists in NodeList's prototype, you can always ask good fella Array to lend you one — this one definitely got it (if it is not Internet Explorer 8 or below).

```js
const articles = document.querySelectorAll('article');

[].forEach.call(articles, (a) {
  a.style.fontFamily = 'Comic Sans MS';
});

// or

Array.prototype.forEach.call(articles, (a) {
  a.style.fontFamily = 'Comic Sans MS';
});
```

If you don't like call / apply you can convert DOM elements to array first and then use forEach() as you tend to.

```js
const articles = [].slice.call(document.querySelectorAll('article'));

articles.forEach(a => {
  a.style.fontFamily = 'Comic Sans MS';
});
```

You can even go absolutely crazy and add Array's `forEach()` to `NodeList.prototype`.

```js
if (typeof NodeList.prototype.forEach === "undefined") {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (typeof HTMLCollection.prototype.forEach === "undefined") {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

articles.forEach(a => {
  a.style.fontFamily = 'Comic Sans MS';
});
```

All those three snippets above will work fine but it is hack! There is no need to list all downsides of this approach because Todd Motto already [did in](https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/) very comprehensively.

## for loop

Good ol' `for` loop does it much better.

for (i = 0; i < divs.length; ++i) {
  divs[i].style.color = "green";
}

## for of

es2015

for (let div of divs) {
  div.style.color = "blue";
}


## es2015 spread

[...document.querySelectorAll('img')].forEach(doStuff);

## Array.from

Array.from(querySelectorAll('img')).forEach(img => doStuff);


