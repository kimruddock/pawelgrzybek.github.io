---
title: CSS specificity explained
excerpt: CSS Specificity is the most misunderstood part of Cascading Style Sheets. Let me explain how browser understands and interprets jungle of classes and ids.
---

CSS Specificity is the most misunderstood part of Cascading Style Sheets. No doubts! Yes, it is even trickier than floats, trust me! I hang out with many web designers on daily basis and I assume that lack of understanding of that concept is most frequent reason of confusion. Let me quote [Harry Roberts](http://cssguidelin.es/#specificity):

> As we’ve seen, CSS isn’t the most friendly of languages: globally operating, very leaky, dependent on location, hard to encapsulate, based on inheritance… But! None of that even comes close to the horrors of specificity.

## What is CSS specificity?

First lets have a look at definition from [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity):

> Specificity is the means by which a browser decides which CSS property values are the most relevant to an element and therefore will be applied. Specificity is only based on the matching rules which are composed of CSS selectors of different sorts.

Definition is straight forward, so when can we experience any issue with that? It starts when few selectors apply to the same element. Look!

```
<p class="myclass" id="myid" style="color: yellow">Lorem ipsum dolor sit amet.</p>
```

```
p {
  color: green;
}

.myclass {
  color: red;
}

#myid {
  color: blue;
}
```

What is the color of that paragraph? Hmm? In that case our browser calculates a specificity value for each selector and prints winner with highest score. This example is very trivial but in real life things are not that predictable.

## How to calculate CSS specificity

Before we go any further I need to make sure you know basic CSS terminology: selector, property, value, declaration, pseudo class and pseudo element. Have a look:

.post:hover::before {
  color: red;
}

/*
.selector:pseudoClass::pseudoElement {
  property: value;
  /* declaration */
}
*/

Example above shows that:

- `.post` is a selector
- `:hover` is a pseudo class
- `::before` is pseudo element
- `color` is a property
- `red` is a value
- entire second line `color: red;` is a declaration

Let's come back to specificity. We can separate CSS rules to 4 main categories and each of them adds a different value to specificity score. The correct notation of specificity score takes form that separates points by coma in appropriate order. Lets start counting from `0, 0, 0, 0` and then...

### Inline styles

```
<p style="color: yellow">Lorem ipsum dolor sit amet.</p>
```

Using inline style attribute in HTML markup always takes precedence. It adds `1, 0, 0, 0` to specificity score.

### IDs

```
#myid {
  // blah: blah;
}
```

Each ID adds `0, 1, 0, 0` to specificity score.

### Classes, pseudo-classes, attributes

```
.myclass {
  // blah: blah;
}
```

