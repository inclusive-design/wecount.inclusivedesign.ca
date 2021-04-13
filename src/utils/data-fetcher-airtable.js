// Communicate with Airtable APIs to access data
const env = require("../_data/env");
const airtable = require("airtable");

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
	literature: async() => {
		return new Promise((resolve) => {
			const literature = [];

			base("Literature Summary").select({
				view: "Deduped"
			}).eachPage(function page(records, fetchNextPage) {
				records.forEach(function(record) {
					let resource = {
						title: record.get("title"),
						focus: record.get("focus"),
						edited: record.get("edited"),
						summary: record.get("summary"),
						readability: record.get("readability"),
						source: record.get("source"),
						abstract: record.get("abstract"),
						type: record.get("resourceType") || "",
						toolPurpose: record.get("toolPurpose") || [],
						toolAccessibilityIssues: record.get("toolAccessibilityIssue") || [],
						sharePointUrl: record.get("sharePointUrl"),
						link: record.get("url"),
						openSource: record.get("openSource") === "Yes"
					};
					literature.push(resource);
				});

				fetchNextPage();
			}, function done(err) {
				if (err) {
					console.error("Error reading 'Literature' table from Airtable: ", err);
					return;
				} else {
					resolve(literature);
				}
			});
		});
	}
};
