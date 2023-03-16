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

## List of snippet I create

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

## Conclusion

After the many attempts above, I’ve managed to get a very good web page template that I can use to write math
