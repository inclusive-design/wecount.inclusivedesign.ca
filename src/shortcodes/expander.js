const markdownFilter = require("../filters/markdown.js");
const slugFilter = require("../filters/slug.js");

module.exports = (content, image, alt, title, subtitle) => {
	const subtitleEl = subtitle ? `<p class="expander__subtitle">${subtitle}</p>` : "";
	return `<div class="expander">
<div class="expander__preview">
<img src="${image}" alt="${alt}" width="230" height="230" />
<h2 id="${slugFilter(title)}" class="expander__title">${title}</h2>
${subtitleEl}
<button class="expander__toggle" aria-expanded="false" aria-labelledby="${slugFilter(title)}">
<svg viewBox="0 0 80 80" fill="currentcolor" aria-hidden="true" focusable="false">
<rect class="vert" x="30.021" width="20" height="80"></rect>
<rect y="29.381" width="80" height="20"></rect>
</svg>
</button>
</div>
<div class="expander__content" hidden>${markdownFilter(content)}</div>
</div>`;
};
