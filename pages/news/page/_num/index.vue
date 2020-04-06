<template>
	<Posts :currentPageNum="currentPageNum" :allPosts="allNews" :title="title" :baseHref="baseHref" />
</template>

<script>
import Posts from "~/components/Posts"

export default {
	components: {
		Posts
	},
	data () {
		return {
			title: "News",
			baseHref: "/news",
			allNews: this.$store.state.news,
			currentPageNum: parseInt(this.$route.params.num)
		}
	},
	head () {
		return {
			titleTemplate: this.title + " | %s"
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchNews")
	}
}
</script>
