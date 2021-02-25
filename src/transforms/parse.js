/* global generateAside */

const jsdom = require("@tbranyen/jsdom");
const {JSDOM} = jsdom;

require("../js/utils.js");

module.exports = function(value, outputPath) {
	if (outputPath.endsWith(".html")) {
		const DOM = new JSDOM(value, {
			resources: "usable"
		});

		const document = DOM.window.document;
		generateAside(document, "main article.post-article h1, main article.post-article h2, main article.page h1, main article.page h2, main article.initiatives h1, main article.initiatives h2");

		return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
	}
	return value;
};
