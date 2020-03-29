<template>
	<Posts :currentPageNum="currentPageNum" :allPosts="allViews" :title="title" :baseHref="baseHref" />
</template>

<script>
import Posts from "~/components/Posts"

export default {
	components: {
		Posts
	},
	data () {
		return {
			title: "Views",
			baseHref: "/views",
			allViews: this.$store.state.views,
			currentPageNum: 1
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchViews")
	}
}
</script>
