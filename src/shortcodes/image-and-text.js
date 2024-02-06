const markdownFilter = require("../filters/markdown.js");
const figureShortcode = require("./figure-shortcode.js");

module.exports = (content, image, alt, caption, imagePosition, verticalAlignment) => {
	const figure = caption ? figureShortcode(image, alt, "image-and-text__media", caption) : figureShortcode(image, alt, "image-and-text__media");
	return `<div class="image-and-text image-and-text--image-${imagePosition} image-and-text--vertical-${verticalAlignment}">
	${figure}
<div class="image-and-text__content">${markdownFilter(content)}</div>
</div>`;
};
