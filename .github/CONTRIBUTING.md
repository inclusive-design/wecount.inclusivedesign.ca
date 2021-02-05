# Contributing

## Feature Requests and Bug Reports

To request a feature or report a bug, [open an issue](https://github.com/inclusive-design/wecount.inclusivedesign.ca/issues/new/choose)
with the appropriate template. Please make sure to fill out all of the template details so that the feature request or
bug report can be properly evaluated and triaged.

## Pull Requests

We do all of our work in branches. If you are starting work on a new feature or bug fix, create a new branch from [dev][dev]:

```bash
git checkout dev
git checkout -b your-branch-name
```

Give your branch a descriptive name:

- For a new feature, call it `feat/description-of-feature`
- For a bug fix, call it `fix/description-of-bug`

When committing your changes, use [Conventional Commits](https://conventionalcommits.org/). Your commits will be automatically
[linted](https://github.com/inclusive-design/wecount.inclusivedesign.ca#how-to-lint);
you must address any linting errors before submitting a pull request.

When your work is complete, open a pull request against the [dev][dev] branch:

- The title of the pull request is in the format of `<type>: <description> (resolves <issue-id>)`
  - For example, for a new feature that resolves the issue id #1, the title is `feat: description of the feature (resolves #1)`. This makes sure the issue id(s) is included in the commit history for easy access in the future.
- Please make sure to fill out the pull request template.

We merge all pull requests using [squash commits](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges#squash-and-merge-your-pull-request-commits).

## Milestones and Releases

Issues and their corresponding pull requests will be assigned to a milestone by the development team. Once all
of the issues in a given milestone have been resolved, the development team will close the milestone and merge the [dev][dev]
branch into [main][main].
A release will then be tagged and a changelog generated, as follows:

- For [patch releases](https://semver.org/#spec-item-6), you can tag the release and generate a changelog by
running `npm run release:patch`
- For [minor releases](https://semver.org/#spec-item-7), you can tag the release and generate a changelog by
running `npm run release:minor`
- For [major releases](https://semver.org/#spec-item-8), you can tag the release and generate a changelog by
running `npm run release:major`

Only at this point will the changes in that release be [deployed to the production site](https://github.com/inclusive-design/wecount.inclusivedesign.ca#how-to-deploy).

[dev]: https://github.com/inclusive-design/wecount.inclusivedesign.ca/tree/dev
[main]: https://github.com/inclusive-design/wecount.inclusivedesign.ca/tree/main
