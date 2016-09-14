---
title: Sync Atom between multiple devices
excerpt: Syncing preferences and extensions of code editor across all my devices is part of my workflow. These are few methods to do it with Atom by Github.
photo: 2016-09-15.jpg
---

Keeping preferences and installed extensions for my text editor is important part of my productive workflow. Can't think of more annoying situation than being disturbed by missing snippet or plugin. I'm not sure why creators of these kind of tools don't explicitly provide solution to import / export things easier. [iTerm](https://www.iterm2.com/) and [Alfred](https://www.alfredapp.com/) are great example how to do it right — simply pick a location where your settings should be exported to and keep this file in sync with other devices (Dropbox, iCloud, git, whatever).

Text editors allow us to do the same but small bit of hacking is required. As a long term [Sublime Text](https://www.sublimetext.com/) user I found [dotfiles on Github](https://dotfiles.github.io/) as a best option. Very recently I jumped on [Atom](https://atom.io/) and I had to keep it in sync between few computers at home and at work. Let me share with you a few possible options.

## Sync Settings Plugin for Atom

[Sync Settings for Atom](https://atom.io/packages/sync-settings) is a great plugin by [Geno Roupsky](https://github.com/groupsky). It stores all settings, keymaps, styles, init scripts, snippets and list of installed packages in a single  [gist](https://gist.github.com/). It requires you to create a new personal [access token](https://github.com/settings/tokens/new) on Github and put it into the plugin settings next to the gistID. This step is required to create a communication between Gist (can be public or private) and all Atom instances. The only thing that you need to do is to trigger a "backup" on main computer from Command Palette — `cmd-shift-p` (macOS) or `ctrl-shift-p` (Linux/Windows). To inject the same config on other device use "restore" command. To steal config from your colleague use a "fork" option. Easy and works like a charm!

## Sync Atom with dotfiles on Github

This option is a bit more manual but gives you a full control and ability to back in time (thanks to git). Atom stores all settings inside `~/.atom/` directory. The trick is to move this folder to your `.dotfiles` directory and create a symlink to this directory to the origin location. If you are not familiar with concept of using `.dotfiles`, have a look at [unofficial guide](https://dotfiles.github.io/) that is full of great examples.

```bash
# go home
cd ~

# move .atom to .dotfiles
mv .atom/ .dotfiles/

# create a symlink to directory inside dotfiles
ln -s .dotfiles/.atom/ .atom
```

Time to add new `.atom` folder to `.dotfiles` repository. Before doing that we need to add few folders to `.gitignore` file.

```bash
# Atom sync
/.atom/blob-store/
/.atom/compile-cache/
/.atom/packages/
/.atom/storage/
```

These device-specific folders don't store your settings. You may be wondering why did I add `packages` folder for my `.gitignore`. The answer is easy - it stores source files to all your extensions and they may be heavy as hell! Does it mean that we need to manually manage extensions? Nope :-) [Package Sync for Atom](https://atom.io/packages/package-sync) by [Lee Dohm](https://github.com/lee-dohm) stores reference to all installed plugins in `packages.cson` file. Simply install it and enable "Create on change" and "Overwrite packages.cson" options inside the plugin settings. I'm suprised that Atom comes with fantastic package manager, but doesn't come with this functionality as a default. The only option that may be cool to have in this plugin would be "Sync on start" but thats probably only my fussiness.

The thing that you may be concerned about is `userId` inside your `config.cson` file. You don't need to worry about it too much. [Apparently](https://github.com/atom/metrics/issues/18#issuecomment-36484448) it won't reveal anything sensitive. If it is still your only reason of sleepless nights, you can simply disable [Exception Reporting](https://atom.io/packages/exception-reporting) and [Metrics](https://atom.io/packages/metrics) plugins and then remove `userId` liner.

Now your `.dotfiles` are fully prepared to sync Atom settings between all your devices. It looks a bit more complicated than previous method but it is definitely more powerful and reliable in my experience. When you jump on new machine just pull `.dotfiles` repo and run "Package sync: Sync" command from Atom Command Palette — `cmd-shift-p` (macOS) or `ctrl-shift-p` (Linux/Windows) — job done.

## Sync Atom via Dropbox (or any other cloud service)

The last options is to use a cloud service like Dropbox. I include this method here only because it is possible in theory but in practice it is nowhere near as reliable as two options mentioned above. Dropbox is not a speed demon. Recent [data leak](https://www.troyhunt.com/the-dropbox-hack-is-real/) and [what it does with our operating systems](http://applehelpwriter.com/2016/08/29/discovering-how-dropbox-hacks-your-mac/) drove me to [drop Dropbox](http://www.drop-dropbox.com/). Decision is yours, method is provided below.

```bash
# move atom dro dropbox
mv ~/.atom ~/Dropbox/Apps/Atom

# create a symlink to dropbox directory
ln -s ~/Dropbox/Apps/Atom ~/.atom
```

## This is how I do it

Sync Settings Plugin for Atom is fantastic but doesn't give me an option to roll my settings back in time when I mess something up. This requirement is covered by git — thats why I sync it with my [dotfiles](https://github.com/pawelgrzybek/dotfiles). Dropbox — nope.

Let e know what do you think? How do you manage multiple instances of your code editor? Any suggestions? Feel free to use comments below. Have a great day :*
