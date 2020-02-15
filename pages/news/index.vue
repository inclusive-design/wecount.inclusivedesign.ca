<template>
	<NewsItem :title="title" :postList="postList" />
</template>

<script>
import NewsItem from "~/components/NewsItem"
export default {
	components: {
		NewsItem
	},
	data () {
		return {
			title: "News",
			postList: this.$store.state.posts
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
