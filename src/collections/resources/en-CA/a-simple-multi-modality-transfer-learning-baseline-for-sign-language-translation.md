---
title: A Simple Multi-Modality Transfer Learning Baseline for Sign Language
  Translation
focus: AI and Disability/Outliers
source: arXiv
readability:
  - Expert
type: PDF Article
openSource: false
link: https://arxiv.org/pdf/2203.04287.pdf
learnTags:
  - assistiveTechnology
  - methods
  - disability
  - machineLearning
  - solution
summary: This paper discusses the limitations of existing sign language data
  sets and how problems resulting from these limitations can be mitigated.
---
This paper proposes a simple transfer learning baseline for sign language translation. Existing sign language datasets (e.g. PHOENIX-2014T, CSL-Daily) contain only about 10K-20K pairs of sign videos, gloss annotations and texts, which are an order of magnitude smaller than typical parallel data for training spoken language translation models. Data is thus a bottleneck for training effective sign language translation models. To mitigate this problem, we propose to progressively pretrain the model from general-domain datasets that include a large amount of external supervision to within-domain datasets. Concretely, we pretrain the sign-to-gloss visual network on the general domain of human actions and the within-domain of a sign-to-gloss dataset, and pretrain the gloss-to-text translation network on the general domain of a multilingual corpus and the within-domain of a gloss-to-text corpus. The joint model is fine-tuned with an additional module named the visual-language mapper that connects the two networks. This simple baseline surpasses the previous state-of-the-art results on two sign language translation benchmarks, demonstrating the effectiveness of transfer learning. With its simplicity and strong performance, this approach can serve as a solid baseline for future research.