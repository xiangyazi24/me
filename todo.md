# Constructing My Second Personal Homepage via Hugo

## Things I did to modify Yihui’s Website 

It took me quite some time to get familiar with everything. Now I know how to manipulate a Hugo site!

- in Vercel.json there are some redirection that I need to remove.
- remove the GitHub guest book.
- figure out a way to allow visitor to edit, if they found errors.
- add some book template. So I can write a beautiful book.
- incase I forget, I host things on netify. They seems to use only Hugo tempalte (That is not true. You can use whatever.) But the netify.toml file specify that we use Hugo.
- Something about redirection. https://sergiodxa.com/articles/vercel/setup-redirect  The redirection happen in vercel.json file.
- successfully use https://giscus.app/.
- I found that I need to compile/build the website before I can deploy it. Then here comes the question, where can I find the built website?
- I add mathajax support! https://geoffruddock.com/math-typesetting-in-hugo/
- adding mathjax thoerem environment. It turned out all the css setting should be put under static/css. All the theorem style text are now set up beautifully. CSS feature seems to be on and off. It seems that the solution does not work very well if I have complicated math formula inside. Solution: I need to add into the div a classname mathjax to support mathjax in the div.
- The mathjax macro can be found under layout/partials/mathjax_support.
- Mathjax does not support \relax, an no-op, but I hacked it by using {}.
- Mathjax defines macro slightly different from kaTex. Read the document to understand the syntax for macro defining.
- Sublime Text has this very strange bug that between two <div>, if no other line break exist, it can not regconize snippet extension. My snippet bold and em fails.
- [Add KaText support](https://misha.brukman.net/blog/2022/04/writing-math-with-hugo/) together with MathJax. 
- MathJax has this problem that needs to refresh to render.
- [Add equation number](https://yongfu.name/2018/01/27/mathjax/)
- Both KaTex and mathjax work, but katex’s Latex layout is not very beautiful. 
- Auto-numbering for equations now works, but they do not work so well inside the divs. 
- the \label and \ref pair also work now.
- Remove the “\\\\\\” thing.
- Add latex grammar support.
- Test foot notes: they need to come in pairs. [^] when you want to add and again use it when you write it somewhere. 
  - add a Sublime text build to do nothing. I can at least ask it to start Hugo server.

- The shortcode trick in [this post](https://misha.brukman.net/blog/2022/04/writing-math-with-hugo/) is not very helpful when it comes to removing \\\ \\\. I gave that up.

## Shortcode and Removing of Double Slash

[Another](https://stackoverflow.com/questions/64050359/how-to-use-markdown-syntax-to-write-math-in-hugo) Stack Overflow that claims to solve the double Slash Problem. Success! 

## Add Number to Theorem environment. 

By using [CSS counter](https://css-tricks.com/almanac/properties/c/counter-increment/),, I manage to add auto numbering for theorems. 

## Add Bibliography

The current easy way to solve bibliography problem is to use footnote. I can’t afford to spend more time on this!

## Start Hugo Server

`hugo server` 

I can then use Sublime Text and Firefox side by side to edit things. 

## List of snippet I create in Sublime Text

- thm: for theorem 
- thmn: theorem with no numbering
- thmt: theorem with text names (similarly for lem, def, obs)
- lem: for lemmas
- def: for definitions
- obs: for observations
- il: inline math with protected block. So no escape needed.
- mb: mathjax block equation with protected block.
- ctrl+ m: inline math, dollar sign. 
- ctrl+ alt + m : block math two dollar signs.
- ctrl + shift + m: block math square brackets. Need to escape the inner line breaker. 
- beg: begin.
- cb: code block
- youtube: insert a youtube video.
- video: insert a “local” video.
- cd: code with some settings.

## Math 

To use Mathjax or KaTex, we just need to add

```yaml
---
math: mathjax
---
```

or 

```yaml
---
math: katex
---		
```

## 

## Table Entering 

Sublime Text has this `Table Editor` plugin that makes entering table very similar to Org in Emacs.

To start, just type `table` then a TAB. You might need to go to the command list `ctrl +shift + P` to enable Table Editor for the file type or for the view.

- More operations can be found [here](https://github.com/SublimeText-Markdown/TableEditor). 
- and [here](https://brettterpstra.com/2015/04/22/sublime-text-tips-for-markdown-table-editing/).

One thing I haven’t figure out is how to finish editing the table. Each time I get one empty line left at the end of the table. So I have to do `shift + alt + up` to remove it.



## Replit Embeded

It seems that using `iframe` to embed a Replit project does not work. Although [this page](https://docs.replit.com/hosting/embedding-repls) says so. It in fact required people have account or something according to [this page](https://docs.replit.com/teams-edu/embedding-projects).

> *Please note that to access their project in an iframe, students must be added to the team and logged into their Replit account.*

## Code Block

- fail to change it to monokai theme.
- Also find the all the fancy things I did for numbering do not show on the server side.
- Remove all setting about highlight.js. Now code block display successfully. 

## Remove subscribe button

Nothing is set there, or at least I don’t understand how to make it work. So I will just remove it. 

The file that controls subscription is in `menu-extra.html`.

## Insert Youtube video

``` html
{{< youtube id="CMtN_LUpeLg" >}}

```

where id is the last part of a Youtube link: `https://www.youtube.com/watch?v=CMtN_LUpeLg `

## Move .org to .me

- To move my .org website to the current .me website, I just need to copy the whole site and throw everything under `/static`. It is pretty convenient! 
- But the `index.html` must be moved to `/layout`

- Also it seems that the root directory is then `/static`.

## Conclusion

After the many attempts above, I’ve managed to get a very good web page template that I can use to write math
