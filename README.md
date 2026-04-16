# We Count

[![License](https://flat.badgen.net/github/license/inclusive-design/wecount.inclusivedesign.ca)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/dev/LICENSE.md)
[![GitHub Release](https://flat.badgen.net/github/release/inclusive-design/wecount.inclusivedesign.ca)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/releases/latest)
[![GitHub Workflow Status](https://flat.badgen.net/github/checks/inclusive-design/wecount.inclusivedesign.ca/)](https://github.com/inclusive-design/wecount.inclusivedesign.ca/actions)
[![Netlify Status](https://flat.badgen.net/github/checks/inclusive-design/wecount.inclusivedesign.ca/main/Cloudflare%20Pages?label=deploy)](https://wecount.inclusivedesign.ca/)

The source code for the We Count website.

The front end of the website is built with [Eleventy](https://11ty.dev/).

The website uses [Sveltia CMS](https://sveltiacms.app) to manage the following content:

- [events](src/collections/events)
- [initiatives](src/collections/initiatives)
- [pages](src/collections/pages)
- [recount](src/collections/recount)
- [resources](src/collections/resources)

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

[Sveltia CMS](https://sveltiacms.app) is a client-side Svelte application which manages files in a git repository,
creating pull requests when new content is drafted and merging them when it is published. Access to this website's
CMS is managed via the [GitHub backend](https://sveltiacms.app/en/docs/backends/github). If you need access to the
CMS, a GitHub administrator must add you to the team for this repository.

### CMS Configuration

The CMS is configured via a [config.yml](https://github.com/inclusive-design/wecount.inclusivedesign.ca/blob/main/src/admin/config.yml)
file according to Sveltia CMS' [specifications](https://sveltiacms.app/en/docs/config-basics).
As an example, here is the configuration for the recount collection, stored in [`src/collections/recount`](src/collections/recount):

```yaml
- name: recount
  label: Recount
  label_singular: Recount
  folder: src/collections/recount
  sortable_fields: [title, date]
  create: true
  i18n: false
  fields:
    - label: Title
      name: title
      widget: string
    - label: Link
      name: link
      widget: string
      hint: The link to the external news item or attached resource.
    - label: Date
      name: date
      widget: datetime
      time_format: false
      hint: The publication date of the item.
    - label: Excerpt
      name: excerpt
      widget: text
      hint: The excerpt is shown in search results.
```

For information on individual fields and their configuration, see Sveltia CMS' [fields documentation](https://sveltiacms.app/en/docs/fields).

### Previews

Sveltia CMS supports [preview styles](https://sveltiacms.app/en/docs/api/preview-styles) for CMS content. These have not
been implemented for the We Count website, but previews with generic styles are be shown.

### Testing the CMS

The CMS may be tested locally without authentication if the site is being run in development mode as documented below.
Any changes made will be immediately reflected in the file system. This is a good way of making sure that CMS functionality
behaves as expected, but content should not be edited this way under normal circumstances. Rather, content editors should
log in with their GitHub accounts at <https://wecount.inclusivedesign.ca/admin/> and create or edit content through the
CMS interface.

### Test the website

```bash
npm run start
```

The website will be available at [http://localhost:8080](http://localhost:8080).

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

This repository is connected to [Cloudflare Pages](https://pages.cloudflare.com/), and commits will be automatically
deployed as follows:

- Pull request from a branch named `my-feature` (for example): <https://my-feature.wecount.pages.dev>
- Branch `dev`: <https://dev.wecount.pages.dev>
- Branch `main`: <https://wecount.inclusivedesign.ca>

## Release Process

Changelogs and releases are handled by [release-please](https://github.com/googleapis/release-please-action). We use a modified versioning scheme based on [calendar versioning](https://calver.org/) in the form `YYYY.MM.MICRO` (where `MICRO`, the third and final number in the version, indicates a patch, starting at 0 within each month's sequence of releases).

Prior to release, commit and push a single commit to bump the version appropriately:

```
git commit --allow-empty -m "chore: prepare release

Release-As: 2026.4.2"
```

(In this example, that would be the third release for April 2026 for a given package.)

Once that commit is in the version history, release-please will update the release pull request to the new version and it can be merged.

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  <img alt="Creative Commons Licence" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg" />
</a>

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
