/* global chunkArray, createPagination */

const errorOverlay = require("eleventy-plugin-error-overlay");
const pluginPWA = require("eleventy-plugin-pwa");
const eleventyNavigation = require("@11ty/eleventy-navigation");
const fs = require("fs");

const dataFetcherAirtable = require("./src/utils/data-fetcher-airtable.js");
const htmlMinifyTransform = require("./src/transforms/html-minify.js");
const parseTransform = require("./src/transforms/parse.js");
const categoryFromFocusFilter = require("./src/filters/categoryFromFocus.js");
const dateFilter = require("./src/filters/date.js");
const getResourceTagLabelFilter = require("./src/filters/getResourceTagLabel.js");
const htmlSymbolFilter = require("./src/filters/html-symbol.js");
const markdownFilter = require("./src/filters/markdown.js");
const paginateFilter = require("./src/filters/paginate.js");
const slugFilter = require("./src/filters/slug.js");
const w3DateFilter = require("./src/filters/w3-date.js");
const randomizeFilter = require("./src/filters/randomize.js");
const expanderShortcode = require("./src/shortcodes/expander.js");
const imageAndTextShortcode = require("./src/shortcodes/image-and-text.js");
const youtubeShortcode = require("./src/shortcodes/youtube.js");

require("./src/js/utils.js");

/**
 * Get an array of unique tags from a collection.
 * Note: tags with the same spelling but different case usage will each be considered unique.
 *
 * @param {Object} collection - An Eleventy collection defined via the collections API: https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
 * 
 * @returns {Array<Object>} An array of tag objects with the string properties `name` and `slug`
 */
const getUniqueTags = function(collection) {
	let tagsMap = new Map();
	collection.forEach(item => {
		if (!item.data.tags) return;
		item.data.tags
			.filter(tag => !["pages", "initiatives", "news", "views", "comments"].includes(tag))
			.forEach(tag => {
				if (!tagsMap.has(tag)) {
					tagsMap.set(tag, slugFilter(tag));
				}
			});
	});

	// this sorting by tag name will put lowercase ahead of uppercase
	return Array.from(tagsMap, ele => { return { name: ele[0], slug: ele[1] }; }).sort((a, b) => a.name.localeCompare(b.name));
};

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

	eleventyConfig.addCollection("resources", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/resources/*.md").sort((a, b) => a.data.title.localeCompare(b.data.title, undefined, {
				ignorePunctuation: "true",
				sensitivity: "base",
				usage: "sort"
			}))
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
		const uniqueTags = getUniqueTags(collection.getFilteredByGlob("src/collections/views/*.md"));
		let tagsFiltered = []; // Tags filtered to remove duplicates with different-case spelling

		for (let i = 0; i < uniqueTags.length; i++) {
			if (!tagsFiltered.some(tag => tag.slug === uniqueTags[i].slug && tag.name !== uniqueTags[i].name)) {
				tagsFiltered.push(uniqueTags[i]); // there are no other spellings of this tag already in the list
			}
		}

		return tagsFiltered;
	});

	eleventyConfig.addCollection("allTags", collection => {
		// Compile posts by tag slug.
		const uniqueTags = getUniqueTags(collection.getAll());
		let tagsAggregated = []; // Tags aggregated by slug

		for (let i = 0; i < uniqueTags.length; i++) {
			const tag = uniqueTags[i];
			const tagPosts = collection.getFilteredByTag(tag.name).reverse();

			// Check for duplicates with the same spelling but different case usage
			let otherTags = tagsAggregated.filter(otherTag => tag.slug === otherTag.slug && tag.name !== otherTag.name);
			
			if (otherTags.length) {
				// Only update the first entry as there should never be more than one
				otherTags[0].posts = [ ... otherTags[0].posts, ... tagPosts ];
			} else {
				tagsAggregated.push(tag);
				tag.posts = tagPosts;
			}
		}
				
		let collectionTogo = [];

		for (let i = 0; i < tagsAggregated.length; i++) {
			const tag = tagsAggregated[i];

			if (tag.posts.length) {
				const pageSize = 10;
				const postsWithTag = chunkArray(tag.posts, pageSize);
				
				for (let pageNumber = 1; pageNumber <= postsWithTag.length; pageNumber++) {
					let tagPage = {
						slug: tag.slug,
						title: tag.name,
						posts: postsWithTag[pageNumber - 1],
						pagination: createPagination(tag.posts, pageSize, pageNumber, "/tags/" + tag.slug + "/page/:page")
					};
					
					// Add the root page that has the same content as the first page
					// The root page is defined as such by its lack of "pageNumber" property
					if (pageNumber === 1) {
						collectionTogo.push(tagPage);
					}
					
					collectionTogo.push({ ... tagPage, pageNumber: pageNumber });
				}
			}
		}

		return collectionTogo;
	});

	// Add plugins.
	eleventyConfig.addPlugin(errorOverlay);
	eleventyConfig.addPlugin(eleventyNavigation);
	eleventyConfig.addPlugin(pluginPWA, {
		globIgnores: ["admin/*"]
	});

	// Add filters.
	eleventyConfig.addFilter("categoryFromFocus", categoryFromFocusFilter);
	eleventyConfig.addFilter("dateFilter", dateFilter);
	eleventyConfig.addFilter("getResourceTagLabel", getResourceTagLabelFilter);
	eleventyConfig.addFilter("htmlSymbolFilter", htmlSymbolFilter);
	eleventyConfig.addFilter("markdownFilter", markdownFilter);
	eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
	eleventyConfig.addFilter("randomizeFilter", randomizeFilter);
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
	eleventyConfig.addPassthroughCopy({"node_modules/covid-data-monitor": "lib/covid-data-monitor"});
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
		passthroughFileCopy: true,
		markdownTemplateEngine: "njk"
	};
};
