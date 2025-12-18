# We Count

[![License](https://img.shields.io/github/license/inclusive-design/wecount.inclusivedesign.ca?style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/dev/LICENSE.md)
[![GitHub Release](https://img.shields.io/github/v/release/inclusive-design/wecount.inclusivedesign.ca?sort=semver&style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/releases/latest)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/inclusive-design/wecount.inclusivedesign.ca/Test%20and%20build?label=github&style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/actions)
[![Netlify Status](https://img.shields.io/netlify/d63b3d00-fd5f-47d7-8e43-d09bf4e8eb4f?style=flat-square)](https://app.netlify.com/sites/wecount/deploys)

The source code for the We Count website.

The front end of the website is built with [Eleventy](https://11ty.dev/).

The website uses [Decap CMS](https://decapcms.org) to manage the following content:

- [events](src/collections/events)
- [pages](src/collections/pages)
- [news](src/collections/news)
- [initiatives](src/collections/initiatives)

## Getting Started

To contribute, please be sure to review our development processes as documented in the
[contributing](.github/CONTRIBUTING.md) guide.

To work on the project, you need to install [NodeJS and NPM](https://nodejs.org/en/download/) for your operating system.

Then, clone the project from GitHub. [Create a fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
with your GitHub account, then enter the following in your command line (make
sure to replace `your-username` with your username):

```bash
git clone https://github.com/your-username/wecount.inclusivedesign.ca.git
```

From the root of the cloned project, enter the following in your command line to install dependencies:

```bash
npm ci
```

## Content Management System (CMS)

[Decap CMS](https://decapcms.org) is a client-side React application which manages files in a git repository,
creating pull requests when new content is drafted and merging them when it is published. Access to this website's
CMS is managed via [Netlify Identity](https://docs.netlify.com/visitor-access/identity/). If you need access to the
CMS, a team administrator must invite you to create a Netlify Identity account.

### CMS Configuration

The CMS is configured via a [config.yml](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/e082fdd17c08d53fd6910f055132e3dd150fbb79/src/admin/config.yml)
file according to Decap CMS' [specifications](https://www.decapcms.org/docs/configuration-options/).
As an example, here is the configuration for the events collection, stored in [`src/collections/events`](src/collections/events):

```yaml
- name: events
  label: Events
  label_singular: Event
  folder: src/collections/events
  sortable_fields: [eventDate, title]
  slug: "{{title}}"
  preview_path: "events/{{slug}}"
  create: true
  fields:
    - label: Event Title
      name: title
      widget: string
    - label: Permanent Link
      name: permalink
      widget: string
      required: false
      hint: |-
        If you do not specify a permanent link, one will be automatically generated from the event title.
        Permalinks must have the format /events/event-title/ (the trailing slash is required).
    - label: Event Date
      name: eventDate
      widget: datetime
      time_format: false
      required: false
    - label: Cover Image
      name: coverImageUrl
      widget: image
      required: false
    - label: Cover Image Alt Text
      name: coverImageAltText
      widget: string
      required: false
    - label: Event Body
      name: body
      widget: markdown
    - label: Short Description
      name: shortDescription
      widget: markdown
      hint: The short description is shown on the Events page.
    - label: Preview Image
      name: previewImageUrl
      widget: image
      required: false
      hint: The preview image is shown on the Events page.
    - label: Preview Image Alt Text
      name: previewImageAltText
      widget: string
      required: false
```

For information on individual widgets and their configuration, see Decap CMS' [widget documentation](https://www.decapcms.org/docs/widgets/).

### Previews

Decap CMS supports [preview templates](https://www.decapcms.org/docs/customization/) for CMS content, which must be
a React component registered with the following code (the following examples are for events):

```javascript
CMS.registerPreviewTemplate("events", Event);
```

The `Event` React component is created in [src/admin/cms.js](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/main/src/admin/cms.js)
based on a technique demonstrated in [Andy Bell's Hylia Eleventy starter kit](https://github.com/hankchizljaw/hylia):

1. The site's Nunjucks templates are [precompiled](https://mozilla.github.io/nunjucks/api.html#precompiling) and copied
   to the admin directory of the built site (Eleventy [handles this here](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/dev/src/admin/admin.11ty.js)).
2. A generic [`Preview`](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/277cb52c0e7880bf400ab6f827c4b705080c9f73/src/admin/cms.js#L25-L30)
   React component accepts a data object and a Nunjucks template path, renders the Nunjucks template with the supplied
   data using [Nunjucks Slim](https://mozilla.github.io/nunjucks/getting-started.html#when-in-the-browser), and outputs
   the resulting HTML.
3. The specific [`Event`](https://github.com/greatislander/wecount.inclusivedesign.ca/blob/277cb52c0e7880bf400ab6f827c4b705080c9f73/src/admin/cms.js#L120-L142)
  React component passes the Preview component the entry object (from Decap CMS), the Nunjucks template path (relative
  to `src/_includes`), and a function which maps the entry object's data to what's needed in the Nunjucks template expects.

This approach allows the templates which Eleventy uses to render the production site to be consumed by Decap CMS and
used to generate live previews as content editors are updating content in the CMS interface.

### Testing the CMS

The CMS may be tested locally without authentication if the site is being run in development mode as documented below.
Any changes made will be immediately reflected in the file system. This is a good way of making sure that CMS functionality
behaves as expected, but content should not be edited this way under normal circumstances. Rather, content editors should
log in under their Netlify Identity accounts at <https://wecount.inclusivedesign.ca/admin/> and create content through the
CMS interface.

### Test the website

```bash
npm run start
```

The website will be available at [http://localhost:3000](http://localhost:3000).

## How to Lint

To lint JavaScript, CSS and Markdown files in the project (including JavaScript and CSS in Vue components),
enter the following in the command line:

```bash
npm run lint
```

We use the following lint configurations:

- [ESLint (JS)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/main/.eslintrc.js)
- [Stylelint (CSS/SCSS)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/main/.stylelintrc.js)
- [MarkdownLint (Markdown)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/main/.markdownlint-cli2.cjs)

## How to Build

To build and serve a static version of the website, enter the following in your command line:

```bash
npm run build
npm run serve
```

The website will be available at [http://localhost:5000](http://localhost:5000).

## How to Deploy

This repository is connected to [Netlify](https://netlify.com), and commits will be automatically deployed as follows:

- Pull request #175 (for example): [https://deploy-preview-175--wecount.netlify.app](https://deploy-preview-175--wecount.netlify.app)
- Branch `dev`: [https://dev--wecount.netlify.app](https://dev--wecount.netlify.app)
- Branch `main`: [https://wecount.inclusivedesign.ca](https://wecount.inclusivedesign.ca)

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  <img alt="Creative Commons Licence" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg" />
</a>

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
