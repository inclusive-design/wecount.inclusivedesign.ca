<template>
	<div class="container">
		<h1 class="title">
			Search: “{{ searchQuery }}”
		</h1>
		<p>We found {{ searchResults.length }} results for your search.</p>
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
		},
		pageCount () {
			return Math.ceil(this.searchResults.length / 10)
		},
		pageLinks () {
			const pageLinks = []
			for (let i = 1; i <= this.pageCount; i++) {
				pageLinks.push(`/search?s=${this.searchQuery}&page=${i}`)
			}
			return pageLinks
		},
		pagePostList () {
			return _.chunk(this.searchResults, 10)
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
