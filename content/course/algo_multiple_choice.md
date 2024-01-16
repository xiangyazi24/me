---
title: "Some multiple choice question"
date: "2023-12-07"
slug: "csc482"
math: mathjax
---

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~python


def is_prime(number):
    if number <= 1:
        return False
    for i in range(2, number):
        if number % i == 0:
            return False
    return True


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
