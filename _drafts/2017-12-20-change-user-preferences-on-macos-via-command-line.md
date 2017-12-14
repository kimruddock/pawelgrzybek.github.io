---
title: Change user preferences on macOS via command line.md
excerpt: Graphical applications panel is not the only way to change user preferences of a macOS system. Defaults command gives you more power to configure your machine that you would have thought. 
photo: 2017-12-20.jpg
---

System Preferences panel is not the only way to change users settings. Macs come with a [`defaults`](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/defaults.1.html) command line interface that lets you read, write, and delete Mac OS X user defaults. Maybe you even used it once or twice — revealing hidden files in Finder is a popular snippet (probably `⌘` + `⇧` + `.` is easier).

```
defaults write com.apple.finder AppleShowAllFiles YES
```

Step by step to explain a bit of terminology:

`defaults` - interface
`write` - method
`com`apple.finder' - domain
`AppleShowAllFiles` - key
`YES` - new value

You may ask yourself now — why the hell would I prefer to do it through command line instead of using nice looking GUI to change a thing? Two reasons! Command line way gives you access to settings that graphical interface won't let you change. Next one — better one! Do you remember last time when you had to setup a new computer fro scratch? Change settings, desktop background, download favorite software and adjust it to your needs? How long did you spend on this one? Two hours? Four? Ten? I spent about two minutes. Boom!

## Write, read and delete defaults settings

The [`defaults`](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/defaults.1.html) interface isn't complicated to use and comes equiped with only few commands:

- `read` - prints current user settings
- `read-type` - prints the type of given key 
- `write` - writes new settings
- `delete` - deletes key or a full domain
- `domains` - prints full list of domains
- `find` - searches all domain and keys for given name
- `help` - 
