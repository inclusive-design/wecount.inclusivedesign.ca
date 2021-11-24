---
title: "AutoML-Zero: Evolving Machine Learning Algorithms from Scratch"
focus: "Methods or Design"
source: "ICML 2020"
readability: ["Expert"]
type: "PDF Article"
openSource: false
sharePointUrl: "https://ocaduniversity.sharepoint.com/teams/Team_WeCount/Shared%20Documents/Resources%20and%20Tools/Literature%20(curated)/AutoML-Zero_Evolving%20Machine%20Learning%20Algorithms%20from%20Scratch.pdf"
keywords: []
learnTags: ["bias","methods","machineLearning"]
summary: "A Google paper discussing AutoML, a new machine learning method to reduce bias by providing small pieces of code to allow the computer to build its own algorithms with less human input. "
---
Machine learning research has advanced in multiple aspects, including model structures and learning methods. Theeffort to automate such research, known asAutoML, has also made significant progress. However, this progresshas largely focused on the architecture of neural networks, where it has relied on sophisticated expert-designedlayers as building blocks—or similarly restrictive search spaces. Our goal is to show thatAutoMLcan go further:it is possible today to automatically discover complete machine learning algorithms just using basic mathematicaloperations as building blocks. We demonstrate this by introducing a novel framework that significantly reduceshuman bias through a generic search space. Despite the vastness of this space, evolutionary search can stilldiscover two-layer neural networks trained by backpropagation. These simple neural networks can then besurpassed by evolving directly on tasks of interest,e.g. CIFAR-10 variants, where modern techniques emerge inthe top algorithms, such as bilinear interactions, normalized gradients, and weight averaging. Moreover, evolutionadapts algorithms to different task types:e.g., dropout-like techniques appear when little data is available. Webelieve these preliminary successes in discovering machine learning algorithms from scratch indicate a promisingnew direction for the field.
