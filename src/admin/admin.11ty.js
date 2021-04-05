const nunjucks = require("nunjucks");
const path = require("path");

module.exports = class {
	async data() {
		return {
			permalink: "/admin/templates.js",
			eleventyExcludeFromCollections: true
		};
	}

	async precompile() {
		return new Promise((resolve, reject) => {
			const templates = nunjucks.precompile(
				path.join(__dirname, "../_includes/"),
				{
					include: [
						"preview.njk",
						"initiative.njk",
						"\\.svg$"
					]
				}
			);
			if (templates) {
				resolve(templates);
			} else {
				reject(templates);
			}
		});
	}

	async render() {
		try {
			const result = await this.precompile();
			return result;
		} catch (error) {
			throw new Error(error);
		}
	}
};
