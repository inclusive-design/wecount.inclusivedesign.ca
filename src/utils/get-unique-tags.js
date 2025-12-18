/**
 * Get an array of unique tags from a collection.
 * Note: tags with the same spelling but different case usage will not be considered unique.
 *
 * @param {Object} collection - An Eleventy collection defined via the collections API: https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
 *
 * @return {Array<Object>} An array of tag objects with the string properties `name` and `slug`
 */

const slugFilter = require("../filters/slug.js");

module.exports = collection => {
	let tagsMap = new Map();
	collection.forEach(item => {
		if (!item.data.tags) {return;}
		item.data.tags
			.filter(tag => !["pages", "initiatives", "recount", "events"].includes(tag))
			.forEach(tag => {
				let slugifiedTag = slugFilter(tag);
				if (!tagsMap.has(tag)) {
					tagsMap.set(slugifiedTag, tag);
				}
			});
	});

	// this sorting by tag name will put lowercase ahead of uppercase
	return Array.from(tagsMap, ele => { return { name: ele[1], slug: ele[0] }; }).sort((a, b) => a.slug.localeCompare(b.slug));
};
