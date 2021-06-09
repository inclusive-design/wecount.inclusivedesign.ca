---
title: Preferences Edge Proxy Workflow
author: Joseph Scheuhammer
date: 2021-05-08T00:20:23.739Z
picture: /uploads/joshua-hoehne-xOyh9Ofp_BE-unsplash-scaled.jpg
excerpt: The development team has created a new workflow supported by the
  Personal Data Storage, or Preferences server, where the user makes
  save/retrieve requests for their preferences while on a static site.
tags:
  - workflow
---
The development team is defining the workflow supported by the Personal Data Storage, or Preferences server, where the user makes save/retrieve requests for their preferences while on a static site, such as when a user changes their UI Options (UIO) preferences and wants to save them.

The workflow describes the requests, responses, payloads and database structures needed to support static access and single sign-on workflows. It includes an OAuth2 authorization sequence where users are authenticated by a third-party single sign-on (SSO) provider, such as Google or GitHub.

![Web sequence diagram showing the series of requests and responses among UIO, the Edge Proxy server, the Preferences Server, and the Single Sign-on provider](https://raw.githubusercontent.com/klown/preferencesServer/doc-proxy-oauth2-access/doc/images/StaticAuthWorkflow.png?nf_resize=fit&w=600 "Preferences OpenID Connect Flow")

To find out more about the workflow including a step-by-step description of the diagram, visit the [GitHub page](https://github.com/klown/preferencesServer/blob/doc-proxy-oauth2-access/doc/StaticWorkflow.md).