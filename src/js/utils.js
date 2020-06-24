// Shared utility functions

/* global convertDate, stripHtmlTags, htmlDecode, chunkArray, escapeSpecialChars */

// eslint-disable-next-line
convertDate = function (inputDate) {
	const dateObject = new Date(inputDate);

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
};

// eslint-disable-next-line
stripHtmlTags = function (inputString) {
	return inputString.replace(/<\/?[^>]+(>|$)/g, "");
};

// eslint-disable-next-line
htmlDecode = function (input) {
	let el = document.createElement("div");
	el.innerHTML = input;
	return el.innerText;
};

// eslint-disable-next-line
chunkArray = function (inputArray, chunkSize) {
	return Array(Math.ceil(inputArray.length / chunkSize)).fill().map((_, index) => index * chunkSize).map(begin => inputArray.slice(begin, begin + chunkSize));
};

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
			tags: onePost.pure_taxonomies.tags ? onePost.pure_taxonomies.tags.map(({ name }) => name) : [],
			picture: onePost._links["wp:featuredmedia"] ? onePost._embedded["wp:featuredmedia"][0].source_url : null,
			altTag: onePost._links["wp:featuredmedia"] ? onePost._embedded["wp:featuredmedia"][0].alt_text : "",
			// For news, "href" points to the external news links. For views, "href" is customized to show views content.
			href: categoryType === "news" ? onePost.acf.link : "/views/" + onePost.slug + "/"
		};
	});
};

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

// eslint-disable-next-line
escapeSpecialChars = function (data) {
	return data.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, "\\$&");
};

// eslint-disable-next-line
search = function (dataSet, searchQuery) {
	return dataSet.data.filter((oneRecord) => {
		// Convert the fetched data to displayable values to work around the issue with using vue v-if and
		// v-html in nunjucks templates.
		oneRecord.title = htmlDecode(oneRecord.title);
		oneRecord.dateTime = oneRecord.dateTime ? convertDate(oneRecord.dateTime): undefined;
		oneRecord.excerpt = stripHtmlTags(oneRecord.excerpt);

		const tagsInString = oneRecord.tags ? oneRecord.tags.join(" ") : "";
		return oneRecord.title.concat(" ", oneRecord.content, " ", tagsInString).toLowerCase().match(escapeSpecialChars(searchQuery));
	});
};
