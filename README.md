# We Count

[![License](https://img.shields.io/github/license/inclusive-design/wecount.inclusivedesign.ca?style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/dev/LICENSE.md)
[![GitHub Release](https://img.shields.io/github/v/release/inclusive-design/wecount.inclusivedesign.ca?sort=semver&style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/releases/latest)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/inclusive-design/wecount.inclusivedesign.ca/Test%20and%20build?label=github&style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/actions)
[![Netlify Status](https://img.shields.io/netlify/d63b3d00-fd5f-47d7-8e43-d09bf4e8eb4f?style=flat-square)](https://app.netlify.com/sites/wecount/deploys)

The source code for the We Count website.

The front end of the website is built with [Eleventy](https://11ty.dev/).

The website uses [Netlify CMS](https://netlifycms.org) to manage the following content:

- [initiatives](src/collections/initiatives)
- [pages](src/collections/pages)
- [news](src/collections/news)
- [views](src/collections/views)

The website uses [Netlify Large Media](https://docs.netlify.com/large-media/overview/) for storing uploaded files with
Git LFS. Developers must install Git LFS and [consult the documentation for Netlify Large Media](https://docs.netlify.com/large-media/setup/)
to ensure that they are working properly with the Git repository locally.

The website also uses one backend API:

- [Airtable API](https://airtable.com/api) that serves user comments for initiatives, AI resources and
tools data.
  - The production table: WeCount
  - The development table: WeCount_DEV

## Getting Started

To contribute, please be sure to review our development processes as documented in the
[contributing](.github/CONTRIBUTING.md) guide.

To work on the project, you need to install [NodeJS and NPM](https://nodejs.org/en/download/) for your operating system.

Then, clone the project from GitHub. [Create a fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
with your GitHub account, then enter the following in your command line (make sure to replace `your-username` with your username):

```bash
git clone https://github.com/your-username/wecount.inclusivedesign.ca.git
```

From the root of the cloned project, enter the following in your command line to install dependencies:

```bash
npm ci
```

## Content Management System (CMS)

[Netlify CMS](https://netlifycms.org) is a client-side React application which manages files in a git repository,
creating pull requests when new content is drafted and merging them when it is published. Access to this website's
CMS is managed via [Netlify Identity](https://docs.netlify.com/visitor-access/identity/). If you need access to the
CMS, a team administrator must invite you to create a Netlify Identity account.

### CMS Configuration

The CMS is configured via a [config.yml](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/e082fdd17c08d53fd6910f055132e3dd150fbb79/src/admin/config.yml)
file according to Netlify CMS' [specifications](https://www.netlifycms.org/docs/configuration-options/).
As an example, here is the configuration for the initiatives collection, stored in [`src/collections/initiatives`](src/collections/initiatives):

```yaml
  - name: initiatives
    label: Initiatives
    label_singular: Initiative
    folder: "src/collections/initiatives"
    slug: "{{title}}"
    create: true
    fields:
      - label: "Event Title"
        name: "title"
        widget: "string"
      - label: "Event ID"
        name: "id"
        widget: "uuid"
        hint: "The ID is used to associate comments with this initiative and cannot be edited."
      - label: "Permanent Link"
        name: "permalink"
        widget: "string"
        required: false
        hint: |-
          If you do not specify a permanent link, one will be automatically generated from the event title.
          Permalinks must have the format /initiatives/event-title/ (the trailing slash is required).
      - label: "Event Date"
        name: "eventDate"
        widget: "datetime"
        time_format: false
        required: false
      - label: "Cover Image"
        name: "coverImageUrl"
        widget: "image"
        required: false
      - label: "Cover Image Alt Text"
        name: "coverImageAltText"
        widget: "string"
        required: false
      - label: "Event Body"
        name: "body"
        widget: "markdown"
      - label: "Short Description"
        name: "shortDescription"
        widget: "markdown"
        hint: "The short description is shown on the Initiatives page."
      - label: "Preview Image"
        name: "previewImageUrl"
        widget: "image"
        required: false
        hint: "The preview image is shown on the Initiatives page."
      - label: "Preview Image Alt Text"
        name: "previewImageAltText"
        widget: "string"
        required: false
```

For information on individual widgets and their configuration, see Netlify CMS' [widget documentation](https://www.netlifycms.org/docs/widgets/).

### Previews

Netlify CMS supports [preview templates](https://www.netlifycms.org/docs/customization/) for CMS content, which must be
a React component registered with the following code (the following examples are for initiatives):

```javascript
CMS.registerPreviewTemplate("initiatives", Initiative);
```

The `Initiative` React component is created in [src/admin/cms.js](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/e082fdd17c08d53fd6910f055132e3dd150fbb79/src/admin/cms.js)
based on a technique demonstrated in [Andy Bell's Hylia Eleventy starter kit](https://github.com/hankchizljaw/hylia):

1. The site's Nunjucks templates are [precompiled](https://mozilla.github.io/nunjucks/api.html#precompiling) and copied
   to the admin directory of the built site (Eleventy handles this [here](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/e082fdd17c08d53fd6910f055132e3dd150fbb79/src/admin/admin.11ty.js)).
2. A generic [`Preview`](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/e082fdd17c08d53fd6910f055132e3dd150fbb79/src/admin/cms.js#L20-L24)
   React component accepts a data object and a Nunjucks template path, renders the Nunjucks template with the supplied
   data using [Nunjucks Slim](https://mozilla.github.io/nunjucks/getting-started.html#when-in-the-browser), and outputs
   the resulting HTML.
3. The specific [`Initiative`](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/e082fdd17c08d53fd6910f055132e3dd150fbb79/src/admin/cms.js#L35-L52)
  React component passes the Preview component the entry object (from Netlify CMS), the Nunjucks template path (relative
  to `src/_includes`), and a function which maps the entry object's data to what's needed in the Nunjucks template expects.

This approach allows the templates which Eleventy uses to render the production site to be consumed by Netlify CMS and
used to generate live previews as content editors are updating content in the CMS interface.

### Testing the CMS

The CMS may be tested locally without authentication if the site is being run in development mode as documented below.
Any changes made will be immediately reflected in the file system. This is a good way of making sure that CMS functionality
behaves as expected, but content should not be edited this way under normal circumstances. Rather, content editors should
log in under their Netlify Identity accounts at <https://wecount.inclusivedesign.ca/admin/> and create content through the
CMS interface.

## How to Run

The website uses [Netlify Functions](https://functions.netlify.com/) to provide a server side endpoint that supports
the save of user comments for initiatives on the "Initiatives" page. To run the website in local development mode that
supports a live reload at file changes, there are two ways to test the website with and without Netlify Functions.
The latter is easier than the former:

### Test the website with Netlify Functions

1. Follow [Netlify instructions](https://docs.netlify.com/functions/build-with-javascript/#tools) to install tools for testing
and deploying Netlify functions locally;
2. Once the tool is set up, using Netlify Dev as an example, run following commands:

```bash
# Due to security concerns, these environment variables are only available to WeCount team members
export AIRTABLE_API_KEY=AIRTABLE_API_KEY_VALUE
export EMAIL_FROM=EMAIL_TO_VALUE
export EMAIL_FROM_PWD=EMAIL_FROM_PWD_VALUE
export EMAIL_TO_PRODUCTION=PRODUCTION_SITE_MODERATOR_EMAIL
export EMAIL_TO_DEV=DEV_SITE_MODERATOR_EMAIL
export AIRTABLE_BASE_PRODUCTION=AIRTABLE_BASE_VALUE_FOR_PRODUCTION
export AIRTABLE_BASE_DEV=AIRTABLE_BASE_VALUE_FOR_DEV

netlify dev
```

Look for this box in your console output:

```bash
   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   * Server now ready on http://localhost:64939   │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

The website will be available at [http://localhost:64939](http://localhost:64939).

Alternatively, a `.env` file can be created within the local project directory and
environment variables can be added directly to it as follows:

```env
AIRTABLE_API_KEY=AIRTABLE_API_KEY_VALUE
EMAIL_FROM=EMAIL_TO_VALUE
EMAIL_FROM_PWD=EMAIL_FROM_PWD_VALUE
EMAIL_TO_PRODUCTION=PRODUCTION_SITE_MODERATOR_EMAIL
EMAIL_TO_DEV=DEV_SITE_MODERATOR_EMAIL
AIRTABLE_BASE_PRODUCTION=AIRTABLE_BASE_VALUE_FOR_PRODUCTION
AIRTABLE_BASE_DEV=AIRTABLE_BASE_VALUE_FOR_DEV
```

(Note: `.env` is in the project's `.gitignore` file to prevent sensitive information from being accidentally
committed to git.)

If a `.env` file is used, the local development server can be started with the following command:

```bash
netlify dev
```

### Test the website without Netlify Functions

Note that the website launched via this testing method cannot save user comments to Airtable due to the absence of the
server side save function.

```bash
# Due to security concerns, these environment variables are only available to WeCount team members
export AIRTABLE_API_KEY=WECOUNT_API_KEY
export AIRTABLE_BASE_PRODUCTION=AIRTABLE_BASE_VALUE_FOR_PRODUCTION
export AIRTABLE_BASE_DEV=AIRTABLE_BASE_VALUE_FOR_DEV
npm run start
```

The website will be available at [http://localhost:3000](http://localhost:3000).

Alternatively, a `.env` file can be created within the local project directory and
environment variables can be added directly to it as follows:

```env
AIRTABLE_API_KEY=AIRTABLE_API_KEY_VALUE
AIRTABLE_BASE_PRODUCTION=AIRTABLE_BASE_VALUE_FOR_PRODUCTION
AIRTABLE_BASE_DEV=AIRTABLE_BASE_VALUE_FOR_DEV
```

(Note: `.env` is in the project's `.gitignore` file to prevent sensitive information from being accidentally
committed to git.)

If a `.env` file is used, the local development server can be started with the following command:

```bash
npm run start
```

## How to Lint

To lint JavaScript, CSS and Markdown files in the project (including JavaScript and CSS in Vue components),
enter the following in the command line:

```bash
npm run lint
```

We use the following lint configurations:

- TODO: [ESLint (JS)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/main/.eslintrc.js)
- [Stylelint (CSS/SCSS)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/main/stylelint.config.js)
- [MarkdownLint (Markdown)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/main/.markdownlint.json)

## How to Build

Note that the website launched via this build method cannot save user comments to Airtable due to the absence of the
server side save function.

To build and serve a static version of the website, enter the following in your command line:

```bash
# Due to security concerns, these environment variables are only available to WeCount team members
export AIRTABLE_API_KEY=AIRTABLE_API_KEY_VALUE
export AIRTABLE_BASE_PRODUCTION=AIRTABLE_BASE_VALUE_FOR_PRODUCTION
npm run build
npm run serve
```

The website will be available at [http://localhost:5000](http://localhost:5000).

Alternatively, a `.env` file can be created within the local project directory and
environment variables can be added directly to it as follows:

```env
AIRTABLE_API_KEY=AIRTABLE_API_KEY_VALUE
AIRTABLE_BASE_PRODUCTION=AIRTABLE_BASE_VALUE_FOR_PRODUCTION
```

(Note: `.env` is in the project's `.gitignore` file to prevent sensitive information from being accidentally
committed to git.)

If a `.env` file is used, the site can be built and served with the following commands:

```bash
npm run build
npm run serve
```

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
