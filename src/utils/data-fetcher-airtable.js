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
						workshopId: rec.get("workshopId")
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
	}
};
