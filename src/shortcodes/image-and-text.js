import markdownFilter from "../filters/markdown.js";
import figureShortcode from "eleventy-plugin-fluid/src/shortcodes/figure-shortcode.js";

const imageAndText = (content, image, alt, caption, imagePosition, verticalAlignment) => {
	const figure = caption ? figureShortcode(caption, image, alt) : figureShortcode("", image, alt);
	return `<div class="image-and-text image-and-text--image-${imagePosition} image-and-text--vertical-${verticalAlignment}">
	${figure}
<div class="image-and-text__content">${markdownFilter(content).trim()}</div>
</div>`;
};

export default imageAndText;
