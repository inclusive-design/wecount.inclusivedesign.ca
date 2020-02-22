<template>
	<div class="container">
			<h1 id="title">
				tag: “{{ searchQuery }}”
			</h1>
		<NewsGrid :postList="foundPages" />
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
		},
		foundPages () {
			return this.$store.state.pages.filter((page) => {
				return page.title.concat(" ", page.content).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
