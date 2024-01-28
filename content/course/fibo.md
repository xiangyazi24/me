---
title: "Computing the n-th Fibonacci Number in O(log(n)) Time"
date: "2024-01-25"
slug: "CSC482/Fibo"
math: mathjax
---

{{< table_of_contents >}}

The other day, I sent an announcement to my students about the concept of an open-ended lab, stating they could pick any problem as long as **"it wasn't as trivial as computing the $n$-th Fibonacci number"**. But is it really trivial? In the world of algorithms, even straightforward tasks like integer multiplication have spawned a range of fast algorithms, such as Karatsuba, Toom-Cook, and Schönhage-Strassen (See Wiki: [Multiplication algorithm](https://en.wikipedia.org/wiki/Multiplication_algorithm)), not to mention the [recent](https://www.quantamagazine.org/mathematicians-discover-the-perfect-way-to-multiply-20190411/) $O(n\log n)$ method for $n$- bit two numbers. As as the numbers grow, what seems fast can become slow—just think about the grade school multiplication algorithm.


# The $O(n)$ Time Complexity Is Not Good For A Number Theoretical Algorithm
Every semester, in my algorithm course I review the Big-O notations, as many people do. One thing that I always emphasize is that the [naive primary test](https://stackoverflow.com/questions/53042838/why-naive-primality-test-algorithm-is-not-polynomial) is not a **polynomial algorithm**, and it is not deemed fast. The reason is that we measure complexity of an algorithms by its input length. A number $n$ is presented in $\log(n)$ bits. A polynomial algorithms needs to be in polynomial of $\log(n)$. So, a $O(n)$ algorithm is an exponential algorithm in this sense. 

One can read more on this in [CLRS](https://en.wikipedia.org/wiki/Introduction_to_Algorithms) Chapter 31: Number - theoretic Algorithms.

<blockquote>
    In this chapter, a “large input” typically means an input containing “large integers” rather than an input containing “many integers” (as for sorting). Thus,
    we shall measure the size of an input in terms of the number of bits required to
represent that input, not just the number of integers in the input. An algorithm
with integer inputs $a_1, a_2, \cdots, a_k$ is a $\textbf{polynomial - time algorithm}$ if it runs in time
polynomial in $\log a_1, \log a_2, \cdots, \log a_k$, that is, polynomial in the lengths of its binary-encoded inputs.

</blockquote >

Now let's come back to Fibonacci number. Every semester, I use it to introduce recursion and some basic dynamic programming (memoization trick) to my students. Everyone is glad that we can avoid the naive recursive function implementation to achieve $O(n)$ time and $O(1)$ space! 

But wait! From the naive primary test we know the $O(n)$ algorithm for Fibonacci number is **not** a polynomial algorithm **with respect to the input length**. 


```python {.myclass linenos = table, hl_lines = [], linenostart = 1}


def fib_linear(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, (a + b)
    return b


```

Can we find a polynomial algorithm for computing the $n$-th Fibonacci number? Ideally in $O(\log n)$? Before we continued, we need to solve a problem: $n$-th Fibonacci number is about $O(n)$ long (Why? See this [Quora thread](https://www.quora.com/Why-is-the-nth-Fibonacci-number-about-0-694-n-bits-long) for more info. But it is not our focus here.)  It is exponentially long with respect to the input length! How can our algorithm output so long a thing in $O(\log n)$ time? Well, we can avoid this by taking a modulo just as in [Leetcode 790](https://leetcode.com/problems/domino-and-tromino-tiling/description/). In that way, every number we compute in with in fixed length, and the arithmetic operations between two numbers will not grow as $n$ grows. 


# Matrix Method

To calculate the n-th Fibonacci number efficiently, we can use a technique known as matrix exponentiation, which allows us to achieve a time complexity of O(log n). The Fibonacci sequence can be represented by a matrix. Although the matrix representation looks very scary, it is not. It is just a fancy way to pack 
the following two formula altogether.
$$
\begin{align}
&F_{n+1}= F_n + F_{n-1} \\\\ 
&F_n    = F_n
\end{align}
$$

We can rewrite it into the following. 
\\[
    \begin{bmatrix}
        F(n+1) \\\\
        F(n)
    \end{bmatrix}
=\begin{bmatrix}
        1 & 1 \\\\
        1 & 0
    \end{bmatrix}\begin{bmatrix}
        F(n) \\\\
        F(n-1)
    \end{bmatrix} 
\\]


If we denote the matrix

\\[
\begin{bmatrix}
1 & 1 \\\\
1 & 0
\end{bmatrix}
\\]

as $M$, we can express $F(n)$ as:

\\[
    \\begin{bmatrix}
        F(n) \\\\
        F(n-1)
    \\end{bmatrix}
=M^{(n-1)}
    \\begin{bmatrix}
        F(1) \\\\
        F(0)
    \\end{bmatrix}
\\]

where F(1) = 1 and F(0) = 0.

The key here is to compute $M^{(n-1)}$ efficiently. We can do this using the concept of exponentiation by squaring, which is a method where we divide the power in half at each step, squaring the result as we go along. This method reduces the number of multiplications needed to calculate $M^n$, resulting in a logarithmic time complexity. The method is not all that mysterious. I talked about the [Exponential by Squaring](https://en.wikipedia.org/wiki/Exponentiation_by_squaring) algorithm in my last post. That one is for computing modulo of large number's large exponent, which makes it a very useful algorithm in Cryptography! Here the matrix exponent computation is more of less the same. 

Since the Fibonacci numbers can grow quite large, we will use modulo $10^9 + 7$ to keep the numbers within an integer range.

Here's the Python code implementing this approach:

```python
MOD = 10**9 + 7

def matrix_multiply(A, B):
    result = [[0, 0], [0, 0]]
    for i in range(2):
        for j in range(2):
            for k in range(2):
                result[i][j] = (result[i][j] + A[i][k] * B[k][j]) % MOD
    return result

def matrix_power(matrix, n):
    result = [[1, 0], [0, 1]]  # Identity matrix
    while n > 0:
        if n % 2 == 1:
            result = matrix_multiply(result, matrix)
        matrix = matrix_multiply(matrix, matrix)
        n //= 2
    return result

def fib(n):
    if n == 0:
        return 0
    M = [[1, 1], [1, 0]]
    M_power = matrix_power(M, n - 1)
    return M_power[0][0]  # F(n) is located at the top left of the matrix

# Test the function with a sample value
print(fib(10))
```

Explanation of the code:

1. **matrix_multiply(A, B)**: Multiplies two 2x2 matrices.
2. **matrix_power(matrix, n)**: Efficiently calculates the power of a matrix to the nth power using exponentiation by squaring.
3. **fib(n)**: Calculates the n-th Fibonacci number using matrix exponentiation by calling `matrix_power` and then returning the appropriate element of the resulting matrix.

Since the exponent $n$ shrinks by half every time. This algorithm has a time complexity of O(log n), making it very efficient for large values of n, and it also handles large Fibonacci numbers by using modulo \(10^9 + 7\) to keep the numbers within the range of a 32-bit integer.

If you like recursive function better, here is the recursive version of the `matrix_power()` function. 


```python {.myclass linenos=table,hl_lines=[],linenostart=1}
def matrix_power_recursive(matrix, n):
    if n == 1:
        return matrix
    if n % 2 == 0:
        half_power = matrix_power_recursive(matrix, n // 2)
        return matrix_multiply(half_power, half_power)
    else:
        half_power = matrix_power_recursive(matrix, n // 2)
        return matrix_multiply(matrix_multiply(half_power, half_power), matrix)
```

# No Matrix, Please.
If you hate matrix and don't want to see it for like at all. You can unpack the calculation in the following way. 

The key relationship we'll use is based on the identities: 

1. $F_{2k} = F_k \cdot (2F_{k+1} − F_k)$
2. $F_{2k+1} = F_{k+1}^2 + F_k^2$

where $F_k$ is the $k$-th Fibonacci number. One can prove this by induction. But you must not be satisfied with that. Check out [this thread](https://math.stackexchange.com/questions/2248821/prove-f-n12f-n2-f-2n1) to see how to **derive** this relation. You will understand why I called this an unpack of the the matrix. (It uses the formula $M^{2n}=M^n\cdot M^n$.) The Wiki page for [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_sequence#Matrix_form) a discussion on the matrix forms. Donald Knuth also includes a section in of the chapter of his famous book series, [TAOCP](https://www-cs-faculty.stanford.edu/~knuth/taocp.html), in volume 1: Fundamental Algorithms.


These identities allow us to compute Fibonacci numbers at even and odd indices efficiently, enabling a divide-and-conquer approach similar to the matrix exponentiation method but without explicitly using matrices. **But I think the matrix method is more elegant, and easier to generalize.** You will see why I say so. 

Here's the Python code implementing this approach:

```python
MOD = 10**9 + 7

def fib_logn(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    
    # Compute F(n/2) and F(n/2 + 1)
    if n % 2 == 0:
        a = fib_logn(n // 2)
        b = fib_logn(n // 2 + 1)
        return (a * ((2 * b) - a)) % MOD  # F(2k) = F(k) * (2F(k+1) − F(k))
    else:
        a = fib_logn((n - 1) // 2)
        b = fib_logn((n - 1) // 2 + 1)
        return (a * a + b * b) % MOD  # F(2k+1) = F(k+1)^2 + F(k)^2

# Test the function with a sample value
print(fib_logn(10))
```

Explanation:

- The function `fib_logn(n)` computes the n-th Fibonacci number using the properties of Fibonacci numbers.
- If `n` is even, we compute $F_{\frac{n}{2}}$ and $F_{\frac{n}{2} + 1}$, then use the formula for $F_{2k}$.
- If `n` is odd, we compute $F_{\frac{n-1}{2}}$ and $F_{\frac{n-1}{2} + 1}$, then use the formula for $F_{2k+1}$.

The time complexity remains O(log n) due to the divide-and-conquer nature of the algorithm.

# Performance

We want to compare the three version of the implementation: recursive, iterative, and O(n)/linear version. One can find the full test code [here](/CSC482/files/fibo/fibo_test.py). 
When the test case is n=1000 and we sample every hundred. We get the following result. Several observation:

1. The linear algorithm leads until about $n=400$. Then its time consumption exceeds the other two algorithms.
2. There are some fluctuation between $n=800$ to $n=1000$ in the recursive algorithm. You won't believe it takes less time to do $n=900$ than $n=800$, right? What happen in the test is that, the jobs of calculating $n=800$ or $n=900$ do not take too much of time, and it might be comparable to the background operating system scheduling. It could be the time time we have for $n=800$ is the actually calculation time plus the scheduling time. Actually, the testing result differs time to time. I attached another testing result showing the fluctuation happening somewhere else. The way to mitigate the phenomenon? Well, just use bigger number so that the actual jobs take more time to finish, so the scheduling time become negligible. 

<img src="/CSC482/files/fibo/1000.png" alt="Upto 1000th Fibonacci Number" style="border: 2px solid  gray;">

Picture below: Random fluctuations causes by scheduling.

<img src="/CSC482/files/fibo/fluct.png" alt="Fluctuation" style="border: 2px solid  gray;">

Use bigger number: n=10,000,000. The data show that for $n$ equals to ten million, the recursive version takes 0.107 ms, while the iterative version takes 0.0997 ms, but the $O(n)$ version takes 822 ms. So the $\log(n)$ algorithms are now **8000 times more efficient** than the $O(n)$ version!

<img src="/CSC482/files/fibo/10m.png" alt="n=10,000,000" style="border: 2px solid  gray;">

# Generalization
Now we have some new fancy ways to computer Fibonacci numbers. We want to ask further questions.

1. Can we compute the $n$-th Domino-Tromino Tiling number in $O(\log(n))$ time? As we remember the [recurrence](https://xianghuang.me/course/csc482/domino-tromino/) is $f(n)= 2*f(n-1) + f(n-3)$. What is the matrix you need to use for this recurrence? 
2. For a general [Linear Recurrence Relations](https://brilliant.org/wiki/linear-recurrence-relations/), how do we compute the $n$-th number in $\log(n)$? What is the form of the matrix?

The answer is not so terrible to figure out. To help you see that. I attached the solution for the Domino-Tromino Tiling problem [here](/CSC482/files/fibo/tiling.py). I was so exciting after I asked ChatGPT wrote this up for me. (No, I did not write the code I attached.) I thought I was going to beat everyone on Leetcode. The result? Well, it only ranks me at 93.06% in time complexity! Surely I know my program will take more memory, but time? 

<img src="/CSC482/files/fibo/Leetcode.png" alt="Leetcode" style="border: 2px solid  gray;">

And what is the fastest algorithm on Leetcode then? Well, it is only the $O(n)$ algorithm. I attached in the above source code and ran a local test. Here is the result.

<img src="/CSC482/files/fibo/tiling.png" alt="Leetcode" style="border: 2px solid  gray;">

The result shows that when $n=1,000,000$, the $O(\log(n))$ algorithm takes 0.36 ms, while the $O(n)$ algorithm takes 193.8 ms. A more than 500 times different. While the Leetcode tests only tests the maximum number of $n=1000$. The number is not big enough to show the advantage of the $O(\log n)$ algorithm yet. 

# Other Methods I Tried but Failed
I know there are closed-form formula to compute Fibonacci number directly. 

\\[ F(n) = \frac{\phi^n - (1 - \phi)^n}{\sqrt{5}} \\]

where:
- $F(n)$is the nth Fibonacci number.
- $\phi$ is the golden ratio, approximately equal to $1.61803398875$.
- $n$is the position in the Fibonacci sequence.

The generating function methodology that lead to this kind of formula is a topic that I like to talk about.

However, though attempting, we cannot use the above method to get a fast computation of Fibonacci number. The reasons:
1. Floating number has errors. When $n$ becomes very large, the result you get is not correct any more. 
2. How to compute a floating number to a large exponent fast? Well, I believe one can still use the successive squaring method. But the precision of of the floating number itself determines how far you can go. 

I guess if we restrict to a finite modular, like $10^9+7$, we can pick a precision for $\phi$. So that our calculation always return correct result when we round it to the nearby integer. 

One thing I try for the domino-tromino tiling number is I found its solutions to the characterization function of the recurrence through [Wolfram Alpha](https://www.wolframalpha.com/input?i=f%28n%29%3D%3D2+*+f%28n%E2%88%921%29%2Bf%28n%E2%88%923%29%2C+f%281%29%3D%3D1%2C+f%282%29%3D%3D2%2C+f%283%29%3D%3D5). And the $n$-th tiling number $f(n)$ can be written as


\\[
f(n) = \left(\frac{1}{3} - \frac{1}{354} (1 + i \sqrt{3}) \left(\frac{3481}{2} - \frac{177 \sqrt{177}}{2}\right)^{\frac{1}{3}} - \frac{(1 - i \sqrt{3}) \left(\frac{1}{2} (59 + 3 \sqrt{177})\right)^{\frac{1}{3}}}{6 \cdot 59^{\frac{2}{3}}}\right) \left(\frac{2}{3} - \frac{1}{6} (1 - i \sqrt{3}) \left(\frac{43}{2} - \frac{3 \sqrt{177}}{2}\right)^{\frac{1}{3}} - \frac{1}{6} (1 + i \sqrt{3}) \left(\frac{1}{2} (43 + 3 \sqrt{177})\right)^{\frac{1}{3}}\right)^n 
\\]

\\[+ \left(\frac{1}{3} - \frac{1}{354} (1 - i \sqrt{3}) \left(\frac{3481}{2} - \frac{177 \sqrt{177}}{2}\right)^{\frac{1}{3}} - \frac{(1 + i \sqrt{3}) \left(\frac{1}{2} (59 + 3 \sqrt{177})\right)^{\frac{1}{3}}}{6 \cdot 59^{\frac{2}{3}}}\right) \left(\frac{2}{3} - \frac{1}{6} (1 + i \sqrt{3}) \left(\frac{43}{2} - \frac{3 \sqrt{177}}{2}\right)^{\frac{1}{3}} - \frac{1}{6} (1 - i \sqrt{3}) \left(\frac{1}{2} (43 + 3 \sqrt{177})\right)^{\frac{1}{3}}\right)^n 
\\]

\\[+ \frac{1}{59} \left(59 + \left(\frac{3481}{2} - \frac{177 \sqrt{177}}{2}\right)^{\frac{1}{3}} + \left(\frac{59}{2} (59 + 3 \sqrt{177})\right)^{\frac{1}{3}}\right) 3^{-n - 1} \left(2 + \left(\frac{43}{2} - \frac{3 \sqrt{177}}{2}\right)^{\frac{1}{3}} + \left(\frac{1}{2} (43 + 3 \sqrt{177})\right)^{\frac{1}{3}}\right)^n
\\]

Quite a monster with a mixture of algebraic numbers and complex numbers. I asked ChatGPT to generate the formula for me, too. But ChatGPT got it wrong. It is not so good at Math!

I asked ChatGPT to code the above formula into Python (Yes, it takes LaTex input pretty well). Here is the [source code](/CSC482/files/fibo/tiling_direct_complex.py). The program fails at $n=50$: it outputs 451995436 while the expected is 451995198.


# Final Remarks
1. It is quite a learning experience for me to putting this up. 
2. Teaching forces me to reflect. After so many semesters talking about the naive primary test not being polynomial, I finally realized that I did not treat the calculation of Fibonacci number in the same caliber. 
3. ChatGPT does a fantastic job. No a single line of the above code is written by me; The codes are all by ChatGPT. But it takes some extra effort to make sure it does things correctly. See the [conversation](https://chat.openai.com/share/7661c246-3825-474f-98a5-5e269380e996) I had with ChatGPT. (Please ignore that part where I asked it to help my English writing.) Of course, I read quite some other things before I talked to ChatGPT: I knew all the algorithms already from other materials and I knew all the math I need. The more you know, the more helpful ChatGPT is. 
4. The future best programming language are Math and English.

---
