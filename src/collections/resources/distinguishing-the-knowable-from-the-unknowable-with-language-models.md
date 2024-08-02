---
title: Distinguishing the Knowable from the Unknowable with Language Models
focus: Methods or Design
source: arXiv
readability:
  - Expert
type: Website Article
openSource: true
link: https://arxiv.org/abs/2402.03563
learnTags:
  - machineLearning
  - bias
  - ethics
  - trust
  - researchCentre
summary: A new paper by the Kempner Institute delves into LLM hallucination and
  how to better determine algorithmic uncertainty.
---
We study the feasibility of identifying epistemic uncertainty (reflecting a lack of knowledge), as opposed to aleatoric uncertainty (reflecting entropy in the underlying distribution), in the outputs of large language models (LLMs) over free-form text. In the absence of ground-truth probabilities, we explore a setting where, in order to (approximately) disentangle a given LLM's uncertainty, a significantly larger model stands in as a proxy for the ground truth. We show that small linear probes trained on the embeddings of frozen, pretrained models accurately predict when larger models will be more confident at the token level and that probes trained on one text domain generalize to others. Going further, we propose a fully unsupervised method that achieves non-trivial accuracy on the same task. Taken together, we interpret these results as evidence that LLMs naturally contain internal representations of different types of uncertainty that could potentially be leveraged to devise more informative indicators of model confidence in diverse practical settings.
