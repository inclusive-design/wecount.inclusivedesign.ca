<template>
	<div class="container">
		<h1 id="title">
			SEARCH: "{{ searchQuery }}"
		</h1>
		<p>We found {{ pagesPosts.length }} results for your search.</p>
		<NewsGrid :postList="filterdBlogs" />
	</div>
</template>

<script>
import _ from "lodash"
import Post from "~/components/Post"
export default {
	components: {
		Post
	},
	data () {
		return {
		}
	},
	computed: {
		searchQuery () {
			return decodeURIComponent(this.$nuxt.$route.fullPath.match(/rch\?s=(.*)/)[1])
		},
		filterdBlogs () {
			return this.$store.state.posts.filter((blog) => {
				return blog.title.concat(" ", blog.content, " ", blog.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		filteredPages () {
			return this.$store.state.pages.filter((page) => {
				return page.title.concat(" ", page.content).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		pagesPosts () {
			return this.filterdBlogs.concat(this.filteredPages)
		},
		groupedPosts () {
			return _.chunk(this.pagesPosts, 2)
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
