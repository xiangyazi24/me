---
title: "A Hanoi Tower Variation"
date: "2020-03-29"
slug: "teaching/hanoi"
math: mathjax
---


{{< table_of_contents >}}


It is challenging to teach students recursion, especially in an introductory course where students are not yet familiar with complex data structures. Therefore, teaching concepts like searching on a tree might be premature. I realized why we often start with the Hanoi Tower problem when introducing recursive algorithms.

It's an excellent problem for teaching because:

- It doesn't involve complex data structures.
- The problem itself is an interesting game.
- It illustrates beautiful recursive ideas.

In the past, I have used this problem to introduce recursion. I tried to add a twist by assigning them a variation of the problem as an assignment.

## The Variation

**If all moves must be between adjacent pegs (i.e., given pegs A, B, C, one cannot move directly between pegs A and C, and vice versa), how should we write the recursive function?**

Consider we want to move a tower of 'n' from a peg named “from” to another peg “to” by using the peg “aux”, that is:

```java
move(n, from, to, aux)
```

We need to ensure the condition:

```java
not (from == "A" and to == "C" or from == "C" and to == "A")
```

Or equivalently:

```java
not (aux == "B").
```

If the auxiliary peg is not B, the task is straightforward. We proceed as in the classic Hanoi Tower solution:

```java
move(n-1, from, aux, to)
moveDisk(n, from, to)
move(n-1, aux, to, from)
```

Here, `moveDisk()` function moves disk #n from “from” to “to”.

If the auxiliary peg is B, the process becomes more complex, as demonstrated below:

<img src="/CSC482/pic/Hanoi/Hanoi.webp" alt="Moving a distance of two." style="border: 2px solid  gray;">

Question arises: How can we move from A to C directly? This is where our recursive function comes into play. We assume it is correct. It is not the `moveDisk()` function where we move one disk directly and are bound by the moving rule immediately.

## Pseudo-code for the core function:

```java
move(n, from, to, aux):
  if n==0: return
  if aux!="B":
    move(n-1, from, aux, to)
    moveDisk(n, from, to)
    move(n-1, aux, to, from)
  else:
    move(n-1,from, to, aux)
    moveDisk(n, from, aux)
    move(n-1, to, from, aux)
    moveDisk(n, aux, to)
    move(n-1, from, to, aux)
```

**Java Implementation:**

```java
import java.util.Scanner;
public class Hanoi_2 {
  // Main method
  public static void main(String[] args) {
    // Create a Scanner
    Scanner input = new Scanner(System.in);
    System.out.print("Enter number of disks: ");
    int n = input.nextInt();
    // Find the solution recursively
    System.out.println("The moves are:");
    move(n, 'A', 'C', 'B');
    input.close();
  }
  
  // The method for finding the solution to move n disks
  // from fromTower to toTower with auxTower
  public static void move(int n, char from, char to, char aux) {
    // Simplified stop condition. Goes through one more recursive step
    // than the previous solution.
    if (n == 0) // Stopping condition
      return;
    if(aux!='B') {
        move(n - 1, from, aux, to);
        moveDisk(n,from, to);
        move(n - 1, aux, to, from);
    }
    else {   
        move(n-1,from, to, aux);
        moveDisk(n,from, aux);
        move(n-1,to, from, aux);
        moveDisk(n,aux,to);
        move(n-1,from, to, aux);
    }
  }
  
  public static void moveDisk(int n, char from, char to) {
    System.out.println("Move disk " + n + " from " + from + " to " + to);
  }
}
```

## Algorithm Analysis:

How many steps does it take to move a tower of n from one place to another? Before we answer this, we must consider the starting and ending points, as there are obviously two different scenarios:

1. The steps needed when the distance from source and destination is 1.
2. The steps needed when the distance is 2.

Let:

- $f(n)$ be the number of steps needed to move a tower of n when the moving distance is 1.
- $g(n)$ be the number of steps needed to move a tower of n when the moving distance is 2.

Observing the pseudo-code of the core function, we have:

\\[ f(n) = g(n-1) + f(n-1) + 1 \\]
\\[ g(n) = 3g(n-1) + 2 \\]

### Detailed Solution for $ g(n) $:

We define a new function $ h(n) = g(n) + 1 $. The recurrence relation for $ g(n)$ becomes:

\\[ h(n) - 1 = 3(h(n-1) - 1) + 2 \\]

Simplifying this gives:

\\[ h(n) = 3h(n-1) \\]

Using the base case $ h(0) = g(0) + 1 = 1 $, we find:

\\[ h(n) = 3^n \\]

Substituting back for $ g(n) $:

\\[ g(n) = h(n) - 1 \\]
\\[ g(n) = 3^n - 1 \\]

### Detailed Solution for $ f(n) $:

Using the solution for $ g(n)$, we can solve $f(n)$:

\\[ f(n) = (3^{n-1} - 1) + f(n-1) + 1 \\]

Recognizing this as a geometric series, we can express it as:

\\[ f(n) = \frac{3^n - 1}{2} \\]

### Output for $n=3$:

When $n=3$, the sequence of moves for the Hanoi Tower variation is as follows:

```plaintext
1. Move disk 1 from A to B
2. Move disk 1 from B to C
3. Move disk 2 from A to B
4. Move disk 1 from C to B
5. Move disk 1 from B to A
6. Move disk 2 from B to C
7. Move disk 1 from A to B
8. Move disk 1 from B to C
9. Move disk 3 from A to B
10. Move disk 1 from C to B
11. Move disk 1 from B to A
12. Move disk 2 from C to B
13. Move disk 1 from A to B
14. Move disk 1 from B to C
15. Move disk 2 from B to A
16. Move disk 1 from C to B
17. Move disk 1 from B to A
18. Move disk 3 from B to C
19. Move disk 1 from A to B
20. Move disk 1 from B to C
21. Move disk 2 from A to B
22. Move disk 1 from C to B
23. Move disk 1 from B to A
24. Move disk 2 from B to C
25. Move disk 1 from A to B
26. Move disk 1 from B to C
```

This sequence shows all the steps needed to move a tower of 3 disks from peg A to peg C using the variation of the rules where each move must be between adjacent pegs.



---
