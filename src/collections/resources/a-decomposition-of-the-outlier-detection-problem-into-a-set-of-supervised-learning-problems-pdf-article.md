---
title: "A Decomposition of the Outlier Detection Problem into a Set of Supervised Learning Problems"
focus: "Methods or Design"
source: "Machine Learning Journal"
readability: ["Expert"]
type: "PDF Article"
openSource: false
sharePointUrl: "https://ocaduniversity.sharepoint.com/teams/Team_WeCount/Shared%20Documents/Resources%20and%20Tools/Literature%20(curated)/A%20decomposition%20of%20the%20outlier%20detection%20problem%20into%20a%20set%20of%20supervised%20learning%20problems.pdf"
keywords: ["Outlier detection","Machine learning","Outlier explanations"]
learnTags: ["dataset","dataTools","solution"]
summary: "A discussion of the use of an attribute-wise learning for scoring outliers (ALSO) approach to manage outlier data and a comparison of this method to classic methods of outlier detection. "
---
Outlier detection methods automatically identify instances that deviate from themajority of the data. In this paper, we propose a novel approach for unsupervised out-lier detection, which re-formulates the outlier detection problem in numerical data as aset of supervised regression learning problems. For each attribute, we learn a predictivemodel which predicts the values of that attribute from the values of all other attributes, andcompute the deviations between the predictions and the actual values. From those devi-ations, we derive both a weight for each attribute, and a final outlier score using thoseweights. The weights help separating the relevant attributes from the irrelevant ones, andthus make the approach well suitable for discovering outliers otherwise masked in high-dimensional data. An empirical evaluation shows that our approach outperforms existingalgorithms, and is particularly robust in datasets with many irrelevant attributes. Further-more, we show that if a symbolic machine learning method is used to solve the individuallearning problems, the approach is also capable of generating concise explanations for thedetected outliers.
