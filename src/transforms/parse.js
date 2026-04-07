import {parseHTML} from "linkedom";
import { generateAside } from "../assets/scripts/utils.js";

const parseTransform = function (value, outputPath) {
	if (outputPath && outputPath.includes(".html")) {
		const {document} = parseHTML(value);

		generateAside(document, "main article.post-article h1, main article.post-article h2, main article.page h1, main article.page h2, main article.events h1, main article.events h2");

		return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
	}
	return value;
};

export default parseTransform;
