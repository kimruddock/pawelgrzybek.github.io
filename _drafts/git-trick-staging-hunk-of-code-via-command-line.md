---
title: Git trick - staging hunk of code via command line
excerpt:
photo: 2016-03-12.jpg
---

Command line is my preferred way of using git. My code editor (Sublime Text) and command line app (iTerm 2) is everything that I need next to each other. Although I have some insignificant experience with GUI tools, I just don't need them.  Third opened app next to previously mentioned couple isn't needed. The only feature that I missed from tools like Tower 2 or SourceTree was ability to staging small hunks of code from the same file independently and create separated commits from them. Happy days! [Wes Bos](https://twitter.com/wesbos) published fantastic [collection of git tips and tricks](http://wesbos.com/git-hot-tips/) few days ago, and one of them is feature that I was always missing. More coding, less talking!

Lets say we have a file `index.js` full of helper functions (not so complicated for brevity of example). This file is committed ages ago, and we spotted obvious lack of math skills in our file. Try to figure it out by yourself :)

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

![Staging a hunk of code in SourceTree](/photos/2016-03-12-1.jpg)

Time for command line. Well known command `git add index.js` with less popular flag `-p` (patch) comes handy now. Lets do it!

```
git add -p index.js
```

```
creare$ git add -p index.js
diff --git a/index.js b/index.js
index bb66609..481f91d 100644
--- a/index.js
+++ b/index.js
@@ -3,9 +3,9 @@ function timesTwo(num) {
 }

 function timesFive(num) {
-  return num * 2;
+  return num * 5;
 }

 function timesTen(num) {
-  return num * 2;
+  return num * 10;
 }
Stage this hunk [y,n,q,a,d,/,s,e,?]?
```

Wow, git what do you want from me now?!

```
Stage this hunk [y,n,q,a,d,/,s,e,?]?
```

Let me help you!

- `y` - stage this hunk
- `n` - do not stage this hunk
- `q` - quit; do not stage this hunk nor any of the remaining ones
- `a` - stage this hunk and all later hunks in the file
- `d` - do not stage this hunk nor any of the later hunks in the file
- `/` - search for a hunk matching the given regex
- `s` - split the current hunk into smaller hunks
- `e` - manually edit the current hunk
- `?` - print help

In our case, git suggested us to keep two functions as a one piece of code ready to stage. It is not necessary what we wanted to do. We need to split the current hunk into smaller hunks by answering `s`.

```
Split into 2 hunks.
@@ -3,7 +3,7 @@
 }

 function timesFive(num) {
-  return num * 2;
+  return num * 5;
 }

 function timesTen(num) {
Stage this hunk [y,n,q,a,d,/,j,J,g,e,?]?
```

Much better. Accept it by `y` command followed by regular commit procedure.

```
git commit -m 'fix math in timesFive function'
```

Now you are ready to follow the process by yourself. Hopefully that helped.
