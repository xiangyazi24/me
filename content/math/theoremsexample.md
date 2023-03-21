---
title: Testing Math 
date: '2023-03-14'
slug: math-test-obs
math: mathjax
disable_highlight: false
---

This page is for testing all kinds of setups I had for math blogging. I now have everything I need to write math in Markdown/HTML! 

## Basic Math Mode
I am writing my big theorem here with the following wonderful equation

\\(\int_a^b f(x) = F(b)-F(a)\\)

\begin{equation*}
   e^{\pi i} + 1 = 0
\end{equation*}

\begin{equation}
   E = mc^2 \label{eq:zhineng} \tag{1}
\end{equation}

\begin{equation}
   \int_a^b f(x) = F(b) - F(a)
\end{equation}

It is powerful enough that I can do referencing [^1].
I can then write very complicated math (\ref{eq:zhineng}).

Testing mathbb: $\mathbb{1}$

$$
  \begin{bmatrix}
    a & b \\\\
    c & d \\\\
    e & f \\\\
  \end{bmatrix}
$$

{{< block >}}

  \begin{bmatrix}
    a & b \\
    c & d \\
    e & f \\
  \end{bmatrix}

{{< /block >}}

{{< block >}}
\[
    \begin{bmatrix}
    a & b \\
    c & d \\
    e & f \\
  \end{bmatrix}
\]
{{< /block >}}

  \begin{bmatrix}
      a & b \\\\
      c & d \\\\
      e & f \\\\
  \end{bmatrix}

{{< inline >}}
$
    \begin{bmatrix}
    a & b \\
    c & d \\
    e & f \\
  \end{bmatrix}
$
{{< /inline >}}



{{< block >}}
\[a \ne 0\]
{{< /block >}}

## Mathjax Macro

The following formulas use some macroes. I aslo test cross references and equation tag/numbering.
\\[ 
 \f\relax{x} = \int_{-\infty}^\infty 
    \f\hat\xi\,e^{2 \pi i \xi x} \tag{fancy}\label{eq:fancy}
    \,d\xi 
\\]
  
 \\(x < y\\)
  \\(\frac{x}{y}\\)
\begin{align}
a &=b \\\\
  &=c \notag  
\end{align}


\begin{align} A & = B \\\\ & = C \end{align}


\begin{braced} \frac{x}{y} \end{braced}


\begin{ABC}{Z} xyz \end{ABC}


**Crossreference:** Here I add a pointer to fancy \eqref{eq:fancy}.

## CSS Theorem Style and Automatic Theorem Counter
I don't really know any CSS or HTML very well. But luckily I manage to make things work! I use different counters for theorems and for definitions. 

<div class="theorem mathjax" text='New theorem'>
hahahahhahahahsdf alsjdfljasfdljla asdfjlajsdf
</div> 


<div class="theorem" text='Prime numbers'>
All prime number are odd except 2.
</div>

<div class="proof mathjax">
There are no natural numbers. Xiang is editing this place.
is a natural number greater than 2.   There are no natural numbers $\mathbf{N} = (1, 2, 3, \ldots)$ $x$, $y$, and $z$ such that $x^n + y^n = z^n$, in which $n$ is a natural number greater than 2.
</div>

<div class="definition", text="Big Idea">
Here we define lasdkljflkj asdfljlj.
</div>

<div class="lemma">
Here we proof this very useful lemma.
</div>

<div class="lemma", text='another lemma'>
Here we proof another very useful lemma.
</div>

<div class="obs", text="Big Observation">
Here we proof this very useful observation with x new def.
</div>

<div class="obs mathjax", text="Big Observation2">
  Here we proof this very $$\int_a^b f(x)= F(b) - F(a)$$ observation with x new def.
</div>


<div class="theorem mathjax">
  There are no natural numbers $\mathbf{N} = (1, 2, 3, \ldots)$ $x$, $y$, and $z$ such that $x^n + y^n = z^n$, in which $n$ is a natural number greater than 2. A dollar sign \$.
</div>

<div class="definition mathjax", text="Big Idea">
Here we define lasdkljflkj asdfljlj.
</div>

<div class="proof mathjax">
kjhkasdhf lklasjdflj ljljasd fljl alsdjfl $$\int_a^b f(x)= F(b) - F(a).$$
</div> 

<div class="theorem mathjax" text='Fermat Last Theorem'>
ljasldfj llkjasdf

alsfjdla jsdflljasdfl jals
</div> 

<div class="obs mathjax" >
lajsdlfj
ljalsdfj 
</div> 

<div class="obs mathjax" text='Another Observation'>
lajslfj ljasdlfj l aljsdflj jljasdlf 
</div>  

