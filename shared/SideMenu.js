import "cheerio";
export default {
	initDomParser (content) {
		const cheerio = require("cheerio");
		const domParser = cheerio.load(content);

		return domParser;
	},
	injectHeaderID (content) {
		const domParser = this.initDomParser(content);

		domParser("h2").each(function () {
			domParser(this).attr("id", `${domParser(this).text().replace(/\s+/g, "-")}`);
		});

		return domParser("body").html();
	},
	getHeaderList (content) {
		const domParser = this.initDomParser(content);

		return domParser("h2").map(function () {
			return {
				title: domParser(this).text(),
				href: `#${domParser(this).text().replace(/\s+/g, "-")}`
			};
		}).get();
	}
};
