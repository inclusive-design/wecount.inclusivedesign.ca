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
			title: "Views",
			numOfRecsPerPage: Config.numOfRecsPerPage
		}
	},
	computed: {
		allViews () {
			// To avoid directly mutate array/objects returned by the VueX state.
			// See https://github.com/nuxt/nuxt.js/issues/1917
			const allViews = this.$store.state.views

			// Compose "href" that redirects to the view content
			return allViews.map(function (oneView) {
				oneView.href = "/views/" + oneView.slug
				oneView.isExternalHref = false
				return oneView
			})
		},
		pageCount () {
			return Math.ceil(this.allViews.length / this.numOfRecsPerPage)
		},
		pageLinks () {
			return Array(this.pageCount).fill().map((x, i) => "/views/page/" + (i + 1))
		},
		newsChunksByPage () {
			return _.chunk(this.allViews, this.numOfRecsPerPage)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchViews")
	}
}
</script>
