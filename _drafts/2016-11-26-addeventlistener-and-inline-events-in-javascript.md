---
title: AddEventListener and inline evets in JavaScript
excerpt:
photo: 2016-11-26.jpg
---

I do a lot of JavaScript development on on my daily basis but sometimes it's a good fun to go back in time and dive deeper into some very basic concepts that we grasped ages ago. ["One Thing about JavaScript"](https://youtu.be/QyDOn9iW8LE) by Chris Coyier is a great introduction to `addEventListener` method — a great place to start journey intro JavaScript if you know only HTML and CSS. "I load jQuery for my hamburger icon only" types of chaps can benefit from this video as well.

> Sometimes, to start a journey into learning something huge and complex, you need to learn something small and simple. JavaScript is huge and complex, but you can baby step into it by learning small and simple things.

This video definitely inspired me to write this article and go intro DOM event triggers a bit deeper. Despite the fact that I learned it some time ago I need to admit that I'm going to go back to the roots a bit more often.

## Can you do something cool when I click it?

If you are coming from CSS and HTML  your natural curiosity drives you to add some interaction to your projects. Thats how you ended up here, in JavaScript world getting your hands dirty in DOM API. Presumably you would like to invoke some interaction on your website when you hit the button. Easy, there you go...

```js
// addEventListener method
button.addEventListener('click', somethingCool);
```

This one works like a charm. Look at this one...

```js
// inline onclick event
button.onclick = somethingCool;
```

Amazing! Works too! Let's smash it to out markup now!

```html
<button onclick="alert('Something cool.')">some button</button>
```

How about his?

```js
// attachEvent method
button.attachEvent('click', somethingCool);
```






A lot, ehhh?! So which one to choose now? If you don't care about details use the first method and you will be fine. If you want to know a bit more carry on.

