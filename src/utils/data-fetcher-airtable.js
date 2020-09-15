// Communicate with Airtable APIs to access data
const env = require("../_data/env");
const airtable = require("airtable");
var md = require("markdown-it")({
	breaks: true
});

airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY
});

const base = airtable.base(env.airtableBase);

// Share data fetch functions
module.exports = {
	workshops: async () => {
		return new Promise((resolve) => {
			const workshops = [];

			base("workshops").select({
				view: "Grid view",
				sort: [{field: "date", direction: "desc"}]
			}).eachPage(function page(records, fetchNextPage) {
				records.forEach(record => {
					let image = record.get("image");
					let title = record.get("title");
					let shortDescription = record.get("short_description");
					let fullDescription = record.get("full_description");
					let comments = [];

					let workshopFilterFormula = "{recID (from workshops)} = '" + record.id + "'";

					base("comments").select({
						view: "reviewed",
						sort: [{field: "post_date", direction: "desc"}],
						filterByFormula: workshopFilterFormula
					}).eachPage(function page(recs, fetchNextPage) {

						recs.forEach(function(rec) {
							let commentProps = {
								name: rec.get("name"),
								date: rec.get("post_date"),
								comment: rec.get("comment")
							};
							comments.push(commentProps);
						});

						fetchNextPage();
					}, function done(err) {
						if (err) {
							console.error("Error reading 'comments' table from Airtable: ", err);
							return; }
					});

					workshops.push({
						id: record.getId(),
						title: title ? title : undefined,
						date: record.get("date"),
						shortDescription: shortDescription ? md.render(shortDescription) : undefined,
						fullDescription: fullDescription ? md.render(fullDescription) : undefined,
						imageUrl: image ? image[0].url : undefined,
						imageAlt: record.get("image_alt"),
						comments
					});
				});
				fetchNextPage();
			}, function done(err) {
				if (err) {
					console.error("Error reading 'workshops' table from Airtable: ", err);
					return;
				}
				else {
					resolve(workshops);
				}
			});
		});
	}
};
