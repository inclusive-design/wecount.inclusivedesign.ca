---
title: "Reverse‐Engineering Visualizations: Recovering Visual Encodings from
  Chart Images"
focus: Tool
source: EuroVis 2017
readability:
  - Expert
type: PDF Article
openSource: true
sharePointUrl: https://ocaduniversity.sharepoint.com/:b:/r/teams/Team_WeCount/Shared%20Documents/Resources%20and%20Tools/Literature%20(curated)/Reverse-Engineering%20Visualizations.pdf?csf=1&web=1&e=ZMdt84
keywords:
  - Create Accessible Content
  - Chart Data Extraction
  - NVDA
learnTags:
  - dataTools
  - methods
  - machineLearning
  - assistiveTechnology
  - disability
summary: "A paper that investigates how to automatically recover visual
  encodings from a chart image, primarily using inferred text elements.  "
---
We investigate how to automatically recover visual encodings from a chart image, primarily using inferred text elements. We contribute an end-to-end pipeline which takes a bitmap image as input and returns a visual encoding specification as output. We present a text analysis pipeline which detects text elements in a chart, classifies their role e.g., chart title, x-axis label, y-axis title, etc., and recovers the text content using optical character recognition. We also train a Convolutional Neural Network for mark type classification. Using the identified text elements and graphical mark type, we can then infer the encoding specification of an input chart image. We evaluate our techniques on three chart corpora: a set of automatically labeled charts generated using Vega, charts from the Quartz news website, and charts extracted from academic papers. We demonstrate accurate automatic inference of text elements, mark types, and chart specifications across a variety of input chart types.
