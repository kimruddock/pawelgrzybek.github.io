---
title: Sync Atom between multiple devices
excerpt: Keeping preferences and extensions in sync between all my devices is big part of productive workflow. This is how to do it with Atom by Github.
photo: 2016-09-18.jpg
---

Keeping preferences and installed extensions for my text editor is important part to keep my workflow productive. Can't think of more annoying situation than being disturbed by missing snippet or plugin in the middle of function. I'm not sure why creators of these kind of tools don't explicitly provide solution to make this thing easier. [iTerm](https://www.iterm2.com/) is a great example how to do it right — simply pick a location where your settings should be exported to and keep this file in sync with other devices (Dropbox, iCloud, git, whatever).

Text editors allow us to do the same but small bit of hacking is required. As a long term [Sublime Text](https://www.sublimetext.com/) user I found [dotfiles on Github](https://dotfiles.github.io/) as a best option. Very recently I jumped on [Atom](https://atom.io/) and I had to keep it in sync between two computers at home and one at work. Let me share with you a few tips how to do it.

## Sync Settings Plugin for Atom

[Sync Settings for Atom](https://atom.io/packages/sync-settings) is a great plugin by [Geno Roupsky](https://github.com/groupsky). It stores all settings, keymaps, styles, init scripts, snippets and list of installed packages in a single  [gist](https://gist.github.com/). It requires you to create a new personal [access token](https://github.com/settings/tokens/new) on Github and put it into the plugin settings next to gistID. This step is required to create a communication between Gist (can be public or private) and all instances of your text editor. The only thing that you need to to now is to trigger a "backup" or "restore" from Command Palette — `cmd-shift-p` (macOS) or `ctrl-shift-p` (Linux/Windows). To steal config from your friend use a "Fork" option. Easy!



## Sync Atom with dotfiles on Github

## Sync Atom via Dropbox (or any other cloud service)

## This is how I do it

Sync Settings Plugin for Atom is fantastic but doesn't give me an option to roll my settings back in time when I mess something up. This requirement is covered by git — thats why I sync my config in my dotfiles. Dropbox is cool but after recent data leaks and bit unfair hack that Dropbox makes on your machine I decided to give up with this cloud service for a while.

Let me know...
