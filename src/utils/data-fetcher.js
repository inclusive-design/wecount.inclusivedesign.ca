/* global processPosts */

const axios = require("axios");
const env = require("../_data/env");

require("../js/utils.js");

// Share data fetch functions
module.exports = {
	categorizedItems: async (categoryType, categoryId) => {
		// The fuction to process returned data from the Wordpress API
		// According to the Wordpress API for pagination and embedding: https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
		// 1. Fetch 100 records per page (the maxium number per page supported by Wordpress) to fasten the query
		// 2. Retrieve embedded resources in the main query
		// 3. Order by the published date in descending order
		const baseCategoryAPI = env.api + "/posts?categories=" + categoryId + "&per_page=100&orderby=date&order=desc&_embed";

		// Fetch records for the first page as well as the number of total pages
		const firstPageRequest = baseCategoryAPI + "&page=1";
		const firstPageResponse = await axios.get(`${firstPageRequest}`);
		const totalPages = firstPageResponse.headers["x-wp-totalpages"];
		let results = [];

		results = processPosts(firstPageResponse.data);

		// Fetch records for page 2 onwards
		if (totalPages > 1) {
			for (let currentPageNum = 2; currentPageNum <= totalPages; currentPageNum++) {
				const currentPageResponse = await axios.get(`${baseCategoryAPI}&page=${currentPageNum}`);
				results = results.concat(processPosts(currentPageResponse.data));
			}
		}
		return results;
	},

	sitePosts: async () => {
		// According to the Wordpress API for pagination and embedding: https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
		// 1. Fetch 100 records per page (the maxium number per page supported by Wordpress) to fasten the query
		// 2. Retrieve embedded resources in the main query
		// 3. Order by the published date in descending order
		const baseCategoryAPI = env.api + "/posts?per_page=100&orderby=date&order=desc&_embed";

		// Fetch records for the first page as well as the number of total pages
		const firstPageRequest = baseCategoryAPI + "&page=1";
		const firstPageResponse = await axios.get(`${firstPageRequest}`);
		const totalPages = firstPageResponse.headers["x-wp-totalpages"];
		let results = [];

		results = processPosts(firstPageResponse.data);

		// Fetch records for page 2 onwards
		if (totalPages > 1) {
			for (let currentPageNum = 2; currentPageNum <= totalPages; currentPageNum++) {
				const currentPageResponse = await axios.get(`${baseCategoryAPI}&page=${currentPageNum}`);
				results = results.concat(processPosts(currentPageResponse.data));
			}
		}
		return results;
	},

	siteTags: async () => {
		// The fuction to process returned data from the Wordpress API
		const processItems = function (items) {
			return items.map(function (item) {
				return {
					slug: item.slug,
					title: item.name
				};
			});
		};

		// According to the Wordpress API for pagination and embedding: https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
		// 1. Fetch 100 records per page (the maxium number per page supported by Wordpress) to fasten the query
		const baseTagsAPI = env.api + "/tags?per_page=100";

		// Fetch records for the first page as well as the number of total pages
		const firstPageRequest = baseTagsAPI + "&page=1";
		const firstPageResponse = await axios.get(`${firstPageRequest}`);
		const totalPages = firstPageResponse.headers["x-wp-totalpages"];
		let results = [];

		results = processItems(firstPageResponse.data);

		// Fetch records for page 2 onwards
		if (totalPages > 1) {
			for (let currentPageNum = 2; currentPageNum <= totalPages; currentPageNum++) {
				const currentPageResponse = await axios.get(`${baseTagsAPI}&page=${currentPageNum}`);
				results = results.concat(processItems(currentPageResponse.data));
			}
		}
		return results;
	},

	sitePages: async () => {
		// According to the Wordpress API for pagination and embedding: https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/,
		// 1. fetch 100 records per page (the maxium number per page supported by Wordpress) to fasten the query
		// 2. Order by the menu order in ascending order
		const pageAPI = env.api + "/pages?per_page=100&order=asc&orderby=menu_order";

		const response = await axios.get(`${pageAPI}`);

		return response.data.map(function (page) {
			return {
				slug: page.slug,
				title: page.title.rendered,
				content: page.content.rendered,
				excerpt: page.excerpt.rendered,
				menu_order: page.menu_order,
				href: page.slug === "home" ? "/" : "/" + page.slug + "/"
			};
		});
	}
};
