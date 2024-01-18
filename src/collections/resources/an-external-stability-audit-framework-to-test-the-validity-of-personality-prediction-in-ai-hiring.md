---
title: An External Stability Audit Framework to Test the Validity of Personality
  Prediction in AI Hiring
focus: Employment
source: arXiv
readability:
  - Expert
type: PDF Article
openSource: false
link: https://arxiv.org/pdf/2201.09151.pdf
keywords:
  - Algorithm Audit
  - Validity
  - Stability
  - Reliability
  - Hiring
  - Personality
learnTags:
  - bias
  - business
  - methods
  - employment
  - ethics
  - fairness
  - framework
  - machineLearning
  - inclusivePractice
summary: This paper offers a socio-technical framework for auditing the
  stability of algorithmic hiring systems, which is supplemented with an
  open-source software library that implements the technical components of the
  audit and can be used to conduct similar stability audits of algorithmic
  systems.
---
Automated hiring systems are among the fastest-developing of all high-stakes AI systems. Among these are algorithmic personality tests that use insights from psychometric testing, and promise to surface personality traits indicative of future success based on job seekers’ resumes or social media profiles. We interrogate the validity of such systems using stability of the outputs they produce, noting that reliability is a necessary, but not a sufficient, condition for validity. Crucially, rather than challenging or affirming the assumptions made in psychometric testing — that personality is a meaningful and measurable construct, and that personality traits are indicative of future success on the job — we frame our audit methodology around testing the underlying assumptions made by the vendors of the algorithmic personality tests themselves. Our main contribution is the development of a socio-technical framework for auditing the stability of algorithmic systems. This contribution is supplemented with an open-source software library that implements the technical components of the audit, and can be used to conduct similar stability audits of algorithmic systems. We instantiate our framework with the audit of two real-world personality prediction systems, namely Humantic AI and Crystal. The application of our audit framework demonstrates that both these systems show substantial instability with respect to key facets of measurement, and hence cannot be considered valid testing instruments.