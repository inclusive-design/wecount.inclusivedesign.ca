---
title: "Semi-Supervised Discriminative Classification Robust to Sample-Outliers and Feature-Noises"
focus: "Methods or Design"
source: "IEEE"
readability: ["Expert"]
type: "PDF Article"
openSource: false
keywords: ["Linear discriminant analysis","semi-supervised learning","robust classification","feature selection","sample outlier detection","Alzheimer’s disease","Parkinson’s disease","biomarker identification","disease diagnosis","nuclear norm","regularization"]
learnTags: ["dataset","methods","disability","smallData","solution"]
summary: "A new approach for discriminative classification in disease diagnosis that is more robust against outliers and noise from this particular type of data.   "
---
Discriminative methods commonly produce models with relatively good generalization abilities. However, this advantage is challenged in real-world applications (e.g., medical image analysis problems), in which there often exist outlier data points (sample-outliers) and noises in the predictor values(feature-noises). Methods robust to both types of these deviations are somewhat overlooked in the literature. We further argue that denoising can be more effective, if we learn the model using all the available labeled and unlabeled samples, as the intrinsic geometry of the sample manifold can be better constructed using more data points. In this paper, we propose a semi-supervised robust discriminative classification method based on the least-squares formulation of linear discriminant analysis to detect sample-outliers and feature-noises simultaneously, using both labeled training and unlabeled testing data. We conduct several experiments on asynthetic, some benchmark semi-supervised learning, and two brain neurodegenerative disease diagnosis datasets (for Parkinson’s and Alzheimer’s diseases). Specifically for the application of neurodegenerative diseases diagnosis, incorporating robust machine learning methods can be of great benefit, due to the noisy nature of neuroimaging data. Our results show that our method outperforms the baseline and several state-of-the-art methods, in terms of both accuracy and the area under the ROC curve.
