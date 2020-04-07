<template>
	<Posts :currentPageNum="currentPageNum" :allPosts="allNews" :title="title" :baseHref="baseHref" />
</template>

<script>
import Posts from "~/components/Posts"
import Config from "~/assets/config"

export default {
	components: {
		Posts
	},
	data () {
		return {
			title: "News",
			baseHref: "/news",
			allNews: this.$store.state.news,
			currentPageNum: 1
		}
	},
	head () {
		return {
			titleTemplate: this.title + " (Page " + this.currentPageNum + ") | %s",
			meta: [
				{ hid: "og:title", name: "og:title", content: this.title + " (Page " + this.currentPageNum + ") | We Count" },
				{ hid: "og:url", name: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchNews")
	}
}
</script>
