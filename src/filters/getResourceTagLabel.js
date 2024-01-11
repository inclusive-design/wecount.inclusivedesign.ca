/**
 * Gets the resource tag label for a given tag value
 *
 * @param {String} tagValue The value of the tag to search for
 * @param {Object} tagList The set of all resource Tags
 * @returns {String} The tag's label
 */

module.exports = (tagValue, tagList) => {
	var tagLabel = "";

	tagList.forEach(tag => {
		const found = tagList.find(() => tag.value === tagValue);
		
		if (found) {
			tagLabel = tag.label;
			return;
		}
	});
	
	return tagLabel;
};
