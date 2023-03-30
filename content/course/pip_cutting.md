---
title: "Pip Cutting Problem"
date: "2023-03-30"
slug: "pcp"
math: mathjax
---
## Purpose
- Dynamic Programming

## Problem Statement
You can find the statement through [this link](https://www.beecrowd.com.br/judge/en/problems/view/1798). Note that you need to submit you code through Beecrowd class page for testing and also Canvas for grading.
**No ChatGPT generated codes are allowed for this task.** You can always play it for fun **after** submitting your work. 

## Some Ideas
A full solution down to the pseudo-code level will **not** be provided. Some hints:

- It is a Knapsack Problem variant. Think about how to interpret the problem with Knapsack Problem's terminology.
- But this time for each element, you can take it multiple times. It not either take it or leave it; you can "take" something and take it as many times as you can while complying the constraints. For example, in the sample input, you can take 10= 6+ 2+2, with value 3+1+1 =5, where you take element with length 2 for twice. (Note that the total length is ten, and 6+2+2 already use all the length, so you can not "take" anything anymore.) What do you have to change to the recurrence under this new condition.
- Modify the code from your previous lab on Knapsack Problem to obtain a solution for this one. 
- Think about how to make your memoization more efficient. Can you just use 1-D array(s) instead of 2-D array?
- Please find test cases through Beecrowd/UDebug.

## Submission
### Beecrowd
1. Submit/Test your code on Beecrowd class page.
### Canvas
1. Beecrowd passing screenshot. If you can not pass the tests, tell me that you cannot pass it in the submission comment.
2. You source file. I assume it just take one file. 
3. A report on the things you try and your understanding on the problem. 
    - It should be something you can read and understand after one year. Write some short introduction to help achieving that goal.
    - What is new in your solution comparing to the lab.
    - What is your understanding about the more space-efficient 1-D array implementation. 

Last Note: **You are already allowed to use a lot of other resources from previous Lab. No ChatGPT allowed for this task.**

