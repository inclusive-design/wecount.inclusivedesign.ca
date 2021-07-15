---
title: Inverted Wordles
author: Cindy Li
date: 2021-05-08T00:04:54.646Z
picture: /uploads/mitchell-luo-U1Hhinvb-v4-unsplash-scaled.jpg
excerpt: Our development team has been hard at work creating a wordle tool that
  will allow users to highlight either minority or majority answers.
tags:
  - Wordle
---
When word cloud centres build wordles based on people's answers to a question, majority answers are emphasized while minority answers fade to the background. In order to make minority voices heard, the development team is building a wordle tool that allows users to have the option to flip the algorithm to highlight either the majority or minority answers.

Currently, this wordle tool includes two steps. Further development will be based on feedback.

1. People submit their answers to the question: What are three most important problems to be addressed by inclusive design?

![Submit answers to a question](/uploads/question.png)

2. The wordle is built dynamically by polling submitted answers every five seconds. By default, the less frequent words will be highlighted. When the "conventional weighting" box is checked, the more frequent words will be highlighted.

![The wordle is built dynamically by polling submitted answers every 5 seconds](/uploads/wordle.jpg)

Visit these wiki pages to learn more about the technical details:

1. [Inverted Wordle Architecture](https://wiki.fluidproject.org/display/fluid/Inverted+Wordles+Architecture)
2. [Evaluation of Word Cloud Libraries](https://wiki.fluidproject.org/display/fluid/Evaluation+of+word+cloud+libraries)
3. [The Source Code in GitHub](https://github.com/inclusive-design/inverted-wordles/)