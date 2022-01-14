---
title: Pluralistic Data Infrastructure
author: Antranig Basman
date: 2022-01-14T15:30:28.651Z
excerpt: The pluralistic data infrastructure supports communities in taking
  collective ownership of data that relates to them and curating its
  relationships with data from other sources.
---
The pluralistic data infrastructure supports communities in taking collective ownership of data that relates to them and curating its relationships with data from other sources.

This supports communities in presenting and explaining their own data to others, as well as supporting them when they encounter automated decision-making systems (based on AI/machine learning). A pluralistic system for data allows optimization and decision criteria to be relevant to the local context, be flexible enough to accommodate diverse and conflicting perspectives, and allows workers to protect their privacy through tracking the use which has been made of their data.

## Technical basis of the infrastructure

Our current architecture focuses on helping communities working with simply-structured tabular data, although the concepts and some of the implementation are applicable to more complex and loosely-structured data. There are two key technical dimensions to the architecture:

* Tracking the provenance of the data on a cell by cell basis, so that any community member can track the uses that have been made of their data, and also trace the ultimate source of any data that they make use of, regardless of how many hands it has passed through.
* Providing an open pipeline system that allows views of data to be assembled through filtering and transforming data held by others through pipelines which are themselves open - that is, the pipeline definitions themselves may also be freely filtered and composed either singly or in bulk

We have produced a set of tools capable of accepting data published in commonly understood formats (CSV, Excel, tabular data of other kinds) in commonly used venues (HTTP feeds, Google Sheets, github, etc) and relating them together according to the community’s chosen policies.

The core implementation is housed in the [forgiving-data](https://github.com/inclusive-design/forgiving-data) repository, which includes some sample data packages and pipelines. A live implementation can be seen in [covid-assessment-centres](https://github.com/inclusive-design/covid-assessment-centres).

## Conceptual background

Our model for the infrastructure can be related to some current directions in data science.

Criteria of fairness, accountability, and transparency (FAT) of algorithms and their outputs are discussed in [Fides: Towards a Platform for Responsible Data Science
](https://dl.acm.org/doi/pdf/10.1145/3085504.3085530>). 

The notion of data collection itself is critiqued in [What we do with data: a performative critique of data 'collection'](https://policyreview.info/articles/analysis/what-we-do-data-performative-critique-data-collection)