/* global CMS */

import expanderShortcode from "../shortcodes/expander.js";
import figureShortcode from "eleventy-plugin-fluid/src/shortcodes/figure-shortcode.js";
import imageAndTextShortcode from "../shortcodes/image-and-text.js";
import getId from "../utils/extract-youtube-id.js";

CMS.registerEditorComponent({
	id: "expander",
	label: "Expander",
	fields: [
		{
			name: "image",
			label: "Image",
			widget: "image",
			required: true
		},
		{
			name: "alt",
			label: "Alternative Text",
			widget: "string"
		},
		{
			name: "title",
			label: "Title",
			widget: "string",
			required: true
		},
		{
			name: "subtitle",
			label: "Subtitle",
			widget: "string"
		},
		{
			name: "content",
			label: "Content",
			widget: "markdown",
			required: true
		}
	],
	pattern: /^{% expander "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endexpander %}/,
	fromBlock: function (match) {
		return {
			image: match[1],
			alt: match[2],
			title: match[3],
			subtitle: match[4],
			content: match[5]
		};
	},
	toBlock: function (obj) {
		return `{% expander "${obj.image}", "${obj.alt}", "${obj.title}", "${obj.subtitle}" %}\n${obj.content}\n{% endexpander %}`;
	},
	toPreview: function (obj, getAsset, fields) {
		const {content, image, alt, title, subtitle} = obj;
		const imageField = fields.find(f => f.get("widget") === "image");
		const src = getAsset(image, imageField);
		return expanderShortcode(content, src, alt, title, subtitle)
		// Show expanded state for preview purposes.
			.replace(" hidden", "")
			.replace("aria-expanded=\"false\"", "aria-expanded=\"true\"");
	}
});

CMS.registerEditorComponent({
	id: "figure",
	label: "Figure",
	fields: [
		{
			name: "image",
			label: "Image",
			widget: "image",
			required: true
		},
		{
			name: "alt",
			label: "Alternative Text",
			widget: "string",
			required: true
		},
		{
			name: "caption",
			label: "Caption",
			widget: "string"
		}
	],
	pattern: /^{% figure "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endfigure %}/,
	fromBlock: function (match) {
		return {
			image: match[1],
			alt: match[2],
			caption: match[3]
		};
	},
	toBlock: function (obj) {
		return `{% figure "${obj.image}", "${obj.alt}" %}\n${obj.caption}\n{% endfigure %}`;
	},
	toPreview: function (obj, getAsset, fields) {
		const {image, alt, caption} = obj;
		const imageField = fields.find(f => f.get("widget") === "image");
		const src = getAsset(image, imageField);
		return figureShortcode(caption, src, alt);
	}
});

CMS.registerEditorComponent({
	id: "image-and-text",
	label: "Image and Text",
	fields: [
		{
			name: "image",
			label: "Image",
			widget: "image",
			required: true
		},
		{
			name: "alt",
			label: "Alternative Text",
			widget: "string"
		},
		{
			name: "caption",
			label: "Caption",
			widget: "string"
		},
		{
			name: "imagePosition",
			label: "Image Position",
			widget: "select",
			options: [{value:"left", label: "Left"}, {value:"right", label: "Right"}]
		},
		{
			name: "verticalAlignment",
			label: "Vertical Alignment",
			widget: "select",
			options: [{value:"top", label: "Top"}, {value:"center", label: "Center"}, {value:"bottom", label: "Bottom"}]
		},
		{
			name: "content",
			label: "Content",
			widget: "markdown",
			required: true
		}
	],
	pattern: /^{% imageAndText "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endimageAndText %}/,
	fromBlock: function (match) {
		return {
			image: match[1],
			alt: match[2],
			caption: match[3],
			imagePosition: match[4],
			verticalAlignment: match[5],
			content: match[6]
		};
	},
	toBlock: function (obj) {
		return `{% imageAndText "${obj.image}", "${obj.alt}", "${obj.caption}", "${obj.imagePosition}", "${obj.verticalAlignment}" %}\n${obj.content}\n{% endimageAndText %}`;
	},
	toPreview: function (obj, getAsset, fields) {
		const {content, image, alt, caption, imagePosition, verticalAlignment} = obj;
		const imageField = fields.find(f => f.get("widget") === "image");
		const src = getAsset(image, imageField);
		return imageAndTextShortcode(content, src, alt, caption, imagePosition, verticalAlignment);
	}
});

CMS.registerEditorComponent({
	id: "youtube",
	label: "YouTube Embed",
	fields: [
		{name: "url", label: "YouTube Video URL", widget: "string"}
	],
	pattern: /^{% youtube "(\S+)" %}$/,
	fromBlock: function (match) {
		return {
			url: match[1]
		};
	},
	toBlock: function (obj) {
		return `{% youtube "${obj.url}" %}`;
	},
	toPreview: function (obj) {
		return (
			`<figure class="embed--youtube"><iframe class="youtube-player video video--youtube" src="https://youtube.com/embed/${getId(obj.url)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>`
		);
	}
});

CMS.registerEditorComponent({
	label: "File",
	id: "file",
	fromBlock: match =>
		match && {
			file: match[2],
			text: match[1]
		},
	toBlock: ({ text, file }) =>
		`[${text || ""}](${file || ""})`,
	toPreview: (obj) => {
		return <a href={obj.file || ""}>{obj.text}</a>;
	},
	pattern: /^\[(.*)\]\((.*?)\)$/,
	fields: [
		{
			label: "File",
			name: "file",
			widget: "file",
			media_library: {
				allow_multiple: false
			}
		},
		{
			label: "Link Text",
			name: "text"
		}
	]
});
