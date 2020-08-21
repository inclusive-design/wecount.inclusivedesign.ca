# We Count

[![License](https://img.shields.io/github/license/inclusive-design/wecount.inclusivedesign.ca?style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/dev/LICENSE.md)
[![GitHub Release](https://img.shields.io/github/v/release/inclusive-design/wecount.inclusivedesign.ca?sort=semver&style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/releases/latest)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/inclusive-design/wecount.inclusivedesign.ca/Test%20and%20build?label=github&style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/actions)
[![Netlify Status](https://img.shields.io/netlify/d63b3d00-fd5f-47d7-8e43-d09bf4e8eb4f?style=flat-square)](https://app.netlify.com/sites/wecount/deploys)

The source code for the We Count website.

The front end of the website is built with [Eleventy](https://11ty.dev/).

The website uses 2 backend APIs:

- WordPress API where WeCount team members create news, views and some site pages;
  - The production WordPress site: [https://wecount-cms.inclusivedesign.ca/](https://wecount-cms.inclusivedesign.ca/)
  - The development WordPress site: [https://wecount-dev.inclusivedesign.ca/](https://wecount-dev.inclusivedesign.ca/)
- [Airtable API](https://airtable.com/api) that serves workshop information, user comments for workshops, AI resources and
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

## How to Run

The website uses [Netlify Functions](https://functions.netlify.com/) to provide a server side endpoint that supports
the save of user comments for workshops on the "Initiatives" page. To run the website in local development mode that
supports a live reload at file changes, there are two ways to test the website with and without Netlify Functions.
The latter is easier than the former:

### Test the website with Netlify Functions

1. Follow [Netlify instructions](https://docs.netlify.com/functions/build-with-javascript/#tools) to install tools for testing
and deploying Netlify functions locally;
2. After the tool set up, using Netlify Dev as an example, run following commands:

```bash
# Due to security concerns, these environment variables are only available to WeCount team members
export AIRTABLE_API_KEY=AIRTABLE_API_KEY_VALUE
export EMAIL_FROM=EMAIL_TO_VALUE
export EMAIL_FROM_PWD=EMAIL_FROM_PWD_VALUE
export EMAIL_TO=EMAIL_TO_VALUE
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

The website will be available at [http://localhost:3000](http://localhost:64939).

### Test the website without Netlify Functions

Note that the website launched via this testing method cannot save user comments to Airtable due to the absence of the
server side save function.

```bash
# Due to security concerns, these environment variables are only available to WeCount team members
export AIRTABLE_API_KEY=WECOUNT_API_KEY
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

- TODO: [ESLint (JS)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/master/.eslintrc.js)
- [Stylelint (CSS/SCSS)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/master/stylelint.config.js)
- [MarkdownLint (Markdown)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/master/.markdownlint.json)

## How to Build

Note that the website launched via this build method cannot save user comments to Airtable due to the absence of the
server side save function.

To build a static version of the website, enter the following in your command line:

```bash
# Due to security concerns, these environment variables are only available to WeCount team members
export AIRTABLE_API_KEY=WECOUNT_API_KEY
npm run build
npx serve dist
```

The website will be available at [http://localhost:5000](http://localhost:5000)

## How to Deploy

This repository is connected to [Netlify](https://netlify.com), and commits will be automatically deployed as follows:

- Pull request #175 (for example): [https://deploy-preview-175--wecount.netlify.app](https://deploy-preview-175--wecount.netlify.app)
- Branch `dev`: [https://dev--wecount.netlify.app](https://dev--wecount.netlify.app)
- Branch `master`: [https://wecount.inclusivedesign.ca](https://wecount.inclusivedesign.ca)

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  <img alt="Creative Commons Licence" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg" />
</a>

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
