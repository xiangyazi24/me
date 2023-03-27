--- 
title: "A Powerset Enumberating Algorithm"
date: "2023-03-23"
math: mathjax
---
One year when I taught Discrete Math, I assigned a Lab asking my students to enumberate the powerset of $\\{1,2,\cdots,n\\}$. There are a lot of solutions out there, either by binary counting or a standard backtracking algorithm. One can see [this link](https://afteracademy.com/blog/print-all-subsets-of-a-given-set/) to check those solutions. The backtracking algorithms basically goes through all the elements and consider taking it or not.

One of my student, Eli Exner, said he would do things differently, but need some time to work out the detail. It turned out his implement the way we would have used to enumerate the powerset. Say, let $n=4$. He would enumerate the sets as follows:

{{< block >}}
$$
    \emptyset, \{1\}, \{2\}, \{3\}, \{4\}, \{1,2\}, \{1,3\}, \{1,4\}, \{2,3\},\{2,4\}, \{3,4\}, \{1,2,3\}, \{1,2,4\}, \{1,3,4\},\{2,3,4\}, \{1,2,3,4\}
$$
{{</block >}}

That is a very natural way to enumerate the sets. Basically that is to generate all $\binom{n}{k}$ size $k$ subsets. But how to program it? Eli observed the following features of the enumeration.

1. We enumerate sets in batches of the same size. First batch, size zero (empty set);  then size one, size two, etc. 
2. The initial set of each batch is a set that packing all number together, starting from 1. For example, for the size two batch, it will start with {1,2}.
3. After listing the initial set, we will increase the last number in the set, until it heats $n$. For example, after {1,2}, we list {1,3}, and then {1,4}.
4. Once we heat $n$ in the previous step. We increase the second to the last number, and pack numbers starting from the increased number, until we have enough numbers (hit the size of the current batch). For example,  after \{1,2,4\}, we would increase the second to the last number, which is 2. Now we have 3. Starting from 3, we need to pack numbers, so we have a 4.
Therefore, we get {1,3,4}. Note that 1 remains the same, we don't touch it. After that we repeat step 3.

There is something special about the above process: why are we interested in the last number, and second to the last number etc.? What does the locations of these numbers that we are increasing mean? Eli develop this notion that he called "depth".

<div class="definition mathjax" text='Depth'>
    the
</div> 

<div class="definition mathjax" >
    
</div> 
