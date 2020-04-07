<template>
	<article class="container">
		<h1 class="title">
			Tag: “{{ searchQuery }}”
		</h1>
		<NewsGrid :postList="pagePostList[$route.query.page ? parseInt($route.query.page) - 1 : 0]" />
		<Pagination v-if="pageCount > 1" :pageLinks="pageLinks" :currentPageNum="currentPageNum" />
	</article>
</template>

<script>
import _ from "lodash"
import Pagination from "~/components/Pagination"
import NewsGrid from "~/components/NewsGrid"
import Config from "~/assets/config.js"

export default {
	components: {
		NewsGrid,
		Pagination
	},
	data () {
		return {
			numOfRecsPerPage: Config.numOfRecsPerPage
		}
	},
	head () {
		return {
			titleTemplate: this.searchQuery + " (Page " + this.currentPageNum + ") | Tag | %s",
			meta: [
				{ hid: "og:title", name: "og:title", content: this.title + " (Page " + this.currentPageNum + ") | We Count" },
				{ hid: "og:url", name: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		}
	},
	computed: {
		searchQuery () {
			return decodeURIComponent(this.$route.query.s)
		},
		currentPageNum () {
			return this.$route.query.page ? parseInt(this.$route.query.page) : 1
		},
		foundNews () {
			return this.$store.state.news.filter((oneNews) => {
				return oneNews.tags.join(" ").toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		foundViews () {
			return this.$store.state.views.filter((oneViews) => {
				return oneViews.tags.join(" ").toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		searchResults () {
			return [...this.foundNews, ...this.foundViews]
		},
		pageCount () {
			return Math.ceil(this.searchResults.length / this.numOfRecsPerPage)
		},
		pageLinks () {
			const pageLinks = []
			for (let i = 1; i <= this.pageCount; i++) {
				pageLinks.push(`/tag?s=${this.searchQuery}&page=${i}`)
			}
			return pageLinks
		},
		pagePostList () {
			return _.chunk(this.searchResults, this.numOfRecsPerPage)
		}
	},
	fetch ({ store }) {
		return Promise.all([
			store.dispatch("fetchNews"),
			store.dispatch("fetchViews")
		])
	}
}
</script>
