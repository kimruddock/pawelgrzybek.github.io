---
title: Dope JavaScript one-liners
excerpt: Do you know this feeling when one line of code can make your life easier? Thats the reason why we love one-liners in out apps. I have list of them for you.
photo: 2015-05-09.jpg
---

## Flip the coin

Whether the flip of a coin results in heads or tails

```js
const flipthecoin = () => Math.floor(Math.random() * 2) === 0;
```

Example:

## LERP — Linear interpolation

Calculates a number between two numbers at a specific increment.

```js
const lerp = (value1, value2, amt) => value1 * (1 - amt) + value2 * amt;
```

Example:

## React Aux component

React from version 16 allows to return multiple elements from a single component. To skip array notation we can use a handy one-liner — Aux component to print clean looking list of JSX items. Compare these two methods in [one of my recent articles](https://pawelgrzybek.com/return-multiple-elements-from-a-component-with-react-16/).

```js
const Aux = props => props.children;
```

Example:

## Unique

Produces a duplicate-free version of the array

```js
const unique = myArray => [...new Set(myArray)];
```

Example:
