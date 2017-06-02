---
title: Basic Node.js debugging in Google Chrome
excerpt: We have been testing front end in Google Chrome Dev Tools for quite a while. How about testing some Node.js in exactlly the same way?
photo: 2017-06-02.jpg
---

Hi. To debugg Node.js in Chrome you need:

- [Node (v6.3.0+ required)](https://nodejs.org/)
- [Chrome (v55+ required)](https://www.google.com/chrome/)

Surprised? We need some playground script as well. Let's build something extremely useful. How many times you had a great idea what to cook for a dinner, but you struggled to decide what to drink with it? This simple script will suggest you a best beer based on your food input. Thanks to great [Punk API](https://punkapi.com/) by [Sam Mason de Caires](https://twitter.com/samjbmason).

I really fancy some prawns today. Let's run our script...

```bash
node beer.js prawns
```

![Node js — find a best beer for prawns](/photos/2017-06-02-1.gif)

```js
// Node version of fetch, needs to be downloaded from npm or yarn
const fetch = require('node-fetch');

// The first argument is a node path
// The second is the file path
// The third is our food argument
const food = process.argv[2];

// Print array of suggested beers
function printMyBeersBro(beers) {
  console.log('—'.repeat(50));

  beers.forEach(beer => {
    console.log(`Beer: ${beer.name} - ${beer.tagline}`);
    console.log(`Description: ${beer.description}`);
    console.log(`Alcohol by volume: ${beer.abv}`);
    console.log('—'.repeat(50))
  });
}

// Thanks to cool PUNK API we are able get some beer suggestions
// Good fun, try it yourself: https://punkapi.com/
fetch(`https://api.punkapi.com/v2/beers?food=${food}`)
  .then(data => data.json())
  .then(beers => printMyBeersBro(beers));
```

## Run Node.js script in Google Chrome dev tools

Google Chrome allows us to debugg Node.js application in exactly the same manner as we use to do it with front end code. Now let's run our script with an extra flag. All the options are well explained in [Node.js documentation](https://nodejs.org/en/docs/inspector/#command-line-options).

```bash
node --inspect-brk beer.js prawns
```

```bash
Debugger listening on ws://127.0.0.1:9229/4782ff82-d043-422d-96b1-64611883eddc
For help see https://nodejs.org/en/docs/inspector
Debugger attached.
```

At this moment debugger is running and stopped before user's code parsing began. To access debugger we have few options.

1. Go to `chrome://inspect` and click 'inspect' under your process.
2. Click the dedicated icon (this option is available on Google Chrome Canary at the time of writing this article).

That is it for today. Quick tip. I really fancy prawns now.
