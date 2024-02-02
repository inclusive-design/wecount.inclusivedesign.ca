// Communicate with Airtable APIs to access data
const env = require("../_data/env");
const airtable = require("airtable");

airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY
});

// How to get base id: https://airtable.com/developers/web/api/list-bases
// You can also find base id from the airtable url, a part where it begins with 'app'
const base = airtable.base(env.airtableBase);

// Share data fetch functions
module.exports = {
	comments: async () => {
		return new Promise((resolve) => {
			const comments = [];

			base("comments").select({
				view: "reviewed",
				sort: [{field: "post_date", direction: "desc"}]
			}).eachPage(function page(recs, fetchNextPage) {
				recs.forEach(function (rec) {
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
					// eslint-disable-next-line no-console
					console.error("Error reading 'comments' table from Airtable: ", err);
					return;
				} else {
					resolve(comments);
				}
			});
		});
	}
};
