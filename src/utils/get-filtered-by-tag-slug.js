import slugify from '@sindresorhus/slugify';

/**
 * Get items filtered from a collection by the given tag slug
 * @param {string} filterTag - The tag for which to filter the collection
 * @param {object} collection - An Eleventy collection defined via the collections API: https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
 * @returns {Array<object>} A filtered collection of items
 */
const getFilteredTagBySlug = (filterTag, collection) => {
	const allItems = collection.getAll().filter(item => item.data && item.data.tags); // Filter out items without tags

	// filter the collection to find posts with the same tag slug
	// make a copy of the tags list to avoid side effects, keying by fileSlug to avoid collisions
	const tagSlugs = {};
	for (const allItem of allItems) {
		tagSlugs[allItem.fileSlug] = allItem.data.tags.map(tagToSlugify => slugify(tagToSlugify));
	}

	const slugifiedFilterTag = slugify(filterTag);
	return allItems.filter(item => tagSlugs[item.fileSlug].includes(slugifiedFilterTag));
};

export default getFilteredTagBySlug;
