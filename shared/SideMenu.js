import "jsdom"
export default {
	injectHeaderID (content) {
		// const domparser = new DOMParser()
		// const doc = domparser.parseFromString(content, "text/xml")
		const JSDOM = require("jsdom").JSDOM
		const doc = new JSDOM(content)

		const h2List = doc.getElementsByTagName("h2")
		for (let i = 0; i < h2List.length; i++) {
			h2List[i].setAttribute("id", `#${encodeURIComponent(h2List[i].textContent)}`)
		}
		return h2List
	},
	getHeaderList (content) {
		const doc = new DOMParser().parseFromString(content, "text/xml")
		let headerList = [...doc.getElementsByTagName("h2")]
		headerList = headerList.map(function (header) {
			return {
				title: header.textContent,
				href: `#${encodeURIComponent(header.textContent)}`
			}
		})
		return headerList
	}
}
