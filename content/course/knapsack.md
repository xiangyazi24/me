--- 
title: "Lab: Subset Sum Problem and Knapsack problem"
date: "2023-03-23"
math: mathjax
slug: partition_subset_sum
---
We talk about Subset Sum Problem and Knapsack Problem in our lecture. We now attack the following simple variant of Subset Sum Problem. 

## Problem: Leetcode 416 - Partition Equal Subset Sum.

**Problem Statement**: Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise.

You can find the full statement [here](https://leetcode.com/problems/partition-equal-subset-sum/description/) on Leetcode.com.

## Reduction
You might want to say this is not the version of Subset Sum we discussed in our class. True. The version we discussed has a target number $t$. Then what is the target number in this problem? Let's denote the set of number as $S$, then we let 

$$
    t =\frac{\sum_{n\in S} n}{2}. 
$$

If you can find a subset of number sum up to $t$, then the rest of the number must also sum up to $t$. Hence you partition the set into two partitions with the same sum!
This idea, turning a problem to another **solved** problem, is called reduction. We will talk about it in the coming weeks!

## Coding!
Now it is time to do some coding! This is a Lab, not an assignment. So feel free to try whatever you want to try! One very helpful link is [this](https://leetcode.com/discuss/study-guide/1152328/01-Knapsack-Problem-and-Dynamic-Programming), where people discuss the implementation of classical Knapsack Problem. Here are a few things you want to do:
1. If you haven't familiarize yourself with the *tabular method*, you can try the example there. (I was a little struggled doing the table, too.)
2. Try an implementation with 2-D array (the table!)
3. Try an implementation with 1-D array. (Scroll down and you will find people talk about it.)

In the lecture I talk about the **wavefront** of memory when you did memoization. The wavefront of the 2-D table is actually just a single line! So that is why you can improve it by using only one line (the 1-D array)!

## Submission via Canvas
1. A short report on the lab, in PDF format.
2. The codes you try.
3. A few Leetcode screenshots (Don't do too many).  


### About the Report
- Length: < 2 pages.
- Format: 
   *  Write a short description of the problem. 
   *  Attempts you try and your findings, specifically, write something about the **wavefront** idea.
   *  Any other thing you want to let me know. 