Each class, [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#Index_of_standard_pseudo-classes) and [attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors#Summary) adds `0, 0, 1, 0` to specificity score.

### Elements and pseudo elements

```
p {
  // blah: blah;
}
```

Each element and [pseudo element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#All_pseudo-elements) adds `0, 0, 0, 1` to specificity score.

### Lets put it together

- If element includes inline styles specificity is equal `1, 0, 0, 0`
- Each ID gives us `0, 1, 0, 0`
- Each class, pseudo-class or attribute gives us `0, 0, 1, 0`
- Each element or pseudo-element applies '0, 0, 0, 1'


### Few examples

Practice is a best teacher so let's have a look at few examples that I took from some live projects.

```
#toc li li {
  // blah: blah;
}

// Inline style: 0
// IDs:          1 (#toc)
// Classes:      0
// Elements:     2 (li, li)

// Specificity score: 0, 1, 0, 2
```

```
#nav .selected > a:hover {
  // blah: blah;
}

// Inline style: 0
// IDs:          1 (#nav)
// Classes:      2 (.selected, :hover)
// Elements:     1 (a)

// Specificity score: 0, 1, 2, 1
```

```
.header #nav li#list a[rel=nofollow]::after {
  // blah: blah;
}

// Inline style: 0
// IDs:          2 (#nav, #list)
// Classes:      2 (.header, [rel=nofollow])
// Elements:     3 (li, a, ::after)

// Specificity score: 0, 2, 2, 3
```

```
<div class="searchbar" style="display: none;">...</div>

.searchbar {
  // blah: blah;
}

// Inline style: 1
// IDs:          0
// Classes:      1 (.searchbar)
// Elements:     0

// Specificity score: 1, 0, 1, 0
```

### Exceptions

- The only way to override inlined styles in and `!important` keyword. You can think of it as a `1, 0, 0, 0, 0`.
- Selector inside the `:not()` pseudo-class gets counted. This pseudo-class by itself does not get counted.
- Tie! If two selectors have the same specificity score the order decides which rules are applied.

### Non 10-based

Some people tend to represent the specificity value as a base-10 number by removing a separators. It’s not right at all thats why we use a coma separated notation. Definition says that specificity values have an infinite base, but it’s not right neither. I will show you some ugly example later on :)

## How to keep yourself away form specificity related issues?

We said that specificity is one of the worst parts of CSS but there is a many rules that you can apply to daily code habits and won't struggle with that anymore.

### Keep it low

Clean and neatly organised code brings so many benefits for you and your coworkers. There is a list of fantastic methodologies that you can grasp and use. My personal choice is combinations of [SMACSS](https://smacss.com/) by Jonathan Snook and [BEM naming convention](https://tech.yandex.com/bem/) by Yandex. Read about these two or [many different](http://sixrevisions.com/css/css-methodologies/) approaches and apply some strict rules to your styles. Low selectors specificity is always one of the advantages of using some CSS methodologies.

### Do not use IDs

Despite that it’s absolutely valid it’s very poor practice to use IDs to style elements. Accordingly to previous rule, we suppose to keep specificity score as low as we can. Another reason to don’t do that is fact that they can’t be reused. But it’s all about reusing components! Right?! If you need more reasons against IDs Harry Roberts posted [amazing article](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/) about it the other day.

### Nesting isn’t cool at all

Nesting is probably one of the most overused rule of CSS. Preprocessors sell nesting as a feature that combines selectors in more readable and easier to apply way. In fact nesting should be avoided whenever its possible. It’s another case where decent naming convention comes as a rescue! The rule of thumb is to do not nest more than 4 levels. Funny guys from [The Sass Way](http://thesassway.com/beginner/the-inception-rule) called that “Inception rule" — if you have watched Inception movie you know what I’m talking about. Another reason was described in fantastic article [“Cyclomatic Complexity: Logic in CSS” by Harry Roberts](http://csswizardry.com/2015/04/cyclomatic-complexity-logic-in-css/). Let me quote a sentence:

> Think of your selectors as mini programs: Every time you nest or qualify, you are adding an if statement; read these ifs out loud to yourself to try and keep your selectors sane.

### Forget about !important

Last resort of specificity war. If you use it on daily basis probably you are very depressed or weeks after dead-line.

## Interesting facts about specificity

I was really curious about ability to override ID by classes. 256 classes are enough to win a specificity war with one ID in: all versions on Internet Explorer, all version of Firefox, Google Chrome < 24, Safari OS X < 6.1, Safari iOS < 7, Android < 4.4. I created this ugly Codepen. Check it on one of the maching browser and you should see the green paragraph. Totally useless though :)

Embed a codepen here!!!!!

## Helpful tools and resources

- [Official documentation](http://www.w3.org/TR/css3-selectors/#specificity)
- [Specificity Graph (for CSS)](https://github.com/pocketjoso/specificity-graph)
- [CSS Specificity Graph Generator](https://jonassebastianohlsson.com/specificity-graph/)
- [Specificity Calculator](http://specificity.keegan.st/)
- [CSS Stats](http://cssstats.com/)
- [CSS Dig](http://cssdig.com/)
- [Parker - stylesheet analysis tool](https://github.com/katiefenn/parker)
