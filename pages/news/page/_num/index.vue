<template>
	<article>
		<h1>{{ title }}</h1>
		<NewsGrid :postList="newsChunksByPage[parseInt($route.params.num) - 1]" />
		<Pagination v-if="pageCount > 1" :pageLinks="pageLinks" :currentPageNum="parseInt($route.params.num)" />
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
			title: "News",
			numOfRecsPerPage: Config.numOfRecsPerPage
		}
	},
	computed: {
		allNews () {
			// To avoid directly mutate array/objects returned by the VueX state.
			// See https://github.com/nuxt/nuxt.js/issues/1917
			const allNews = this.$store.state.news

			return allNews.map(function (oneNews) {
				// Viewing News contents will be redirected to an external link
				oneNews.isExternalHref = true
				return oneNews
			})
		},
		pageCount () {
			return Math.ceil(this.allNews.length / this.numOfRecsPerPage)
		},
		pageLinks () {
			return Array(this.pageCount).fill().map((x, i) => "/news/page/" + (i + 1))
		},
		newsChunksByPage () {
			return _.chunk(this.allNews, this.numOfRecsPerPage)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchNews")
	}
}
</script>
