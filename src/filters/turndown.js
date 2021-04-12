const TurndownService = require("turndown");

module.exports = value => {
	const td = new TurndownService({
		headingStyle: "atx",
		codeBlockStyle: "fenced"
	});

	td.keep(["table"]);

	td.addRule("youtube", {
		filter: ["iframe"],
		replacement: (innerHTML, node) => {
			return `{% youtube "${node.getAttribute("src").replace("?feature=oembed", "")}" %}`;
		}
	});

	td.addRule("image-and-text", {
		filter: (node) => {
			return node.classList.contains("wp-block-media-text");
		},
		replacement: (innerHTML, node) => {
			let contentEl, content, img, image, alt, imagePosition;
			contentEl = node.querySelector(".wp-block-media-text__content");
			if (contentEl) {
				content = td.turndown(contentEl.innerHTML);
			} else {
				content = "";
			}
			img = node.querySelector("img");
			image = img.getAttribute("src");
			alt = img.getAttribute("alt");
			imagePosition = node.classList.contains("has-media-on-the-right") ? "right" : "left";
			return `{% imageAndText "${image}", "${alt}", "${imagePosition}", "top" %}

${content}

{% endimageAndText %}

`;
		}
	});

	return td.turndown(value);
};
