---
title: Loop through collection of DOM elements
excerpt: Looping through NodeList isn't that easy as iterating over JavaScript array. In this article I am going to cover possible methods (and hacks) to do it.
photo: 2016-10-20.jpg
---

Is it easy to think of collection of DOM elements as a regular JavaScript array. This is a gotcha that many beginners fell into (including myself). NodeLists doesn't share all the `Array`’s prototype methods, but there is a heap of ways to get the desired result. Let's go through the list of possible methods and hacks. No frameworks or libraries today - purse js day fellaz!

## NodeList.forEach()

Aha! You know this method mainly from [Array's prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) but actually some browsers contain this function in [prototype of NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach) too. Because of not sufficient browser support I wouldn't consider it as a way to go. This list would have been incomplete without it though.

- Google Chrome - yeep
- Firefox >= 50
- IE - you guess
- Edge - i don't know, can someone check it for me please?
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

// Chrome - 'Comic Sans MS' everywhere dudes! Sweet!
// Firefox - TypeError: articles.forEach is not a function
```

## Array.prototype.forEach()

If `forEach()` doesn't exists in `NodeList`'s prototype, you can always ask good friend `Array` to lend you one — this one definitely got it (if it is not Internet Explorer 8 or below).

```js
const articles = document.querySelectorAll('article');

[].forEach.call(articles, a => {
  a.style.fontFamily = 'Comic Sans MS';
});

// or

Array.prototype.forEach.call(articles, a => {
  a.style.fontFamily = 'Comic Sans MS';
});
```

If you don't like `call()` / `apply()` you can convert DOM elements to array first and then use `forEach()` as you tend to.

```js
const articles = [].slice.call(document.querySelectorAll('article'));

// or

const articles = [...document.querySelectorAll('article')];

// or

const articles = Array.from(document.querySelectorAll('article'));

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

const articles = document.querySelectorAll('article');

articles.forEach(a => {
  a.style.fontFamily = 'Comic Sans MS';
});
```

All those three snippets above will work just fine. It feels a bit hacky though and I'm [not the only one](https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/) who thinks like that. Bare in mind that present above spread operator `[...]` and `Array.from()` are parts of a modern spec. To use it without worry equipped yourself with [Babel](https://pawelgrzybek.com/use-modern-javascript-today-with-babel/).

## for loop

Good ol' [`for` loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) is a good candidate to do this job. Very well supported and reliable method. No hacks, no babels!

```js
const articles = document.querySelectorAll('article');

for (let i = 0; i < articles.length; i++) {
  articles[i].style.fontFamily = 'Comic Sans MS';
}
```

## for-of loop

EcmaScript 2015 spec brought us a new tool to traverse through iterable objects. As we saw on previous example, `NodeList` is definitely iterable collection so we can easily add [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop to our collection. [Babel](https://pawelgrzybek.com/use-modern-javascript-today-with-babel/) may be helpful as it is part of spec that is a bit more modern than your clients requirements.

```js
const articles = document.querySelectorAll('article');

for (let a of articles) {
  a.style.fontFamily = 'Comic Sans MS';
}
```

## Conclusions

Hopefully this list helped you out. Use whatever feels right dependable of your use case. My preferable method from list above is `for...of` loop as almost every single line of my code goes through compiler that will translate it to a syntax that even oldschool browser can handle. If I need to quickly smash some example I use a `for` loop.

Let me know your thoughts. What is your preferable method to traverse through DOM element? If you liked it the share buttons are right below. Bye :*
