---
title: Gray's Binary Code
date: "2023-03-26"
---
 I will teach recursion and induction next week and I will use Gray's code as an example. I asked ChatGPT about it. Summary:
1. The programs ChatGPT gave are correct. But it did make a mistake: it's example test cases output does not correctly correspond to its program. The order of reflected codes and non-reflected codes were switched. I pointed that out and ChatGPT fixed it. 
2. The inductive proof it wrote misses did not discuss the adjacent codes (last one in the non-reflected codes and the first one in the reflected codes). I pointed out and ChatGPT seemed to try to fixed it but mainly just copy my words. 
3. The space complexity $O(1)$ ChatGPT claimed is not true. 

**Below is the conversation I have with ChatGPT on Gray's code.**

Person: 
- Can you recursively generate all Gray' binary code of length n and explain the code to me?

ChatGPT: 
- Sure! The Gray code is a binary numeral system where two consecutive values differ in only one bit position. To recursively generate all Gray codes of length `n`, we can use the following algorithm: 
1. If `n = 1`, the Gray code is `['0', '1']`. 
2. Otherwise, generate the Gray code of length `n-1` recursively. 
3. Reflect the Gray code of length `n-1` around its middle (i.e., reverse the order of the elements). 
4. Add a `0` prefix to each element of the reflected Gray code. 
5. Add a `1` prefix to each element of the original Gray code of length `n-1`. 
6. Concatenate the two lists obtained in steps 4 and 5 to obtain the Gray code of length `n`.

Here is the implementation of the above algorithm in Python:

```python
def gray_code(n):
    if n == 1:
        return ['0', '1']
    else:
        prev_code = gray_code(n-1)
        reflected_code = prev_code[::-1]
        zero_prefixed = [f'0{c}' for c in reflected_code]
        one_prefixed = [f'1{c}' for c in prev_code]
        return zero_prefixed + one_prefixed
```



To use this function, you can simply call `gray_code(n)` where `n` is the length of the Gray code you want to generate. For example:

```python
result = gray_code(3)
print(result)
```



This will output:

```css
['000', '001', '011', '010', '110', '111', '101', '100']
```



which are all the possible Gray codes of length 3.

Note that this algorithm has a time complexity of `O(2^n)` since it generates all possible Gray codes of length `n`.

Person: 
- Do you have a way to generate the codes with less space?

ChatGPT: 
- Yes, there is a more memory-efficient way to generate the Gray code sequence of length `n` using an iterative approach, which uses only `O(1)` extra space.

The basic idea is to start with the Gray code of length `1`, and then generate the Gray code of length `n` by iteratively inserting a new bit to the left of the previous sequence, while reflecting the previous sequence and adding a new bit to the left of the reflected sequence. This process generates all possible Gray codes of length `n` without storing all of them explicitly in memory.

Here is the implementation of the iterative algorithm in Python:

```python
def gray_code(n):
    if n == 0:
        return ['']
    
    prev_code = ['0', '1']
    for i in range(2, n+1):
        reflected_code = prev_code[::-1]
        zero_prefixed = [f'0{c}' for c in reflected_code]
        one_prefixed = [f'1{c}' for c in prev_code]
        prev_code = zero_prefixed + one_prefixed
    
    return prev_code
```



This algorithm starts by initializing the `prev_code` variable with the Gray code of length 1 (`['0', '1']`), and then generates the Gray code of length `n` by iteratively applying the steps described above.

To use this function, you can simply call `gray_code(n)` where `n` is the length of the Gray code you want to generate. For example:

```python
result = gray_code(3)
print(result)
```



This will output:

```css
['000', '001', '011', '010', '110', '111', '101', '100']
```



which are all the possible Gray codes of length 3.

Note that this algorithm has a time complexity of `O(2^n)` since it generates all possible Gray codes of length `n`. However, it only uses `O(1)` extra space, which makes it more memory-efficient than the recursive approach.

Person: 
- I felt like you need to do prev_code  in zero_prefixed = [f'0{c}' for c in reflected_code]  and reflected_code in the one_prefixed to get the order you output up there

ChatGPT: 
- You are correct! Thank you for pointing that out. The order of the lists in the concatenation step should be reversed to get the correct order of the Gray code sequence. Here is the corrected implementation:

```python
def gray_code(n):
    if n == 0:
        return ['']
    
    prev_code = ['0', '1']
    for i in range(2, n+1):
        reflected_code = prev_code[::-1]
        zero_prefixed = [f'0{c}' for c in prev_code]
        one_prefixed = [f'1{c}' for c in reflected_code]
        prev_code = zero_prefixed + one_prefixed
    
    return prev_code
```



