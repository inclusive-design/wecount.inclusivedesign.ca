# We Count

[![License](https://img.shields.io/github/license/inclusive-design/wecount.inclusivedesign.ca?style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/dev/LICENSE.md)
[![GitHub Release](https://img.shields.io/github/v/release/inclusive-design/wecount.inclusivedesign.ca?sort=semver&style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/releases/latest)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/inclusive-design/wecount.inclusivedesign.ca/Test%20and%20build?label=github&style=flat-square)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/actions)
[![Netlify Status](https://img.shields.io/netlify/d63b3d00-fd5f-47d7-8e43-d09bf4e8eb4f?style=flat-square)](https://app.netlify.com/sites/wecount/deploys)

The source files for the We Count website, built with [Eleventy](https://11ty.dev/).

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

To run the website in local development mode that supports a live reload at file changes, enter the following in your
command line:

```bash
npm run start
```

## How to Test

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

To build a static version of the website, enter the following in your command line:

```bash
npm run build
```

## How to Deploy

This repository is connected to [Netlify](https://netlify.com), and commits will be automatically deployed as follows:

- Pull request #175 (for example): [https://deploy-preview-175--wecount.netlify.app](https://deploy-preview-175--wecount.netlify.app)
- Branch `dev`: [https://dev--wecount.netlify.app](https://dev--wecount.netlify.app)
- Branch `master`: [https://wecount.inclusivedesign.ca](https://wecount.inclusivedesign.ca)

## How to Deploy using Docker

This website can also be served with [Docker](https://docs.docker.com/get-docker/) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

- Build the image: `docker build -t wecount .`
- Run the container: `docker run --name wecount -p 8000:80 wecount`

The website will be available at [http://localhost:8000](http://localhost:8000)

- To stop and remove the container: `docker rm -f wecount`

If you make changes to the code, repeat the steps to build the image and start a new container.

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  <img alt="Creative Commons Licence" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg" />
</a>

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
