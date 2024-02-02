/**
 * Given a collection of Resource Categories (aka Topics) and a single Focus,
 * this filter will return the appropriate Category name for that Focus
 *
 * @param {String} focusToMatch - The focus for whose Category will be searched
 * @param {Object} categories - The set of all resource Categories
 * @return {String} The name of the Category that contains the given Focus
 */

module.exports = (focusToMatch, categories) => {
	var categoryName = "";

	categories.forEach(category => {
		const found = category.focuses.find(focus => focus === focusToMatch);

		if (found) {
			categoryName = category.categoryLabel;
			return;
		}
	});

	return categoryName;
};
