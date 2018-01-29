---
title: What's new in ECMAScript 2018
excerpt: The last TC39 meeting resulted in a finalised featurs set for ECMAScript 2018. This article presents all the new goodies — let's get on it.
photo: 2018-01-29.jpg
---

It is this time of a year — we are after TC39 meeting that finalised the list of new features that we will get in the ECMAScript 2018. I published the the list of new goodies for [2017 version](https://pawelgrzybek.com/whats-new-in-ecmascript-2017/), so I did in [2016](https://pawelgrzybek.com/whats-new-in-ecmascript-2016-es7/). It is time to familiarise ourseves with the stuff that is coming to our disposal this year.

## Rest/Spread Properties by Sebastian Markbåge

ECMASCript 2015 introuduced a rest / spred for `Array`s. This year the same feature welcome `Object`s. Let's have a look at two examples.

```js
const dude = {
  name: 'Pawel',
  age: 30,
  role: 'Front End Developer',
}
const { name, ...details } = dude;

console.log(name);
// Pawel

console.log(details);
// {
//   age: 30,
//   role: 'Front End Developer',
// }
```

```js
const details = {
  age: 30,
  role: 'Front End Developer',
}

const dude = {
  name: 'Pawel',
  ...details
}

console.log(dude);
// {
//   name: 'Pawel',
//   age: 30,
//   role: 'Front End Developer',
// }
```

- [Object Rest/Spread Properties proposal for ECMAScript](https://github.com/tc39/proposal-object-rest-spread)
- [ES2018: Rest/Spread Properties by Dr. Axel Rauschmayer](http://2ality.com/2016/10/rest-spread-properties.html)

## Asynchronous Iteration by Domenic Denicola

Introduced in ECMAScript 2015 iterator interface returns an object with `{ value, done }` keys via `next()` interface. It is possible to use it with iterables that are known ahead of time. The `asyncIterator` allows to replicated the same functionality for asynchronous operations and returns a promise for a `{ value, done }` pair. Example:

```js
async function* createAsyncIterable(iterable) {
  for (const elem of iterable) {
      yield elem;
  }
}

const asyncIterable = createAsyncIterable(['async 1', 'async 2']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
asyncIterator.next()
.then(result => {
    console.log(result);
    // {
    //   value: 'async 1',
    //   done: false,
    // }
    return asyncIterator.next();
})
.then(result => {
    console.log(result);
    // {
    //   value: 'async 2',
    //   done: false,
    // }
    return asyncIterator.next();
})
.then(result => {
    console.log(result);
    // {
    //   value: 'undefined',
    //   done: true,
    // }
});
```

- [Asynchronous iteration proposal](https://github.com/tc39/proposal-async-iteration)
- [ES2018: asynchronous iteration by Dr. Axel Rauschmayer](http://2ality.com/2016/10/asynchronous-iteration.html)
- [JavaScript Asynchronous Iteration Proposal by Nicolás Bevacqua](https://ponyfoo.com/articles/javascript-asynchronous-iteration-proposal)

## Promise.prototype.finally

Number of promise libraries has an implementation of useful `finally()` method. [Bluebird](http://bluebirdjs.com/docs/api/finally.html), [Q](https://github.com/kriskowal/q/wiki/API-Reference#promisefinallycallback), and [when](https://github.com/cujojs/when/blob/master/docs/api.md#promisefinally) just to name a few. Time for a native implementation — `Promise.prototype.finally` finally there.

```js
fetch('https://api.github.com/users/pawelgrzybek')
  .then(response => response.json())
  .then(data  => console.log(data.name))
  .catch(err => console.error(err))
  .finally(() => console.log('All fetched :-*'));
```

- [Promise.prototype.finally proposal](https://github.com/tc39/proposal-promise-finally)

## Template Literal Revision by Tim Disney

Introduced in ECMAScript 2015 template literals come with some restrictions on escape sequences. This year version of language solves all these blockers.

```js
```

- [Template Literal Revision proposal](https://tc39.github.io/proposal-template-literal-revision/)
