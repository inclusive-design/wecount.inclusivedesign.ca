---
title: "What’s in a Name?: Reducing Bias in Bios without Access to Protected Attributes"
focus: "Methods or Design"
source: "NAACL 2019"
readability: ["Expert"]
type: "PDF Article"
openSource: false
keywords: []
learnTags: ["bias","dataTools","methods","ethics","fairness","framework","inclusivePractice","machineLearning","solution"]
summary: "This article proposes a method for reducing bias in machine learning classifiers without relying on protected attributes. In the context of occupation classification, this method discourages a classifier from learning a correlation between the predicted probability of an individual’s occupation and a word embedding of their name.  "
---
There is a growing body of work that proposes methods for mitigating bias in machine learning systems. These methods typically rely on access to protected attributes such as race, gender, or age. However, this raises two significant challenges: (1) protected attributes may not be available or it may not be legal to use them, and (2) it is often desirable to simultaneously consider multiple protected attributes, as well as their intersections. In the context of mitigating bias in occupation classification, we propose a method for discouraging correlation between the predicted probability of an individual’s true occupation and a word embedding of their name. This method leverages the societal biases that are encoded in word embeddings, eliminating the need for access to protected attributes. Crucially, it only requires access to individuals’ names at training time and not at deployment time. We evaluate two variations of our proposed method using a large-scale dataset of online biographies. We find that both variations simultaneously reduce race and gender biases, with almost no reduction in the classifier’s overall true positive rate