\begin{align}
  A &= B \\\\
    &= C
\end{align}

\begin{gather}
    A = B \\\\
    C = D
\end{gather}

$safjljsf$

$$
  \int_a^b f(x) = F(b)- F(a)
$$

<div class="lemma mathjax">
adsllljlajsf
lajsdflj
</div> 

<div class="lemma mathjax" text='haha'>
ljal sjfdlajsd flj <strong>ljalsfjd </strong>
</div> 

<div class="theorem mathjax" text='Big Theorem' number="5.5">
My big, important theorem:
$$
  \int f(x) = F(x) + c.
$$
</div> 

<div class="definition mathjax" text='Big Theorem' number="5.5">
My big, important theorem:
$$
  \int f(x) = F(x) + c.
$$
</div> 

<div class="obs mathjax" text='Big Theorem' number="5.5">
My big, important theorem:
$$
  \int f(x) = F(x) + c.
$$
and
$$
  \int_a^b f(x)= F(b) - F(a).
$$
</div> 

<div class="theorem-no-number mathjax" text='Main Theorem'>
    My Main Theorem today without automatic numbering.
</div> 

By doing all the things above. I think I now have a very good webpage template to write math.


```java {.myclass linenos=table,hl_lines=[3,"5-6"],linenostart=1}
public class Graph {

    private Set<Node> nodes = new HashSet<>();
    
    public void addNode(Node nodeA) {
        nodes.add(nodeA);
    }

    // getters and setters 
}
```

## Checklists
[ ] a task list item
[ ] list syntax required
[ ] incomplete
[x] completed
[ ] asfdsaf 
[ ] asdfsa

- [ ] jalsdfj jl
- [ ] aslfjlja 
- [ ] asfdlkjaljsdf
- [ ] asdlfjalsjdf 
- [ ] alsdfjlajs f


## Tables

Sublime Text's Table Editor extension makes editing table very smooth for me. 
| people | money |
| ------------- | ------------- |
| dlkjsdjf | ljasjdfljaslfd |
| asdfjlajs | sldkfjalsjf |

Better table:

{{<table "table table-striped table-bordered">}}
| askfdhkajhfd |   colum head   | sadfhkajshdf |    asdfasdfasfdas    |
|   Column 1   |                |   Column 2   |       Column 3       |
|--------------|----------------|--------------|----------------------|
| fasfdasdf    | asdfjsaflk     | safdasfd     | sfasfdasfd           |
| asdffsadasdf | asdfasdf       | sadfasdf     | asdfasd              |
| asdfasdf     | sadfasd        | asdfasdf     | sadfsadf             |
| asdfajsldkfj | asldfjlkj      | alksjdflkaj  | asdfljaslkdfj        |
| asdfasdfklj  | asjdflkja      | asdfklajsdfl | aksldfjkaljsdf       |
| asdfjalksjdf | asdlfkjalksjdf | asdfjlasjdf  | sadfljasfkdlasdfasdf |
| dsfasfd      | safdasdf       | asdfas       | sadfasdfffasfda      |
{{</table>}}


| askfdhkajhfd |   colum head   | sadfhkajshdf |    asdfasdfasfdas    |
|   Column 1   |                |   Column 2   |       Column 3       |
|--------------|----------------|--------------|----------------------|
| fasfdasdf    | asdfjsaflk     | safdasfd     | sfasfdasfd           |
| asdffsadasdf | asdfasdf       | sadfasdf     | asdfasd              |
| asdfasdf     | sadfasd        | asdfasdf     | sadfsadf             |
| asdfajsldkfj | asldfjlkj      | alksjdflkaj  | asdfljaslkdfj        |
| asdfasdfklj  | asjdflkja      | asdfklajsdfl | aksldfjkaljsdf       |
| asdfjalksjdf | asdlfkjalksjdf | asdfjlasjdf  | sadfljasfkdlasdfasdf |
|              |                |              |                      |

|        sadfkl        |   Column 2asdfjalkjs   |   adfkalsjdf   |   asdjfkha  |
|----------------------|------------------------|----------------|-------------|
| Cell 1-1sdkjfhaksjdh | Cell 1-2asdkjfhkahsdf  | asdfkjhaksjdfh | kahsdfkha   |
| Cell 2-1asdkjfhkaj   | Cell 2-2aksjdfhkajshdf | aksdfhskjdh    | asdfasfasdf |
| asfjlkj              | asljdflj               | alsjdflj       | lkjaslfjd   |
| asdfas               | asdf                   | asdf           | asdfsfd     |


add the newest version. 
Not Updated on the website?

## Test Video
Here I plugin a video.


{{< youtube id="spUNpyF58BY" >}}



[^1]: Some footnote here.
