

const { generatePermalink } = require("eleventy-plugin-fluid");

module.exports = {
	layout: "layouts/view.njk",
    category: "views",
	eleventyComputed: {
		/* Build a permalink using the title or slug and language key. */
		permalink: data => {
			return generatePermalink(data, "views", "views");
		}
	}
};
