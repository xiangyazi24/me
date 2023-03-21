---
title: Run Java With Input in Sublime Text 3/4
date: "2023-03-20"
---
I tried to setup my Sublime Text 4 to run Java. Currently I still do a lot of things on Sublime Text. It runs faster than VS Code and I already develop a lot of snippets and keyboard mapping that I become so used to, leaving Sublime Text is not so easy. But the annoying thing about Sublime Text is it does not come with good debugger. So if I were to run some Java codes, I can not debug them easily. I will need to switch to VS Code in that case. Anyway, I still want to set up my Sublime Text to run Java in quick.

I consulted pages such as 
 1. [This one](https://x1nj1n.medium.com/run-java-with-input-in-sublime-text-3-4-a744166eb915).
 2. [This one](https://forum.sublimetext.com/t/how-to-have-input-java/47826/7).
 3. and [this video](https://www.youtube.com/watch?v=iLWq7REhlKY).
They all provided good solutions but still I failed to run my code. 

I figured out it had something to do with the space in my [file name](https://forum.sublimetext.com/t/build-system-failing-when-filepath-contains-spaces/22654). The solution is to add double quotation marks around the file path. But quotation marks are special symbols in the build file, so we need to escape them.


```json {.myclass linenos=table,hl_lines=[],linenostart=1}
{
"target": "terminus_exec",
"cancel": "terminus_cancel_build",
"working_dir": "$file_path",
"shell_cmd": "javac \"$file\" && java \"$file_base_name\""
}

```

