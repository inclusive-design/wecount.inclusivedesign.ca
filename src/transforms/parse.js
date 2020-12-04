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
				// Some headings on the main page are explicitly using soft hyphens (&shy;) for words to be properly hyphened on
				// the mobile sized screens. This creates an issue that these hyphens are picked up and shown as `&shy;` on the side
				// menu. Considering the side menu is only shown on the desktop view not on the mobile view and hyphens are unnecessary
				// on the desktop view, these soft hyphens can be removed from the side menu.
				tocLink.textContent = heading.textContent.replace(/&shy;/g, "");
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
