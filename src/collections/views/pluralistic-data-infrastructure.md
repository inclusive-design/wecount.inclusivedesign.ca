---
title: Pluralistic Data Infrastructure
author: Antranig Basman
date: 2022-01-14T15:30:28.651Z
picture: /uploads/we-count-logo-7.png
excerpt: The pluralistic data infrastructure supports communities in taking
  collective ownership of data that relates to them and curating its
  relationships with data from other sources.
tags:
  - Data Science
  - Data Privacy
  - AI
---
The pluralistic data infrastructure supports communities in taking collective ownership of data that relates to them and curating its relationships with data from other sources.

This supports communities in presenting and explaining their own data to others, as well as supporting them when they encounter automated decision-making systems (based on AI/machine learning). A pluralistic system for data allows optimization and decision criteria to be relevant to the local context, be flexible enough to accommodate diverse and conflicting perspectives, and allows workers to protect their privacy through tracking the use which has been made of their data.

## Conceptual background

Our model for the infrastructure can be related to some current directions in inclusive, responsible data science.

Criteria of fairness, accountability, and transparency (FAT) of algorithms and their outputs are discussed in [Fides: Towards a Platform for Responsible Data Science](https://dl.acm.org/doi/pdf/10.1145/3085504.3085530>) (Stoyanovich et al, 2017). Our architecture can be considered as an attempt to realise some aspects the "Fides" platform described there. A prerequisite of any fairness analysis of any algorithm is that the provenance of data can be accounted for, and hence any known biases in the data can be propagated. Section 5 of the paper "Operational Deployment" elaborates the distinction between coarse-grained provenance and fine-grained provenance. The display of provenance in the UI of our [map-based visualisation](https://wecount.inclusivedesign.ca/map/) (described further in the implementation section) can be considered as a bridging between *syntactic provenance* and *semantic provenance* as defined in that section.

The notion of data collection itself is critiqued in [What we do with data: a performative critique of data 'collection'](https://policyreview.info/articles/analysis/what-we-do-data-performative-critique-data-collection) (Benjamin, 2021). As our project has also remarked, the notion and framing of "data collection" inescapably determines a power structure under which data is collected. Benjamin notes that "Data collection can therefore be a site of oppression and violence, a site in need of refusal and resistance, as well as a site for building communities". Benjamin instead promotes the notion of *data compilation* as an alternative framing, relying on notions of grouping and curation, rather than making the assumption of consent through an extractive process. This is in accordance with the principles of [data feminism](https://mitpress.mit.edu/books/data-feminism) (D'Ignazio, Klein, 2020) seeking to challenge differentials of power. Our two notions of the [Open Authorial Principle](https://github.com/amb26/papers/blob/master/onward-2016/onward-2016.pdf) and the propagation of provenance are key technical elements embodying these principles.

## Technical basis of the infrastructure

Our current architecture focuses on helping communities working with simply-structured tabular data, although the concepts and some of the implementation are applicable to more complex and loosely-structured data. There are two key technical dimensions to the architecture:

* Tracking the provenance of the data on a cell by cell basis, so that any community member can track the uses that have been made of their data, and also trace the ultimate source of any data that they make use of, regardless of how many hands it has passed through.
* Providing an open pipeline system that allows views of data to be assembled through filtering and transforming data held by others through pipelines which are themselves open - that is, the pipeline definitions themselves may also be freely filtered and composed either singly or in bulk. That is, both the data and the pipelines separately satisfy the [Open Authorial Principle](https://github.com/amb26/papers/blob/master/onward-2016/onward-2016.pdf) about which we have written.

We have produced a set of tools capable of accepting data published in commonly understood formats (CSV, Excel, tabular data of other kinds) in commonly used venues (HTTP feeds, Google Sheets, github, etc) and relating them together according to the community’s chosen policies.

## Implementation and demonstration

The core implementation is housed in the [forgiving-data](https://github.com/inclusive-design/forgiving-data) repository, which includes some sample data packages and pipelines. This is a collection of JavaScript code, suitable for running on servers or browsers, which define an open pipeline format together with a set of algorithms which can run as pipeline stages. These pipelines can be freely composed, either end-to-end or via superposition, and result in tabular data together with tabular provenance tracked through the pipeline stages. A live implementation can be seen in [covid-assessment-centres](https://github.com/inclusive-design/covid-assessment-centres), which is updated up to once a day with data sourced from a [public data feed](https://covid-19.ontario.ca/assessment-centre-locations) from the Government of Ontario, which is then merged together with locally curated and synthetic data in an open data pipeline. The combined dataset, with its provenance from its three data sources fully tracked, is then rendered in a [live map-based visualisation](https://wecount.inclusivedesign.ca/map/). Clicking on a point on the map shows the provenance of its data in the bottom panel.

## Presentations on the architecture

Some presentations which have been given on the architecture:

* [Openly Authored Data Pipelines](https://wiki.fluidproject.org/download/attachments/1707985/Openly%20authored%20data%20pipelines.pdf) [](https://wiki.fluidproject.org/download/attachments/1707985/Pluralist%20Data.pdf)- This is a quite technical presentation explaining a solution to the 2nd dimension of the architecture - how one community can adopt a complete pipeline produced by another community, and interpose its own processing elements in the middle of it without needing to edit the original pipeline definition.
* [Pluralist Data](https://wiki.fluidproject.org/download/attachments/1707985/Pluralist%20Data.pdf) - A presentation to [CIFAR](https://cifar.ca/)'s [Cooperative Data Communities](https://cifar.ca/ai/ai-society/cifar-solution-networks/data-communities-for-inclusion/) (Data Communities for Inclusion) Solutions Network about our approach to pluralist data and a sketched plan for deploying a live, publicly ownable implementation of the architecture where any communities may take care of editing, publishing and hosting their own data.