/* global chunkArray, createPagination */

const pluginPWA = require("eleventy-plugin-pwa-v2");
const eleventyNavigation = require("@11ty/eleventy-navigation");
const fluidPlugin = require("eleventy-plugin-fluid");
const fs = require("fs");

// const dataFetcherAirtable = require("./src/utils/data-fetcher-airtable.js");
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

require("./src/js/utils.js");

const siteConfig = require("./src/_data/config.json");

module.exports = function(eleventyConfig) {
	// Watch SCSS files.
	eleventyConfig.addWatchTarget("./src/scss/");

	siteConfig.locales.forEach(lang => {
		eleventyConfig.addCollection(`initiatives_${lang}`, collection => {
			return [
				...collection.getFilteredByGlob(`src/collections/initiatives/${lang}/*.md`).sort((a, b) => b.data.eventDate - a.data.eventDate)
			];
		});

		eleventyConfig.addCollection(`resources_${lang}`, collection => {
			return [
				...collection.getFilteredByGlob(`src/collections/resources/${lang}/*.md`).sort((a, b) => a.data.title.localeCompare(b.data.title, undefined, {
					ignorePunctuation: "true",
					sensitivity: "base",
					usage: "sort"
				}))
			];
		});

		eleventyConfig.addCollection(`news_${lang}`, collection => {
			return [
				...collection.getFilteredByGlob(`src/collections/news/${lang}/*.md`).sort((a, b) => b.data.date - a.data.date)
			];
		});
	});

	eleventyConfig.addCollection("pages", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/pages/*.md")
		];
	});

	eleventyConfig.addCollection("views", collection => {
		return [
			...collection.getFilteredByGlob("src/collections/views/*.md").sort((a, b) => b.data.date - a.data.date)
		];
	});

	eleventyConfig.addCollection("viewsTags", collection => {
		return getUniqueTags(collection.getFilteredByGlob("src/collections/views/*.md"));
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
	eleventyConfig.addPlugin(pluginPWA, {
		globIgnores: ["admin/*"]
	});
	eleventyConfig.addPlugin(fluidPlugin, {
		css: {
			enabled: false
		},
		sass: {
			enabled: true
		},
		defaultLanguage: "en-CA",
		supportedLanguages: {
			"en-CA": {
				slug: "en",
				name: "English"
			},
			"fr-CA": {
				slug: "fr",
				name: "Français",
				dir: "ltr",
				uioSlug: "fr"
			}
		}
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
		passthroughFileCopy: true,
		markdownTemplateEngine: "njk"
	};
};
