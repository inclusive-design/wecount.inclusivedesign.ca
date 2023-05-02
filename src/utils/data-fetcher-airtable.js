// Communicate with Airtable APIs to access data
const env = require("../_data/env");
const airtable = require("airtable");
const learnTags = require("../_data/resourceTags.json");

airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY
});

const base = airtable.base(env.airtableBase);

// Share data fetch functions
module.exports = {
	comments: async () => {
		return new Promise((resolve) => {
			const comments = [];

			base("comments").select({
				view: "reviewed",
				sort: [{field: "post_date", direction: "desc"}],
			}).eachPage(function page(recs, fetchNextPage) {
				recs.forEach(function(rec) {
					let commentProps = {
						name: rec.get("name"),
						date: rec.get("post_date"),
						comment: rec.get("comment"),
						initiativeId: rec.get("initiativeId")
					};
					comments.push(commentProps);
				});

				fetchNextPage();
			}, function done(err) {
				if (err) {
					console.error("Error reading 'comments' table from Airtable: ", err);
					return;
				} else {
					resolve(comments);
				}
			});
		});
	},
	populateResources: async () => {
		return new Promise((resolve, reject) => {
			const tagLabelToValue = {};
			learnTags.resourceTags.forEach(tag => {
				tagLabelToValue[tag.label] = tag.value;
			});
			const resources = [];
			base("tbll2NpygbXrUnZZV").select().eachPage(function page(records, fetchNextPage) {
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
