import axios from "axios"
export default {
	fetchPages: async (context) => {
		const Pages = []
		const r = await axios.get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/pages")

		for (let i = 0; i < r.data.length; i++) {
			const slug = r.data[i].title.rendered.toLowerCase().replace(/ /g, "-")
			const title = r.data[i].title.rendered
			const date = ""
			const picture = ""
			const content = r.data[i].content.rendered

			Pages.push({ slug, title, date, picture, content })
		}
		context.commit("REFRESH_PAGES", Pages)
	},
	fetchPosts: async (context) => {
		const Posts = []
		const r = await axios.get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/posts")

		for (let i = 0; i < r.data.length; i++) {
			const slug = r.data[i].slug
			const title = r.data[i].title.rendered
			const content = r.data[i].content.rendered
			const tags = r.data[i].pure_taxonomies.tags.map(({ name }) => name)

			const options = {
				year: "numeric",
				month: "long",
				day: "numeric"
			}
			const date = new Date(r.data[i].date).toLocaleString("en-us", options)

			const api = r.data[i]._links["wp:featuredmedia"][0].href
			// const pic = await this.$axios.$get(api)
			const pic = await axios.get(api)

			const picture = pic.data.guid.rendered

			Posts.push({ title, picture, date, slug, content, tags })
		}
		context.commit("REFRESH_POSTS", Posts)
	},
	addPet: ({ commit }, payload) => {
		commit("appendPet", payload)
	}
}
