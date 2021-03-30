/* global CMS, nunjucks */

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
  const data = context(entry.get('data').toJS());
  const html = env.render(path, data);
  return <div dangerouslySetInnerHTML={{ __html: html }}/>;
};

CMS.registerWidget("uuid", UuidControl, UuidPreview);
CMS.registerPreviewStyle("/scss/main.css");

const Workshop = ({ entry }) => (
  <Preview
    entry={entry}
    path="layouts/workshop.njk"
    context={({ title, id, eventDate, shortDescription, previewImageUrl, previewImageAltText, coverImageUrl, coverImageAltText, body }) => ({
			previewMode: true,
      title,
      id,
			eventDate,
			shortDescription,
			previewImageUrl,
			previewImageAltText,
			coverImageUrl,
			coverImageAltText,
      content: markdownFilter(body || ''),
    })}
  />
);

CMS.registerPreviewTemplate('workshops', Workshop);
