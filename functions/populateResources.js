const airtable = require("airtable");
const learnTags = require("../src/_data/resourceTags.json");

module.exports = {
	populateResources : async () => {
		return new Promise((resolve, reject) => {
			const tagLabelToValue = {};
			learnTags.resourceTags.forEach(tag => {
				tagLabelToValue[tag.label] = tag.value;
			});
			const airtableBase = process.env.airtableBase;
			const resources = [];
			airtable.configure({
				apiKey: process.env.AIRTABLE_API_KEY
			});
			const base = airtable.base(airtableBase);
			base(process.env.airtableTable).select().eachPage(function page(records, fetchNextPage) {
				records.forEach(function(record) {
					let resource = {
						title: record.get("title"),
						focus: record.get("focus"),
						summary: record.get("summary") ? record.get("summary").replace(/\n/g, " ") : "",
						learnTags: [],
						source: record.get("source"),
						keywords: [],
						type: record.get("resourceType"),
						link: record.get("url"),
						openSource: true,
						jurisdiction: record.get("jurisdiction")
					};
					record.get("learnTag").forEach(learnTag => {
						if (tagLabelToValue[learnTag]) {
							resource.learnTags.push(tagLabelToValue[learnTag]);
						}
					});
					resources.push(resource);
				});

				fetchNextPage();
			}, function done(err) {
				if (err) {
					console.error("Error reading resources table from Airtable:");
					reject(err);
				} else {
					resolve(resources);
				}
			});
		});
	}
};