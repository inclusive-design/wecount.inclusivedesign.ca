/* global generateAside */

const {parseHTML} = require("linkedom");

require("../assets/scripts/utils.js");

module.exports = function (value, outputPath) {
	if (outputPath && outputPath.includes(".html")) {
		const {document} = parseHTML(value);

		generateAside(document, "main article.post-article h1, main article.post-article h2, main article.page h1, main article.page h2, main article.initiatives h1, main article.initiatives h2");

		return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
	}
	return value;
};
