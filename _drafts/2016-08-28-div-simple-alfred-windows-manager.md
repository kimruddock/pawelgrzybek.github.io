---
title: Div — simple Alfred windows manager
excerpt: I'm happy to present you a Div — simple Alfred windows manager. Let me explain the full potential of this simple tool in this blog post.
photo: 2016-08-28.jpg
---

There is tons of windows managers for mac OS around. Chris Coyier published a [nice comparison](https://css-tricks.com/os-x-window-manager-apps/) of the most popular ones some time ago. These apps are great utility that can boost your productivity be eliminating a time that you normally spend to adjust windows position on your sceen. I was using [Divvy by Mizage](http://mizage.com/divvy/) for a long time and it worked like a charm for me. Another app that I use non-stop is [Alfred](https://www.alfredapp.com/). It looks like a default spotlight but it is so much more than that. It allows you to create advanced search functionality, custom hotkeys, explore files, control apps, store snippets use clipboard history and so on. This app by itself is a subject that deserves a separated article (expect one soon).

Being uber minimalistic in terms of my workflow I decided to create a windows manager for Alfred. Say hello to [Div](http://www.packal.org/workflow/div). It is a simple applescript (it was a good fun learning it) with many triggers attached to it. I even created a logo for it :)

![Div — simple Alfred windows manager logo](/photos/2016-08-28-1.jpg)

## How to use Div

As I mentioned previously — [Div](http://www.packal.org/workflow/div) is a simple script with many options to control it. You can [download it from Packal](http://www.packal.org/workflow/div) — community driven repository of best Alfred workflows. It comes with the obvious layout settings predefined, but it's dead easy to add custom ones. It is written in applescript — very basic scripting language to pragmatically do cool stuff on Apple computers.

### Enable access for assistive devices (required)

Applescript works nice with majority of mac OS applications. Unfortunately some of them are not-scriptable. The easy trick is not to control app's position but the window that is around it. To do it we need to give Alfred permissions to do it. Just follow these easy steps.

1. Open System Preferences
2. Go to Security & Privacy
3. Go to last Privacy tab
4. On the left panel choose Accessibility
5. Clicking the lock in bottom left corner and type your password
6. Click small + icon and add Alfred from the list
7. Done :)

![Enable access for assistive devices on El Capitan](/photos/2016-08-28-2.gif)

### Predefined list of layouts

[Div](http://www.packal.org/workflow/div) comes with predefined list of layouts. To use it simply type `div` and choose a layout from the list.

![Predefined list of layouts in Div Alfred workflow](/photos/2016-08-28-3.gif)

### Using hotkeys

Workflow has few hotkeys predefined. It is probably the quickest and most efficient way to manage your layouts. Thats how I mainly use it.

- `⌃ ⌥ 1` Full
- `⌃ ⌥ 2` Medium
- `⌃ ⌥ 3` Small
- `⌃ ⌥ ←` Left
- `⌃ ⌥ →` Right
- `⌃ ⌥ ↑` Top
- `⌃ ⌥ ↓` Bottom

![Using hotkeys in Div Alfred workflow](/photos/2016-08-28-4.gif)


### Custom arguments

Sometimes predefined settings are not enough. [Div](http://www.packal.org/workflow/div) knows how to deal with it. It allows you to pass custom arguments to create a custom position. It accepts two or four arguments.

#### Custom bounds

Choose custom bounds by passing 4 space separated values. For example `div .2 .2 .8 .8` will place top left corner of an app 20% from top and 20% from left edge of a screen, and bottom right corner 80% from top and 80% from left edge of a screen.

![Custom bounds in Div Alfred workflow](/photos/2016-08-28-5.gif)

#### Custom size

Choose custom size by passing 2 space separated values. For example div 800 600 will resize your window to 800px width and 600px height and place the window on the middle of a screen.

![Custom size in Div Alfred workflow](/photos/2016-08-28-6.gif)

## Thanks for using Div

Hopefully you will like [Div](http://www.packal.org/workflow/div). If you need something more advanced have a look at amazing [Alfred 2 layout](http://www.packal.org/workflow/alfred2-layout) workflow by Bodo Junglas. As always, users feedback needed. Use a comments section below to share your love, feedback or report some bugs. If you would like to help me in future [Div](http://www.packal.org/workflow/div) development feel free to fork it on [Github](https://github.com/pawelgrzybek/div). Enjoy :*
