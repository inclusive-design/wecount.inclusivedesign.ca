/**
 * Generate an object for use in Eleventy's pagination system from a collection and an item within that collection,
 * showing the item's position in the collection and identifying the previous/next items. The collection is paginated
 * using a chunk size of one, which allows us to generate paged navigation for single Initiatives items.
 * @param {object} collection - An Eleventy collection to paginate.
 * @param {object} page - The current item in the Eleventy collection.
 * @returns {object} A pagination object in the form shown here: https://www.11ty.dev/docs/pagination/#paging-an-array
 */
const paginate = (collection, page) => {
	const pagination = {
		items: [],
		hrefs: [],
		href: {},
		pages: [],
		page: {},
	};

	for (let index = 0; index < collection.length; index++) {
		const item = collection[index];

		pagination.hrefs.push(item.url);
		pagination.pages.push(item.page);

		if (index === 0) {
			pagination.href.first = item.url;
		}

		if ((index + 1) === collection.length) {
			pagination.href.last = item.url;
		}

		if (page.url === item.url) {
			pagination.items.push(item.page);

			pagination.pageNumber = index;

			if (index > 0) {
				pagination.href.previous = collection[index - 1].url;
			}

			if (collection.length > (index + 1)) {
				pagination.href.next = collection[index + 1].url;
			}
		}
	}

	return pagination;
};

export default paginate;
