<template>
	<article>
		<h1>{{ title }}</h1>
		<NewsGrid :postList="pagePostList[0]" />
		<Pagination v-if="pageCount > 1" :pageLinks="pageLinks" :currentPageNum="1" />
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
			title: "News and Views",
			fullPostList: this.$store.state.posts
		}
	},
	computed: {
		pageCount () {
			return Math.ceil(this.fullPostList.length / 10)
		},
		pageLinks () {
			return Array(this.pageCount).fill().map((x, i) => "/news-and-views/page/" + (i + 1))
		},
		pagePostList () {
			return _.chunk(this.fullPostList, 10)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
