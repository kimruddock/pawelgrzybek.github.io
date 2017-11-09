---
title: Unity development on macOS with Vistual Studio Code
excerpt: As a fresh Unity developer I really struggled to jump from my favourite code ediot to MonoDevelop. Took me a while to realise that this actually isn't necessity.
photo: 2017-11-10.jpg
---

First things first — I'm not an experienced game developer. I just started my journey with Unity not long time ago and this article is a result of my early explorations that can be useful for newcomers.

As a day to day front end developer I spent majority of the time in HTML, CSS and JavaScript. Jumping from one world to a completely new environment is a fantastic experience but comes with lots of difficulties. My biggest issue on early Unity expedition wasn't a C#, it wasn't a convoluted interface, nor a crazy amount of 3D vector math. It was a MonoDevelop — the default IDE that Unity comes with and works smoothly out of the box. Lack of my favorite shortcuts, snippets system and absence of core functionalities that I use hundreds times a day. Visual Studio Code served me well for last few months and I couldn't stand writing a single line of code without it. After a while it turned up that VSCode can be linked with Unity to take advantage of all the things that it is best at. Let's go through the whole process step by step.

## Visual Studio Code and C# extension

You can download [VSCode from Microsoft website](https://code.visualstudio.com/) for free. Installation process is very straight forward. Out of the box it doesn't support a language used by Unity — it can be easily solved by installing C# extension from official marketplace.

![Visual Studio Code and C# extension](/photos/2017-11-10-1.jpg)

In theory Unity support three scripting languages — C#, JavaScript and Python-like Boo. [Ditching Boo](https://blogs.unity3d.com/2014/09/03/documentation-unity-scripting-languages-and-you/) has been announced long time ago and the same thing has been recently revealed about [the future of Javascript-like UnityScript](https://blogs.unity3d.com/2017/08/11/unityscripts-long-ride-off-into-the-sunset/). C# is the future of this platform — much nicer ecosystem, tooling support and the bright future full of powerful features that wouldn't be possible in other language. If you have never worked with C# you don't have to worry — [official documentation](https://unity3d.com/learn/tutorials/s/scripting) is a fantastic place to get you running.

## Unity and it's external script editor

Despite the time that it takes to download, Unity set up isn't scary. I just would like to point your attention to the step where you can choose addition components that are going to be added during the installation. As we are aiming to use it with Visual Studio Code, you can un-check MonoDevelop from add-ons list.

![Unity comes with MonoDevelop](/photos/2017-11-10-2.jpg)

Now you can go to Unity settings and change your "External Script Editor" to Visual Studio Code.

![Visual Studio code as a external script editor for Unity](/photos/2017-11-10-3.jpg)

## Install .NET SKD

Command Line Interface for .NET Software Development Kit is something that we need. Download the [latest version of a installer](https://www.microsoft.com/net/learn/get-started/macos) from Microsoft website and follow the installation guide.

![.NET SDK installation screen](/photos/2017-11-10-4.jpg)

## Brew and Mono

Mono is a last ingredient that we need to install to have a smooth integration with built into VSCode [OmniSharp](http://www.omnisharp.net/). The easiest way is to download it from Homebrew. If you don't have it installed on your machine, you live your life wrong! [Visit a website](https://brew.sh/) to the missing package manager for macOS and follow installation guide. Now the only thing that you need to run is…

```
brew install mono
```

## VSCode + Unity = <3

It seems to be a lot of steps but actuall the whole setup takes just a few minutes. You can now enjoy smooth integration of Unity and you favourite code editor.

![Unity integration into Visual Studio Code](/photos/2017-11-10-5.gif)
