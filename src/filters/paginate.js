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
