---
title: Git tip - staging hunk of code via command line
excerpt: GUI Git clients allows to stage selected lines of code in very easy way. You may not know that doing that in command line isn't much more difficult.
photo: 2016-03-18.jpg
---

Command line is my preferred way of using git. My code editor (Sublime Text) and command line app (iTerm 2) is everything that I need next to each other. Although I have some insignificant experience with GUI tools, I just don't need them.  Third opened app next to previously mentioned couple isn't needed. The only feature that I missed from tools like Tower 2 or SourceTree was ability to staging small hunks of code from the same file independently and create separated commits from them. Happy days! [Wes Bos](https://twitter.com/wesbos) published fantastic [collection of git tips and tricks](http://wesbos.com/git-hot-tips/) few days ago, and one of them is feature that I was always missing. More coding, less talking!

Lets say we have a file `helpers.js` full of helper functions (not so complicated for brevity of example). This file is already committed, and we spotted obvious lack of math skills in our functions. Try to figure it out by yourself :)

```js
function timesTwo(num) {
  return num * 2;
}

function timesFive(num) {
  return num * 2;
}

function timesTen(num) {
  return num * 2;
}
```

Let's fix it...

```js
function timesTwo(num) {
  return num * 2;
}

function timesFive(num) {
  return num * 5;
}

function timesTen(num) {
  return num * 10;
}

```

Better! Now, we would like to store this changes as a two separated commits (one per function). This is how to do it in SourceTree.

![Staging a hunk of code in SourceTree](/photos/2016-03-18-1.jpg)

Time for command line. Well known command `git add` with less popular flag `-p` (patch) comes handy now. Lets do it!

```
git add -p index.js
```

![Staging a hunk of code in Command line](/photos/2016-03-18-2.jpg)

Wow, git what do you want from me now?! Let me help you!

- `y` - stage this hunk
- `n` - do not stage this hunk
- `q` - quit; do not stage this hunk nor any of the remaining ones
- `a` - stage this hunk and all later hunks in the file
- `d` - do not stage this hunk nor any of the later hunks in the file
- `/` - search for a hunk matching the given regex
- `s` - split the current hunk into smaller hunks
- `e` - manually edit the current hunk
- `?` - print help

In our case, git suggested us to keep two functions as a one piece of code ready to stage. It is not what we want to do. We need to split the current hunk into smaller hunks by typing `s`.

![Split current hunk into smaller hunks in Git](/photos/2016-03-18-3.jpg)

Much better. Accept it by `y` followed by `n` to skip next hunk and commit change on first function.

![Commit separately independent hunks of code in Git](/photos/2016-03-18-4.jpg)

Now you are ready to follow the process by yourself with remaining functions. Hopefully that helped.
