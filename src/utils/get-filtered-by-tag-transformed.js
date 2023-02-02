/**
 * Get items filtered from a collection by the given tag and, optionally,
 * applying a transform function to all tags during comparison without modifying the collection
 *
 * @param {String} filterTag - The tag for which to filter the collection
 * @param {Object} collection - An Eleventy collection defined via the collections API: https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
 * @param {Object} options - a set of options for configuring the filter
 * @param {Function} options.transform - a function to transform the filterTag and tags in posts
 * 
 * @returns {Array<Object>} A filtered collection of items
 */

module.exports = (filterTag, collection, options) => {
	let allItems = collection.getAll();

	// filter out items without tags
	allItems = allItems.filter(item => {
		if (item.data && item.data.tags) {
			return item;
		}
	});

	// filter the collection to find posts with the same tag, or transformed tag if the `transform` function is supplied
	if (options.transform) {
		
		// make a transformed copy of the tags list to avoid side effects, keying by fileSlug to avoid collisions
		let transformedTags = {};
		for (let i = 0; i < allItems.length; i++) {
			transformedTags[allItems[i].fileSlug] = allItems[i].data.tags.map(tagToTransform => options.transform(tagToTransform));
		}

		const transformedFilterTag = options.transform(filterTag);
		return allItems.filter(item => transformedTags[item.fileSlug].includes(transformedFilterTag));

	} else {

		return allItems.filter(item => {
			return item.data.tags.includes(filterTag);
		});

	}
};
