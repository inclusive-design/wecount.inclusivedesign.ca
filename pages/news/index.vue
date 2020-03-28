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
			currentPageNum: 1
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchNews")
	}
}
</script>
