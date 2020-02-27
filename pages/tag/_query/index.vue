<template>
	<div class="container">
		<h1 class="title">
			Tag: “{{ searchQuery }}”
		</h1>
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
		pageNums () {
			const indexLen = Math.ceil(this.foundPosts.length / 10)
			return Array(indexLen).fill().map((x, i) => i + 1)
		},
		pageLinks () {
			return Array(this.pageNums.length).fill().map((x, i) => JSON.parse(`{ "path": "/tag", "query": { "s": "${this.searchQuery}", "page": ${i + 1}}}`))
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
