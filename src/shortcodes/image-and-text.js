const markdownFilter = require("../filters/markdown.js");

module.exports = (content, image, alt, title, imagePosition, verticalAlignment) => {
	const imageCaption = title ? `title="${title}"` : "";
	return `<div class="image-and-text image-and-text--image-${imagePosition} image-and-text--vertical-${verticalAlignment}">
<figure class="image-and-text__media"><img src="${image}" alt="${alt}" ${imageCaption} /></figure>
<div class="image-and-text__content">${markdownFilter(content)}</div>
</div>`;
};
