---
title: Fluent interface explained
excerpt: Imagine a program that is written like a sentence instead of series of separated command blocks — technique of method chaining is the answer.
photo: 2017-03-16.jpg
---

Doesn't meeter whether it is a professional developer writing a complicated Java application, bored secretary playing Candy Crush Saga on Facebook or my father drinking beer and reading football news on Eurosport website — every single activity that has been taken on a computer will end up as number of ones and zeros that tells the processor what to actually do. All programing languages are just a layer of abstraction on top of it. This article isn't about it but there is position that I can highly recommend to curious ones — ["The Definitive Guide to How Computers Do Math" by Clive Maxfield](https://www.amazon.com/Definitive-Guide-How-Computers-Math/dp/0471732788). The crucial insight here is fact that the computer doesn't care about the code readibility — we developers do so the code should be written in a way that human can read it.

Knowing that, imagine a program that is written like a sentence instead of series of independent commands in separated code blocks. Methods chaining also known as a fluent interface is a design pattern that allows us to do it. Todays example is written in JavaScript as it is all that I feel comfortable with, but the same pattern applies to majority programing languages too. As always I'm here to explain the practice — [wiki page](https://en.wikipedia.org/wiki/Fluent_interface) contains a great definition and tons of great examples if you need it.

> In software engineering, a fluent interface (as first coined by Eric Evans and Martin Fowler) is an implementation of an object oriented API that aims to provide more readable code.

## Create an element, add some content and color, append to another node...

One of the best examples out here that uses a method chaining is good old friend of all front-end developers — [jQuery](https://jquery.com/). Similarity of code written with it to English sentences is surely one of the reasons why it gained as big popularity.

Going through source code of jQuery would be too complicated so I'm going to write a small script that creates a DOM element, manipulates its content, changes color and allows us to append it to other node. It would look something like this...

```js
class myElement {
  constructor(element) {
    this.element = document.createElement(element)
  }

  addText(text) {
    this.element.textContent = text;
  }

  addColor(color) {
    this.element.style.color = color;
  }

  addToElement(element) {
    element.appendChild(this.element);
  }
};
```

Too use it...

```js
// create a new empty paragraph
const myParagraph = new myElement('p');
// add text to element
myParagraph.addText('my super paragraph');
// add color to element
myParagraph.addColor('blue');
// add element to body
myParagraph.addToElement(document.body);
```

There is nothing wrong about this code. The amount repetitions of steps that we have to take isn't needed though. Wouldn't be cool to write just this:

```js
const myParagraph = new myElement('p')
  .addText('some test here')
  .addColor('blue')
  .addToElement(document.body);
```

It looks much better, cleaner and we don't repeat ourselves. Unfortunately with current version of code it is not going to work as it is loosing reference to `this` keyword after method execution. The soulution is simple — return an reference to new instance from every single method. Like this...

```js
class myElement {
  constructor(element) {
    this.element = document.createElement(element)
  }

  addText(text) {
    this.element.textContent = text;
    return this; // return instance allows methods chaining
  }

  addColor(color) {
    this.element.style.color = color;
    return this; // return instance allows methods chaining
  }

  addToElement(element) {
    element.appendChild(this.element);
    return this; // return instance allows methods chaining
  }
};
```

<p><p data-height="584" data-theme-id="dark" data-slug-hash="KWyPQq" data-default-tab="js,result" data-user="pawelgrzybek" data-embed-version="2" data-pen-title="1" class="codepen">See the Pen <a href="http://codepen.io/pawelgrzybek/pen/KWyPQq/">1</a> by Pawel Grzybek (<a href="http://codepen.io/pawelgrzybek">@pawelgrzybek</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script></p>

Fluent interface explained. Yo :-*
