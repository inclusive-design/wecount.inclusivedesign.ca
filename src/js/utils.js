// Shared utility functions

/* global convertDate, stripHtmlTags, htmlDecode, chunkArray, escapeSpecialChars */

/*
 * Convert a date into the format of "Month day, Year".
 * @param {String} inputDate - A string of date.
 * @return The string in the format of "Month day, Year".
 */
// eslint-disable-next-line
convertDate = function (inputDate) {
	const dateObject = new Date(inputDate);

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
};

/*
 * Remove html tags from the input string.
 * @param {String} inputString - The string to remove html tags.
 * @return The string with html tags removed.
 */
// eslint-disable-next-line
stripHtmlTags = function (inputString) {
	return inputString.replace(/<\/?[^>]+(>|$)/g, "");
};

/*
 * Extract text from a html string.
 * @param {String} input - The string to extract text from.
 * @return The extracted text.
 */
// eslint-disable-next-line
htmlDecode = function (input) {
	let el = document.createElement("div");
	el.innerHTML = input;
	return el.innerText;
};

/*
 * Chunk (split) the array into smaller arrays with the given chunk size at its most.
 * @param {Array<Anything>} inputArray - The input array to chunk.
 * @param {Number} chunkSize - The size of smaller arrays to chunk to.
 * @return An array of smaller arrays with the given chunk size at its most.
 */
// eslint-disable-next-line
chunkArray = function (inputArray, chunkSize) {
	return Array(Math.ceil(inputArray.length / chunkSize)).fill().map((_, index) => index * chunkSize).map(begin => inputArray.slice(begin, begin + chunkSize));
};

/*
 * Process the WordPress returned data structure to the format required by WeCount site.
 * @param {Array<Object>} posts - Posts returned by the WordPress REST API.
 * @return An array of object that re in the format required by WeCount site.
 */
// eslint-disable-next-line
processPosts = function (posts) {
	return posts.map(function (onePost) {
		const categoryType = onePost.categories.includes(1) ? "views" : "news";
		return {
			category: categoryType,
			slug: onePost.slug,
			title: onePost.title.rendered,
			author: onePost._embedded.author[0].name,
			content: onePost.content.rendered,
			excerpt: onePost.excerpt.rendered,
			dateTime: onePost.date,
			tags: onePost.pure_taxonomies.tags ? onePost.pure_taxonomies.tags.map(({slug, name}) => ({slug, name})) : [],
			picture: onePost._links["wp:featuredmedia"] ? onePost._embedded["wp:featuredmedia"][0].source_url : null,
			altTag: onePost._links["wp:featuredmedia"] ? onePost._embedded["wp:featuredmedia"][0].alt_text : "",
			// For news, "href" points to the external news links. For views, "href" is customized to show views content.
			href: categoryType === "news" ? onePost.acf.link : "/views/" + onePost.slug + "/"
		};
	});
};

/*
 * Create the pagination object for the input data set.
 * @param {Array<Object>} dataArray - The data set to create the pagination object for.
 * @param {Number} pageSize - The number of records on a page.
 * @param {Number} pageInQuery - The current page number.
 * @param {String} hrefTemplate - The href to redirect to when a page number is clicked.
 * @return Generate a pagination object in this data structure: https://www.11ty.dev/docs/pagination/#paging-an-array.
 */
