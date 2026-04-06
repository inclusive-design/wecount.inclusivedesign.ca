import nunjucks from "nunjucks";

export default class {
	async data() {
		return {
			permalink: "/admin/templates.js",
			eleventyExcludeFromCollections: true
		};
	}

	async precompile() {
		return new Promise((resolve, reject) => {
			const templates = nunjucks.precompile(
				"./src/_includes/",
				{
					include: [
						"page.njk",
						"preview.njk",
						"recount.njk",
						"initiative.njk",
						"event.njk",
						"resourceDetail.njk",
						"grid-item.njk",
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
