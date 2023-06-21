---
title: A Decomposition of the Outlier Detection Problem into a Set of Supervised
  Learning Problems
focus: Methods or Design
source: Machine Learning Journal
readability:
  - Expert
type: Website Article
openSource: false
link: https://link.springer.com/article/10.1007/s10994-015-5507-y
keywords:
  - Outlier detection
  - Machine learning
  - Outlier explanations
learnTags:
  - dataset
  - dataTools
  - solution
summary: "A discussion of the use of an attribute-wise learning for scoring
  outliers (ALSO) approach to manage outlier data and a comparison of this
  method to classic methods of outlier detection. "
---
Outlier detection methods automatically identify instances that deviate from the majority of the data. In this paper, we propose a novel approach for unsupervised outlier detection, which re-formulates the outlier detection problem in numerical data as aset of supervised regression learning problems. For each attribute, we learn a predictive model which predicts the values of that attribute from the values of all other attributes, and compute the deviations between the predictions and the actual values. From those deviations, we derive both a weight for each attribute, and a final outlier score using those weights. The weights help separating the relevant attributes from the irrelevant ones, and thus make the approach well suitable for discovering outliers otherwise masked in high-dimensional data. An empirical evaluation shows that our approach out performs existing algorithms, and is particularly robust in datasets with many irrelevant attributes. Further-more, we show that if a symbolic machine learning method is used to solve the individual learning problems, the approach is also capable of generating concise explanations for the detected outliers.