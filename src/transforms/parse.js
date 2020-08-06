const jsdom = require("@tbranyen/jsdom");
const {JSDOM} = jsdom;
const slugify = require("slugify");

module.exports = function(value, outputPath) {
	if (outputPath.endsWith(".html")) {
		const DOM = new JSDOM(value, {
			resources: "usable"
		});

		const document = DOM.window.document;
		const articleHeadings = [...document.querySelectorAll(
			"main article.post-article h1, main article.post-article h2, main article.page h1, main article.page h2, main article.initiatives h1, main article.initiatives h2"
		)];

		if (articleHeadings.length) {
			const toc = document.querySelector("aside#toc");
			const tocNav = document.createElement("nav");
			const tocUl = document.createElement("ul");
			tocNav.setAttribute("aria-label", "Secondary Navigation");

			articleHeadings.forEach(heading => {
				const headingSlug = slugify(heading.textContent.toLowerCase());

				heading.setAttribute("id", headingSlug);

				const tocLi = document.createElement("li");
				const tocLink = document.createElement("a");
				tocLink.setAttribute("href", `#${headingSlug}`);
				tocLink.textContent = heading.textContent;
				tocLi.appendChild(tocLink);
				tocUl.appendChild(tocLi);
			});

			tocNav.appendChild(tocUl);
			toc.appendChild(tocNav);
		}

		return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
	}
	return value;
};
