/* global chunkArray, createPagination */

const eleventyNavigation = require("@11ty/eleventy-navigation");
const fluidPlugin = require("eleventy-plugin-fluid");
const fs = require("fs");

const htmlMinifyTransform = require("./src/transforms/html-minify.js");
const parseTransform = require("./src/transforms/parse.js");
const categoryFromFocusFilter = require("./src/filters/categoryFromFocus.js");
const dateFilter = require("./src/filters/date.js");
const getFilteredByTagSlug = require("./src/utils/get-filtered-by-tag-slug.js");
const getResourceTagLabelFilter = require("./src/filters/getResourceTagLabel.js");
const getUniqueTags = require("./src/utils/get-unique-tags.js");
const htmlSymbolFilter = require("./src/filters/html-symbol.js");
const markdownFilter = require("./src/filters/markdown.js");
const paginateFilter = require("./src/filters/paginate.js");
const w3DateFilter = require("./src/filters/w3-date.js");
const randomizeFilter = require("./src/filters/randomize.js");
const expanderShortcode = require("./src/shortcodes/expander.js");
const imageAndTextShortcode = require("./src/shortcodes/image-and-text.js");
const youtubeShortcode = require("./src/shortcodes/youtube.js");

require("./src/assets/scripts/utils.js");

module.exports = function (eleventyConfig) {

	eleventyConfig.addCollection("events", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/events/*.md").sort((a, b) => b.data.eventDate - a.data.eventDate)
		];
	});

	eleventyConfig.addCollection("initiatives", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/initiatives/*.md").sort((a, b) => b.data.date - a.data.date)
		];
	});

	eleventyConfig.addCollection("recount", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/recount/*.md").sort((a, b) => b.data.date - a.data.date)
		];
	});

	eleventyConfig.addCollection("views", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/views/*.md").sort((a, b) => b.data.date - a.data.date)
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

	eleventyConfig.addCollection("pages", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/pages/*.md")
		];
	});

	eleventyConfig.addCollection("initiativesTags", collection => {
		return getUniqueTags(collection.getFilteredByGlob("src/collections/initiatives/*.md"));
	});

	eleventyConfig.addCollection("allTags", collection => {
		let postsByTag = [];

		getUniqueTags(collection.getAll()).forEach(tag => {
			postsByTag.push({ ... tag, posts: getFilteredByTagSlug(tag.slug, collection) });
		});

		const pageSize = 10;
		let paginatedPostsByTag = [];

		postsByTag.forEach(tag => {
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
					paginatedPostsByTag.push(tagPage);
				}

				paginatedPostsByTag.push({ ... tagPage, pageNumber: pageNumber });
			}
		});

		return paginatedPostsByTag;
	});

	// Add plugins.
	eleventyConfig.addPlugin(eleventyNavigation);
	eleventyConfig.addPlugin(fluidPlugin, {
		css: {
			enabled: false
		},
		sass: {
			enabled: true
		},
		i18n: false
	});

	// Add filters.
	eleventyConfig.addFilter("categoryFromFocus", categoryFromFocusFilter);
	eleventyConfig.addFilter("dateFilter", dateFilter);
	eleventyConfig.addFilter("getResourceTagLabel", getResourceTagLabelFilter);
	eleventyConfig.addFilter("htmlSymbolFilter", htmlSymbolFilter);
	eleventyConfig.addFilter("markdownFilter", markdownFilter);
	eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
	eleventyConfig.addFilter("randomizeFilter", randomizeFilter);
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
	eleventyConfig.addPassthroughCopy({"node_modules/infusion": "lib/infusion"});
	eleventyConfig.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
	eleventyConfig.addPassthroughCopy({"src/assets/images": "assets/images"});
	eleventyConfig.addPassthroughCopy({"src/uploads": "uploads"});
	eleventyConfig.addPassthroughCopy({"src/assets/scripts": "assets/scripts"});
	eleventyConfig.addPassthroughCopy({"node_modules/lite-youtube-embed/src/lite-yt-embed.js": "assets/scripts/lite-yt-embed.js"});
	eleventyConfig.addPassthroughCopy({"node_modules/lite-youtube-embed/src/lite-yt-embed.css": "assets/styles/lite-yt-embed.css"});

	eleventyConfig.addPassthroughCopy({"src/admin/config.yml": "admin/config.yml"});
	eleventyConfig.addPassthroughCopy({
		"node_modules/decap-cms/dist/decap-cms.js": "lib/cms/decap-cms.js",
		"node_modules/decap-cms/dist/decap-cms.js.map": "lib/cms/decap-cms.js.map",
		"node_modules/nunjucks/browser/nunjucks-slim.min.js": "lib/cms/nunjucks-slim.min.js",
		"node_modules/prop-types/prop-types.min.js": "lib/cms/prop-types.min.js",
		"node_modules/react/umd/react.development.js": "lib/cms/react.development.js",
		"node_modules/react/umd/react.production.min.js": "lib/cms/react.production.min.js"
	});

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
			input: "src"
		},
		passthroughFileCopy: true,
		markdownTemplateEngine: "njk"
	};
};
