# We Count

The source files for the We Count website, built with [Nuxt](https://nuxtjs.org/).

## Getting Started

To work on the project, you need install [NodeJS and NPM](https://nodejs.org/en/download/) for your operating system.

Then, clone the project from GitHub. Enter the following in your command line:

```bash
git clone https://github.com/inclusive-design/wecount.inclusivedesign.ca.git
```

From the root of the cloned project, enter the following in your command line:

```bash
npm ci
```

## How to Run

To run the website in local development mode, enter the following in your command line:

```bash
npm run dev
```

## How to Test

To lint JavaScript, CSS and Markdown files in the project (including JavaScript and CSS in Vue components),
enter the following in the command line:

```bash
npm run lint
```

## How to Build

To build a static version of the website, enter the following in your command line:

```bash
nuxt generate
```

The static website's files will be in the newly-created `dist` directory in the root of the project.

## How to Deploy

This repository is connected to [Netlify](https://netlify.com). Updating the master branch will trigger
a new build and deployment of the project to this [temporary URL](https://wecount.netlify.com/).

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  <img alt="Creative Commons Licence" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg" />
</a>

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
