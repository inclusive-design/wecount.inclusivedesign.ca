---
title: "Image Cropping on Twitter: Fairness Metrics, their Limitations, and the
  Importance of Representation, Design, and Agency"
focus: Bias
source: arXiv
readability:
  - Expert
type: PDF Article
openSource: false
sharePointUrl: https://ocaduniversity.sharepoint.com/:b:/r/teams/Team_WeCount/Shared%20Documents/Resources%20and%20Tools/Literature%20(curated)/Image%20Cropping%20on%20Twitter.pdf?csf=1&web=1&e=EeYWkG
link: https://arxiv.org/pdf/2105.08667.pdf
keywords:
  - image cropping
  - demographic parity
  - representational harm
  - ethical HCI
  - fairness in machine learning
learnTags:
  - bias
  - business
  - methods
  - fairness
  - machineLearning
summary: To address identified issues with Twitter's saliency model used to crop
  images, the Twitter team is proposing the removal of saliency-based cropping
  in favour of a solution that better preserves user agency.
---
"Twitter uses machine learning to crop images, where crops are centered around the part predicted to be the most salient. In fall 2020, Twitter users raised concerns that the automated image cropping system on Twitter favored light-skinned over dark-skinned individuals, as well as concerns that the system favored cropping woman’s bodies instead of their heads. In order to address these concerns, we conduct an extensive analysis using formalized group fairness metrics. We find systematic disparities in cropping and identify contributing factors, including the fact that the cropping based on the single most salient point can amplify the disparities because of an effect we term argmax bias. However, we demonstrate that formalized fairness metrics and quantitative analysis on their own are insufficient for capturing the risk of representational harm in automatic cropping. We suggest the removal of saliency-based cropping in favor of a solution that better preserves user agency. For developing a new solution that sufficiently address concerns related to representational harm, our critique motivates a combination of quantitative and qualitative methods that include human-centered design."