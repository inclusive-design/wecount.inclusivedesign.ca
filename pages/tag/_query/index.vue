<template>
	<div class="container">
			<h1 id="title">
				TAG: "{{ searchQuery }}"
			</h1>
		<NewsGrid :postList="filterdBlogs" />
	</div>
</template>

<script>
import NewsGrid from "~/components/NewsGrid"
import _ from "lodash"
import Post from "~/components/Post"

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
		filterdBlogs () {
			return this.$store.state.posts.filter((blog) => {
				return blog.title.concat(" ", blog.content, " ", blog.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		groupedPosts () {
			return _.chunk(this.filterdBlogs, 2)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
