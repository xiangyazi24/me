---
title: "Leetcode 790: Mutual Recursion"
date: "2024-01-20"
slug: "csc482/Domino-Tromino"
math: mathjax
---


{{< table_of_contents >}}


# Tiling a $2\times n$ Board with Dominoes and Trominoes

I assigned [Leetcode 790](https://leetcode.com/problems/domino-and-tromino-tiling/description/) as a Lab to my students. In this problem, we are tasked with finding the number of ways to tile a $2\times n$ board using dominoes and trominoes. Many online resources do not explain the deduction of the recurrence very well. So I decide to write one here. 


# Mutual Recursion
It will be convenient to introduce another problem $g(x)$ defined as below to help us attack the problem. 

We define two functions to represent the number of tiling configurations:

- $f(n)$: Number of ways to tile a $2\times n$ board.
- $g(n)$: Number of ways to tile a $2\times n$ board with one of the grids in the first column missing.

The phenomenon of two functions recursively call each other is called mutual recursion. In a way, the two functions help implementing each other. We will see that in a minute. 

# Recurrence Relations

The recurrence relations for $f(n)$ and $g(n)$ are derived based on the ways to cover the first column of the board:

## For $f(n)$:

1. Cover the first column with a vertically placed domino. This leaves a $2 \times (n-1)$ board.
2. Cover the first column with two horizontally placed dominoes. This leaves a $2\times (n-2)$ board.
3. Cover the first column with a tromino in two possible orientations, each leaving a configuration that fits $g(n-1)$.

This gives us the relation:

$$
f(n) = f(n-1) + f(n-2) + 2g(n-1).
$$

Or one can see the following picture for a better visualization. 

<img src="/CSC482/pic/domino-tromino/f(n).png" alt="your-image-description" style="border: 2px solid  gray;">

## For $g(n-1)$:

1. Place a domino to cover the remaining grid in the first column of a $2 \times (n-1)$ board with one grid missing. This leaves a configuration that fits $g(n-2)$.
2. Place a tromino to cover the remaining grid in the first column. This leaves a standard $2 \times (n-3)$ board.

This gives us the relation:

$$
g(n-1) = g(n-2) + f(n-3).
$$

One can consult the following picture for better understanding. 

<img src="/CSC482/pic/domino-tromino/g(n).png" alt="your-image-description" style="border: 2px solid  gray;">


## Eliminate the $g()$ function:

From the expression for $f(n)$, we can express $g(n-1)$ in terms of $f(n).$
    $$ g(n-1) = \frac{f(n) - f(n-1) - f(n-2)}{2} $$
and similarly for $g(n-2)$. 

Substituting these into the recurrence for \(g(n-1)\), we get:
    $$ \frac{f(n) - f(n-1) - f(n-2)}{2} =\frac{f(n-1) - f(n-2) - f(n-3)}{2} + f(n-3). $$

Rearranging and solving for $f(n)$, we finally get:
    \\[ f(n) = 2f(n-1) + f(n-3). \\]


## Python Implementation

 **Dynamic Programming with Memoization:**

```python
MOD = 10**9 + 7

def f_dp(n):
    if n < 3:
        return n
    if n == 3:
        return 5
    f = [0] * (n + 1)
    f[0], f[1], f[2], f[3] = 1, 1, 2, 5
    for i in range(4, n + 1):
        f[i] = (2 * f[i - 1] + f[i - 3]) % MOD
    return f[n]

# Example usage:
n = 5
print(f_dp(n))
```

# Conclusion Remarks

Don't overthink the notion of mutual recursion. It is just you find a helper to help you implement your recursive function. Or it is just a name you give to some special intermediate calculation.

I generate some of the math in markdown by ChatGPT. I would hope it can help me draw the pictures but it did not do so good a job in writing Tikz. I ended up using [Mathcha](https://www.mathcha.io/) to draw the picture I need. It is a very good online what-you-see-is-what-you-get solution for LaTex/Tikz. I highly recommend it when it comes to draw math pictures. 




