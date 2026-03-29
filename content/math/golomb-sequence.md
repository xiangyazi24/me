---
title: "The Sequence That Describes Itself: Golomb, Golden Ratios, and an ODE That Won't Be Tamed"
date: 2026-03-29
tags: [sequences, number-theory, ODE, golden-ratio, CRN, self-reference]
author: Xiang Huang
math: true
mathjax: true
draft: false
---

*Some objects in mathematics contain themselves. The Cantor set is made of smaller Cantor sets. The Mandelbrot set has little Mandelbrot sets nested inside it. And then there is the Golomb sequence — a sequence that, in a very precise sense, is its own description.*

<!--more-->

## A Sequence That Encodes Itself

Here is a list: 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, ...

Look at it for a moment. There is one 1, two 2s, two 3s, three 4s, three 5s, four 6s, four 7s, four 8s, four 9s, and so on. The count of how many times the number $n$ appears in the sequence is itself the $n$-th term of the sequence.

That is not a coincidence. That is the definition.

<div class="definition">

**Definition (Golomb Sequence).** The *Golomb sequence* $a(1), a(2), a(3), \ldots$ is the unique nondecreasing sequence of positive integers such that for every $n \geq 1$, the value $n$ appears exactly $a(n)$ times in the sequence, with $a(1) = 1$.

</div>

The first few values:

| $n$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $a(n)$ | 1 | 2 | 2 | 3 | 3 | 4 | 4 | 4 | 5 | 5 | 5 | 6 |

Why does such a sequence exist? And why is it unique? The answer is structural. Any nondecreasing sequence satisfying the self-describing property must grow slowly enough that the number of appearances of $n$ (which is $a(n)$) never "outruns" $n$ itself. The sequence grows roughly like $n^{0.618}$, which is sublinear — slow enough to be self-consistent. If you tried to build a self-describing sequence that grew faster, it would eventually require more copies of $n$ than there are positions available; slower, and it would run out of terms to use. The Golomb sequence is the unique fixed point of this constraint.

There is also a beautiful way to think about the structure: the sequence is its own *run-length encoding*. A "run" is a maximal block of equal values. The run of 4s has length $a(4) = 3$. The run of 6s has length $a(6) = 4$. In general, the run of $n$s has length $a(n)$. And since the runs are blocks of increasing integers, the sequence of run lengths is exactly the sequence itself. It encodes itself.

## The Recurrence, and an Independent Derivation

The self-describing property is beautiful, but it is not directly a formula. How do you actually *compute* $a(n+1)$ from earlier values? The key result is **Mallows's recurrence**:

<div class="theorem">

