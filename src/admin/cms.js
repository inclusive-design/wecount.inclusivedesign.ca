/* eslint-disable react/display-name */
/* global CMS, createClass, nunjucks, PropTypes, React */

import {UuidControl, UuidPreview} from "netlify-cms-widget-uuid-v4";
import dateFilter from "../filters/date";
import htmlSymbolFilter from "../filters/html-symbol";
import markdownFilter from "../filters/markdown";
import randomizeFilter from "../filters/randomize";
import slugFilter from "../filters/slug";
import w3DateFilter from "../filters/w3-date";
import expanderShortcode from "../shortcodes/expander.js";
import imageAndTextShortcode from "../shortcodes/image-and-text.js";
import getId from "../utils/extract-youtube-id.js";

const env = nunjucks.configure();

env.addFilter("dateFilter", dateFilter);
env.addFilter("htmlSymbolFilter", htmlSymbolFilter);
env.addFilter("markdownFilter", markdownFilter);
env.addFilter("randomizeFilter", randomizeFilter);
env.addFilter("slug", slugFilter);
env.addFilter("w3DateFilter", w3DateFilter);

const NunjucksPreview = ({ entry, path, context }) => {
	const data = context(entry.get("data").toJS(), entry);
	const html = env.render(path, data);
	return <div dangerouslySetInnerHTML={{ __html: html }}/>;
};

NunjucksPreview.propTypes = {
	entry: PropTypes.object.isRequired,
	path: PropTypes.string.isRequired,
	context: PropTypes.func.isRequired
};

CMS.registerPreviewStyle("/css/main.css");

const Page = createClass({
	render: function() {
		return <main>
			<article className="page">
				<h1>{this.props.entry.getIn(["data", "title"])}</h1>
				<>
					{this.props.widgetFor("body")}
				</>
			</article>
		</main>;
	}
});

Page.propTypes = {
	entry: PropTypes.object.isRequired
};

const Initative = ({ entry, getAsset }) => {
	return <NunjucksPreview
		entry={entry}
		path="layouts/initiative.njk"
		context={({title, id, eventDate, shortDescription, previewImageAltText, coverImageAltText, body }, entry) => ({
			previewMode: true,
			title,
			id,
			eventDate,
			shortDescription,
			previewImageUrl: getAsset(entry.getIn(["data", "previewImageUrl"])),
			previewImageAltText,
			coverImageUrl: getAsset(entry.getIn(["data", "coverImageUrl"])),
			coverImageAltText,
			content: markdownFilter(body || ""),
		})}
	/>;
};

Initative.propTypes = {
	entry: PropTypes.object.isRequired,
	getAsset: PropTypes.object.isRequired
};

CMS.registerPreviewTemplate("pages", Page);
CMS.registerPreviewTemplate("initiatives", Initative);

CMS.registerWidget("uuid", UuidControl, UuidPreview);
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
	toPreview: function (obj) {
		const {content, image, alt, title, subtitle} = obj;
		// Show expanded state for preview purposes.
		return expanderShortcode(content, image, alt, title, subtitle).replace(" hidden", "").replace("aria-expanded=\"false\"", "aria-expanded=\"true\"");
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
	pattern: /^{% imageAndText "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endimageAndText %}/,
	fromBlock: function (match) {
		return {
			image: match[1],
			alt: match[2],
			imagePosition: match[3],
			verticalAlignment: match[4],
			content: match[5]
		};
	},
	toBlock: function (obj) {
		return `{% imageAndText "${obj.image}", "${obj.alt}", "${obj.imagePosition}", "${obj.verticalAlignment}" %}\n${obj.content}\n{% endimageAndText %}`;
	},
	toPreview: function (obj) {
		const {content, image, alt, imagePosition, verticalAlignment} = obj;
		return imageAndTextShortcode(content, image, alt, imagePosition, verticalAlignment);
	}
});
CMS.registerEditorComponent({
	id: "youtube",
	label: "YouTube Embed",
	fields: [
		{name: "url", label: "YouTube Video URL", widget: "string"},
	],
	pattern: /^{% youtube "(\S+)" %}$/,
	fromBlock: function(match) {
		return {
			url: match[1]
		};
	},
	toBlock: function(obj) {
		return `{% youtube "${obj.url}" %}`;
	},
	toPreview: function(obj) {
		return (
			"<p><img src=\"http://img.youtube.com/vi/" + getId(obj.url) + "/maxresdefault.jpg#block\" alt=\"Youtube Video\"/></p>"
		);
	}
});

