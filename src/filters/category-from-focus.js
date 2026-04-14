/**
 * Given a collection of Resource Categories (aka Topics) and a single Focus,
 * this filter will return the appropriate Category name for that Focus
 * @param {string} focusToMatch - The focus for whose Category will be searched
 * @param {object} categories - The set of all resource Categories
 * @returns {string} The name of the Category that contains the given Focus
 */

const categoryFromFocus = (focusToMatch, categories) => {
	let categoryName = '';

	for (const category of categories) {
		const found = category.focuses.find(focus => focus === focusToMatch);

		if (found) {
			categoryName = category.categoryLabel;
			continue;
		}
	}

	return categoryName;
};

export default categoryFromFocus;
