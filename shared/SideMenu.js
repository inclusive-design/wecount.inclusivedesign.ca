import "jsdom";
export default {
	initDomParser (content) {
		const JSDOM = require("jsdom").JSDOM;
		const jsdom = new JSDOM(content);

		return jsdom;
	},
	injectHeaderID (content) {
		const domParser = this.initDomParser(content);
		const h2List = domParser.window.document.getElementsByTagName("h2");
		for (let i = 0; i < h2List.length; i++) {
			h2List[i].setAttribute("id", `${h2List[i].textContent.replace(/\s+/g, "-")}`);
		}
		return domParser.serialize();
	},
	getHeaderList (content) {
		const domParser = this.initDomParser(content);

		return Array.from(domParser.window.document.getElementsByTagName("h2"), (header) => {
			return {
				title: header.textContent,
				href: `#${header.textContent.replace(/\s+/g, "-")}`
			};
		});
	}
};
