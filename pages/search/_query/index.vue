<template>
	<div class="container">
		<h1 class="title">
			Search: “{{ searchQuery }}”
		</h1>
		<p>We found {{ searchResults.length }} results for your search.</p>
		<NewsGrid :postList="searchResults" />
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
			return decodeURIComponent(this.$nuxt.$route.fullPath.match(/rch\?s=(.*)/)[1])
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
		},
		searchResults () {
			return this.foundPosts.concat(this.foundPages)
		}
	},
	fetch ({ store }) {
		return Promise.all([
			store.dispatch("fetchApiData", "posts"),
			store.dispatch("fetchApiData", "pages")
		])
	}
}
</script>
