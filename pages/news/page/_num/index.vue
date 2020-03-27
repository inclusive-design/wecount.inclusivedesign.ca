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
			numOfRecsPerPage: Config.numOfRecsPerPage,
			allNews: this.$store.state.news
		}
	},
	computed: {
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
