/* global CMS, nunjucks, PropTypes, React */

import {UuidControl, UuidPreview} from "netlify-cms-widget-uuid-v4";
import dateFilter from "../filters/date";
import htmlSymbolFilter from "../filters/html-symbol";
import markdownFilter from "../filters/markdown";
import randomizeFilter from "../filters/randomize";
import slugFilter from "../filters/slug";
import w3DateFilter from "../filters/w3-date";
import getId from "../utils/extract-youtube-id.js";

const env = nunjucks.configure();

env.addFilter("dateFilter", dateFilter);
env.addFilter("htmlSymbolFilter", htmlSymbolFilter);
env.addFilter("markdownFilter", markdownFilter);
env.addFilter("randomizeFilter", randomizeFilter);
env.addFilter("slug", slugFilter);
env.addFilter("w3DateFilter", w3DateFilter);

const shortcodePreviews = {
	youtube: (str) => {
		const pattern = /{% youtube "(\S+)" %}/g;
		const replacer = (str, match) => (`![YouTube video](http://img.youtube.com/vi/${getId(match)}/maxresdefault.jpg#block)`);
		return str.replace(pattern, replacer);
	}
};

const Preview = ({ entry, path, context }) => {
	const data = context(entry.get("data").toJS(), entry);
	const html = env.render(path, data);
	return <div dangerouslySetInnerHTML={{ __html: html }}/>;
};

Preview.propTypes = {
	entry: PropTypes.object.isRequired,
	path: PropTypes.string.isRequired,
	context: PropTypes.func.isRequired
};

CMS.registerPreviewStyle("/css/main.css");

const Page = ({ entry }) => {

	return <Preview
		entry={entry}
		path="layouts/page.njk"
		context={({title, body}) => {
			Object.keys(shortcodePreviews).map(shortcode => {
				body = shortcodePreviews[shortcode](body);
			});
			return {
				previewMode: true,
				title,
				content: markdownFilter(body || ""),
			};
		}
		}
	/>;
};

Page.propTypes = {
	entry: PropTypes.object.isRequired
};

const Initative = ({ entry, getAsset }) => {
	return <Preview
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
	id: "youtube",
	label: "YouTube",
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
		console.log(getId(obj.url));
		return (
			"<img src=\"http://img.youtube.com/vi/" + getId(obj.url) + "/maxresdefault.jpg#block\" alt=\"Youtube Video\"/>"
		);
	}
});

