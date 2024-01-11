

const { generatePermalink } = require("eleventy-plugin-fluid");

module.exports = {
	layout: "layouts/resourceDetail.njk",
	eleventyComputed: {
		/* Build a permalink using the title or slug and language key. */
		permalink: data => {
			const locale = data.locale;
			return generatePermalink(data, "resources", locale === "fr-CA" ? "ressources" : "resources");
		}
	}
};
