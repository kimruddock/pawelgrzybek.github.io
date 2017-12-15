---
title: Change user preferences on macOS via command line
excerpt: Graphical applications panel is not the only way to change user preferences of a macOS system. Defaults command gives you more power to configure your machine that you would have thought. 
photo: 2017-12-20.jpg
---

System Preferences panel is not the only way to change users settings. Macs come with a [`defaults`](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/defaults.1.html) command line interface that lets you read, write, and delete macOS user defaults. Maybe you even used it once or twice — revealing hidden files in Finder is a popular snippet (probably `⌘` + `⇧` + `.` is easier).

```
defaults write com.apple.finder AppleShowAllFiles YES
```

Step by step to explain a bit of terminology:

- `defaults` - interface
- `write` - method
- `comapple.finder` - domain
- `AppleShowAllFiles` - key
- `YES` - new value

You may scratching your head now and asking yourself — why the hell would I prefer to do it through command line instead of using nice looking GUI to change a thing? Two reasons! Command line way gives you access to settings that graphical interface won't let you change. Next one — better one! Do you remember last time when you had to setup a new computer from scratch? Change settings, desktop background, download favorite software and adjust it to your needs? How long did you spend on it? Two hours? Four? Ten? I spent about two minutes. Boom!

## Write, read and delete defaults settings

The [`defaults`](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/defaults.1.html) interface isn't complicated to use and comes equipped with only few commands:

- `read` - prints current user settings
- `read-type` - prints the type of given key 
- `write` - writes new settings
- `delete` - deletes key or a full domain
- `domains` - prints full list of domains
- `find` - searches all domain and keys for given name
- `help` - I bet you know what it does

Bare in mind that changing some of the settings require rebooting an app or even an operating system.

## Find a domain & key for a setting

Googling for a correct domain and key can be a little bit daunting task. Luckily you can easily find it out by yourself.

1. Save a state before a change: `defaults read > before`
2. Change some settings
3. Save a state after a change: `defaults read > after`
4. Find a difference: `diff before after`

Reading output of a default diff command isn't too enjoyable so feel free to use any other diff tool. Time for a hot tip now! Visual Studio Code apart from being really cool code editor is a fantastic diff tool. Just look!

```
code --diff before after
```

!!! image of code being a cool diff tool !!!

## My defaults tweaks

I actively maintain a list of settings that I change on my machine and you can find it on [my dotfiles repository on Github](https://github.com/pawelgrzybek/dotfiles/blob/master/setup-macos.sh). It isn't too complex so if you are looking for a real ninja level default tweaks example look at [Mathias Bynens one](https://github.com/mathiasbynens/dotfiles/blob/master/.macos).
