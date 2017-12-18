---
title: Change macOS user preferences via command line
excerpt: System preferences window is not the only way to change user preferences of a macOS. Defaults command gives you more power to configure your machine that you would have thought.
photo: 2017-12-20.jpg
---

The System Preferences window is not the only way to adjust users settings. Macs come with a [`defaults`](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/defaults.1.html) command line interface that lets you read, write, and delete macOS user defaults. Maybe you have even used it before — revealing hidden files in a Finder is a popular snippet (hot tip: `⌘` + `⇧` + `.` is quicker).

```
defaults write com.apple.finder AppleShowAllFiles -string YES
```

Let's take it apart to embrace a terminology used throughout the article:

- `defaults` - interface
- `write` - method
- `comapple.finder` - domain
- `AppleShowAllFiles` - key
- `-string` - type descriptor
- `YES` - new value

You may scratching your head asking yourself — why the hell would I prefer to do it through a command line instead of using nice looking GUI (graphical user interface) to change a thing? Two reasons! A command line way gives you an access to things that you cannot change via graphical panels (toggling hidden files is a perfect example). Next one — better one! Do you remember last time when you had to setup a new computer from scratch? Change settings, desktop background, disable screen saver, download favorite software etc. How long did you spend on this task? Two hours? Four? Ten? I spent about five minutes. Boom!

## Write, read and delete defaults settings

The [`defaults`](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/defaults.1.html) interface isn't complicated to use and comes equipped with few methods only:

- `read` - prints current user settings
- `read-type` - prints the type of given key
- `write` - writes new settings
- `delete` - deletes key or a full domain
- `domains` - prints full list of domains
- `find` - searches all domain and keys for given name
- `help` - I bet you know what it does

## Domains — system components and installed apps

Printing all the domains via `defaults domains` is a very helpful way to check what actually can be changed. Domains are objects that contain settings for particular system component, installed application or a configuration `.plist` file located in `/Library/Preferences/`.

```
defaults domains
```

```
...com.apple.ActivityMonitor, com.apple.AddressBook, com.apple.Console, com.apple.DiskUtility, com.apple.FontBook, com.apple.Image_Capture, com.apple.Maps, com.apple.Messages, com.apple.Notes...
```

### A little bit cleaner output of all domains

If you are (like me) not a big fun of a comma separated output of `defaults domains`, you can pipe it through a translate command to make an output much easier to read.

```
defaults domains | tr ',' '\n'
```

```
...
com.apple.ActivityMonitor
com.apple.AddressBook
com.apple.Console
com.apple.DiskUtility
com.apple.FontBook
com.apple.Image_Capture
com.apple.Maps
com.apple.Messages
com.apple.Notes
...
```

## Basic workflow to amend a user defaults

The whole idea is to traverse through domains that we would like to change and compose a comand that oveerides current setting. Let's say we would like to find a command to change spell checking inside Notes app. The workflow would look something like this:

1. Print a settings for notes app to find a right key.
3. Check a value type for a given key.
4. Write new settings.

```
defaults read com.apple.Notes
```

```
defaults read-type com.apple.Notes NotesContinuousSpellCheckingEnabled
```

```
defaults write com.apple.Notes NotesContinuousSpellCheckingEnabled -bool true
```

As you can see it is not that complicated. Bare in mind that some changes require a restart of an app or occasionally a full reboot of a operating system. The good idea is to close an app before changing some of its settings via via command line.

## The way to find a domain & key responsible for a setting

Browsing through the output of a `defaults read` command or browsing uncle Google for a correct domain and key can be a daunting task. Luckily you can easily find it out by yourself. Good old diff for the rescue!

1. Save a state before a change.
2. Make a change through GUI.
3. Save a state after a change.
4. Find a difference.

```
defaults read > before
```

```
defaults read > after
```

```shell
diff before after
```

Reading output of a default `diff` command isn't too enjoyable so feel free to use any other diff tool. Time for a hot tip now! Visual Studio Code apart from being really cool code editor is a fantastic diff tool. Just have a look!

```
code --diff before after
```

![Visual Studio Code as a diff tool](/photos/2017-12-20-1.jpg)

## My defaults tweaks

I actively maintain a list of settings that I change on my machine and you can find it on [my dotfiles repository](https://github.com/pawelgrzybek/dotfiles/blob/master/setup-macos.sh) on Github. It isn't too complex so if you are looking for a real ninja level defaults tweaks example look at [Mathias Bynens one](https://github.com/mathiasbynens/dotfiles/blob/master/.macos).

Hopefully this article helped you to embrace the power of defaults command. Share in comments below your favorite defaults tweaks and stay tuned as more explainer articles like this one are coming soon. Until next time.
