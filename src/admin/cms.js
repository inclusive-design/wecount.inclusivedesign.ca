/* global CMS, nunjucks, PropTypes, React */

import {UuidControl, UuidPreview} from "netlify-cms-widget-uuid-v4";
import dateFilter from "../filters/date";
import htmlSymbolFilter from "../filters/html-symbol";
import markdownFilter from "../filters/markdown";
import randomizeFilter from "../filters/randomize";
import slugFilter from "../filters/slug";
import w3DateFilter from "../filters/w3-date";

const env = nunjucks.configure();

env.addFilter("dateFilter", dateFilter);
env.addFilter("htmlSymbolFilter", htmlSymbolFilter);
env.addFilter("markdownFilter", markdownFilter);
env.addFilter("randomizeFilter", randomizeFilter);
env.addFilter("slug", slugFilter);
env.addFilter("w3DateFilter", w3DateFilter);

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

CMS.registerWidget("uuid", UuidControl, UuidPreview);
CMS.registerPreviewStyle("/css/main.css");

const Initative = ({ entry, getAsset }) => {
	console.log();
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

CMS.registerPreviewTemplate("initiatives", Initative);
