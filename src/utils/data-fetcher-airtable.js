// Communicate with Airtable APIs to access data
const ApiKey = process.env.AIRTABLE_API_KEY;
const airtable = require("airtable");

airtable.configure({
	apiKey: ApiKey
});

var base = airtable.base("appalfcvZ68ydXxx5");

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
					workshops.push({
						id: record.getId(),
						title: record.get("title"),
						date: record.get("date"),
						shortDescription: record.get("shortDescription"),
						fullDescription: record.get("fullDescription"),
						imageUrl: image ? image[0].url : undefined,
						altTag: record.get("altTag")
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
