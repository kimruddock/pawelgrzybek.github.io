---
title: Unity development on mac OS with Vistual Studio Code
excerpt: As a fresh Unity developer I really struggled to jump from my favourite code ediot to MonoDevelop. Took me a while to realise that this actually isn't necessity.
photo: 2017-11-10.jpg
---

First things first — I'm not an experienced game developer. I just started my journey with Unity not long time ago and this article is a result of my early explorations that can be useful for newcomers.

As a day to day front end developer I spent majority of a time in HTML, CSS and JavaScript. Jumping from one world to completely new environment is a fantastic experience but comes with lots of difficulties. My biggest issue on early Unity expedition wasn't C#, it wasn't convoluted interface, nor a crazy amount of 3D vector math. It was a MonoDevelop — default IDE that Unity comes with and works smoothly out of the box. Lack of my favorite shortcuts, snippets system and absence of core functionalities that I use hundreds times a day. Visual Studio Code served me well for last few months and I couldn't stand writing a single line of code without it. After a while it turned up that VSCode can be linked with my brand new platform to take advantage of all the things that it is best at. Let's go through the whole process step by step.

## Visual Studio Code and C# extension

You can download VSCode from Microsoft website for free. Installation process is very straight forward. Out of the box it doesn't support a language used by Unity — it can be easily solved by installing C# language support from official marketplace.

!!! IMAGE OF A VSCODe and C# extension on the screen !!!

## Installing Unity, Visual Studio Code and C# extension

Despite the time that it takes to download, Unity set up isn't something scary. I just would like to point your attention to the step where you can choose addition components that are going to be added during the installation. As we are aiming to use it with Visual Studio Code, you can uncheck MonoDevelop from add-ons list.

!!! IMAGE OF A SCREEN WITH UNCHECKED MONODEVELOP !!!

## Install .NET Core CLI

Command Line Interface for .NET SDK is something that we need. Download the latest version of a installer from Microsoft website and follow the installation guide.

!!! IMAGE OF A SCREEN WITH .NET installation process !!!

## Brew and Mono

Mono is a last thing that we will need to install. The easiest way is to download it from Homebrew 
