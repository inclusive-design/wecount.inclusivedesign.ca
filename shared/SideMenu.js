import "jsdom"
export default {
	injectHeaderID (content) {
		// const domparser = new DOMParser()
		// const doc = domparser.parseFromString(content, "text/xml")
		const JSDOM = require("jsdom").JSDOM

		// Create a new DOM with jsdom and get the window element;
		const jsdom = new JSDOM(content)
		const { window } = jsdom

		// Check to ensure that our jsdom looks like what was serialized.
		// eslint-disable-next-line no-console
		console.log(`CONSTRUCTED DOM: ${jsdom.serialize()}`) // As expected, as passed to constructor.

		const h2List = window.document.getElementsByTagName("h2")
		for (let i = 0; i < h2List.length; i++) {
			h2List[i].setAttribute("id", `#${encodeURIComponent(h2List[i].textContent)}`)
		}
		return jsdom.serialize()
	},
	getHeaderList (content) {
		// const doc = new DOMParser().parseFromString(content, "text/xml")
		const JSDOM = require("jsdom").JSDOM
		const jsdom = new JSDOM(content)
		const { window } = jsdom

		let headerList = [...window.document.getElementsByTagName("h2")]
		headerList = headerList.map(function (header) {
			return {
				title: header.textContent,
				href: `#${encodeURIComponent(header.textContent)}`
			}
		})
		return headerList
	}
}
