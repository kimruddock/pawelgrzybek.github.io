---
title: What's new in ECMAScript 2018
excerpt: Introduced in 2015, the ECMAScript annual release plan aims to add to the language any proposals that are ready at the time of the TC39 meeting. Here's what's new in ES2018.
photo: 2017-01-30.jpg
---

TRACK IT USING THIS LINK:
https://tc39.github.io/process-document/
http://exploringjs.com/es2016-es2017/ch_tc39-process.html
https://github.com/tc39/proposals/blob/master/finished-proposals.md

## Template Literal Revision

https://tc39.github.io/proposal-template-literal-revision/

## s (dotAll) flag for regular expressions

https://github.com/tc39/proposal-regexp-dotall-flag

In regular expression patterns, the dot `.` matches any character but it is getting a little bit problematic with astral and line terminator characters. For example:

```js
/foo.bar/.test('foo\nbar');
// → false
```

The need of matching any character without resorting to cryptic workarounds is very common. Other languages like Java, C#, Pearl or PHP has got an implementation of this functionality. Not is coming to JavaScript under the `s` flag.

```js
/foo.bar/s.test('foo\nbar');
// → true
```

## 
