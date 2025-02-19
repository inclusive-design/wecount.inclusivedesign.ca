---
title: The Disparate Effects of Strategic Manipulation
focus: Methods or Design
source: FAT 2019
readability:
  - Expert
type: Website Article
openSource: false
link: https://arxiv.org/abs/1808.08646
keywords: []
learnTags:
  - methods
  - fairness
  - machineLearning
summary: "An article that shows how classification models in machine learning
  can reinforce existing inequalities and how attempts to intervene in the
  learning model to correct this response can lead to further social adversity.
  "
---
When consequential decisions are informed by algorithmic input, individuals may feel compelled to alter their behavior in order to gain a system's approval. Models of agent responsiveness, termed "strategic manipulation," analyze the interaction between a learner and agents in a world where all agents are equally able to manipulate their features in an attempt to "trick" a published classifier. In cases of real world classification, however, an agent's ability to adapt to an algorithm is not simply a function of her personal interest in receiving a positive classification, but is bound up in a complex web of social factors that affect her ability to pursue certain action responses. In this paper, we adapt models of strategic manipulation to capture dynamics that may arise in a setting of social inequality wherein candidate groups face different costs to manipulation. We find that whenever one group's costs are higher than the other's, the learner's equilibrium strategy exhibits an inequality-reinforcing phenomenon wherein the learner erroneously admits some members of the advantaged group, while erroneously excluding some members of the disadvantaged group. We also consider the effects of interventions in which a learner subsidizes members of the disadvantaged group, lowering their costs in order to improve her own classification performance. Here we encounter a paradoxical result: there exist cases in which providing a subsidy improves only the learner's utility while actually making both candidate groups worse-off--even the group receiving the subsidy. Our results reveal the potentially adverse social ramifications of deploying tools that attempt to evaluate an individual's "quality" when agents' capacities to adaptively respond differ.