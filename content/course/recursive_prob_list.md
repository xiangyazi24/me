---
title: "List of Recursive Functions/Problems"
date: "2024-01-24"
slug: ""
math: mathjax
---

One of students asked me to give him more problems to work on to learn recursion. I don't know why I could not think of any off top of my head. Maybe because I was tired after a long lecture! Here are some problems as requested. Ranked increasingly by their difficulty.

1. [Euclidean algorithm and Extended Euclidean algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm). One might say its faster to just do loops. But it is indeed a good problem on recursion anyway. 
2. [Exponentiation by squaring](https://en.wikipedia.org/wiki/Exponentiation_by_squaring) (The Successive Squaring Algorithm) for modular arithmetic.
3. Catalan number Recurrence. $C_0=0$ and $C_{n+1}=\displaystyle\sum_{i=0}^{n}C_i C_{n-i}$ for $n\geq 0$. And many other recurrence about Catalan number.
4. [Derangement](https://en.wikipedia.org/wiki/Derangement). My personal favorite recursion and counting problem. $D(n)=(n-1)\cdot(D(n-1)+ D(n-2))$. 
5. [Variation of Hanoi Tower Problems](http://www.cut-the-knot.org/recurrence/BiColorHanoi.shtml). Bi-color[[pdf](https://rmm.ludus-opuscula.org/PDF_Files/Chaugule_BicolorHanoi_37_48(4_2015)_low.pdf)], 3-color, and more.  
6. [Colin Mallows's Recurrence on Golomb sequence](https://en.wikipedia.org/wiki/Golomb_sequence). $a(1) = 1$; $a(n+1) = 1 + a(n + 1 - a(a(n)))$. I had had a lot of fun deriving this recurrence. It lied somewhere in my old notes. I should share it some day. I don't have the trick to do the asymptotic analysis as Colin Mallows did. He associated that with golden ratio. This will be a very interesting topic to read more about. 
