---
layout: post
title: Testing MathJax
tags: mathjax
math: true
date: 2020-10-02 15:32 +0800
---
Not Pure Poole supports [MathJax](https://www.mathjax.org/). You can enable it on a page by setting `math: true` in the front matter.

An inline math: \\\(E=mc^2\\\).

A display math:

$$
i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m}
\frac{\partial^2 \Psi}{\partial x^2} + V \Psi
$$

![fig](../_figs/bg.jpeg)

<!-- # Hello

This is the body of the text

Figure is below...

```latex {cmd=true hide=true}
\documentclass{standalone}
\usepackage{tikz}
\usetikzlibrary{matrix}
\begin{document}
\begin{tikzpicture}
  \matrix (m) [matrix of math nodes,row sep=3em,column sep=4em,minimum width=2em]
  {
     F & B \\
      & A \\};
  \path[-stealth]
    (m-1-1) edge node [above] {$\beta$} (m-1-2)
    (m-1-2) edge node [right] {$\rho$} (m-2-2)
    (m-1-1) edge node [left] {$\alpha$} (m-2-2);
\end{tikzpicture}
\end{document}
``` -->
