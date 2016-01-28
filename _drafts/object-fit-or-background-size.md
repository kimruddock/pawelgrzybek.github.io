---
title: Image tag vs background property
excerpt: Dependable if the image is part of a design or part of a content, we should take a different approach. Let's heave a word about backgrounds and images.
photo: 2016-01-19.jpg
---

As [Anselm Hannemann](https://wdrl.info/archive/121) recently mentioned that front end developers have a problem with HTML and CSS. I avoided diving into JavaScript world for years and looking through prism of time I can see many benefits of staying with HTML and CSS a bit longer. I just learned it and I know the power and restrictions that these languages comes with. HTML5 spec was finalized, and published some time ago but many people still don't know how to use `img` tag or `background-size` property that was standardized ages ago. Today exclusively about it and a bit about `cover` value.

## Image or background?

This is easy. Let me quote myself because quotes always looks good in blog posts.

> Is it part of a content, or part of a design?

If you can answer this question you can skip to next section. It is as easy as that. Images bring to website semantic value, and adding `alt` tag makes it super accessible and interpreted by all user agents and screen readers. As a default your browser takes it as a printable element as long as you don't specify opposite (respect if you have print.css on your website).

Background plays a decorative role of your website, it doesn't come with semantic part or some sort of complementary value of the subject. [Official definition](http://www.oxforddictionaries.com/definition/english/background) taken straight from the Oxford Dictionary doesn't sound as web related, but comes with same meaning.

> The part of a design that forms a setting for the main figures or objects.

## Yeah, but background-size: cover

In the age of responsive web design we tend to create boxes that are always nicely filled with image. To create it we make use of `background-size: cover` definition. It just works fine with adaptive and fluid methods. Maybe this is seventh image in your [completely useless carousel](http://shouldiuseacarousel.com/) or a featured image above article on your Wordpress blog. It depends of circumstances described above, but probably in many situations you ignored rules described before! I'm guilty of doing the same thing.

## Object-fit for the rescue

[The `object-fit` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) defines how the content fits to the box. It takes few values: `fill`, `contain`, `cover`, `none`, `scale-down`. `Fill` stretches object to applied dimensions. It is probably not the most helpful value to use with RWD. `Contain` and `scale-down` behaves in exactly the same way proportionally sizing the image down to adjust to boundaries of element without clipping it. `None` is none. `Cover` is a clear winner in terms of usability in daily routine of designers and front end developers. As you may guess it does for image exactly the same as `cover` applied to `background-size`. Content is sized to fill entire available space of an elements. It respects the aspect ratio and clips width or height (dependable of proportion).

```
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Polyfil for object-fit: cover

Amazing things like that rarely comes without any downsides. The only problem is Internet Explorer. I like it too much to don't use it so I created a super easy JavaScript fix. If the features isn't available, it grabs the source path of an image and applies it to parent element. Background-size and background-position is applied as well to imitate same effect as `object-fit: cover`. Works fine on IE9, IE10, IE11 and Edge. If you need to support IE8, I'm sorry.

<p data-height="248" data-theme-id="14885" data-slug-hash="Rrybqg" data-default-tab="result" data-user="pawelgrzybek" class='codepen'>See the Pen <a href='http://codepen.io/pawelgrzybek/pen/Rrybqg/'>objectFit fallback for IE and Edge</a> by Pawel Grzybek (<a href='http://codepen.io/pawelgrzybek'>@pawelgrzybek</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
