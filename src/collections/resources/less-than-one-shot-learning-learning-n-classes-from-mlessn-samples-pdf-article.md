---
title: '"Less Than One"-Shot Learning: Learning N Classes From M<N Samples'
focus: Methods or Design
source: University of Waterloo
readability:
  - Expert
type: Website Article
openSource: false
sharePointUrl: https://ocaduniversity.sharepoint.com/teams/Team_WeCount/Shared%20Documents/Resources%20and%20Tools/Literature%20(curated)/'Less%20Than%20One'-Shot%20Learning.pdf
link: https://arxiv.org/abs/2009.08449
keywords: []
learnTags:
  - dataset
  - dataTools
  - methods
  - framework
  - machineLearning
  - smallData
summary: "A paper that discusses how deep neural networks require large training
  sets but suffer from high computational cost and long training times, and how
  training on much smaller training sets while maintaining nearly the same
  accuracy would be very beneficial.  "
---
Deep neural networks require large training sets but suffer from high computational cost and long training times. Training on much smaller training sets while maintaining nearly the same accuracy would be very beneficial. In the few-shot learning setting, a model must learn a new class given only a small number of samples from that class. One-shot learning is an extreme form of few-shot learning where the model must learn a new class from a single example. We propose the ‘less than one’-shot learning task where models must learn N new classes given only M < N examples and we show that this is achievable with the help of soft labels. We use a soft-label generalization of the k-Nearest Neighbors classifier to explore the intricate decision landscapes that can be created in the ‘less than one’-shot learning setting. We analyze these decision landscapes to derive theoretical lower bounds for separating N classes using M < N soft-label samples and investigate the robustness of the resulting systems.
