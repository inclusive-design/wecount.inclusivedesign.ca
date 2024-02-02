/**
 * Get items filtered from a collection by the given tag slug
 *
 * @param {String} filterTag - The tag for which to filter the collection
 * @param {Object} collection - An Eleventy collection defined via the collections API: https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
 *
 * @return {Array<Object>} A filtered collection of items
 */

const slugFilter = require("../filters/slug.js");

module.exports = (filterTag, collection) => {
	let allItems = collection.getAll().filter(item => item.data && item.data.tags); // filter out items without tags

	// filter the collection to find posts with the same tag slug
	// make a copy of the tags list to avoid side effects, keying by fileSlug to avoid collisions
	let tagSlugs = {};
	for (let i = 0; i < allItems.length; i++) {
		tagSlugs[allItems[i].fileSlug] = allItems[i].data.tags.map(tagToSlugify => slugFilter(tagToSlugify));
	}

	const slugifiedFilterTag = slugFilter(filterTag);
	return allItems.filter(item => tagSlugs[item.fileSlug].includes(slugifiedFilterTag));
};
