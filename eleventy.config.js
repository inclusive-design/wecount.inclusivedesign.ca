/* global chunkArray, createPagination */

const errorOverlay = require("eleventy-plugin-error-overlay");
const pluginSass = require("eleventy-plugin-sass");
const fs = require("fs");

const dataFetcher = require("./src/utils/data-fetcher.js");
const htmlMinifyTransform = require("./src/transforms/html-minify.js");
const parseTransform = require("./src/transforms/parse.js");
const dateFilter = require("./src/filters/date.js");
const markdownFilter = require("./src/filters/markdown.js");
const w3DateFilter = require("./src/filters/w3-date.js");

require("./src/js/utils.js");

module.exports = function(eleventyConfig) {
	// Use .eleventyignore instead of .gitignore.
	eleventyConfig.setUseGitIgnore(false);

	// Add custom collections.
	eleventyConfig.addCollection("pages", async function(collection) {
		collection = dataFetcher.sitePages();
		return collection;
	});

	eleventyConfig.addCollection("posts", async function(collection) {
		collection = dataFetcher.sitePosts();
		return collection;
	});

	eleventyConfig.addCollection("news", async function(collection) {
		collection = dataFetcher.categorizedItems("news", 8);
		return collection;
	});

	eleventyConfig.addCollection("views", async function(collection) {
		collection = dataFetcher.categorizedItems("views", 1);
		return collection;
	});

	eleventyConfig.addCollection("tags", async function() {
		const tags = await dataFetcher.siteTags();
		const posts = await dataFetcher.sitePosts();
		const pageSize = 10;
		let collectionTogo = [];

		tags.map(tag => {
			const taggedPosts = posts.filter(post => {
				return post.tags.includes(tag.title);
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
