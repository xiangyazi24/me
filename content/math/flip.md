---
title: "Fliping $\\frac{1}{1-x}$"
author: "Xiang Huang"
date: "2023-03-26"
math: mathjax
---

I teach Discrete Math every semester. Each time I really want to go deep into generating function, but I can't. So I often tell my students the only generating function they really need to know is this very boring one for $a_n=1$ for  all $n$ $$\frac{1}{1-x}=1+x + x^2 +x^3+\cdots.$$ Today let's have fun playing with it, by, well, just flipping it.

## Odd Compositions and Even Compositions

After flipping $\frac{1}{1-x}$, you will get, obviously,
$$
\frac{1}{\frac{1}{1-x}} =1-x.
$$
Well that is easy and straightforward. How about the other way to write $\frac{1}{1-x}$? We have

\begin{align}
1-x=\frac{1}{\frac{1}{1-x}}&= \frac{1}{1+x+ x^2+ x^3\cdots}\\\\
&= \frac{1}{1- (-x -x^2 - x^3 -\cdots)}\\\\
&= 1+ (-x -x^2 - x^3 -\cdots) + (-x -x^2 - x^3 -\cdots)^2 +(-x -x^2 - x^3 -\cdots)^3\cdots
\end{align}

We collect all the similar terms and observe what we get, e.g., $x^5=x^{2 + 3}= x^{3+2}$, the factors are extract from $(-x- x^2 - x^3-\cdots)^2$, where the exponent "2" means we "split" our number "5" into two parts. Note that the order matters $5=2+3=3+2$ are view as two different ways of splitting. This notion of splitting a number into parts is called [composition](https://en.wikipedia.org/wiki/Composition_(combinatorics)). 
Further more, we call a composition even (odd) if the composition has even (odd) parts, respectively.

**Observation**:

- Every even composition contributes "+1" to the coefficient. 
- Every odd composition contributes "-1" to the coefficient.
- All the coefficient for $x^n$, where $n>2$, vanishes.

So the equation
\begin{align}
1-x= 1+ (-x -x^2 - x^3 -\\cdots) + (-x -x^2 - x^3 -\\cdots)^2 +(-x -x^2 - x^3 -\\cdots)^3\\cdots
\end{align}
actually says for any $n>2$, there are equal number of even compositions and odd compositions. 

## Another Proof

We can also proof the above fact by the standard "[stars and bars](https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics))" trick. To decompose a number $n$ into $k$ parts, we place $k-1$ bar into the $n-1$ gaps of $n$ stars. Also note that 
\begin{equation*}
  \sum_{k\ \text{odd}} \binom{n}{k} = \sum_{k\ \text{even}} \binom{n}{k}
\end{equation*}
For $n>=1$.So for $n-1>=1$, i.e., $n>=2$, we have the number of even composition equals to odd composition. The proof of the equation above is yet another question I like to ask my students. You can either prove it [by binomial theorem](https://math.stackexchange.com/questions/483457/the-number-of-odd-size-subsets-is-equal-to-the-number-of-even-size-subsets) or by constructing a bijection between the even subsets and odd subsets of $[n]$. I prefer the latter often, especially when I talk about combinatorial proofs. 

## Further Reading

Composition is not to be confused with partition (order does not matter), which is a more interesting subject. The even partition and the odd partition has a more [complicated relation](https://math.stackexchange.com/questions/92191/identity-involving-partitions-of-even-and-odd-parts). Partition is a fascinating subject in combinations and number theory. I will read/write more about it, just for fun.


