/* global getUniqueTags, extractPageIntro */

require("./js/utils.js");

module.exports = {
	eleventyComputed: {
		tagsOfViews: (data) => {
			return getUniqueTags(data.collections.views);
		},
		intro: (data) => {
			return extractPageIntro(data.collections.allPages, "views");
		}
	}
};
