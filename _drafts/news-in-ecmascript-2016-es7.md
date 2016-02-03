---
title: News in ECMAScript 2016 (ES7)
excerpt: ECMAScript 2015 brought a lot of magnificence. New release process is going to introduce few small features every year. Have a look what is new in ES2016.
photo: 2016-02-03.jpg
---

In June 2015 TC39 (Technical Committee 39) officially released a [spec of ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) (formerly known as a ES6). In parallel of new spec, new naming system of a language was introduced which is related with new yearly release process. Plan is to release new version of a language every year, and ship it with features that are ready at the time. ES2015 added a lot of amazing features. If you are not familiar with fresh add-ons yet, check ["ES6 Overview in 350 Bullet Points"](https://ponyfoo.com/articles/es6) by [Nicolás Bevacqua](https://twitter.com/nzgb?lang=en). It's the best summary that I have seen so far. Luckily we shouldn't expect as huge updates every year which give us a chance to follow the spec.

The final list of features that we're going to see in ECMAScript 2016 is ready and as expected, it is just a small update. Let's have a look!

## Array.prototype.includes

Proposed by Domenic Denicola and Rick Waldron [feature](https://github.com/tc39/Array.prototype.includes/) checks if the array includes an element and returns boolean value. Syntax is super simple.

```js
['a', 'b', 'c'].includes('a');  // true
['a', 'b', 'c'].includes('d');  // false
```

Previously we did it like that. It is not as self explanatory.

```js
['a', 'b', 'c'].indexOf('a') >= 0 ? true : false;  // true
['a', 'b', 'c'].indexOf('d') >= 0 ? true : false;  // false
```

New feature solves one problem with checking for `NaN` in an array. Compare these two examples and results.

```js
['a', 'b', 'c', NaN].includes(NaN);  // true
['a', 'b', 'c', NaN].indexOf(NaN) >= 0 ? true : false;  // false
```

## Exponentiation Operator

Proposed by Rick Waldron, Claude Pache and Brendan Eich [feature](https://github.com/rwaldron/exponentiation-operator) brings much nicer notation of exponentiation. It uses [infix notation](https://en.wikipedia.org/wiki/Infix_notation) which is much nicer than function notation (`Math.pow()`). We can find the same notation in different programing languages like: Python, Ruby or Pearl. Have look at the examples.

```js
2 ** 4;  // 16
```

```js
let a = 2;
a **= 4; // 16
```

Previously...

```js
// 2 * 2 * 2 * 2
Math.pow(2, 4);  // 16
```
