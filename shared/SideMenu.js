import "jsdom";
export default {
	injectHeaderID (content) {
		const JSDOM = require("jsdom").JSDOM;

		const jsdom = new JSDOM(content);
		const { window } = jsdom;

		const h2List = window.document.getElementsByTagName("h2");
		for (let i = 0; i < h2List.length; i++) {
			h2List[i].setAttribute("id", `#${encodeURIComponent(h2List[i].textContent)}`);
		}
		return jsdom.serialize();
	},
	getHeaderList (content) {
		const JSDOM = require("jsdom").JSDOM;
		const jsdom = new JSDOM(content);
		const { window } = jsdom;

		let headerList = [...window.document.getElementsByTagName("h2")];
		headerList = headerList.map(function (header) {
			return {
				title: header.textContent,
				href: `#${encodeURIComponent(header.textContent)}`
			};
		});
		return headerList;
	}
};
