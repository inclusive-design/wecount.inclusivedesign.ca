---
title: "Fair Regression: Quantitative Definitions and Reduction-Based Algorithms"
focus: Methods or Design
source: ICML 2019
readability:
  - Expert
type: Website Article
openSource: false
sharePointUrl: https://ocaduniversity.sharepoint.com/teams/Team_WeCount/Shared%20Documents/Resources%20and%20Tools/Literature%20(curated)/Fair%20Regression-%20Quantitative%20Definitions%20and%20Reduction-Based%20Algorithms.pdf
link: https://arxiv.org/abs/1905.12843
keywords: []
learnTags:
  - dataTools
  - methods
  - inclusivePractice
  - smallData
  - solution
summary: "As machine learning touches increasingly critical aspects of our life,
  including education, healthcare, criminal justice and lending, there is a
  growing focus on ensuring that algorithms treat various subpopulations fairly.
  This paper seeks to diminish this gap by developing efficient algorithms for a
  substantially broader set of regression tasks and model classes. "
---
In this paper, we study the prediction of a realvalued target, such as a risk score or recidivism rate, while guaranteeing a quantitative notion of fairness with respect to a protected attribute such as gender or race. We call this class of problems fair regression. We propose general schemes for fair regression under two notions of fairness: (1) statistical parity, which asks that the prediction be statistically independent of the protected attribute, and (2) bounded group loss, which asks that the prediction error restricted to any protected group remain below some pre-determined level. While we only study these two notions of fairness, our schemes are applicable to arbitrary Lipschitzcontinuous losses, and so they encompass leastsquares regression, logistic regression, quantile regression, and many other tasks. Our schemes only require access to standard risk minimization algorithms (such as standard classification or least-squares regression) while providing theoretical guarantees on the optimality and fairness of the obtained solutions. In addition to analyzing theoretical properties of our schemes, we empirically demonstrate their ability to uncover fairness– accuracy frontiers on several standard datasets
