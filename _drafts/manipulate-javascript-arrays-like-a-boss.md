---
title: Manipulate JavaScript Arrays like a boss
excerpt:
photo: 2016-03-24.jpg
---

One of the most amazing things in programming is fact that one task can be achieved with numbers of different methods. My recent journey through world of React became extremely fascinating not only because of amazingness of this library but spending so much time in javaScript environment learns me a lot of language core by itself. I would like to spend few minutes and show you 3 easy methods that will make you an arrays hero. Go!

## Stop looping, start mapping

`Array.map()` is kind of loop that creates a new array and returns values transformed by applied function. It doesn't  do anything more than standard `for` or `forEach` loop can do, just provides a much nicer notation. It always return array with the same length and every element corresponds to one on the same position in source array. Lets have a look at two examples, first one with `for` loop and next one with `.map()`.

```js
var numbers = [2, 5, 8];
var numbersNew = [];

for (var i = 0; i < numbers.length; i++) {
  numbersNew.push(numbers[i] + 1);
}

console.log(numbersNew); // [ 3, 6, 9 ]
```

```js
var numbers = [2, 5, 8];
var numbersNew = numbers.map(function(num) {
  return num + 1;
});

console.log(numbersNew); // [ 3, 6, 9 ]
```

## Filter values in an array

- filter
- reduce
- chain these things together
- browser support ie9+ and node
- - https://github.com/kriskowal/es5-shim/
- - http://augmentjs.com/
- resources
- - functional programing course on rx website
- -

- wow moment
