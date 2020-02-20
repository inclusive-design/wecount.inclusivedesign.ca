<template>
	<article>
		<h1>{{ title }}</h1>
		<NewsGrid :postList="postList" />
	</article>
</template>

<script>
import NewsGrid from "~/components/NewsGrid"
export default {
	components: {
		NewsGrid
	},
	data () {
		return {
			title: "News and Views",
			postList: this.$store.state.posts
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
