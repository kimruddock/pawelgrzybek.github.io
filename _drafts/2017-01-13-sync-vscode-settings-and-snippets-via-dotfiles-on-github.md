---
title: Sync VSCode settings and snippets via .dotfiles on Github
excerpt: Having access to the same setting and snippets across multiple devices is a handy functionality of text editors. This is how to do in with VSCode.
photo: 2017-01-13.jpg
---

Text editor and the browser are probably the most frequently used applications on my daily routine. As long as you are logged in to Goggle Chrome (or any other browser) synchronization of settings and plugins happens in the background. Unfortunately syncing settings between applications like VSCode is not that straight forward. Because it doesn't come baked into the software it doesn't mean it is impossible.

As a long term Sublime Text user I managed to use Github to sync it's settings across multiple machines via [.dotfiles](https://github.com/pawelgrzybek/dotfiles). I used Atom for a little while and I found a way to mimic this mechanism for it as well. [I published an article](https://pawelgrzybek.com/sync-atom-between-multiple-devices/) about it the other day. Today is a time to show you how to do it with VSCode. By the way - VSCode is awesome!

## Moving VSCode settings and snippets to .dotfiles

Folder with VSCode setting and snippets depends of the operating system. [User and Workspace Settings](https://code.visualstudio.com/Docs/customization/userandworkspace) and it's locations are described in official documentation. As a macOS user I will provide snippets associated with this operating system, but if you are Windows or Linux user feel free to follow along and replace paths accordingly to your OS . Before pasting anything into your Terminal make sure to shut VSCode down.

OK, let's move settings file and directory full of snippets to your .dotfiles  that is located in my root folder.

```bash
mv ~/Library/Application\ Support/Code/User/settings.json ~/.dotfiles/Code/
mv ~/Library/Application\ Support/Code/User/snippets/ ~/.dotfiles/Code/
```

## Create symbolic links to VSCode settings file and snippets directory

All that we need is in a correct location now, time to create symlinks to those files.

```bash
ln -s ~/.dotfiles/Code/settings.json ~/Library/Application\ Support/Code/User/settings.json
ln -s ~/.dotfiles/Code/snippets/ ~/Library/Application\ Support/Code/User/snippets
```

Boom! It's done! Easy? Now you can commit new "Code" directory to your .dotfiles repo, create symbolic links across all your machines and enjoy version controlled settings and snippets.

If you have any idea how to sync list of plugins installed from Marketplace please let me know in the comments. Have a great day :*
