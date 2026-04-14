import slugify from '@sindresorhus/slugify';

/**
 * Get an array of unique tags from a collection.
 * Note: tags with the same spelling but different case usage will not be considered unique.
 * @param {object} collection - An Eleventy collection defined via the collections API: https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
 * @returns {Array<object>} An array of tag objects with the string properties `name` and `slug`
 */

const getUniqueTags = collection => {
	const tagsMap = new Map();
	for (const item of collection) {
		if (!item.data.tags) {
			continue;
		}

		for (const tag of item.data.tags
			.filter(tag => !['pages', 'initiatives', 'recount', 'events'].includes(tag))) {
			const slugifiedTag = slugify(tag);
			if (!tagsMap.has(tag)) {
				tagsMap.set(slugifiedTag, tag);
			}
		}
	}

	// This sorting by tag name will put lowercase ahead of uppercase
	return Array.from(tagsMap, ele => ({name: ele[1], slug: ele[0]})).toSorted((a, b) => a.slug.localeCompare(b.slug));
};

export default getUniqueTags;
