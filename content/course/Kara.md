---
title: "The Karatsubas"
date: "2024-02-01"
slug: "CSC482/kara"
math: mathjax
---
## The Father
Every semester I teach Karatsuba algorithm by [Anatoly Karatsuba](https://en.wikipedia.org/wiki/Anatoly_Karatsuba) in the first or second lecture. Well, to impress my students how a normal task like integer multiplication can be improved by clever algorithms. I still remember the "Aha" moment of reading the algorithm. By using a small trick to save one multiplication in each stage, we can achieve a faster algorithm!

## The Daughter
But that is not the only Karatsuba having impact on me. When I was a PhD student, one thing I worked on is to use a computational model called Chemical Reaction Network (CRN), to compute real number. The Number that I extremely interested in computing was Euler's $\gamma$, which can be defined as
$$
\gamma = \lim_{n\to \infty} \bigg(-\log n + \sum_{k=1}^{n}\frac{1}{k}\bigg).
$$
The first few digits of the number are 0.5772156649 ...

The above formula can not be used to actually compute $\gamma$. Firstly, it is very slow! Secondly, the CRN model I used is a continuous model. I need something continuous, such as an integral. I tried many many formula but failed. 

Then one day I ran into [this thread](https://math.stackexchange.com/questions/129777/what-is-the-fastest-most-efficient-algorithm-for-estimating-eulers-constant-g) on StackOverflow and people talked about a method that can compute $\gamma$ fast. The author? [Ekatherina Karatsuba](http://www.ccas.ru/karatsuba/index_e.htm), the daughter of Anatoly Karatsuba. Her research interest are around fast algorithms. 

<blockquote>
    The field of computational mathematics, which is called Fast Algorithms, was born in 1960. By an algorithm, not formalizing this concept, we mean a rule or a way of computation. 
</blockquote>

I found the formula I need in her paper to do the work for me. Of course, it is not that straightforward. The formula looks like. 

\\[
    \gamma =\Gamma^{\prime}(2) -1,
\\]
where $\Gamma$ is the *Gamma function* and $\Gamma^{\prime}(2)=\int_0^{\infty} e^{-t}t\log(t)d t$.

The list of her publications contains many other work on computing mathematical constants and special function. One thing I found specifically very interested is [this one](https://sci-hubtw.hkvisa.net/10.1023/a:1021948002934). Titled: _Fast Computation Of ζ(3) and of Some Special Integrals Using The Ramanujan Formula and Polylogarithms._

$$\zeta(3) = -\frac{1}{2}\bigg(\Gamma^{(3)}(1) -3\Gamma^{(2)}(1)\Gamma^{(1)}(1) + 2\Big(\Gamma^{(1)}(1)\Big)^{3}\bigg),$$

which is something I identified that can be computed by CRN using the tricks I developed previous to compute $\gamma$. This time we can compute [Apéry's constant](https://en.wikipedia.org/wiki/Ap%C3%A9ry%27s_constant).

Coincidentally, I just figured out a way to do it by another formula in the Wiki page [Apéry's constant](https://en.wikipedia.org/wiki/Ap%C3%A9ry%27s_constant).

\\[
    \zeta(3) = -\frac{1}{2}\bigg( \Gamma^{(3)}(1) + \gamma^{3} + \frac{1}{2}\pi^{2}\gamma\bigg) = -\frac{1}{2}\varphi^{(2)}(1).
\\]
But I only use the first half of the formula. I have no idea how to deal with the [polygamma function](https://en.wikipedia.org/wiki/Polygamma_function) in the second equation, where
$$
\varphi^{(m)}(z)= (-1)^{m+1}\int_0^{\infty}\frac{t^m e^{-zt}}{1-e^{-t}} dt,
$$ 
although it looks manageable.

---


