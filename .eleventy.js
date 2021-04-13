/* global chunkArray, createPagination */

const errorOverlay = require("eleventy-plugin-error-overlay");
const pluginPWA = require("eleventy-plugin-pwa");
const eleventyNavigation = require("@11ty/eleventy-navigation");
const fs = require("fs");

const dataFetcherAirtable = require("./src/utils/data-fetcher-airtable.js");
const htmlMinifyTransform = require("./src/transforms/html-minify.js");
const parseTransform = require("./src/transforms/parse.js");
const dateFilter = require("./src/filters/date.js");
const htmlSymbolFilter = require("./src/filters/html-symbol.js");
const markdownFilter = require("./src/filters/markdown.js");
const paginateFilter = require("./src/filters/paginate.js");
const turndownFilter = require("./src/filters/turndown.js");
const slugFilter = require("./src/filters/slug.js");
const w3DateFilter = require("./src/filters/w3-date.js");
const randomizeFilter = require("./src/filters/randomize.js");
const expanderShortcode = require("./src/shortcodes/expander.js");
const imageAndTextShortcode = require("./src/shortcodes/image-and-text.js");
const youtubeShortcode = require("./src/shortcodes/youtube.js");

require("./src/js/utils.js");

module.exports = function(eleventyConfig) {
	// Watch SCSS files.
	eleventyConfig.addWatchTarget("./src/scss/");

	eleventyConfig.addCollection("pages", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/pages/*.md")
		];
	});

	eleventyConfig.addCollection("initiatives", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/initiatives/*.md").sort((a, b) => b.data.eventDate - a.data.eventDate)
		];
	});

	eleventyConfig.addCollection("comments", async function() {
		return dataFetcherAirtable.comments();
	});

	eleventyConfig.addCollection("news", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/news/*.md").sort((a, b) => b.data.date - a.data.date)
		];
	});

	eleventyConfig.addCollection("views", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/views/*.md").sort((a, b) => b.data.date - a.data.date)
		];
	});

	eleventyConfig.addCollection("viewsTags", collection => {
		const tagsSet = new Set();
		collection.getFilteredByGlob("src/collections/views/*.md").forEach(item => {
			if (!item.data.tags) return;
			item.data.tags
				.filter(tag => !["pages", "initiatives", "news", "views", "comments"].includes(tag))
				.forEach(tag => tagsSet.add(tag));
		});
		return Array.from(tagsSet).sort();
	});

	eleventyConfig.addCollection("allTags", collection => {
		const tagsSet = new Set();

		collection.getAll().forEach(item => {
			if (!item.data.tags) return;
			item.data.tags
				.filter(tag => !["pages", "initiatives", "news", "views", "comments"].includes(tag))
				.forEach(tag => tagsSet.add(tag));
		});
		const tags = Array.from(tagsSet).sort();
		const pageSize = 10;
		let collectionTogo = [];

		tags.map(tag => {
			const slug = slugFilter(tag);
			const taggedPosts = collection.getFilteredByTag(tag).reverse();

			if (taggedPosts.length) {
				const postsInPage = chunkArray(taggedPosts, pageSize);
				for (let pageNumber = 1; pageNumber <= postsInPage.length; pageNumber++) {
					let pagination;
					if (pageNumber === 1) {
						// Add the root page that has the same content as the first page
						pagination = createPagination(taggedPosts, pageSize, 1, "/tags/" + slug + "/page/:page");
						collectionTogo.push({
							slug: slug,
							title: tag,
							posts: postsInPage[0],
							pagination: pagination
						});
					}

					collectionTogo.push({
						slug: slug,
						title: tag,
						pageNumber: pageNumber,
						posts: postsInPage[pageNumber - 1],
						pagination: pagination ? pagination : createPagination(taggedPosts, pageSize, pageNumber, "/tags/" + slug + "/page/:page")
					});
				}
			}
		});

		return collectionTogo;
	});

	// Add plugins.
	eleventyConfig.addPlugin(errorOverlay);
	eleventyConfig.addPlugin(eleventyNavigation);
	eleventyConfig.addPlugin(pluginPWA, {
		globIgnores: ["admin/*"]
	});

	// Add filters.
	eleventyConfig.addFilter("dateFilter", dateFilter);
	eleventyConfig.addFilter("htmlSymbolFilter", htmlSymbolFilter);
	eleventyConfig.addFilter("markdownFilter", markdownFilter);
	eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
	eleventyConfig.addFilter("randomizeFilter", randomizeFilter);
	eleventyConfig.addFilter("turndownFilter", turndownFilter);
	eleventyConfig.addFilter("slug", slugFilter);
	eleventyConfig.addFilter("paginate", paginateFilter);

	// Add shortcodes.
	eleventyConfig.addPairedShortcode("expander", expanderShortcode);
	eleventyConfig.addPairedShortcode("imageAndText", imageAndTextShortcode);
	eleventyConfig.addShortcode("youtube", youtubeShortcode);


	// Add transforms.
	eleventyConfig.addTransform("htmlmin", htmlMinifyTransform);
	eleventyConfig.addTransform("parse", parseTransform);

	// Configure passthrough file copy.
	eleventyConfig.addPassthroughCopy({"src/_redirects": "_redirects"});
	eleventyConfig.addPassthroughCopy({"manifest.json": "manifest.json"});
	eleventyConfig.addPassthroughCopy({"node_modules/infusion": "lib/infusion"});
	eleventyConfig.addPassthroughCopy({"src/fonts": "fonts"});
	eleventyConfig.addPassthroughCopy({"src/images": "images"});
	eleventyConfig.addPassthroughCopy({"src/uploads": "uploads"});
	eleventyConfig.addPassthroughCopy({"src/js": "js"});
	eleventyConfig.addPassthroughCopy({"src/admin/config.yml": "admin/config.yml"});

	// Configure BrowserSync.
	eleventyConfig.setBrowserSyncConfig({
		...eleventyConfig.browserSyncConfig,
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
