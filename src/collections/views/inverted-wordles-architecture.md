---
title: Inverted Wordles
author: Cindy Li
date: 2021-05-08T00:04:54.646Z
picture: /uploads/mitchell-luo-U1Hhinvb-v4-unsplash-scaled.jpg
excerpt: Our development team has been hard at work creating an inverted Wordle
  tool that will highlight minority answers instead of majority ones when used
  with audience voting tool.
tags:
  - Wordle
---
Nowadays, when wordles and word cloud centres build wordles based on people's answers to a question, majority answers are emphasized while minority answers fade in the background. In order to make minority voices being heard, the development team is building a wordle tool that users have options to flip the algorithm to highlight either the majority or minority answers.

Currently, this wordle tool includes 2 steps below. The further development will be based on the feedback.

1. People submit their answers to a question.

![Submit answers to a question](/uploads/question.png)

2. The wordle is built dynamically by polling submitted answers every 5 seconds. By default, the less frequent words will be highlighted. When the "conventional weighting" box is checked, the more frequent words will be highlighted.

![The wordle is built dynamically by polling submitted answers every 5 seconds](/uploads/wordle.png)

Visit these wiki pages to learn more about the technical details:

1. [Inverted Wordle Architecture](https://wiki.fluidproject.org/display/fluid/Inverted+Wordles+Architecture)
2. [Evaluation of Word Cloud Libraries](https://wiki.fluidproject.org/display/fluid/Evaluation+of+word+cloud+libraries)