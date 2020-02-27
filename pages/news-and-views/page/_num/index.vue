<template>
	<article>
		<h1>{{ title }}</h1>
		<NewsGrid :postList="pagePostList[parseInt($route.params.num) - 1]" />
		<Pagination v-if="pageNums.length > 1" :pageLinks="pageLinks" :currentPageNum="parseInt($route.params.num)" />
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
		pageNums () {
			const indexLen = Math.ceil(this.fullPostList.length / 10)
			return Array(indexLen).fill().map((x, i) => i + 1)
		},
		pageLinks () {
			return Array(this.pageNums.length).fill().map((x, i) => "/news-and-views/page/" + this.pageNums[i])
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
