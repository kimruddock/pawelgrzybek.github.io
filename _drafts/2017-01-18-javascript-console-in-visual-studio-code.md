---
title: JavaScript console in Visual Studio Code
excerpt: JavaScript console in the browser is one of the most popular debugging methods. It would be cool to see its output straight in the code editor, isn't it?
photo: 2017-01-18.jpg
---

Some time ago I published an article about [JavaScript console in Sublime Text](https://pawelgrzybek.com/javascript-console-in-sublime-text/). It turned up to be one of the most popular articles on this website. As I recently changed my code editor from [Sublime Text](https://www.sublimetext.com/) to [VSCode](https://code.visualstudio.com/) I found a solution to replicate this functionality.

Similarly to [Build Systems](http://docs.sublimetext.info/en/latest/reference/build_systems.html) in Sublime Text, Visual Studio Code comes with [Tasks](https://code.visualstudio.com/Docs/editor/tasks) that allow us to pass a file to an external program without manually switching between code editor and Terminal. It is essentially all that we need to do — pass a currently active file to an JavaScript interpreter ([Node](https://nodejs.org/en/) in this case - so make sure this one is installed on your computer).

## Create JavaScript / Node task in VSCode

VSCode Task is a set of instructions in a JSON file that resides in our projects file. Unfortunately at this moment it isn't possible to create a globally available tasks — they need to be added per project. The good news is that the development of VSCode is rapid so we may expect global tasks very soon as [I'm not the only one](https://github.com/Microsoft/vscode/issues/1435) who is missing this feature. To create one hit `cmd + shift + p` on Mac, `ctrl + shift + p` on Windows / Linux or simply `F1` on any platform to show Command Palette, type "Tasks: Configure Task Runner" and choose "Other" from the list. Replace a content of a new file with...

```json
{
  "isShellCommand": true,
  "suppressTaskName": true,
  "osx": {
    "command": "/usr/local/bin/node"
  },
  "linux": {
    "command": "/usr/bin/node"
  },
  "windows": {
    "command": "C:\\Program Files\\nodejs\\node.exe"
  },
  "tasks": [
    {
      "taskName": "node",
      "args": ["${file}"],
      "isBuildCommand": true
    }
  ]
}
```

OK, what is going on here?! When we run task called "node" this is going to run a shell command that takes our currently opened file as an argument preceded by path to our node executable. To make things even easier `isBuildCommand` property lets us run this task via `shift + cmd + b` keyboard shortcut.

In most cases single "node" `command` does the job instead of passing a full path. I found this method more reliable though. The path can vary dependable of operating system, version and installation method. Update `command` accordingly to the `which node` output please. On Windows the equivalent command is `where node`.

![Find path to node executable in Terminal](/photos/2017-01-18-1.jpg)

It is time for fun! Create some amazing script and enjoy the instant output in your code editor by pressing `shift + cmd + b` or by running "node" task from Command Palette. Hopefully this helped you out. Stay curious and build amazing things!

![Find path to node executable in Terminal](/photos/2017-01-18-2.gif)