// eslint-disable-next-line
createPagination = function (dataArray, pageSize, pageInQuery, hrefTemplate) {
	const dataInChunk = chunkArray(dataArray, pageSize);
	pageInQuery = pageInQuery ? (parseInt(pageInQuery) > 1 ? parseInt(pageInQuery) : 1) : 1;
	let hrefs = [];
	for (let i = 0; i < dataInChunk.length; i++) {
		hrefs.push(hrefTemplate.replace(":page", i + 1));
	}

	// The pagination data structure follows the Eleventy pagination data structure to make it easier to integrate
	// pagination templates written in nunjucks and vue: https://www.11ty.dev/docs/pagination/#paging-an-array
	const pagination = {
		items: dataInChunk[pageInQuery - 1],
		pageNumber: pageInQuery - 1,
		hrefs: hrefs,
		href: {
			next: hrefs[pageInQuery] ? hrefs[pageInQuery] : null,
			previous: hrefs[pageInQuery - 2] ? hrefs[pageInQuery - 2] : null,
			first: hrefs[0],
			last: hrefs[hrefs.length - 1]
		},
		pages: dataInChunk,
		page: {
			next: dataInChunk[pageInQuery] ? dataInChunk[pageInQuery] : null,
			previous: dataInChunk[pageInQuery - 2] ? dataInChunk[pageInQuery - 2] : null,
			first: dataInChunk[0],
			last: dataInChunk[dataInChunk.length - 1]
		},
		hideProceedingPageButton: pageInQuery !== 2 && pageInQuery !== 3,
		hideFollowingPageButton: pageInQuery !== dataInChunk.length - 1 && pageInQuery !== dataInChunk.length - 2
	};
	return pagination;
};

/*
 * Escape special characters in a string by adding double slashes in front.
 * @param {String} data - The string to escape special characters within it.
 * @return The same string with special characters within it escaped.
 */
// eslint-disable-next-line
escapeSpecialChars = function (data) {
	return data.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, "\\$&");
};

/*
 * Process each object in the data set to convert some field value to formats for display.
 * @param {Array<Object>} dataSet - The data set to process.
 * @return The same set of the data set with fields converted.
 */
// eslint-disable-next-line
processDisplayResults = function (inArray) {
	return inArray.map((oneRecord) => {
		oneRecord.title = htmlDecode(oneRecord.title);
		oneRecord.dateTime = oneRecord.dateTime ? convertDate(oneRecord.dateTime): undefined;
		oneRecord.excerpt = stripHtmlTags(oneRecord.excerpt);
		return oneRecord;
	});
};

/*
 * Find and return an array of unique tags.
 * @param {Array<Object>} posts - An array of posts to find unique tags. Each object in this array contains a field named "tags"
 * that in a format of:
 * tags: [{slug: {String}, name: {String}}, ...]
 * @return An array of tag slugs to
 */
// eslint-disable-next-line
getUniqueTags = function (posts) {
	let tags = [];
	posts.map(post => {
		tags = tags.concat(post.tags.filter(({slug}) => {
			const currentTagSlugs = tags.map(({slug}) => slug);
			return currentTagSlugs.indexOf(slug) < 0;
		}));
	});
	return tags;
};

/*
 * Search the data set with records that match the search term.
 * @param {Array<Object>} dataSet - The data set that the search is performed upon.
 * @param {String} searchTerm - The search term.
 * @return A subset of the input `dataSet` that have matched term in any of these fields: title, content, tags.
 */
// eslint-disable-next-line
search = function (dataSet, searchTerm) {
	searchTerm = searchTerm.toLowerCase();
	return dataSet.filter((oneRecord) => {
		const tagNames = oneRecord.tags ? oneRecord.tags.map(({name}) => name) : [];
		return oneRecord.title.toLowerCase().concat(" ", oneRecord.content.toLowerCase(), " ", tagNames.join(" ")).toLowerCase().match(escapeSpecialChars(searchTerm));
	});
};

/*
 * Filter the data set with records that have one or more matching tag(s) in the given tag slugs array.
 * @param {Array<Object>} dataSet - The data set that the filter is performed upon. Each object in this array contains a field named "tags"
 * that in a format of:
 * tags: [{slug: {String}, name: {String}}, ...]
 * @param {Array<String>} tagSlugs - An array of tag slugs to match.
 * @return A subset of the input `dataSet` that have matched tag slug(s) in `tagSlugs`
 */
// eslint-disable-next-line
filter = function (dataSet, tagSlugs) {
	return dataSet.filter((oneRecord) => {
		const recordSlugs = oneRecord.tags ? oneRecord.tags.map(({slug}) => slug) : [];
		return recordSlugs.some(slug => tagSlugs.indexOf(slug) >= 0);
	});
};
