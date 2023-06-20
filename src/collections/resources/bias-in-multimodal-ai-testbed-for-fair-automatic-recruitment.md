---
title: "Bias in Multimodal AI: Testbed for Fair Automatic Recruitment"
focus: Bias
source: CVPR 2020
readability:
  - Expert
type: PDF Article
openSource: false
link: https://openaccess.thecvf.com/content_CVPRW_2020/papers/w1/Pena_Bias_in_Multimodal_AI_Testbed_for_Fair_Automatic_Recruitment_CVPRW_2020_paper.pdf
learnTags:
  - machineLearning
  - bias
  - methods
  - dataset
summary: This study looks at algorithmic discrimination. The authors deployed an
  experimental framework (FairCVtest) to examine how AI-based automated hiring
  is impacted by biases presented in the training data. A dataset of 24,000
  profiles were manipulated with biases to social identities. These same biases
  were detected based not only on the manipulated information but also on the
  facial images as well.
---
The presence of decision-making algorithms in society is rapidly increasing nowadays, while concerns about their transparency and the possibility of these algorithms becoming new sources of discrimination are arising. In fact, many relevant automated systems have been shown to make decisions based on sensitive information or discriminate certain social groups (e.g. certain biometric systems for person recognition). With the aim of studying how current multimodal algorithms based on heterogeneous sources of information are affected by sensitive elements and inner biases in the data, we propose a fictitious automated recruitment testbed: FairCVtest. We train automatic recruitment algorithms using a set of multimodal synthetic profiles consciously scored with gender and racial biases. FairCVtest shows the capacity of the Artificial Intelligence (AI) behind such recruitment tool to extract sensitive information from unstructured data, and exploit it in combination to data biases in undesirable (unfair) ways. Finally, we present a list of recent works developing techniques capable of removing sensitive information from the decisionmaking process of deep learning architectures. We have used one of these algorithms (SensitiveNets) to experiment discrimination-aware learning for the elimination of sensitive information in our multimodal AI framework. Our methodology and results show how to generate fairer AIbased tools in general, and in particular fairer automated recruitment systems.