

const { generatePermalink } = require("eleventy-plugin-fluid");

module.exports = {
	layout: "layouts/initiative.njk",
	eleventyComputed: {
		/* Build a permalink using the title or slug and language key. */
		permalink: data => {
			return generatePermalink(data, "initiatives", "initiatives");
		}
	}
};
