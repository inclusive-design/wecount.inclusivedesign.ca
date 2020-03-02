<template>
	<div class="container">
		<h1 class="title">
			Tag: “{{ searchQuery }}”
		</h1>
		<NewsGrid :postList="pagePostList[$route.query.page ? parseInt($route.query.page) - 1 : 0]" />
		<Pagination v-if="pageCount > 1" :pageLinks="pageLinks" :currentPageNum="$route.query.page ? parseInt($route.query.page) : 1" />
	</div>
</template>

<script>
import _ from "lodash"
import Pagination from "~/components/Pagination"
import NewsGrid from "~/components/NewsGrid"
export default {
	components: {
		NewsGrid,
		Pagination
	},
	data () {
		return {
		}
	},
	computed: {
		searchQuery () {
			return decodeURIComponent(this.$route.query.s)
		},
		foundPosts () {
			return this.$store.state.posts.filter((blog) => {
				return blog.tags.join(" ").toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		pageCount () {
			return Math.ceil(this.foundPosts.length / 10)
		},
		pageLinks () {
			const pageLinks = []
			for (let i = 1; i <= this.pageCount; i++) {
				pageLinks.push(`/tag?s=${this.searchQuery}&page=${i}`)
			}
			return pageLinks
		},
		pagePostList () {
			return _.chunk(this.foundPosts, 10)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
