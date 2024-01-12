/**
 * Generate an object for use in Eleventy's pagination system from a collection and an item within that collection,
 * showing the item's position in the collection and identifying the previous/next items. The collection is paginated
 * using a chunk size of one, which allows us to generate paged navigation for single Views items.
 *
 * @param {Object} collection - An Eleventy collection to paginate.
 * @param {Object} page - The current item in the Eleventy collection.
 * @return {Object} A pagination object in the form shown here: https://www.11ty.dev/docs/pagination/#paging-an-array
 */
module.exports = (collection, page) => {
	const pagination = {
		items: [],
		hrefs: [],
		href: {},
		pages: [],
		page: {}
	};

	for (let i = 0; i < collection.length; i++) {
		const item = collection[i];

		pagination.hrefs.push(item.url);
		pagination.pages.push(item.page);

		if (i === 0) {
			pagination.href.first = item.url;
		}

		if ((i + 1) === collection.length) {
			pagination.href.last = item.url;
		}

		if (page.url === item.url) {
			pagination.items.push(item.page);

			pagination.pageNumber = i;

			if (i > 0) {
				pagination.href.previous = collection[i - 1].url;
			}

			if (collection.length > (i + 1)) {
				pagination.href.next = collection[i + 1].url;
			}
		}
	}

	return pagination;
};
