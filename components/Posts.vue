<template>
	<article>
		<h1>{{ title }}</h1>
		<NewsGrid :postList="postsChunksByPage[currentPageNum - 1]" />
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
	props: {
		title: {
			type: String,
			default: "Posts"
		},
		baseHref: {
			type: String,
			default: ""
		},
		currentPageNum: {
			type: Number,
			default: 1
		},
		allPosts: {
			type: Array,
			default: () => []
		}
	},
	data () {
		return {
			numOfRecsPerPage: Config.numOfRecsPerPage
		}
	},
	computed: {
		pageCount () {
			return Math.ceil(this.allPosts.length / this.numOfRecsPerPage)
		},
		pageLinks () {
			return Array(this.pageCount).fill().map((x, i) => this.baseHref + "/page/" + (i + 1))
		},
		postsChunksByPage () {
			return _.chunk(this.allPosts, this.numOfRecsPerPage)
		}
	}
}
</script>
