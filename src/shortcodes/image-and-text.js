const markdownFilter = require("../filters/markdown.js");

module.exports = (content, image, alt, imagePosition, verticalAlignment) => {
	return `<div class="wp-block-media-text has-media-on-the-${imagePosition} is-vertically-aligned-${verticalAlignment} is-stacked-on-mobile">
<figure class="wp-block-media-text__media"><img src="${image}" alt="${alt}" /></figure>
<div class="wp-block-media-text__content">${markdownFilter(content)}</div>
</div>`;
};
