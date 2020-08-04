// Communicate with Airtable APIs to access data
const airtable = require("airtable");
var md = require("markdown-it")({
	breaks: true
});

console.log("process.env.AIRTABLE_API_KEY: ", process.env.AIRTABLE_API_KEY);
airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY
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
					let title = record.get("title");
					let shortDescription = record.get("short_description");
					let fullDescription = record.get("full_description");

					workshops.push({
						id: record.getId(),
						title: title ? md.render(title) : undefined,
						date: record.get("date"),
						shortDescription: shortDescription ? md.render(shortDescription) : undefined,
						fullDescription: fullDescription ? md.render(fullDescription) : undefined,
						imageUrl: image ? image[0].url : undefined,
						imageAlt: record.get("image_alt")
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
