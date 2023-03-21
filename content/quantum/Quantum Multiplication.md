---
title: Quantum Multiplication
date: '2023-03-20'
math: mathjax
slug: en/qmul
---

## Classical Multiplication

A very good review and renewal of the [classical multiplication algorithms](https://ivv5hpp.uni-muenster.de/u/cl/WS2007-8/mult.pdf). 


## Reports on the Quantum multiplication algorithms

- A [tailed recursive implementation](https://www.quantamagazine.org/a-new-approach-to-multiplication-opens-the-door-to-better-quantum-computers-20190424/) of Karatruba algorithm, that gives hope to implement in quantum computers.
    
    In this article the reporter discussed why implementing recursive quantum algorithms is difficult, because information cannot be destroyed. However, there are clever algorithms that just move information along, like the FFT butterfly structure.
    
    > But the same feature that makes quantum computers powerful makes them fragile. Because the qubits are entangled, you can’t change a few of them without affecting all the others. That makes it impossible to selectively erase information the way a classical computer can. Tossing away qubits is like snipping strands in a spider’s web — even a single snip can unravel the whole thing.
    > 
    
    And that is exactly the thing I did when I manipulate CRN/PP. I think I will have a good chance of doing something in this field.
    
- [Multiplication with Quiskit](https://quantumcomputinguk.org/tutorials/multiplication-on-quantum-computers-with-qiskit). Now we really just know how to do one single-digit multiplication.
- [Improved reversible and quantum circuits for Karatsuba-based integer multiplication](https://arxiv.org/pdf/1706.03419.pdf)
- [Fixed bit circuit for multiplication.](https://www.researchgate.net/figure/Example-of-the-proposed-quantum-integer-multiplication-circuit-for-the-multiplication-of_fig1_352280608)