Now, calling `gray_code(3)` will produce the expected output:

```css
['000', '001', '011', '010', '110', '111', '101', '100']
```

Person: 
- Can you write a inductive proof that the python code above indeed produces correct Gray code, i.e., the consecutive codes differ by exactly one bit.

ChatGPT: 
- Sure! Here's an inductive proof that the Python code provided earlier in our conversation indeed generates a correct Gray code sequence, where each consecutive code differs by exactly one bit:

- **Claim**: The Python code generates a correct Gray code sequence of length n, where each consecutive code differs by exactly one bit.

- **Base Case**: When n = 1, the code generates the list ['0', '1'], which is a correct Gray code sequence of length 1, where each consecutive code differs by exactly one bit.

- **Inductive Hypothesis**: Assume that the Python code generates a correct Gray code sequence of length k, where k > 1, and each consecutive code differs by exactly one bit.

- **Inductive Step**: We will show that the Python code generates a correct Gray code sequence of length k+1, where each consecutive code differs by exactly one bit.

    * First, we obtain the Gray code sequence of length k using the Python code, which we assume to be correct by the inductive hypothesis. Then, we reverse this sequence to obtain a reflected Gray code sequence of length k, which also has the property that each consecutive code differs by exactly one bit. We then add a '0' prefix to each code in the original Gray code sequence, and a '1' prefix to each code in the reflected Gray code sequence. We then concatenate these two lists to obtain a new list of codes of length 2k. This new list of codes has the property that each consecutive code differs by exactly one bit, because adding a '0' prefix to each code in the original Gray code sequence ensures that the first bit in each code changes from 0 to 1 as we go from one code to the next, while adding a '1' prefix to each code in the reflected Gray code sequence ensures that the first bit in each code changes from 1 to 0 as we go from one code to the next. Since the remaining k-1 bits in each code remain the same as we move from one code to the next, we have that each consecutive code in the new list differs by exactly one bit. Therefore, the Python code generates a correct Gray code sequence of length k+1, where each consecutive code differs by exactly one bit.

    * By the principle of mathematical induction, the claim holds for all n > 0. Therefore, the Python code provided earlier in our conversation indeed produces a correct Gray code sequence, where the consecutive codes differ by exactly one bit.

Person: 
- You should emphasize that the last code in the prev block and the first code in the reflected prev block are the same, but there are added a prefix of "0" and "1" respectively, so now in the new code they differ by one bit.

ChatGPT: 
- You're absolutely right, thank you for pointing that out! Let me clarify that part of the proof.

    * When we concatenate the list of zero-prefixed codes from the original Gray code sequence with the list of one-prefixed codes from the reflected Gray code sequence, the last code in the zero-prefixed block and the first code in the one-prefixed block are the same. However, since we add a prefix of "0" to the last code in the zero-prefixed block and a prefix of "1" to the first code in the one-prefixed block, these codes become different in the new Gray code sequence. Specifically, the last code in the zero-prefixed block becomes the first code in the new Gray code sequence, and the first code in the one-prefixed block becomes the second code in the new Gray code sequence. Since the last code in the zero-prefixed block and the first code in the one-prefixed block differ by exactly one bit (the first bit), this ensures that all consecutive codes in the new Gray code sequence differ by exactly one bit, as required.

- Thank you for bringing this to my attention, and I apologize for any confusion my previous explanation may have caused.

Person: 
- You are a little wordy. Can you give a more conciser summary?

ChatGPT: 
- Certainly! Here is a more concise summary of the inductive proof that the Python code generates a correct Gray code sequence, where each consecutive code differs by exactly one bit:
- The base case of the proof is when n = 1, and the code generates the list ['0', '1'], which is a correct Gray code sequence of length 1, where each consecutive code differs by exactly one bit.
- The inductive hypothesis is that the Python code generates a correct Gray code sequence of length k, where k > 1, and each consecutive code differs by exactly one bit.
- The inductive step involves using the previous Gray code sequence of length k to generate a new Gray code sequence of length k+1, where each consecutive code differs by exactly one bit. This is achieved by taking the previous Gray code sequence, reversing it to obtain a reflected Gray code sequence, and then adding a prefix of "0" to each code in the previous sequence, and a prefix of "1" to each code in the reflected sequence. Concatenating these two lists yields a new Gray code sequence of length 2k, where each consecutive code differs by exactly one bit due to the added prefix, as well as the fact that the previous Gray code sequence and its reflection have the property that each consecutive code differs by exactly one bit.
- By the principle of mathematical induction, the claim holds for all n > 0.

I hope this summary is helpful! Let me know if you have any further questions.

