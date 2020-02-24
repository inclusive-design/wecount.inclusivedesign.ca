<template>
	<div class="container">
		<h1 id="title">
			Tag: “{{ searchQuery }}”
		</h1>
		<NewsGrid :postList="foundPosts" />
	</div>
</template>

<script>
import NewsGrid from "~/components/NewsGrid"
export default {
	components: {
		NewsGrid
	},
	data () {
		return {
		}
	},
	computed: {
		searchQuery () {
			return decodeURIComponent(this.$nuxt.$route.fullPath.match(/tag\?s=(.*)/)[1])
		},
		foundPosts () {
			return this.$store.state.posts.filter((blog) => {
				return blog.title.concat(" ", blog.content, " ", blog.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
