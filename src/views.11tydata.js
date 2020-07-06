/* global getUniqueTags */

require("./js/utils.js");

module.exports = {
	eleventyComputed: {
		tagsOfViews: (data) => {
			return getUniqueTags(data.collections.views);
		}
	}
};
