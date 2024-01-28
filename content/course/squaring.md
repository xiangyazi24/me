---
title: "Successive Squaring Algorithm"
date: "2024-01-27"
slug: ""
math: mathjax
---


The successive squaring algorithm is a method to compute large power modulo m. We are going to implement it in this post. 

# Basic Ideas
The following simple properties can guide us on developing the algorithm.

**Property 1**:
$(p \cdot q)\\% m = [(p \\% m) \cdot(q \\% m)] \\% m. $

That is , if we need to do the product of $p\cdot q$ modulo $m$, we can instead do the $p$ modulo $m$ and $q$ modulo $m$ separately, and multiply the results together. But then the result might exceed $m$, so we need to modulo $m$ for another time.

Now let's consider computing $a^b \\,\\%m$, we need the following property.

**Property 2**:

- if b is even:

$$
a^b \\ \\% m = (a ^ {\frac{b}{2}} \cdot a ^ {\frac{b}{2}}) \\% m, \quad \text{by rewriting } a ^ b
$$
$$
= ((a ^ {\frac{b}{2}} \\% m) \cdot(a ^ {\frac{b}{2}} \\% m)) \\% m, \quad \text{by property 1.}
$$

This suggests a recursive algorithm.

By now, we should be able to handle even exponents. What if $b$ is odd? Well, we just need to take one out of the $b$. That is , if $b-1$ is an even number, we can just rely on the recursive call on computing that. 

- if b is odd:

$$ a ^ b \\% m = (a \cdot(a ^ {b - 1})) \\% m = (a \\% m) \cdot(a ^ {b - 1}) \\% m $$

**Special Case**:

We will eventually reduce $b$ to 0, in which case $a^0 \equiv 1 \pmod{m}$.

# Pseudocode

By the above analysis, we can implement the function as what follows. 

```python
# Computing a^b modulo m, where b is large. 
def largePower(a, b, m):
    # Base Cases
    if (b == 0):
        return 1
    # If b is Even
    if (b % 2 == 0):
        y = largePower(a, b / 2, m)
        return (y * y) % m
    # If b is Odd
    else:
        y = a % m
        return (y * largePower(a, b - 1, m)) % m

```


# Iterative Version

We can also implement the method by loops. The iterative process has a lot to do with the **binary representation of $b$**. Consider $b=20=2^4+2^2$ or $b=10100_2$ in binary. Note that we have two $1$'s in "10100". Or we can view "$10100_2 = 10000_2 +100_2$". From right to left, we will run into the first "1" after two digits; and the second "1" after four digits. The program keeps squaring until it runs into a "1". So by the time it runs into the first "1", we have $(a^2)^2 = a^{2\times 2}= a^{2^2}$ already. By the time it runs into the second "1", we have see four digits and have been squaring four times, so we have $((((a^2))^2)^2)^2 = a^{2\times 2\times 2 \times 2}= a^{2^4}$. 

Another observation is that, each time when we see a "1", we multiply the squaring result to the output `result`. We did that twice for $b=10100$ for the two 1's. So we have `result`= $a^{2^4 + 2^2}=a^{20} = a^{10100_2}$.

```python

def largePowerIterative(a, b, m):
    result = 1
    a = a % m

    while b > 0:
        # If b is odd, multiply a with result
        if b % 2 != 0:
            result = (result * a) % m

        # b must be even now
        b = b // 2  # Use floor division to avoid float
        a = (a * a) % m

    return result

```

# Generalization
We know binary number are not so special. Now if your treat $b$ as a **ternary** number. How will you implement the algorithm?



# Test
Try a = 7, b = 327, m = 853 to see what you get. (I made up these numbers just now. You can surely make up more tests. Use [Wolfram Alpha](https://www.wolframalpha.com/) to get quick results.)


---
