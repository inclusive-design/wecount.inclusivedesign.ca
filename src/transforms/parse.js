/* global generateAside */

const {parseHTML} = require("linkedom");

require("../assets/scripts/utils.js");

module.exports = function (value, outputPath) {
	if (outputPath && outputPath.includes(".html")) {
		const {document} = parseHTML(value);
		const images = [
            ...document.querySelectorAll("main article img")
        ];

		if (images.length > 0) {
            for (const image of images) {
                image.setAttribute("loading", "lazy");

                // If an image has a title it means that the user added a caption
                // so replace the image with a figure containing that image and a caption
                if (image.hasAttribute("title")) {
                    const figure = document.createElement("figure");
                    const figCaption = document.createElement("figcaption");

                    figCaption.innerHTML = image.getAttribute("title");

                    image.removeAttribute("title");

                    figure.append(image.cloneNode(true));
                    figure.append(figCaption);

                    image.replaceWith(figure);
                }
            }
        }

		generateAside(document, "main article.post-article h1, main article.post-article h2, main article.page h1, main article.page h2, main article.initiatives h1, main article.initiatives h2");

		return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
	}
	return value;
};
