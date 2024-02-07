const markdownFilter = require("../filters/markdown.js");
const figureShortcode = require("../../node_modules/eleventy-plugin-fluid/src/shortcodes/figure-shortcode.js");

module.exports = (content, image, alt, caption, imagePosition, verticalAlignment) => {
	const figure = caption ? figureShortcode(caption, image, alt) : figureShortcode("", image, alt);
	return `<div class="image-and-text image-and-text--image-${imagePosition} image-and-text--vertical-${verticalAlignment}">
	${figure}
<div class="image-and-text__content">${markdownFilter(content)}</div>
</div>`;
};
