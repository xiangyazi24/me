---
title: My First Simple Sublime Text Plugin
date: "2023-03-22"
---
I write my webpage content with Markdown. Each Markdown file start with the yaml head like this.

```yaml {.myclass linenos = table, hl_lines = [], linenostart = 1}
---
title: My First Simple Sublime Text Plugin
date: "2023-03-22"
---
```

It is very annoying to enter the date: you have to look at the calendar if you are like me and you have to input "-" and numbers. So I want to insert the date automatically. How? There are [solutions](https://forum.sublimetext.com/t/easiest-way-to-insert-date-time-with-a-single-keypress/4134) out there. But eventually you will need to bind the Python script you write with key strikes. However, there are key maps more than I can remember all ready. I don't want to remember yet another key combination.

Here is what I want.
1. Type `today`.
2. Hit `Tab`.

**Can a snippet do this?**
Unfortunately, it seems that snippet can just expand some text or do some regular expression. It does not execute commands. But the feature I want act exactly like a snippet.
**Can I bind the command to `Tab`?** Maybe, but `Tab` is very useful for a lot of other things, for example autocomplete, I don't want to ruin that.

Let's solve one problem at a time.

## The Command/Script

I am not a programmer and I am not familiar with the Sublime Text API. With some googling, I manage to put up the following.

```python {.myclass linenos = table, hl_lines = [], linenostart = 1}
import sublime
import sublime_plugin
import os
import time
import subprocess

import datetime


class TodayDateCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        self.view.insert(edit, self.view.sel()[
                         0].begin(), f"\"{datetime.date.today()}\"")

```

Testing the command by ``ctrl + ` `` and `view.run_command(today_date)`, it works fine. Yes, you need to do `today_date` to execute a command name `TodayDateComand`. It is wired Sublime Text rule. I wrote it here in case I forgot it. 


## Tab magic

I still want the Tab magic. I need to detect when `today` appears in the text, and the I will call the `today_date` command. That is basically all the idea it takes. But I generalize it a bit. I wrote the following command `MagicTab`, to serve as a command menu: I can add whatever command I have later. What it does is to detect the words in the text just like a snippet and then call the command associate with those words. 

**It is like snippets, but more powerful!** I tied the command menu to the `Tab` key, so I called it *Magic Tab*. 

```python {.myclass linenos=table,hl_lines=[],linenostart=1}
import sublime
import sublime_plugin
import os
import time
import subprocess

import datetime

# add . to mean it is under the current directory.
from .magic_tab.Today import TodayDateCommand


class MagicTabCommand(sublime_plugin.TextCommand):
    def run(self, edit):
    # get the current word before the cursor
        for region in self.view.sel():

            if region.begin() == region.end():
                word = self.view.word(region)

            else:
                word = region

            if not word.empty():
                command = self.view.substr(word)


        # Command menu. I can add what ever keyword I want late.
        # If the word equals to "today"
            if command == "today":
                self.view.erase(edit, word)
                self.view.run_command("today_date")
        # run other possible snippet
            else:
                self. view.run_command("expand_snippet")

```
It is worth to note that in Line 35 of the above code, I do `expand_snippet` by default. There is no way I will give up all my snippets.

To build the key map, I add the following in the keymap file. 


```Json {.myclass linenos=table,hl_lines=[],linenostart=1}
{"keys": ["tab"], "command": "magic_tab","args": {},
    "context":
        [// only works for markdown, if also want latex, add "text.tex.latex"
            {"key": "selector", "operator": "equal", "operand": "text.html.markdown"}, 
        ]
}

```

Now everything works as expected for me.






