/* global chunkArray, createPagination, getUniqueTags */

const errorOverlay = require("eleventy-plugin-error-overlay");
const pluginSass = require("eleventy-plugin-sass");
const fs = require("fs");

const dataFetcherWp = require("./src/utils/data-fetcher-wp.js");
const dataFetcherAirtable = require("./src/utils/data-fetcher-airtable.js");
const htmlMinifyTransform = require("./src/transforms/html-minify.js");
const parseTransform = require("./src/transforms/parse.js");
const dateFilter = require("./src/filters/date.js");
const markdownFilter = require("./src/filters/markdown.js");
const w3DateFilter = require("./src/filters/w3-date.js");
const randomizeFilter = require("./src/filters/randomize.js");

require("./src/js/utils.js");

module.exports = function(eleventyConfig) {
	// Use .eleventyignore instead of .gitignore.
	eleventyConfig.setUseGitIgnore(false);

	// Add custom collections.
	eleventyConfig.addCollection("pages", async function() {
		return dataFetcherWp.sitePages();
	});

	eleventyConfig.addCollection("workshops", async function() {
		return dataFetcherAirtable.workshops();
	});

	eleventyConfig.addCollection("news", async function() {
		return dataFetcherWp.categorizedItems("news", 8);
	});

	eleventyConfig.addCollection("views", async function() {
		return dataFetcherWp.categorizedItems("views", 1);
	});

	eleventyConfig.addCollection("viewsTags", async function() {
		const viewsPromise = dataFetcherWp.categorizedItems("views", 1);
		return new Promise((resolve) => {
			viewsPromise.then(views => {
				resolve(getUniqueTags(views));
			});
		});
	});

	eleventyConfig.addCollection("tags", async function() {
		const tags = await dataFetcherWp.siteTags();
		const posts = await dataFetcherWp.sitePosts();
		const pageSize = 10;
		let collectionTogo = [];

		tags.map(tag => {
			const taggedPosts = posts.filter(post => {
				const postTagSlugs = post.tags.map(({slug}) => slug);
				return postTagSlugs.includes(tag.slug);
			});

			if (taggedPosts.length) {
				const postsInPage = chunkArray(taggedPosts, pageSize);
				for (let pageNumber = 1; pageNumber <= postsInPage.length; pageNumber++) {
					let pagination;
					if (pageNumber === 1) {
						// Add the root page that has the same content as the first page
						pagination = createPagination(taggedPosts, pageSize, 1, "/tags/" + tag.slug + "/page/:page");
						collectionTogo.push({
							slug: tag.slug,
							title: tag.title,
							posts: postsInPage[0],
							pagination: pagination
						});
					}

					collectionTogo.push({
						slug: tag.slug,
						title: tag.title,
						pageNumber: pageNumber,
						posts: postsInPage[pageNumber - 1],
						pagination: pagination ? pagination : createPagination(taggedPosts, pageSize, pageNumber, "/tags/" + tag.slug + "/page/:page")
					});
				}
			}
		});
		return collectionTogo;
	});

	// Add plugins.
	eleventyConfig.addPlugin(errorOverlay);
	eleventyConfig.addPlugin(pluginSass, {
		watch: ["src/**/*.scss"],
		sourcemaps: process.env.ELEVENTY_ENV === "development" ? true : false
	});

	// Add filters.
	eleventyConfig.addFilter("dateFilter", dateFilter);
	eleventyConfig.addFilter("markdownFilter", markdownFilter);
	eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
	eleventyConfig.addFilter("randomizeFilter", randomizeFilter);

	// Add transforms.
	eleventyConfig.addTransform("htmlmin", htmlMinifyTransform);
	eleventyConfig.addTransform("parse", parseTransform);

	// Configure passthrough file copy.
	eleventyConfig.addPassthroughCopy({"node_modules/infusion": "lib/infusion"});
	eleventyConfig.addPassthroughCopy({"src/fonts": "fonts"});
	eleventyConfig.addPassthroughCopy({"src/images": "images"});
	eleventyConfig.addPassthroughCopy({"src/js": "js"});

	// Configure BrowserSync.
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: (error, browserSync) => {
				// TODO: Add custom 404 page.
				const content404 = fs.readFileSync("dist/404.html");

				// Provides the 404 content without redirect.
				browserSync.addMiddleware("*", (request, response) => {
					response.write(content404);
					response.writeHead(404);
					response.end();
				});
			}
		}
	});

	return {
		dir: {
			input: "src",
			output: "dist"
		},
		passthroughFileCopy: true
	};
};
