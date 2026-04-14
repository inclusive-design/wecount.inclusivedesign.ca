/* global CMS */

import expanderShortcode from '../shortcodes/expander.js';
import figureShortcode from 'eleventy-plugin-fluid/src/shortcodes/figure-shortcode.js';
import imageAndTextShortcode from '../shortcodes/image-and-text.js';
import getId from '../utils/extract-youtube-id.js';

CMS.registerEditorComponent({
	id: 'expander',
	label: 'Expander',
	fields: [
		{
			name: 'image',
			label: 'Image',
			widget: 'image',
		},
		{
			name: 'alt',
			label: 'Alternative Text',
			widget: 'string',
		},
		{
			name: 'title',
			label: 'Title',
			widget: 'string',
		},
		{
			name: 'subtitle',
			label: 'Subtitle',
			widget: 'string',
			required: false,
		},
		{
			name: 'content',
			label: 'Content',
			widget: 'markdown',
		},
	],
	pattern: /^{% expander "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endexpander %}/,
	fromBlock(match) {
		return {
			image: match[1],
			alt: match[2],
			title: match[3],
			subtitle: match[4],
			content: match[5],
		};
	},
	toBlock({image, alt, title, subtitle, content}) {
		return `{% expander "${image}", "${alt}", "${title}", "${subtitle}" %}\n${content}\n{% endexpander %}`;
	},
	toPreview({image, alt, title, subtitle, content}) {
		return expanderShortcode(content ?? '', image, alt, title ?? '', subtitle)
			.replace(' hidden', '')
			.replace('aria-expanded="false"', 'aria-expanded="true"');
	},
});

CMS.registerEditorComponent({
	id: 'figure',
	label: 'Figure',
	fields: [
		{
			name: 'image',
			label: 'Image',
			widget: 'image',
		},
		{
			name: 'alt',
			label: 'Alternative Text',
			widget: 'string',
		},
		{
			name: 'caption',
			label: 'Caption',
			widget: 'string',
			required: false,
		},
	],
	pattern: /^{% figure "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endfigure %}/,
	fromBlock(match) {
		return {
			image: match[1],
			alt: match[2],
			caption: match[3],
		};
	},
	toBlock({image, alt, caption}) {
		return `{% figure "${image}", "${alt}" %}\n${caption}\n{% endfigure %}`;
	},
	toPreview({image, alt, caption}) {
		return figureShortcode(caption ?? '', image, alt);
	},
});

CMS.registerEditorComponent({
	id: 'image-and-text',
	label: 'Image and Text',
	fields: [
		{
			name: 'image',
			label: 'Image',
			widget: 'image',
		},
		{
			name: 'alt',
			label: 'Alternative Text',
			widget: 'string',
		},
		{
			name: 'caption',
			label: 'Caption',
			widget: 'string',
			required: false,
		},
		{
			name: 'imagePosition',
			label: 'Image Position',
			widget: 'select',
			options: [{value: 'left', label: 'Left'}, {value: 'right', label: 'Right'}],
		},
		{
			name: 'verticalAlignment',
			label: 'Vertical Alignment',
			widget: 'select',
			options: [{value: 'top', label: 'Top'}, {value: 'center', label: 'Center'}, {value: 'bottom', label: 'Bottom'}],
		},
		{
			name: 'content',
			label: 'Content',
			widget: 'markdown',
		},
	],
	pattern: /^{% imageAndText "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endimageAndText %}/,
	fromBlock(match) {
		return {
			image: match[1],
			alt: match[2],
			caption: match[3],
			imagePosition: match[4],
			verticalAlignment: match[5],
			content: match[6],
		};
	},
	toBlock({content, image, alt, caption, imagePosition, verticalAlignment}) {
		return `{% imageAndText "${image}", "${alt}", "${caption}", "${imagePosition}", "${verticalAlignment}" %}\n${content}\n{% endimageAndText %}`;
	},
	toPreview({content, image, alt, caption, imagePosition, verticalAlignment}) {
		return imageAndTextShortcode(content ?? '', image, alt, caption ?? '', imagePosition, verticalAlignment);
	},
});

CMS.registerEditorComponent({
	id: 'youtube',
	label: 'YouTube Embed',
	fields: [
		{name: 'url', label: 'YouTube Video URL', widget: 'string'},
	],
	pattern: /^{% youtube "(\S+)" %}$/,
	fromBlock(match) {
		return {
			url: match[1],
		};
	},
	toBlock({url}) {
		return `{% youtube "${url}" %}`;
	},
	toPreview({url}) {
		return `<figure class="embed--youtube"><iframe class="youtube-player video video--youtube" src="https://youtube.com/embed/${getId(url ?? false)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>`;
	},
});
