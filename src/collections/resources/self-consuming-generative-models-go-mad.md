---
title: Self-Consuming Generative Models Go Mad
focus: Methods or Design
source: ICLR 2024
readability:
  - Expert
type: PDF Article
openSource: true
link: https://openreview.net/pdf?id=ShjMHfmPs0
learnTags:
  - machineLearning
  - methods
  - dataset
summary: This paper concludes that without enough fresh real data in each
  generation of an autophagous loop, future generative models are doomed to have
  their quality or diversity progressively decrease.
---
Seismic advances in generative AI algorithms for imagery, text, and other data types have led to the temptation to use AI-synthesized data to train next-generation models. Repeating this process creates an autophagous (“self-consuming”) loop whose properties are poorly understood. We conduct a thorough analytical and empirical analysis using state-of-the-art generative image models of three families of autophagous loops that differ in how fixed or fresh real training data is available through the generations of training and whether the samples from previous-generation models have been biased to trade off data quality versus diversity. Our primary conclusion across all scenarios is that without enough fresh real data in each generation of an autophagous loop, future generative models are doomed to have their quality (precision) or diversity (recall) progressively decrease. We term this condition Model Autophagy Disorder (MAD), by analogy to mad cow disease, and show that appreciable MADness arises in just a few generations.
