---
title: Manipulate JavaScript Arrays like a boss
excerpt: JavaScript arrays comes with many useful methods. Mastering them can make you much more efficient programmer. Let's have a look at few of them.
photo: 2016-03-26.jpg
---

One of the most amazing things in programming is fact that one task can be achieved via number of different methods. My recent journey through world of [React](https://facebook.github.io/react/) became extremely fascinating not only because of amazingness of this library. Spending so much time in JavaScript environment taught me a lot of the language core features. I would like to spend few minutes and show you three easy methods that will make you an arrays hero. I will try to keep all the examples in this article bloody simple, just for clarity of discussed concepts.

## Stop looping, start mapping

[`Array.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) is an method that behaves like a loop that creates a new array and returns values transformed by callback function applied. It doesn't do anything more than standard `for` or `forEach` can do, just provides a much nicer notation. It always returns an array with the same length and every element corresponds to one on the same position in source array. Let's have a look at the example where we're increasing each number in collection by one. First one with `for` loop and next one with `.map()`.

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

And ES2015 version...

```js
var numbers = [2, 5, 8];
var numbersNew = numbers.map((num) => num + 1);

console.log(numbersNew);
// [ 3, 6, 9 ]
```

## Filter values in an array

What if we would like to create a new array based on already existing one, but simultaneously remove all the elements that are smaller than 5? Easy, yeah? Quick loop, if statement, push result to new collection. Yeah, you are right, it does the job, but let me introduce you [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. It works in very similar way to `map()`, but callback function instead of returning a modified element returns a boolean value that dictates if the element should be added to new array (`true`) or not (`false`). Compared to map, filter doesn't guarantee that the length of new array is the same as the source's one. Time for an example. One more time, first one with `for` loop and second one with `filter()` method.

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

And ES2015 version...

```js
var numbers = [2, 5, 8];
var numbersNew = numbers.filter((num) => num >= 5);

console.log(numbersNew);
// [ 5, 8 ]
```

## Reducing array's values to a single value

Lets say we would like to sum up all the values in an array. [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) comes handy. This method is a bit more complicated, but at the same time much more powerful. Compared to `map()` and `filter()`, `reduce()` next to callback function can take one more argument - initial value. Second argument is optional. Let's go back to our example and try to sum up all the values inside an array. Similarly to previous exmaples, I will first show you a posible solution via `for` loop, and then via `reduce()` method.

```js
var numbers = [2, 5, 8];
var numbersSum = 0;

for (var i = 0; i < numbers.length; i++) {
  numbersSum += numbers[i]
}

console.log(numbersSum);
// 15
```

```js
var numbers = [2, 5, 8];
var numbersSum = numbers.reduce(function(total, num) {
  return total + num;
});

console.log(numbersSum);
// 15
```

And ES2015 version...

```js
var numbers = [2, 5, 8];
var numbersSum = numbers.reduce((total, num) => total + num);

console.log(numbersSum);
// 15
```

Wow, wow, wow! What just happened here? Easy, it is not as difficult as magical it looks like for a first glance. Names of arguments that I used inside a callback function should give you a big hint. Let's go through every iteration step by step. Initially when method `reduce()` traverse through a `number` array it will take a first value (2) of an array as a `total` argument and second value (5) as a `num`. Sum of arguments (2 + 5) is returned (7) and is passed to `total` argument to use in next iteration. A value of third array's value (8) is assigned to `num` argument. Again, sum of these to values is returned (7 + 8). Because we don't have more values in `numbers` array, we are receiving 15 as a result of `reduce()` method. Hopefully you understand the pattern.

I mentioned earlier that `reduce()` method optionally  accepts second argument as a initial value. Let's repeat our example but with initial value 1000.

```js
var numbers = [2, 5, 8];
var numbersSum = numbers.reduce(function(total, num) {
  return total + num;
}, 1000);

console.log(numbersSum);
// 1015
```

And ES2015 version...

```js
var numbers = [2, 5, 8];
var numbersSum = numbers.reduce(((total, num) => total + num), 1000);

console.log(numbersSum);
// 1015
```

Passing optional initial value as a second argument slightly changes previously described behavior. The difference is minor tho. Initially it assigns 1000 to `total` argument and fist arrays value (2) as a `num` argument. Then pattern continues identically.

## Chain it together

The beautiful thing about `map()` and `filter()` is fact that the array goes in and arreys goes out as a result of a method. It means we can chain these methods together with ease.

```js
var numbers = [2, 5, 8];
var numbersNew = numbers.map(function(num) {
  return num + 1;
}).filter(function(num) {
  return num >= 5;
});

console.log(numbersNew);
// [ 6, 9 ]
```

And ES2015 version...

```js
var numbers = [2, 5, 8];
var numbersNew = numbers.map((num) => num + 1).filter((num) => num >= 5);

console.log(numbersNew);
// [ 6, 9 ]
```

## If hope it helped you out

When I learned these three methods I had one oh these WOW moments and I wanted to use them everywhere. You need to be aware about lack of support for these features in Internet Explorer 8 and older ones. I hope you don't need to support it anymore, but If you have to [es5-shim](https://github.com/kriskowal/es5-shim/) covers you.

Mattias Petter Johansson and his [Fun Fun Function](https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q/feed) YouTube channel is a good place to visit if you would like deep explanation of [filter()](https://youtu.be/BMUiFMZr7vk) and [map()](https://youtu.be/bCqtb-Z5YGQ). Subscribe it and wait for new episodes every Monday morning!

Bye :-*
