/**
 * Gets the resource tag label for a given tag value
 * @param {string} tagValue - The value of the tag to search for
 * @param {object} tagList - The set of all resource Tags
 * @returns {string} The tag's label
 */

const getResourceTagLabel = (tagValue, tagList) => {
	let tagLabel = '';

	for (const tag of tagList) {
		const found = tagList.find(() => tag.value === tagValue);

		if (found) {
			tagLabel = tag.label;
			continue;
		}
	}

	return tagLabel;
};

export default getResourceTagLabel;