**Theorem (Mallows's Recurrence).** The Golomb sequence satisfies
<div>$$a(1) = 1, \qquad a(n+1) = 1 + a\!\left(n + 1 - a(a(n))\right) \quad \text{for } n \geq 1.$$</div>

</div>

This formula looks intimidating at first — it has $a$ applied three levels deep. But the logic is elegant once you see it.

The key structural fact is that **consecutive run lengths differ by at most 1**. Here is why: the run of $n$s has length $a(n)$, and the run of $(n+1)$s has length $a(n+1)$. Since $a$ is nondecreasing and increases by at most 1 at each step, consecutive values of $a$ on consecutive integers can differ by at most 1.

Now, consider position $n$ and position $n+1$ in the sequence. There are two cases.

**Case 1:** $a(n+1) = a(n)$. Positions $n$ and $n+1$ are in the same run. The value $a(n)$ appears exactly $a(a(n))$ times — that is the run length. So the run started $a(a(n))$ positions earlier. Subtracting $a(a(n))$ from $n+1$ lands us exactly at the start of the *previous* run. And the value there is $a(n) - 1 = a(n+1) - 1$, so adding 1 gives $a(n+1)$.

**Case 2:** $a(n+1) = a(n) + 1$. Position $n$ is the last element of its run, and $n+1$ is the first element of the next. The run ending at position $n$ has length $a(a(n))$, so $n - a(a(n)) + 1$ is the start of that run. Then $n + 1 - a(a(n))$ is in the run *before* that — the value there is $a(n+1) - 1$, and adding 1 recovers $a(n+1)$.

In both cases: step back by the current run length, land in the previous run, add 1. That is the recurrence.

It's satisfying to independently derive this formula — working through the same case analysis from scratch, with a proof organized around these two cases. The argument is natural once you internalize the run structure; and there is something pleasing about reconstructing classical mathematics by following the logic wherever it leads rather than looking up the answer.

Let us verify with small values. Using $a(a(1)) = a(1) = 1$:
- $a(2) = 1 + a(2 - 1) = 1 + a(1) = 2.$ ✓
- $a(3) = 1 + a(3 - a(a(2))) = 1 + a(3 - 2) = 1 + a(1) = 2.$ ✓
- $a(4) = 1 + a(4 - a(a(3))) = 1 + a(4 - 2) = 1 + a(2) = 3.$ ✓
- $a(5) = 1 + a(5 - a(a(4))) = 1 + a(5 - 3) = 1 + a(2) = 3.$ ✓

The recurrence works. But it is a deeply *unusual* recurrence — computing $a(n+1)$ requires knowing $a$ at a position that depends on the sequence itself. It is self-referential all the way down.

## The Continuous Analogue: An ODE Appears

Sequences are discrete, but analysis is continuous. Can we understand the long-run behavior of $a(n)$ by finding a smooth function that approximates it?

Let $f: [1, \infty) \to [1, \infty)$ be a smooth, increasing function approximating $a$. What equation should it satisfy?

Here is the key: the self-describing property says the value $n$ forms a run of length $a(n) \approx f(n)$. At position $m$ where $f(m) \approx n$, the value $n$ persists for about $f(n) \approx f(f(m))$ steps before increasing by 1. So the *rate of change* of $f$ at position $m$ is approximately 1 divided by the run length:

<div>$$f'(m) \approx \frac{1}{f(f(m))}.$$</div>

Taking the limit, the natural continuous analogue of the Golomb sequence satisfies the **functional-differential equation**:

<div class="theorem">

**The Golomb ODE.**
<div>$$f'(t) = \frac{1}{f(f(t))}$$</div>

</div>

<div class="remark">

This equation is genuinely exotic. It is not an ODE in the usual sense — the right-hand side depends on $f$ evaluated at $f(t)$, which is a *different* point from $t$. This makes it a functional-differential equation (more specifically, an equation with state-dependent functional composition). Such equations were studied by McKiernan in 1957, and later systematically in the context of the Golomb sequence by Pétermann and Rémy (1998, 1999).

</div>

The ODE has a natural interpretation: when $f(t)$ is large, $f(f(t))$ is much larger, so $f'(t)$ is very small. The sequence grows, but it slows down as it grows. This is qualitatively right — $a(n)$ is much less than $n$ for large $n$.

## The Golden Ratio Emerges

Here is where the analysis gets beautiful. Let us ask a simple question: does the ODE admit power-law solutions?

This is a standard technique for equations with scaling symmetry — try $f(t) = A t^\alpha$ and see what constraints arise. No prior knowledge of the answer is needed; we just substitute and see what happens.

**Left side:** $f'(t) = A \alpha \, t^{\alpha - 1}.$

**Right side:** First, $f(t) = A t^\alpha$, so $f(f(t)) = f(A t^\alpha) = A (A t^\alpha)^\alpha = A^{1+\alpha} t^{\alpha^2}.$ Then:

<div>$$\frac{1}{f(f(t))} = \frac{1}{A^{1+\alpha} t^{\alpha^2}}.$$</div>

Setting left equal to right:

<div>$$A \alpha \, t^{\alpha - 1} = \frac{1}{A^{1+\alpha} \, t^{\alpha^2}}.$$</div>

For this to hold for *all* $t > 0$, the powers of $t$ on both sides must match:

<div>$$\alpha - 1 = -\alpha^2 \qquad \implies \qquad \alpha^2 + \alpha - 1 = 0.$$</div>

Stop. Look at that equation. The positive root is:

<div>$$\alpha = \frac{-1 + \sqrt{5}}{2} = \varphi - 1 \approx 0.618$$</div>

where $\varphi = \frac{1+\sqrt{5}}{2}$ is the golden ratio. The negative root, $\alpha = -\varphi$, gives a decreasing function and is ruled out since $a(n)$ is increasing.

This is the golden ratio appearing not from any deliberate construction, but from a balance of forces — the derivative (exponent $\alpha - 1$) versus the self-composition (exponent $\alpha^2$) in the ODE. The equation $\alpha^2 + \alpha = 1$ is nothing other than the characteristic property of the golden ratio: $\varphi^2 = \varphi + 1$.

**The coefficient $A$.** Once we know $\alpha = \varphi - 1$, the coefficient condition $A^{2+\alpha} \alpha = 1$ gives, after simplification using golden ratio identities ($\varphi^2 = \varphi + 1$, $1/\varphi = \varphi - 1$):

<div>$$A = \varphi^{2 - \varphi} \approx 1.2018.$$</div>

<div class="theorem">

**Theorem (Marcus–Fine; Vardi 1992).** The Golomb sequence satisfies:
<div>$$a(n) = \varphi^{2-\varphi} \, n^{\varphi - 1} + O\!\left(\frac{n^{\varphi-1}}{\log n}\right)$$</div>
where $\varphi = \frac{1+\sqrt{5}}{2}$ is the golden ratio.

</div>

<div class="remark">

In Fibonacci sequences, $\varphi$ appears as the growth rate of a *linear* recurrence. This recurrence takes the form of adding the previous two terms.

Specifically, the sequence is given by the rule where the $n$-th term equals the sum of the previous two terms. The characteristic equation is $x^2 = x + 1$.

Here, $\varphi$ appears through a fundamentally different mechanism: the *nonlinear self-reference* of functional composition in the ODE. Same number, completely different reason.

</div>

## The Fixed Point Is $\varphi$ Itself

There is yet another way $\varphi$ appears, which I find even more striking.

Ask: at what point $p$ does the scaling solution satisfy the condition that its value equals its argument?

For the scaling solution $f(t) = \varphi^{2-\varphi} t^{\varphi - 1}$, we are looking for a *fixed point*.

Setting $\varphi^{2-\varphi} p^{\varphi-1} = p$, we get $p^{2-\varphi} = \varphi^{2-\varphi}$, and so:

<div>$$p = \varphi.$$</div>

The golden ratio is the fixed point of the scaling solution. At $t = \varphi$, the solution passes through the line $y = x$.

Why does this matter? At a fixed point, the self-referential structure of the ODE collapses completely:

<div>$$f(f(\varphi)) = f(\varphi) = \varphi.$$</div>

So the ODE at the fixed point simply reads $f'(\varphi) = 1/\varphi$. And indeed, we can check: $f_0'(\varphi) = (\varphi - 1) \cdot \varphi^{(2-\varphi) + (\varphi - 2)} = (\varphi - 1) \cdot \varphi^0 = \varphi - 1 = 1/\varphi.$ ✓

The self-reference of the sequence, the power-law growth, and the fixed point — all converge on the same number. $\varphi$ is not incidental here; it is the organizing principle of the entire structure.

## Why the ODE Cannot Be a Polynomial ODE

At this point I want to dig into something that connects the Golomb story to a broader question in dynamical systems: *can the Golomb ODE be rewritten as a polynomial ODE?*

In a polynomial ODE $\mathbf{x}'(t) = \mathbf{p}(\mathbf{x}(t))$, the right-hand side is a polynomial in the current state $\mathbf{x}(t)$ — everything evaluated at the *same* time $t$. The Golomb ODE has a fundamentally different structure: the right-hand side $1/f(f(t))$ evaluates $f$ at the point $f(t)$, which is *not* $t$ (unless we happen to be at a fixed point). This is nonlocal in time.

The answer is: **no**, the Golomb ODE cannot be reduced to any polynomial ODE in finitely many variables. Two approaches show why — and each illuminates the obstruction from a different angle.

### Approach 1: The Iterated Composition Hierarchy

Since the ODE says $f'(t) = 1/f(f(t))$, define $u(t) = f'(t)$. The ODE gives us:

<div>$$f(f(t)) = \frac{1}{u(t)}.$$</div>

Now try to differentiate to get an ODE for $u$. Let $g(t) = f^{\circ n}(t)$ denote the $n$-fold composition.

We have the zeroth composition as simply $t$.

The first composition is $f(t)$.

The second composition is $1/u(t)$.

Differentiating the identity $f(f(t)) = 1/u$:

<div>$$f'(f(t)) \cdot f'(t) = -\frac{u'}{u^2}.$$</div>

Now $f'(s) = 1/f(f(s))$ for any $s$. At $s = f(t)$, this gives $f'(f(t)) = 1/f(f(f(t))) = 1/g_3(t)$. So:

<div>

<div>$$\frac{u}{g_3} = -\frac{u'}{u^2} \qquad \implies \qquad g_3 = -\frac{u^3}{u'}.$$</div>

</div>

More generally, one can show a recurrence on the iterated compositions. From the chain rule and the ODE applied at each level, the next composition is formed from the previous two:

<div>

<div>$$g_{n+2}(t) = \frac{g_n'(t)}{g_{n+1}'(t)}.$$</div>

</div>

This generates each new composition from the previous two, but at the cost of requiring one additional derivative of $u$. Explicitly:

- The second composition is $1/u$ (requires $u$).

- The third composition is $-u^3/u'$ (requires $u, u'$).

- The fourth composition involves $u, u', u''$.

- And so on.

The system is genuinely *infinite-dimensional*: each composition $g_n$ needs derivatives of $u$ up to order $n-2$, and there is no level at which the hierarchy closes.

One might hope that differentiating the original ODE $f' = 1/f(f(t))$ gives a *new* constraint. But it does not. After differentiating both sides and substituting, we get $f'' = u'$ — which is just $(f')' = u'$, a pure tautology. Differentiating once captures no new information. The system cannot be reduced.

<div class="remark">

The recurrence above has a faint continued-fraction flavor.

Given that $\varphi$ has the simplest possible continued fraction $[1; 1, 1, 1, \ldots]$, the resonance may be more than coincidental — but tracing this thread rigorously is a different project.

</div>

### Approach 2: Taylor Expansion at the Fixed Point

The second approach is more local. At the fixed point $p = \varphi$, the nonlocality of $f(f(t))$ disappears. So let us expand $f$ as a Taylor series around $\varphi$:

<div>

<div>$$f(t) = \varphi + c_1(t - \varphi) + c_2(t - \varphi)^2 + c_3(t - \varphi)^3 + \cdots$$</div>

</div>

We already know the first coefficient is $f'(\varphi) = 1/\varphi$.

To find the second coefficient, substitute into the ODE and match terms. With $s = t - \varphi$:

<div>

<div>

<div>$$f(f(t)) = \varphi + c_1^2 s + (c_1 c_2 + c_2 c_1^2) s^2 + O(s^3)$$</div>

</div>

</div>

and

<div>

<div>$$\frac{1}{f(f(t))} = \frac{1}{\varphi} - \frac{c_1^2}{\varphi^2} s + O(s^2).$$</div>

</div>

Matching the coefficient of $s$ with the derivative $f'(t)$:

<div>

<div>$$2c_2 = -\frac{c_1^2}{\varphi^2} = -\frac{1}{\varphi^4} \qquad \implies \qquad c_2 = -\frac{1}{2\varphi^4}.$$</div>

</div>

Higher coefficients are recursively computable by the same method.

This is a *formal power series solution* at the fixed point.

But notice what this gives us: a local power series, recursively defined, with each coefficient depending on all previous ones. It does not give a polynomial ODE — there is no finite system of polynomial equations that $f$ satisfies globally. The Taylor series describes the solution near $\varphi$; the ODE itself remains irreducibly nonlocal.

<div class="remark">

Pétermann and Rémy (1999) proved rigorously that the scaling solution is analytic at its fixed point, confirming that the Taylor expansion converges in a neighborhood of $\varphi$. But the global equation remains non-polynomial.

</div>

**The conclusion:** the Golomb ODE is not in the class of polynomial dynamical systems. It is closer to a *delay differential equation* — except the delay is $f(t)$, which is itself solution-dependent, making it more exotic still. Every attempted reduction produces an infinite hierarchy that refuses to close.

## Why Analytic Combinatorics Doesn't Apply

Given how effective Flajolet and Sedgewick's *Analytic Combinatorics* framework is for sequences defined by combinatorial recursions, a natural question is: can we attack the Golomb sequence with generating functions?

The short answer is no — for reasons that are themselves illuminating.

The symbolic method requires a *combinatorial class*: a set of objects with a size function, where objects of size $n$ are built from objects of smaller size in a recursive, decomposable way. The Golomb sequence does not count objects in this sense. It is self-referential: $a(n)$ simultaneously *is* the multiplicity of $n$ *and* is determined by the structure of the whole sequence. There is no known decomposition in the Flajolet–Sedgewick sense.

Even if we ignore that and look at the ordinary generating function $F(x) = \sum_{n \geq 1} a(n) x^n$, we run into a wall. The function satisfies the identity:

<div>$$F(x) = \sum_{k \geq 1} x^{a(k)}.$$</div>

This is not a standard functional equation — the values $a(k)$ appear as *exponents*, not coefficients. And any equation encoding the self-referential recurrence would involve something like $F(F(x))$, a composition of generating functions that is far outside the algebraic/D-finite framework that the symbolic method handles.

The correct analytic framework for the Golomb sequence is the functional-differential equation — not generating functions. The sequence lives in a part of mathematics where the tools of combinatorics and the tools of analysis diverge: it is essentially a dynamical object, not a counting object.

## The Connection to CRN Theory

In my research on Chemical Reaction Networks (CRNs), systems of chemical reactions — like $A + B \to C$ — give rise to *polynomial ODEs* via the law of mass-action kinetics. If species $A$ and $B$ combine at rate $k$, the concentration dynamics are governed by $\dot{a} = -k \cdot [A][B]$, a polynomial in the concentrations. The entire class of mass-action systems produces *only* polynomial ODEs.

This is a rich and powerful class. Polynomial ODEs can compute real-valued functions, simulate arbitrary dynamical systems (under appropriate conditions), and implement analog computation. My work connects CRN computation to analog computing theory, Turing completeness, and even questions in algorithmic randomness.

But the Golomb ODE, $f'(t) = 1/f(f(t))$, is demonstrably *not* in this class. It involves functional composition — evaluating $f$ at $f(t)$ — which polynomial ODEs cannot express. No matter how many auxiliary variables you introduce, the system refuses to close into a finite polynomial system.

This is a genuine boundary. The Golomb sequence comes from a beautifully simple self-describing property, its continuous analogue is a natural ODE, and yet the ODE sits just outside the reach of mass-action CRNs. It is a concrete example of how "natural" does not always mean "polynomial."

There is something philosophically satisfying about this. The Golomb sequence describes itself — it is the fixed point of a self-referential constraint. The Golomb ODE similarly resists being captured — every attempt to pin it down in finite algebraic terms generates an infinite regress. The self-reference runs all the way through.

## Summary: A Map of the Territory

Let me collect the main points:

- The Golomb sequence is the unique nondecreasing sequence where $n$ appears exactly $a(n)$ times — it is its own run-length encoding.
- Mallows's recurrence $a(n+1) = 1 + a(n+1 - a(a(n)))$ follows from a case analysis on run transitions. It is self-referential but computable.
- The continuous analogue satisfies $f'(t) = 1/f(f(t))$, a functional-differential equation.
- Substituting the power-law ansatz $f(t) = A t^\alpha$ forces $\alpha^2 + \alpha - 1 = 0$, whose positive root is $\varphi - 1$. The golden ratio emerges from balancing derivative versus self-composition.
- The scaling solution has fixed point $p = \varphi$. At this point, the nonlocal ODE becomes local.
- The ODE cannot be reduced to a polynomial ODE: the iterated composition hierarchy is infinite-dimensional, the tautology test confirms no finite closure exists, and the Taylor expansion at $\varphi$ is local but not polynomial.
- The symbolic method from analytic combinatorics does not apply: the sequence has no natural combinatorial class and its generating function satisfies non-standard functional equations.
- The Golomb ODE sits outside the class of polynomial ODEs arising from CRN theory, providing a concrete example of a natural, well-motivated ODE that mass-action kinetics cannot generate.

The sequence began as a puzzle — something that describes itself. It ends (at least for now) as a gateway to questions about self-reference in dynamical systems, the limits of polynomial computation, and the unexpected ubiquity of $\varphi$ as an organizing principle.

---

*References: Golomb (1966), McKiernan (1957), Vardi (1992), Pétermann (1995, 1996), Pétermann–Rémy (1998), Pétermann–Rémy–Vardi (1999, 2001), Flajolet–Sedgewick (2009).*<div>
8143781437
</div><div>
81437
81437
</div><div>
8143781437
</div>