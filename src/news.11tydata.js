/* global extractPageIntro */

require("./js/utils.js");

module.exports = {
	eleventyComputed: {
		intro: (data) => {
			return extractPageIntro(data.collections.allPages, "news");
		}
	}
};
