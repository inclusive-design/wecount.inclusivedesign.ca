<template>
	<div class="container">
		<h1 class="title">
			Search: “{{ searchQuery }}”
		</h1>
		<p>We found {{ searchResults.length }} results for your search.</p>
		<NewsGrid :postList="pagePostList[(($route.query.page) ? $route.query.page: 1) - 1]" />
		<Pagination v-if="pageNums.length > 1" :pageLinks="pageLinks" :currentPageNum="$route.query.page" />
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
		pageNums () {
			const indexLen = Math.ceil(this.searchResults.length / 10)
			return Array(indexLen).fill().map((x, i) => i + 1)
		},
		pageLinks () {
			return Array(this.pageNums.length).fill().map((x, i) => JSON.parse(`{ "path": "/search", "query": { "s": "${this.searchQuery}", "page": ${i + 1}}}`))
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
