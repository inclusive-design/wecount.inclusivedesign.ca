<template>
	<PostArticle :title="title" :content="content" :picture="picture" :tags="tags" />
</template>

<script>
import axios from "axios"
import Config from "~/assets/config"
import PostArticle from "~/components/PostArticle"
export default {
	async validate ({ params, store }) {
		if (store.state.posts === null) {
			await store.dispatch("fetchApiData", "posts")
		}
		const linkList = store.state.posts.map(({ slug }) => slug)
		return linkList.includes(params.slug)
	},
	// head () {
	// 	return {
	// 		title: this.Title
	// 	}
	// },
	components: {
		PostArticle
	},
	data () {
		return {
		}
	},
	// computed: {
	// 	links () {
	// 		return this.$store.state.posts.map(({ slug }) => slug)
	// 	},
	// 	linkNames () {
	// 		return this.links.map(x => x.replace(/-/g, " "))
	// 	},
	// 	Title () {
	// 		return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).title
	// 	},
	// 	Picture () {
	// 		return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).picture
	// 	},
	// 	Content () {
	// 		return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).content
	// 	},
	// 	Tags () {
	// 		return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).tags
	// 	}
	// },
	asyncData (context) {
		return axios.get(`${Config.wpDomain}${Config.apiBase}posts`).then((response) => {
			const res = response.data.filter(x => x.slug === context.params.slug)[0]
			let picture = "https://wecount.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
			// let altTag = ""
			if (res._links["wp:featuredmedia"] !== undefined) {
				const api = res._links["wp:featuredmedia"][0].href
				const pic = axios.get(api)
				picture = pic.source_url
				// altTag = pic.data.alt_text
			}
			return {
				title: res.title.rendered,
				content: res.content.rendered,
				picture,
				tags: res.pure_taxonomies.tags.map(({ name }) => name)

			}
		})
	}
}
</script>
