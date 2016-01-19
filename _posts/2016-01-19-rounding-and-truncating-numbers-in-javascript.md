---
title: Rounding and truncating numbers in JavaScript
excerpt: Convert primary school math skills into code. Let's put together all that we know about rounding and truncating numbers in JavaScript.
photo: 2016-01-19.jpg
---

Rounding and truncating is a bread and butter action for every single developer. It was covered during your first few math lessons in primary school. Hopefully you still remember how it works in the world of numbers.

> 5 or more? Raise the Score.
> 4 or less? Let it Rest.

Let's use this knowledge and translate it to JavaScript using the built-in object called `Math`. As the name can suggests, it has a collection of properties and methods for mathematical operations on numbers. There is one small difference between `Math` and other built-in global objects. `Math` isn't a constructor which means that all properties and methods that belong to it are static (meaning that they need to be called by using Math as an object).

![Math Object in Google Chrome Console](/photos/2016-01-19-1.gif)

## Rounding vs Truncating

The difference between these two methods is minor but very important to understand. Both of them are methods of approximating a number by dropping decimal places. Rounding approximates a number using a nearby number at a given degree of accuracy. It can occur in two directions: up and down. Rounding up approximates a number towards positive infinity. Rounding down towards negative infinity. Truncating approximates without rounding. In other words, it "rounds" towards zero.

```
Rounding
3.14159 ≈ 3.1416

Truncating
3.14159 ≈ 3.1415
```

Hopefully you get the difference. It makes truncating rarely useful in precise calculations (although JavaScript probably isn't a good choice at all if you need precise calculations) but you can come across a situation when it may be irreplaceable. Once example can be when needing to drop decimal places from a pixel value to avoid anti aliasing or weird pixel rounding which is completely different across browser engines.

## Rounding numbers in Javascript

Rounding is straight forward. We can round to the nearest integer, round down or round up. JavaScript uses three methods to achieve this:

- `Math.round()` - rounds to the nearest integer (if the fraction is 0.5 or greater - rounds up)
- `Math.floor()` - rounds down
- `Math.ceil()` - rounds up

```
Math.round(3.14159)  // 3
Math.round(3.5)      // 4
Math.floor(3.8)      // 3
Math.ceil(3.2)       // 4
```

Rounding numbers with decimal precision requires using the `toFixed()` method that belongs to the `Number` prototype.

```
3.14159.toFixed(2);  // 3.14
```

## Truncating numbers in Javascript

`Math.trunc()` simply removes all the fractional digits. It takes one argument which is a number. If the argument is a positive number it behaves exactly the same as `Math.floor()`. For negative numbers it does the same job as `Math.ceil()`.

```
Math.trunc(3.14159);   //  3
Math.trunc(-3.14159);  // -3
```

It's worth mentioning that the browser support for `Math.trunc()` isn't great. Fortunately some clever people came out with a [polyfill](https://www.npmjs.com/package/math-trunc).  Have a look at the browser support list:

- Google Chrome >= 38
- Firefox >= 25
- Internet Explorer >= Nope :(
- Opera >= 25
- Safari >= 7.1

### TLTR (too long to read)

I know, I know - time is money. Lets sum it up.

- `Math.round()` - rounds to the nearest integer
- `Math.floor()` - rounds down towards negative infinity
- `Math.ceil()` - rounds up towards positive infinity
- `Math.trunc()` - rounds up or down towards zero (bad browsers support)

![Math.floor() & Math.ceil() & Math.trunc() on timeline](/photos/2016-01-19-2.jpg)
