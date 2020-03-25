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
export default {
	components: {
		NewsGrid,
		Pagination
	},
	data () {
		return {
			title: "Views",
			allViews: this.$store.state.views
		}
	},
	computed: {
		pageCount () {
			return Math.ceil(this.allViews.length / 10)
		},
		pageLinks () {
			return Array(this.pageCount).fill().map((x, i) => "/views/page/" + (i + 1))
		},
		newsChunksByPage () {
			return _.chunk(this.allViews, 10)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchViews")
	}
}
</script>
