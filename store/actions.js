import axios from "axios"
import Config from "~/assets/config"

export default {
	fetchApiData: async (context, postType) => {
		const Results = []
		const r = await axios.get(`${Config.wpDomain}${Config.apiBase}${postType}`)
		let count = 0

		for (let i = 0; i < r.data.length; i++) {
			const slug = (r.data[i].slug === "home") ? "/" : r.data[i].slug
			const title = r.data[i].title.rendered
			const content = r.data[i].content.rendered
			const dateTime = r.data[i].date
			const dateOptions = {
				year: "numeric",
				month: "long",
				day: "numeric"
			}
			const date = new Date(r.data[i].date).toLocaleString("en-us", dateOptions)
			let picture = "https://wecount.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
			let tags = []
			let altTag = ""

			if (postType === "posts") {
				count += 1
				if (r.data[i].pure_taxonomies.tags !== undefined) {
					tags = r.data[i].pure_taxonomies.tags.map(({ name }) => name)
				}
				if (r.data[i]._links["wp:featuredmedia"] !== undefined) {
					const api = r.data[i]._links["wp:featuredmedia"][0].href
					const pic = await axios.get(api)
					picture = pic.data.source_url
					altTag = pic.data.alt_text
				}
			}

			Results.push({ slug, title, date, picture, altTag, content, tags, dateTime, count })
		}
		if (postType === "posts") {
			context.commit("REFRESH_POSTS", Results)
		}
		if (postType === "pages") {
			context.commit("REFRESH_PAGES", Results)
		}
	}
}
