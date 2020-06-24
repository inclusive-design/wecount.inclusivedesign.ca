const axios = require("axios");
const env = require("../_data/env");

// Share data fetch functions
module.exports = {
	categorizedItems: async (categoryType, categoryId) => {
		// The fuction to process returned data from the Wordpress API
		const processItems = function (items) {
			return items.map(function (item) {
				return {
					category: categoryType,
					slug: item.slug,
					title: item.title.rendered,
					author: item._embedded.author[0].name,
					content: item.content.rendered,
					excerpt: item.excerpt.rendered,
					dateTime: item.date,
					tags: item.pure_taxonomies.tags ? item.pure_taxonomies.tags.map(({ name }) => name) : [],
					picture: item._links["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url : null,
					altTag: item._links["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].alt_text : "",
					// For news, "href" points to the external news links. For views, "href" is customized to show views content.
					href: categoryType === "news" ? item.acf.link : "/views/" + item.slug + "/"
				};
			});
		};

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

		results = processItems(firstPageResponse.data);

		// Fetch records for page 2 onwards
		if (totalPages > 1) {
			for (let currentPageNum = 2; currentPageNum <= totalPages; currentPageNum++) {
				const currentPageResponse = await axios.get(`${baseCategoryAPI}&page=${currentPageNum}`);
				results = results.concat(processItems(currentPageResponse.data));
			}
		}
		return results;
	},

	sitePosts: async () => {
		// The fuction to process returned data from the Wordpress API
		const processItems = function (items) {
			return items.map(function (item) {
				return {
					category: item.categories.includes(1) ? "views" : "news",
					slug: item.slug,
					title: item.title.rendered,
					author: item._embedded.author[0].name,
					content: item.content.rendered,
					excerpt: item.excerpt.rendered,
					dateTime: item.date,
					tags: item.pure_taxonomies.tags ? item.pure_taxonomies.tags.map(({ name }) => name) : [],
					picture: item._links["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url : null,
					altTag: item._links["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].alt_text : "",
					// For news, "href" points to the external news links. For views, "href" is customized to show views content.
					href: item.pure_taxonomies.categories[0].slug === "news" ? item.acf.link : "/views/" + item.slug + "/"
				};
			});
		};

		// According to the Wordpress API for pagination and embedding: https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
		// 1. Fetch 100 records per page (the maxium number per page supported by Wordpress) to fasten the query
		// 2. Retrieve embedded resources in the main query
		// 3. Order by the modified date in descending order
		const baseCategoryAPI = env.api + "/posts?per_page=100&orderby=modified&order=desc&_embed";

		// Fetch records for the first page as well as the number of total pages
		const firstPageRequest = baseCategoryAPI + "&page=1";
		const firstPageResponse = await axios.get(`${firstPageRequest}`);
		const totalPages = firstPageResponse.headers["x-wp-totalpages"];
		let results = [];

		results = processItems(firstPageResponse.data);

		// Fetch records for page 2 onwards
		if (totalPages > 1) {
			for (let currentPageNum = 2; currentPageNum <= totalPages; currentPageNum++) {
				const currentPageResponse = await axios.get(`${baseCategoryAPI}&page=${currentPageNum}`);
				results = results.concat(processItems(currentPageResponse.data));
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
