---
title: Manipulate JavaScript Arrays like a boss
excerpt:
photo: 2016-03-24.jpg
---

One of the most amazing things in programming is fact that one task can be achieved via number of different methods. My recent journey through world of [React](https://facebook.github.io/react/) became extremely fascinating not only because of amazingness of this library but spending so much time in javaScript environment teaches me a lot of the language core features. I would like to spend few minutes and show you 3 easy methods that will make you an arrays hero. Go!

## Stop looping, start mapping

`Array.map()` is an method that behaves like a loop that creates a new array and returns values transformed by function applied. It doesn't do anything more than standard `for` or `forEach` loop can do, just provides a much nicer notation. It always return array with the same length and every element corresponds to one on the same position in source array. Lets have a look at the example where we're increasing each number in collection by one. First one with `for` loop and next one with `.map()`.

```js
var numbers = [2, 5, 8];
var numbersNew = [];

for (var i = 0; i < numbers.length; i++) {
  numbersNew.push(numbers[i] + 1);
}

console.log(numbersNew);
// [ 3, 6, 9 ]
```

```js
var numbers = [2, 5, 8];
var numbersNew = numbers.map(function(num) {
  return num + 1;
});

console.log(numbersNew);
// [ 3, 6, 9 ]
```

## Filter values in an array

What if we would like to create a new array based on already existing one, but simultaneously remove all the elements that are smaller than 5? Easy, yeah? Quick loop, if statement, push result to new collection. Yeah, you are right, it does the job, but let me introduce you [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. It works in very similar way to map, but instead of manipulating elements, it is passing them through conditional statement. If the result of it is `truth`, element is added to new collection. In this case we won't get the same length of new array as the source one. Time for an example. One more time, first one with `for` loop and second one with `filter()` method.

```js
var numbers = [2, 5, 8];
var numbersNew = [];

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] >= 5) {
    numbersNew.push(numbers[i]);
  }
}

console.log(numbersNew);
// [ 5, 8 ]
```

```js
var numbers = [2, 5, 8];
var numbersNew = numbers.filter(function(num) {
  return num >= 5;
});

console.log(numbersNew);
// [ 5, 8 ]
```

- reduce
- chain these things together
- browser support ie9+ and node
- - https://github.com/kriskowal/es5-shim/
- - http://augmentjs.com/
- resources
- - functional programing course on rx website
- -

- wow moment
