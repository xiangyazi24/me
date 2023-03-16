---
title: Testing Math 
date: '2023-03-14'
slug: math-test-obs
math: mathjax
---

The follwoing are all the tests and setups I have. I now have everything I need to write math in md!

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

{{< mathjax/block >}}

  \begin{bmatrix}
    a & b \\
    c & d \\
    e & f \\
  \end{bmatrix}

{{< /mathjax/block >}}

{{< mathjax/block >}}
\[
    \begin{bmatrix}
    a & b \\
    c & d \\
    e & f \\
  \end{bmatrix}
\]
{{< /mathjax/block >}}

  \begin{bmatrix}
      a & b \\\\
      c & d \\\\
      e & f \\\\
  \end{bmatrix}

{{< mathjax/inline >}}
$
    \begin{bmatrix}
    a & b \\
    c & d \\
    e & f \\
  \end{bmatrix}
$
{{< /mathjax/inline >}}



{{< mathjax/block >}}
\[a \ne 0\]
{{< /mathjax/block >}}



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

Here I add a pointer to fancy \eqref{eq:fancy}.
<div class="theorem mathjax" text='New theorem'>
hahahahhahahahsdf alsjdfljasfdljla asdfjlajsdf
</div> 


<div class="theorem" text='Prime numbers'>
All odd numbers are prime.
</div>

<div class="proof mathjax">
There are no natural numbers. Xiang is editing this place.
is a natural number greater than 2.   There are no natural numbers $\mathbf{N} = (1, 2, 3, \ldots)$ $x$, $y$, and $z$ such that $x^n + y^n = z^n$, in which $n$ is a natural number greater than 2.
</div>

<div class="definition", text="Big Idea">
Here we define lasdkljflkj asdfljlj
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
Here we define lasdkljflkj asdfljlj
</div>

<div class="proof mathjax">
kjhkasdhf lklasjdflj ljljasd fljl alsdjfl $$\int_a^b f(x)= F(b) - F(a)$$.
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



```java {linenos=table,hl_lines=[199,"203-204"],linenostart=199}
public class Graph {

    private Set<Node> nodes = new HashSet<>();
    
    public void addNode(Node nodeA) {
        nodes.add(nodeA);
    }

    // getters and setters 
}
```

add the newest version. 
Not Updated on the website?

[^1]: Some footnote here.
