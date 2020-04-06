<template>
	<article>
		<h1 class="title">
			Search: “{{ searchQuery }}”
		</h1>
		<p>We found {{ searchResults.length }} results for your search.</p>
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
			titleTemplate: "Search (Page " + this.currentPageNum + ") | %s"
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
				return oneNews.title.concat(" ", oneNews.content, " ", oneNews.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		foundViews () {
			return this.$store.state.views.filter((oneViews) => {
				return oneViews.title.concat(" ", oneViews.content, " ", oneViews.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		foundSitePages () {
			return this.$store.state.sitePages.filter((page) => {
				return page.title.concat(" ", page.content).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		searchResults () {
			return [...this.foundNews, ...this.foundViews, ...this.foundSitePages]
		},
		pageCount () {
			return Math.ceil(this.searchResults.length / this.numOfRecsPerPage)
		},
		pageLinks () {
			const pageLinks = []
			for (let i = 1; i <= this.pageCount; i++) {
				pageLinks.push(`/search?s=${this.searchQuery}&page=${i}`)
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
			store.dispatch("fetchViews"),
			store.dispatch("fetchSitePages")
		])
	}
}
</script>
